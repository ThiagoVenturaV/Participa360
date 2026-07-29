import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const DataContext = createContext(null);

const PROBLEMAS_KEY = 'p360_problemas';
const PROJETOS_KEY = 'p360_projetos';
const RANKING_KEY = 'p360_ranking';

const SEED_PROBLEMAS = [
  {
    id: 'p1',
    titulo: 'Aglomerado de Buracos na Av. Cais do Apolo',
    descricao: 'Grande deterioração no asfalto causando risco de acidentes para motoristas e pedestres.',
    categoria: 'Infraestrutura',
    status: 'em_progresso',
    criadoPor: 'João Silva',
    criadoEm: '2026-07-10',
    validado: true,
    bairro: 'Bairro do Recife',
    votos: 28,
    projetoId: 'pr1'
  },
  {
    id: 'p2',
    titulo: 'Iluminação pública apagada na Rua da Moeda',
    descricao: 'Postes apagados aumentando a insegurança no trecho histórico durante a noite.',
    categoria: 'Iluminação',
    status: 'aprovado',
    criadoPor: 'Elena Santos',
    criadoEm: '2026-07-12',
    validado: true,
    bairro: 'Santo Amaro',
    votos: 45,
    projetoId: 'pr2'
  },
  {
    id: 'p3',
    titulo: 'Canal com acúmulo de resíduos em Santo Amaro',
    descricao: 'Descarte irregular de lixo obstruindo a drenagem do canal próximo à comunidade.',
    categoria: 'Saneamento',
    status: 'em_analise',
    criadoPor: 'Carlos Oliveira',
    criadoEm: '2026-07-18',
    validado: false,
    bairro: 'Santo Amaro',
    votos: 19
  },
  {
    id: 'p4',
    titulo: 'Praça da Praça do Arsenal necessitando manutenção',
    descricao: 'Bancos danificados e falta de iluminação no entorno do playground infantil.',
    categoria: 'Espaços Públicos',
    status: 'resolvido',
    criadoPor: 'Ana Lima',
    criadoEm: '2026-06-20',
    validado: true,
    bairro: 'Bairro do Recife',
    votos: 38,
    projetoId: 'pr3'
  }
];

const SEED_PROJETOS = [
  {
    id: 'pr1',
    titulo: 'Recapeamento e Ciclovia Cais do Apolo',
    descricao: 'Reparo completo do asfalto com nova sinalização e faixa de ciclovia protegida.',
    status: 'execucao',
    lider: 'Elena Santos',
    membros: ['João Silva', 'Carlos Oliveira'],
    problemaId: 'p1',
    bairro: 'Bairro do Recife',
    prazo: '2026-09-30',
    pontuacao: 1250,
    empresa: 'Porto Digital Tech',
    valorInvestimento: 'R$ 150.000',
    etapas: [
      { id: 'e1', titulo: 'Vistoria técnica da prefeitura', concluida: true },
      { id: 'e2', titulo: 'Aprovação do plano de intervenção', concluida: true },
      { id: 'e3', titulo: 'Aporte de investimento da empresa parceira', concluida: true },
      { id: 'e4', titulo: 'Aplicação do novo asfalto e sinalização', concluida: false },
      { id: 'e5', titulo: 'Entrega oficial à comunidade', concluida: false }
    ]
  },
  {
    id: 'pr2',
    titulo: 'Iluminação Solar e LED Histórica',
    descricao: 'Instalação de luminárias LED ornamentais de baixo consumo no circuito cultural.',
    status: 'aprovado',
    lider: 'João Ferreira',
    membros: ['Maria Santos', 'Ana Lima'],
    problemaId: 'p2',
    bairro: 'Santo Amaro',
    prazo: '2026-10-15',
    pontuacao: 980,
    empresa: 'Acme Corp / Neoenergia',
    valorInvestimento: 'R$ 80.000',
    etapas: [
      { id: 'e1', titulo: 'Mapeamento dos pontos críticos de luz', concluida: true },
      { id: 'e2', titulo: 'Aprovação pela Secretaria de Infraestrutura', concluida: true },
      { id: 'e3', titulo: 'Aquisição das luminárias LED', concluida: false },
      { id: 'e4', titulo: 'Instalação e testes de rede', concluida: false },
      { id: 'e5', titulo: 'Inauguração pública', concluida: false }
    ]
  },
  {
    id: 'pr3',
    titulo: 'Revitalização do Parque do Arsenal',
    descricao: 'Reforma de equipamentos, novo paisagismo e área verde com acessibilidade.',
    status: 'concluido',
    lider: 'Elena Santos',
    membros: ['João Silva', 'Ana Lima', 'Pedro Costa'],
    problemaId: 'p4',
    bairro: 'Bairro do Recife',
    prazo: '2026-05-31',
    pontuacao: 1580,
    empresa: 'Verde Ambiental S/A',
    valorInvestimento: 'R$ 220.000',
    etapas: [
      { id: 'e1', titulo: 'Consulta pública com moradores', concluida: true },
      { id: 'e2', titulo: 'Parceria de financiamento empresarial', concluida: true },
      { id: 'e3', titulo: 'Reforma dos banheiros e bancos', concluida: true },
      { id: 'e4', titulo: 'Plantio de mudas e paisagismo', concluida: true },
      { id: 'e5', titulo: 'Entrega final com evento comunitário', concluida: true }
    ]
  }
];

const SEED_RANKING = [
  { id: 'r1', nome: 'João Ferreira', pontos: 1580, role: 'lider', bairro: 'Bairro do Recife', projetos: 3 },
  { id: 'r2', nome: 'Elena Santos', pontos: 1200, role: 'lider', bairro: 'Santo Amaro', projetos: 2 },
  { id: 'r3', nome: 'Maria Santos', pontos: 980, role: 'lider', bairro: 'Boa Viagem', projetos: 2 },
  { id: 'r4', nome: 'João Silva', pontos: 450, role: 'morador', bairro: 'Bairro do Recife', projetos: 1 },
  { id: 'r5', nome: 'Carlos Oliveira', pontos: 420, role: 'morador', bairro: 'Santo Amaro', projetos: 0 },
  { id: 'r6', nome: 'Ana Lima', pontos: 380, role: 'morador', bairro: 'Bairro do Recife', projetos: 0 },
  { id: 'r7', nome: 'Pedro Costa', pontos: 310, role: 'morador', bairro: 'Graças', projetos: 0 },
  { id: 'r8', nome: 'Lucia Fernandes', pontos: 250, role: 'morador', bairro: 'Espinheiro', projetos: 0 }
];

export const RECOMPENSAS_RANKING = [
  { id: 'rec1', titulo: 'Recarga VEM Mobilidade', pontos: 150, categoria: 'MOBILIDADE', icon: 'directions_bus', desc: 'Crédito de passagem de ônibus municipal' },
  { id: 'rec2', titulo: 'Apadrinhe uma Árvore', pontos: 300, categoria: 'SUSTENTABILIDADE', icon: 'park', desc: 'Muda nativa plantada em seu nome com placa' },
  { id: 'rec3', titulo: 'Vale-Ingresso Teatro Santa Isabel', pontos: 500, categoria: 'CULTURA', icon: 'confirmation_number', desc: 'Par de ingressos para espetáculos culturais' },
  { id: 'rec4', titulo: 'Desconto no IPTU Municipal', pontos: 1000, categoria: 'TRIBUTOS', icon: 'payments', desc: '5% de desconto extra na cota única IPTU' },
  { id: 'rec5', titulo: 'Bolsa Curso de Inovação Porto Digital', pontos: 1500, categoria: 'EDUCAÇÃO', icon: 'school', desc: 'Capacitação em gestão de projetos comunitários' }
];

export function DataProvider({ children }) {
  const { user, setUser } = useAuth();

  const [problemas, setProblemas] = useState(() => {
    const saved = localStorage.getItem(PROBLEMAS_KEY);
    try { return saved ? JSON.parse(saved) : SEED_PROBLEMAS; } catch (e) { return SEED_PROBLEMAS; }
  });

  const [projetos, setProjetos] = useState(() => {
    const saved = localStorage.getItem(PROJETOS_KEY);
    try { return saved ? JSON.parse(saved) : SEED_PROJETOS; } catch (e) { return SEED_PROJETOS; }
  });

  const [rankingList, setRankingList] = useState(() => {
    const saved = localStorage.getItem(RANKING_KEY);
    try { return saved ? JSON.parse(saved) : SEED_RANKING; } catch (e) { return SEED_RANKING; }
  });

  useEffect(() => {
    localStorage.setItem(PROBLEMAS_KEY, JSON.stringify(problemas));
  }, [problemas]);

  useEffect(() => {
    localStorage.setItem(PROJETOS_KEY, JSON.stringify(projetos));
  }, [projetos]);

  useEffect(() => {
    localStorage.setItem(RANKING_KEY, JSON.stringify(rankingList));
  }, [rankingList]);

  // Keep current user points updated in ranking
  useEffect(() => {
    if (!user) return;
    setRankingList((prev) => {
      const exists = prev.some((r) => r.nome === user.name || r.id === user.id);
      if (exists) {
        return prev.map((r) => (r.nome === user.name || r.id === user.id ? { ...r, pontos: user.points || r.pontos } : r));
      } else {
        return [
          ...prev,
          {
            id: user.id || `u-${Date.now()}`,
            nome: user.name || 'Usuário',
            pontos: user.points || 10,
            role: user.role || 'morador',
            bairro: user.neighborhood || 'Central',
            projetos: 0
          }
        ];
      }
    });
  }, [user?.points, user?.name]);

  // Sorted ranking list by points descending
  const ranking = [...rankingList].sort((a, b) => b.pontos - a.pontos);

  const addPoints = (amount) => {
    if (user && setUser) {
      const newPoints = (user.points || 0) + amount;
      setUser({ ...user, points: newPoints });
    }
  };

  const addProblema = (newProbData) => {
    const nuevo = {
      id: `p-${Date.now()}`,
      titulo: newProbData.titulo,
      descricao: newProbData.descricao || '',
      categoria: newProbData.categoria || 'Geral',
      status: 'em_analise',
      criadoPor: user?.name || 'Morador',
      criadoEm: new Date().toISOString().split('T')[0],
      validado: false,
      bairro: user?.neighborhood || 'Bairro do Recife',
      votos: 1
    };
    setProblemas((prev) => [nuevo, ...prev]);
    addPoints(50); // +50 points for reporting an issue
    return nuevo;
  };

  const validarProblema = (id) => {
    setProblemas((prev) =>
      prev.map((p) => (p.id === id ? { ...p, validado: true, status: 'aprovado' } : p))
    );
    addPoints(50); // +50 bonus points when issue validated by IA / Prefeitura
  };

  const createProjeto = (projData) => {
    const nuevoProj = {
      id: `pr-${Date.now()}`,
      titulo: projData.titulo,
      descricao: projData.descricao || 'Projeto de melhoria comunitária.',
      status: 'aprovado',
      lider: user?.name || 'Elena Santos',
      membros: [user?.name || 'Elena Santos'],
      problemaId: projData.problemaId || null,
      bairro: projData.bairro || 'Bairro do Recife',
      prazo: '2026-12-31',
      pontuacao: 500,
      empresa: null,
      valorInvestimento: 'Aguardando patrocinador',
      etapas: [
        { id: 'e1', titulo: 'Planejamento comunitário', concluida: true },
        { id: 'e2', titulo: 'Validação técnica municipal', concluida: true },
        { id: 'e3', titulo: 'Captação de apoio empresarial / ESG', concluida: false },
        { id: 'e4', titulo: 'Execução de obras e serviços', concluida: false },
        { id: 'e5', titulo: 'Inauguração e entrega', concluida: false }
      ]
    };
    setProjetos((prev) => [nuevoProj, ...prev]);
    return nuevoProj;
  };

  const toggleEtapaProjeto = (projetoId, etapaId) => {
    setProjetos((prev) =>
      prev.map((proj) => {
        if (proj.id !== projetoId) return proj;
        const newEtapas = proj.etapas.map((et) =>
          et.id === etapaId ? { ...et, concluida: !et.concluida } : et
        );
        const allDone = newEtapas.every((et) => et.concluida);
        return {
          ...proj,
          etapas: newEtapas,
          status: allDone ? 'concluido' : 'execucao'
        };
      })
    );
  };

  const patrocinarProjeto = (projetoId, nomeEmpresa, valor) => {
    setProjetos((prev) =>
      prev.map((proj) =>
        proj.id === projetoId
          ? {
              ...proj,
              empresa: nomeEmpresa,
              valorInvestimento: valor || proj.valorInvestimento,
              status: proj.status === 'aprovado' ? 'execucao' : proj.status
            }
          : proj
      )
    );
  };

  const avaliarProjetoConcluido = (projetoId) => {
    addPoints(20); // +20 points for evaluating completed project
  };

  return (
    <DataContext.Provider
      value={{
        problemas,
        projetos,
        ranking,
        recompensas: RECOMPENSAS_RANKING,
        addProblema,
        validarProblema,
        createProjeto,
        toggleEtapaProjeto,
        patrocinarProjeto,
        avaliarProjetoConcluido,
        addPoints
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData deve ser usado dentro de um DataProvider');
  }
  return context;
}
