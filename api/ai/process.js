import sql from '../_lib/db.js';
import { json, error, handleOptions } from '../_lib/response.js';
import { verifyToken } from '../_lib/auth.js';

const GROQ_API_KEY = process.env.GROQ_API_KEY;

export default async function handler(req, res) {
  if (handleOptions(req, res)) return;

  if (req.method !== 'POST') return error(res, 'Method not allowed', 405);

  try {
    const decoded = verifyToken(req);
    const { transcript, currentPage } = req.body;
    
    if (!transcript) return error(res, 'Missing transcript', 400);

    const users = await sql`SELECT name, role, points, level FROM users WHERE id = ${decoded.sub}`;
    if (users.length === 0) return error(res, 'User not found', 404);
    
    const user = users[0];

    const systemPrompt = `Você é a Cora, assistente virtual do Participa 360, um app de engajamento cívico comunitário. Você fala português brasileiro de forma amigável, inclusiva e clara. Você pode executar ações no app através das tools disponíveis.

Contexto do usuário:
- Nome: ${user.name}
- Perfil: ${user.role}  
- Pontos: ${user.points}
- Nível: ${user.level}
- Tela atual: ${currentPage || 'Início'}

Regras:
- Responda de forma concisa (máx 2 frases) pois será lido em voz alta
- Use linguagem acessível e acolhedora
- Confirme antes de ações que gastam pontos
- Se não entender, peça para repetir com gentileza`;

    const tools = [
      {
        type: 'function',
        function: {
          name: 'navegar',
          description: 'Navega para uma página diferente no app',
          parameters: {
            type: 'object',
            properties: {
              page: { type: 'string', description: 'O nome da página para navegar (ex: feed, mapa, recompensas, perfil, projetos)' }
            },
            required: ['page']
          }
        }
      },
      {
        type: 'function',
        function: {
          name: 'reportar_problema',
          description: 'Inicia o fluxo de reporte de problema',
          parameters: {
            type: 'object',
            properties: {
              category: { type: 'string', description: 'Categoria do problema (ex: iluminação, buraco, lixo)' }
            }
          }
        }
      },
      {
        type: 'function',
        function: {
          name: 'consultar_pontos',
          description: 'Consulta os pontos do usuário',
          parameters: { type: 'object', properties: {} }
        }
      },
      {
        type: 'function',
        function: {
          name: 'consultar_relatos',
          description: 'Consulta os relatos do usuário',
          parameters: { type: 'object', properties: {} }
        }
      },
      {
        type: 'function',
        function: {
          name: 'resgatar_recompensa',
          description: 'Tenta resgatar uma recompensa específica',
          parameters: {
            type: 'object',
            properties: {
              reward_name: { type: 'string', description: 'Nome da recompensa desejada' }
            },
            required: ['reward_name']
          }
        }
      },
      {
        type: 'function',
        function: {
          name: 'ver_alertas',
          description: 'Vê os alertas disponíveis',
          parameters: { type: 'object', properties: {} }
        }
      },
      {
        type: 'function',
        function: {
          name: 'votar_enquete',
          description: 'Inicia o fluxo de voto na enquete atual',
          parameters: { type: 'object', properties: {} }
        }
      },
      {
        type: 'function',
        function: {
          name: 'listar_funcionalidades',
          description: 'Lista as funcionalidades do app',
          parameters: { type: 'object', properties: {} }
        }
      }
    ];

    // Using OpenAI format structure that Groq also supports
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'openai/gpt-oss-20b', // Placeholder specified by user, adjust accordingly if needed
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: transcript }
        ],
        tools: tools,
        tool_choice: 'auto'
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Groq Error:', errText);
      return error(res, 'AI Service error', 502);
    }

    const data = await response.json();
    const message = data.choices[0]?.message;
    
    if (!message) return error(res, 'No response from AI', 500);

    let action = null;

    if (message.tool_calls && message.tool_calls.length > 0) {
      const toolCall = message.tool_calls[0];
      let params = {};
      try {
        params = JSON.parse(toolCall.function.arguments);
      } catch(e) {}
      
      action = {
        type: toolCall.function.name,
        params: params
      };
      
      return json(res, {
        speech: message.content || `Certo, executando a ação: ${toolCall.function.name.replace(/_/g, ' ')}`,
        action
      });
    }

    return json(res, {
      speech: message.content || 'Não entendi direito, pode repetir?',
      action: null
    });
  } catch (err) {
    if (err.message === 'No token' || err.name === 'JsonWebTokenError') return error(res, 'Unauthorized', 401);
    return error(res, err.message, 500);
  }
}
