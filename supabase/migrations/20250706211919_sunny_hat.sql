/*
  # Popular dados iniciais do portfólio

  1. Dados Iniciais
    - Inserir projetos de exemplo
    - Inserir certificados
    - Inserir habilidades
    - Inserir cursos
    - Inserir conquistas
    - Inserir informações pessoais

  2. Segurança
    - Dados são inseridos apenas se não existirem
*/

-- Inserir informações pessoais (apenas se não existir)
INSERT INTO personal_info (
  name, title, description, email, phone, location, profile_image
) 
SELECT 
  'Esther Gabrielle de Oliveira de Souza',
  'QA Tester Júnior',
  'Especialista em testes de software e automação',
  'esthergabriellesouza@gmail.com',
  '(19) 98926-1419',
  'Santa Bárbara d''Oeste, SP - Brasil',
  'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'
WHERE NOT EXISTS (SELECT 1 FROM personal_info);

-- Inserir projetos de exemplo
INSERT INTO projects (name, company, type, technologies, description, image, details) VALUES
('Projeto de Estudo - E-commerce', 'Projeto Acadêmico', 'Functional Testing', 
 ARRAY['Selenium', 'TestRail', 'Postman'], 
 'Projeto de estudo focado em testes funcionais de uma plataforma e-commerce simulada.',
 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
 'Desenvolvimento de casos de teste para funcionalidades básicas de e-commerce, incluindo cadastro, login e carrinho de compras. Foco no aprendizado de metodologias de teste.'),

('Simulação - App Mobile', 'Projeto de Curso', 'Mobile Testing',
 ARRAY['Appium', 'Android Studio'],
 'Simulação de testes em aplicativo mobile para aprendizado de ferramentas.',
 'https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=800',
 'Projeto prático do curso de QA focado em testes de aplicações mobile, explorando diferentes cenários de uso e validação de interface.'),

('Estudo de API Testing', 'Autoestudo', 'API Testing',
 ARRAY['Postman', 'Newman'],
 'Projeto pessoal para aprender testes de API e integração.',
 'https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=800',
 'Estudo prático de testes de API utilizando Postman, criação de coleções de testes e automação básica com Newman.')
ON CONFLICT DO NOTHING;

-- Inserir certificados
INSERT INTO certificates (name, issuer, date, image, category, description, skills) VALUES
('CURSO SUPERIOR DE TECNOLOGIA EM GESTÃO COMERCIAL', 'Estácio', '2023',
 'https://media.licdn.com/dms/image/v2/D4D2DAQF8bLpce7587w/profile-treasury-document-cover-images_480/B4DZe32cusH4A4-/0/1751136194549?e=1751742000&v=beta&t=flR49sD5OZCLM3DiBEOwQEE9B0foXkOG-8fUyn1t30M',
 'Higher Education', 'Diploma de curso superior em gestão comercial e estratégias de negócios.',
 ARRAY['Gestão Comercial', 'Estratégias de Negócio', 'Liderança', 'Análise de Mercado']),

('MOBILE TESTING', 'Mate Academy', '2024',
 'https://media.licdn.com/dms/image/v2/D4D2DAQE1EOxbdgl4GA/profile-treasury-document-cover-images_480/B4DZe32TmLHkBE-/0/1751136157019?e=1751742000&v=beta&t=v0CQ3LIWz88KE8dszedRB1dKRY3gMGPkETYm-AKoswA',
 'QA', 'Certificação em testes de aplicações móveis, cobrindo metodologias e ferramentas específicas.',
 ARRAY['Mobile Testing', 'Appium', 'Device Testing', 'UI/UX Testing']),

('QA THEORY', 'Mate Academy', '2024',
 'https://media.licdn.com/dms/image/v2/D4D2DAQFEFp5kZciIcg/profile-treasury-document-cover-images_480/B4DZaI5dTgGgA0-/0/1746053486694?e=1751821200&v=beta&t=15pXGhChW8Gq5t83MvXawPohigBSYc_3xrRzFBpchME',
 'QA', 'Teoria fundamental de Quality Assurance e metodologias de teste.',
 ARRAY['Teoria de QA', 'Metodologias de Teste', 'Ciclo de Vida', 'Documentação']),

('JAVASCRIPT BASICS', 'Mate Academy', '2024',
 'https://media.licdn.com/dms/image/v2/D4D2DAQGPAjIOv7EA8g/profile-treasury-document-cover-images_480/B4DZaEc6bxG8A0-/0/1745978895074?e=1751742000&v=beta&t=E35klWdhbZoY2CDRVygG6K7aPrDmWsqyYaXFDhqOXX8',
 'Programming', 'Fundamentos da linguagem JavaScript para iniciantes.',
 ARRAY['JavaScript', 'Variáveis', 'Funções', 'Estruturas de Controle'])
ON CONFLICT DO NOTHING;

-- Inserir habilidades técnicas
INSERT INTO skills (name, level, icon, category) VALUES
('Jira', 90, 'Bot', 'technical'),
('TestRail', 85, 'Search', 'technical'),
('Postman', 80, 'Shield', 'technical'),
('Git / GitHub', 70, 'Globe', 'technical'),
('SQL', 75, 'Search', 'technical'),
('Chrome DevTools', 80, 'Eye', 'technical'),
('HTML / CSS', 70, 'Globe', 'technical'),
('JavaScript', 50, 'Zap', 'technical')
ON CONFLICT DO NOTHING;

-- Inserir habilidades de documentação
INSERT INTO skills (name, level, icon, category) VALUES
('Plano de Teste (Test Plan)', 85, 'FileText', 'documentation'),
('Casos de Teste (Test Cases)', 90, 'Search', 'documentation'),
('Relatório de Defeitos (Bug Report)', 95, 'Zap', 'documentation'),
('Matriz de Rastreabilidade (RTM)', 65, 'Shield', 'documentation'),
('Relatório de Execução de Teste', 80, 'Eye', 'documentation'),
('Procedimento de Teste', 80, 'Globe', 'documentation')
ON CONFLICT DO NOTHING;

-- Inserir soft skills
INSERT INTO skills (name, level, icon, category) VALUES
('Atenção aos Detalhes', 90, 'Eye', 'soft'),
('Comunicação', 85, 'MessageCircle', 'soft'),
('Organização', 88, 'Users', 'soft'),
('Pensamento Analítico', 80, 'Brain', 'soft'),
('Vontade de Aprender', 95, 'Lightbulb', 'soft'),
('Trabalho em Equipe', 85, 'Clock', 'soft')
ON CONFLICT DO NOTHING;

-- Inserir cursos
INSERT INTO courses (name, institution, progress, status, category, start_date, expected_end, description, skills, color, logo) VALUES
('QA Engineer Bootcamp', 'Mate Academy', 93, 'in-progress', 'QA', '2024-01-15', '2024-06-15',
 'Bootcamp intensivo de Quality Assurance cobrindo testes manuais, automação e metodologias ágeis.',
 ARRAY['Manual Testing', 'Test Automation', 'API Testing', 'Mobile Testing'],
 'from-blue-500 to-blue-600', 'https://mate.academy/static/images/logo.svg'),

('FullStack Python', 'Mate Academy', 45, 'in-progress', 'Programming', '2024-03-01', '2024-12-01',
 'Curso completo de desenvolvimento Python para web.',
 ARRAY['Python', 'Django', 'PostgreSQL', 'REST APIs'],
 'from-green-500 to-green-600', 'https://mate.academy/static/images/logo.svg')
ON CONFLICT DO NOTHING;

-- Inserir conquistas
INSERT INTO achievements (title, organization, date, description, type) VALUES
('Funcionária Destaque', 'Destra Gestão de Terceiros', '2024',
 'Reconhecida como Funcionária Destaque em Novembro/2024 por excelência em auditorias documentais.',
 'recognition'),

('Progresso Excepcional em QA', 'Mate Academy', '2024',
 'Alcançou 93% de progresso no Bootcamp QA Engineer, demonstrando dedicação e aprendizado acelerado.',
 'academic'),

('Melhoria de Processos', 'Destra Gestão de Terceiros', '2023-2024',
 'Implementou melhorias em PGR x PCMSO, reduzindo significativamente não conformidades.',
 'professional')
ON CONFLICT DO NOTHING;