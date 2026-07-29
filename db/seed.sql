-- Hash placeholder for 'demo123'
-- $argon2id$v=19$m=65536,t=3,p=4$qN4h0t7d0LzH5e2O5X6Jcw$D2h4i7G2y5x7L1s0z0L4j9f2c5h8j1x6l9k3m5v0s7w

INSERT INTO users (id, name, email, password_hash, role, points, level, avatar_url, neighborhood) VALUES
(gen_random_uuid(), 'João Silva', 'joao@example.com', '$argon2id$v=19$m=65536,t=3,p=4$qN4h0t7d0LzH5e2O5X6Jcw$D2h4i7G2y5x7L1s0z0L4j9f2c5h8j1x6l9k3m5v0s7w', 'morador', 450, 3, 'https://i.pravatar.cc/150?u=joao', 'Centro'),
(gen_random_uuid(), 'Elena Santos', 'elena@example.com', '$argon2id$v=19$m=65536,t=3,p=4$qN4h0t7d0LzH5e2O5X6Jcw$D2h4i7G2y5x7L1s0z0L4j9f2c5h8j1x6l9k3m5v0s7w', 'lider', 1200, 4, 'https://i.pravatar.cc/150?u=elena', 'Bela Vista'),
(gen_random_uuid(), 'Admin Prefeitura', 'admin@prefeitura.gov.br', '$argon2id$v=19$m=65536,t=3,p=4$qN4h0t7d0LzH5e2O5X6Jcw$D2h4i7G2y5x7L1s0z0L4j9f2c5h8j1x6l9k3m5v0s7w', 'prefeitura', 0, 1, 'https://i.pravatar.cc/150?u=admin', 'Prefeitura'),
(gen_random_uuid(), 'Acme Corp', 'contato@acmecorp.com', '$argon2id$v=19$m=65536,t=3,p=4$qN4h0t7d0LzH5e2O5X6Jcw$D2h4i7G2y5x7L1s0z0L4j9f2c5h8j1x6l9k3m5v0s7w', 'empresa', 0, 1, 'https://i.pravatar.cc/150?u=acme', 'Distrito Industrial');

INSERT INTO rewards (id, name, description, points_cost, available) VALUES
(gen_random_uuid(), 'Passe Único Integração', 'Um passe grátis para transporte público.', 150, true),
(gen_random_uuid(), 'Apadrinhe uma Árvore', 'Certificado de adoção de uma árvore plantada.', 300, true),
(gen_random_uuid(), 'Plantio de Árvore', 'Você escolhe um local (aprovado) para plantio.', 500, true),
(gen_random_uuid(), '5% Desconto IPTU', 'Desconto no imposto predial e territorial urbano.', 1000, true),
(gen_random_uuid(), 'Kit Sustentável', 'Ecobag e copo reutilizável.', 200, true),
(gen_random_uuid(), 'Ingresso Evento Cultural', 'Ingresso para o próximo evento patrocinado pela prefeitura.', 400, true);

INSERT INTO alerts (id, title, message, target_role, priority) VALUES
(gen_random_uuid(), 'Alerta de Tempestade', 'Previsão de fortes chuvas para esta noite. Evite áreas de risco.', null, 'urgente'),
(gen_random_uuid(), 'Atualização no app', 'Nova versão disponível com melhorias de performance.', null, 'baixa'),
(gen_random_uuid(), 'Reunião de Líderes', 'Reunião do conselho comunitário na próxima terça-feira.', 'lider', 'normal'),
(gen_random_uuid(), 'Novo Projeto', 'A prefeitura lançou um novo projeto de revitalização do parque.', null, 'normal'),
(gen_random_uuid(), 'Parceria Corporativa', 'Nova oportunidade de patrocínio para projetos locais.', 'empresa', 'normal');

-- Create a project and phases
WITH new_project AS (
  INSERT INTO projects (title, description, status, created_by) 
  VALUES ('Revitalização da Praça Central', 'Melhorias na iluminação, novos bancos e parquinho.', 'em_andamento', (SELECT id FROM users WHERE role = 'prefeitura' LIMIT 1))
  RETURNING id
)
INSERT INTO project_phases (project_id, title, description, status)
SELECT id, 'Fase 1: Iluminação', 'Instalação de novas luminárias de LED', 'concluido' FROM new_project
UNION ALL
SELECT id, 'Fase 2: Paisagismo', 'Plantio de novas flores e grama', 'em_andamento' FROM new_project;

WITH new_project2 AS (
  INSERT INTO projects (title, description, status, created_by) 
  VALUES ('Ciclovia Avenida Norte', 'Implementação de ciclovia em toda a extensão da avenida.', 'planejamento', (SELECT id FROM users WHERE role = 'prefeitura' LIMIT 1))
  RETURNING id
)
INSERT INTO project_phases (project_id, title, description, status)
SELECT id, 'Fase Única: Construção', 'Pintura e sinalização da via', 'pendente' FROM new_project2;

-- Create a poll and options
WITH new_poll AS (
  INSERT INTO polls (title, description, is_active)
  VALUES ('Qual deve ser o próximo evento comunitário?', 'Vote no evento que você gostaria de ver na sua vizinhança.', true)
  RETURNING id
)
INSERT INTO poll_options (poll_id, title, votes_count)
SELECT id, 'Feira de Trocas', 12 FROM new_poll
UNION ALL
SELECT id, 'Mutirão de Limpeza', 8 FROM new_poll;

-- Create some reports
INSERT INTO reports (user_id, category, description, status, latitude, longitude, address)
VALUES
((SELECT id FROM users WHERE email = 'joao@example.com'), 'Iluminação', 'Poste apagado na rua principal.', 'em_analise', -23.550520, -46.633308, 'Rua Principal, 123'),
((SELECT id FROM users WHERE email = 'joao@example.com'), 'Buraco', 'Buraco grande causando transtornos.', 'em_execucao', -23.551000, -46.634000, 'Avenida Central, 456'),
((SELECT id FROM users WHERE email = 'elena@example.com'), 'Lixo', 'Entulho descartado irregularmente.', 'resolvido', -23.552000, -46.635000, 'Rua das Flores, 789');

INSERT INTO feed_posts (user_id, content)
VALUES
((SELECT id FROM users WHERE email = 'joao@example.com'), 'Hoje reportei um problema na minha rua. Espero que resolvam logo!'),
((SELECT id FROM users WHERE email = 'admin@prefeitura.gov.br'), 'A nova praça será inaugurada na próxima semana. Todos estão convidados!');
