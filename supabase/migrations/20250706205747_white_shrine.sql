/*
  # Criação das tabelas do portfólio

  1. Novas Tabelas
    - `projects` - Projetos do portfólio
    - `certificates` - Certificados e cursos
    - `skills` - Habilidades técnicas e soft skills
    - `courses` - Cursos em andamento
    - `achievements` - Conquistas e reconhecimentos
    - `personal_info` - Informações pessoais
    - `feedbacks` - Feedbacks dos visitantes

  2. Segurança
    - Habilitar RLS em todas as tabelas
    - Políticas para admin e leitura pública
*/

-- Tabela de projetos
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  company text NOT NULL,
  type text NOT NULL,
  technologies text[] DEFAULT '{}',
  description text NOT NULL,
  image text NOT NULL,
  details text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tabela de certificados
CREATE TABLE IF NOT EXISTS certificates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  issuer text NOT NULL,
  date text NOT NULL,
  image text NOT NULL,
  category text NOT NULL,
  description text,
  skills text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tabela de habilidades
CREATE TABLE IF NOT EXISTS skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  level integer NOT NULL CHECK (level >= 0 AND level <= 100),
  icon text NOT NULL,
  category text NOT NULL CHECK (category IN ('technical', 'documentation', 'soft')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tabela de cursos
CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  institution text NOT NULL,
  progress integer NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  status text NOT NULL CHECK (status IN ('completed', 'in-progress', 'paused')),
  category text NOT NULL,
  start_date text NOT NULL,
  expected_end text,
  completed_date text,
  description text,
  skills text[] DEFAULT '{}',
  color text DEFAULT 'from-blue-500 to-blue-600',
  logo text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tabela de conquistas
CREATE TABLE IF NOT EXISTS achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  organization text NOT NULL,
  date text NOT NULL,
  description text NOT NULL,
  type text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tabela de informações pessoais
CREATE TABLE IF NOT EXISTS personal_info (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  location text NOT NULL,
  profile_image text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tabela de feedbacks
CREATE TABLE IF NOT EXISTS feedbacks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  feedback_text text,
  category text,
  ip_address text,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

-- Habilitar RLS em todas as tabelas
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE personal_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedbacks ENABLE ROW LEVEL SECURITY;

-- Políticas para leitura pública (todos podem ler)
CREATE POLICY "Permitir leitura pública de projetos"
  ON projects FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Permitir leitura pública de certificados"
  ON certificates FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Permitir leitura pública de habilidades"
  ON skills FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Permitir leitura pública de cursos"
  ON courses FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Permitir leitura pública de conquistas"
  ON achievements FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Permitir leitura pública de informações pessoais"
  ON personal_info FOR SELECT
  TO anon, authenticated
  USING (true);

-- Políticas para admin (apenas usuários autenticados podem modificar)
CREATE POLICY "Admin pode gerenciar projetos"
  ON projects FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin pode gerenciar certificados"
  ON certificates FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin pode gerenciar habilidades"
  ON skills FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin pode gerenciar cursos"
  ON courses FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin pode gerenciar conquistas"
  ON achievements FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin pode gerenciar informações pessoais"
  ON personal_info FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Política especial para feedbacks (qualquer um pode inserir, apenas admin pode ler)
CREATE POLICY "Qualquer um pode enviar feedback"
  ON feedbacks FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admin pode ler feedbacks"
  ON feedbacks FOR SELECT
  TO authenticated
  USING (true);

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para atualizar updated_at
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_certificates_updated_at BEFORE UPDATE ON certificates
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_skills_updated_at BEFORE UPDATE ON skills
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON courses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_achievements_updated_at BEFORE UPDATE ON achievements
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_personal_info_updated_at BEFORE UPDATE ON personal_info
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();