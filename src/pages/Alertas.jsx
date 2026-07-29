import React, { useState } from 'react';
import Header from '../components/Header';

export default function Alertas() {
  const [filter, setFilter] = useState('Todos');

  const alerts = [
    {
      id: 1,
      category: 'Bairro',
      type: 'URGENTE',
      title: 'Interdição na Rua das Flores',
      desc: 'Devido a obras emergenciais na rede de esgoto, a Rua das Flores estará interditada nos próximos 2 dias. Evite a região.',
      time: 'Há 10 min',
      border: '4px solid var(--error)'
    },
    {
      id: 2,
      category: 'Relatos',
      type: 'ATUALIZAÇÃO DE RELATO',
      title: 'Buraco na calçada consertado',
      desc: 'O seu relato sobre o buraco na Av. Central foi marcado como resolvido pela prefeitura. Obrigado por contribuir!',
      time: '2h atrás',
      border: '4px solid var(--secondary)'
    },
    {
      id: 3,
      category: 'Voluntariado',
      type: 'CONVITE',
      title: 'Mutirão de Limpeza do Parque',
      desc: 'Junte-se a nós neste sábado para revitalizar o Parque das Águas. Precisamos de mãos extras para plantio de mudas.',
      time: 'Ontem',
      border: '4px solid var(--primary)'
    },
    {
      id: 4,
      category: 'Relatos',
      type: 'ATUALIZAÇÃO DE RELATO',
      title: 'Iluminação na Rua da Moeda aprovada',
      desc: 'O projeto técnico de instalação de LED na Rua da Moeda foi aprovado e entrará em execução.',
      time: 'Há 1 dia',
      border: '4px solid var(--secondary)'
    }
  ];

  const filteredAlerts = alerts.filter((item) => {
    if (filter === 'Todos') return true;
    return item.category.toLowerCase() === filter.toLowerCase();
  });

  return (
    <div className="page" style={{ maxWidth: '480px', margin: '0 auto' }}>
      <Header showPoints={false} />

      <main className="page-content" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--on-surface)' }}>Alertas e Notificações</h1>
          <p style={{ fontSize: '13px', color: 'var(--outline)', marginTop: '2px' }}>Mantenha-se atualizado sobre sua comunidade.</p>
        </div>

        {/* Filter chips */}
        <div className="scroll-h">
          {['Todos', 'Relatos', 'Voluntariado', 'Bairro'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`chip ${filter === f ? 'chip-active' : ''}`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Alerts list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filteredAlerts.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '20px', fontSize: '13px', color: 'var(--outline)' }}>
              Nenhum alerta encontrado na categoria "{filter}".
            </div>
          ) : (
            filteredAlerts.map((item) => (
              <div key={item.id} className="card" style={{ borderLeft: item.border, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--outline)' }}>
                    {item.type}
                  </span>
                  <span style={{ fontSize: '10px', color: 'var(--outline)' }}>{item.time}</span>
                </div>
                <h3 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--on-surface)' }}>{item.title}</h3>
                <p style={{ fontSize: '12px', color: 'var(--outline)', lineHeight: '1.5' }}>{item.desc}</p>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
