import sql from './_lib/db.js';
import { json, error, handleOptions } from './_lib/response.js';
import { verifyToken } from './_lib/auth.js';

export default async function handler(req, res) {
  if (handleOptions(req, res)) return;

  if (req.method !== 'POST') return error(res, 'Method not allowed', 405);

  try {
    const decoded = verifyToken(req);
    const { transcript, currentPage = '/' } = req.body || {};

    if (!transcript) return error(res, 'Transcript is required', 400);

    const users = await sql`SELECT * FROM users WHERE id = ${decoded.sub}`;
    const user = users[0] || { name: 'Morador', role: 'morador', points: 0, level: 1 };

    const systemPrompt = `Você é a Cora, assistente virtual por voz do Participa 360, um aplicativo de engajamento cívico comunitário.
Você fala português do Brasil de forma concisa, acolhedora e amigável.

Dados do Usuário:
- Nome: ${user.name}
- Papel: ${user.role}
- Pontos: ${user.points} pts (Nível ${user.level})
- Tela Atual: ${currentPage}

Regras:
1. Responda em no máximo 2 frases para ser lido em voz alta confortavelmente.
2. Se o usuário quiser ir a uma página ou fazer algo no app, use a funcionalidade apropriada (tool_call) e forneça a resposta explicativa.`;

    const tools = [
      {
        type: 'function',
        function: {
          name: 'navegar',
          description: 'Navega para uma página do aplicativo',
          parameters: {
            type: 'object',
            properties: {
              pagina: {
                type: 'string',
                enum: ['/home', '/reportar', '/meus-relatos', '/marketplace', '/alertas', '/perfil']
              }
            },
            required: ['pagina']
          }
        }
      },
      {
        type: 'function',
        function: {
          name: 'reportar_problema',
          description: 'Abre o fluxo de reportar um problema urbano com categoria pré-selecionada',
          parameters: {
            type: 'object',
            properties: {
              categoria: {
                type: 'string',
                enum: ['Buraco', 'Iluminação Pública', 'Coleta de Lixo', 'Vandalismo', 'Vazamento de Água', 'Outro']
              }
            }
          }
        }
      },
      {
        type: 'function',
        function: {
          name: 'consultar_pontos',
          description: 'Consulta o saldo de pontos e nível do usuário',
          parameters: { type: 'object', properties: {} }
        }
      }
    ];

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      // Fallback response if no Groq key configured
      const lower = transcript.toLowerCase();
      let speech = `Olá ${user.name}! Sou a Cora. Como posso ajudar?`;
      let action = null;

      if (lower.includes('buraco') || lower.includes('reportar') || lower.includes('problema')) {
        speech = 'Entendi! Abrindo a tela de reportar problema.';
        action = { type: 'reportar_problema', params: { categoria: 'Buraco' } };
      } else if (lower.includes('ponto') || lower.includes('saldo') || lower.includes('nível')) {
        speech = `Você possui ${user.points} pontos no nível ${user.level}.`;
        action = { type: 'consultar_pontos', params: {} };
      } else if (lower.includes('relato') || lower.includes('historico')) {
        speech = 'Abrindo seus relatos reportados.';
        action = { type: 'navegar', params: { pagina: '/meus-relatos' } };
      }

      return json(res, { speech, action });
    }

    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'openai/gpt-oss-20b',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: transcript }
        ],
        tools,
        tool_choice: 'auto',
        temperature: 0.7,
        max_tokens: 200
      })
    });

    const data = await groqRes.json();
    const message = data?.choices?.[0]?.message;

    let speech = message?.content || `Entendido, ${user.name}!`;
    let action = null;

    if (message?.tool_calls?.length > 0) {
      const toolCall = message.tool_calls[0];
      const fnName = toolCall.function.name;
      let fnArgs = {};
      try { fnArgs = JSON.parse(toolCall.function.arguments); } catch (e) {}

      action = { type: fnName, params: fnArgs };
    }

    return json(res, { speech, action });
  } catch (err) {
    return error(res, err.message || 'Internal Error', 500);
  }
}
