import { mockProjects, mockCertificates, mockSkills, mockCourses, mockAchievements, mockPersonalInfo } from '../data/mockData';
import type { Database } from '../lib/supabase';

type Tables = Database['public']['Tables'];

// Serviço mock que simula o Supabase com dados locais
export class MockSupabaseService {
  // Projetos
  static async getProjects() {
    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockProjects;
  }

  static async createProject(project: Tables['projects']['Insert']) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const newProject = {
      ...project,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    mockProjects.push(newProject as any);
    return newProject;
  }

  static async updateProject(id: string, updates: Tables['projects']['Update']) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = mockProjects.findIndex(p => p.id === id);
    if (index !== -1) {
      mockProjects[index] = { ...mockProjects[index], ...updates };
      return mockProjects[index];
    }
    throw new Error('Projeto não encontrado');
  }

  static async deleteProject(id: string) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = mockProjects.findIndex(p => p.id === id);
    if (index !== -1) {
      mockProjects.splice(index, 1);
    }
  }

  // Certificados
  static async getCertificates() {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockCertificates;
  }

  static async createCertificate(certificate: Tables['certificates']['Insert']) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const newCertificate = {
      ...certificate,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    mockCertificates.push(newCertificate as any);
    return newCertificate;
  }

  static async updateCertificate(id: string, updates: Tables['certificates']['Update']) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = mockCertificates.findIndex(c => c.id === id);
    if (index !== -1) {
      mockCertificates[index] = { ...mockCertificates[index], ...updates };
      return mockCertificates[index];
    }
    throw new Error('Certificado não encontrado');
  }

  static async deleteCertificate(id: string) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = mockCertificates.findIndex(c => c.id === id);
    if (index !== -1) {
      mockCertificates.splice(index, 1);
    }
  }

  // Habilidades
  static async getSkills() {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockSkills;
  }

  static async createSkill(skill: Tables['skills']['Insert']) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const newSkill = {
      ...skill,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    mockSkills.push(newSkill as any);
    return newSkill;
  }

  static async updateSkill(id: string, updates: Tables['skills']['Update']) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = mockSkills.findIndex(s => s.id === id);
    if (index !== -1) {
      mockSkills[index] = { ...mockSkills[index], ...updates };
      return mockSkills[index];
    }
    throw new Error('Habilidade não encontrada');
  }

  static async deleteSkill(id: string) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = mockSkills.findIndex(s => s.id === id);
    if (index !== -1) {
      mockSkills.splice(index, 1);
    }
  }

  // Cursos
  static async getCourses() {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockCourses;
  }

  static async createCourse(course: Tables['courses']['Insert']) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const newCourse = {
      ...course,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    mockCourses.push(newCourse as any);
    return newCourse;
  }

  static async updateCourse(id: string, updates: Tables['courses']['Update']) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = mockCourses.findIndex(c => c.id === id);
    if (index !== -1) {
      mockCourses[index] = { ...mockCourses[index], ...updates };
      return mockCourses[index];
    }
    throw new Error('Curso não encontrado');
  }

  static async deleteCourse(id: string) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = mockCourses.findIndex(c => c.id === id);
    if (index !== -1) {
      mockCourses.splice(index, 1);
    }
  }

  // Conquistas
  static async getAchievements() {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockAchievements;
  }

  static async createAchievement(achievement: Tables['achievements']['Insert']) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const newAchievement = {
      ...achievement,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    mockAchievements.push(newAchievement as any);
    return newAchievement;
  }

  static async updateAchievement(id: string, updates: Tables['achievements']['Update']) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = mockAchievements.findIndex(a => a.id === id);
    if (index !== -1) {
      mockAchievements[index] = { ...mockAchievements[index], ...updates };
      return mockAchievements[index];
    }
    throw new Error('Conquista não encontrada');
  }

  static async deleteAchievement(id: string) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = mockAchievements.findIndex(a => a.id === id);
    if (index !== -1) {
      mockAchievements.splice(index, 1);
    }
  }

  // Informações Pessoais
  static async getPersonalInfo() {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockPersonalInfo;
  }

  static async updatePersonalInfo(info: Tables['personal_info']['Insert']) {
    await new Promise(resolve => setTimeout(resolve, 300));
    Object.assign(mockPersonalInfo, info);
    return mockPersonalInfo;
  }

  // Feedbacks
  static async getFeedbacks() {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [];
  }

  static async createFeedback(feedback: Tables['feedbacks']['Insert']) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const newFeedback = {
      ...feedback,
      id: Date.now().toString(),
      created_at: new Date().toISOString()
    };
    return newFeedback;
  }

  // Autenticação (mock)
  static async signIn(email: string, password: string) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Credenciais de demonstração
    if (email === 'admin@esthergabrielle.dev' && password === 'admin123') {
      return {
        user: {
          id: 'mock-user-id',
          email: email,
          created_at: new Date().toISOString()
        },
        session: {
          access_token: 'mock-token',
          refresh_token: 'mock-refresh-token'
        }
      };
    }
    
    throw new Error('Credenciais inválidas');
  }

  static async signOut() {
    await new Promise(resolve => setTimeout(resolve, 300));
    // Mock sign out
  }

  static async getCurrentUser() {
    // Verificar se há um usuário "logado" no localStorage
    const mockUser = localStorage.getItem('mockUser');
    if (mockUser) {
      return JSON.parse(mockUser);
    }
    return null;
  }

  // Upload de imagens (mock)
  static async uploadImage(file: File, bucket: string = 'portfolio-images'): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simular upload retornando uma URL de exemplo
    return `https://example.com/uploads/${Date.now()}-${file.name}`;
  }
}