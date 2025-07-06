import { supabase } from '../lib/supabase';
import type { Database } from '../lib/supabase';

type Tables = Database['public']['Tables'];

export class SupabaseService {
  // Método para testar conexão
  static async testConnection() {
    try {
      const { data, error } = await supabase.from('projects').select('count').limit(1);
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Erro na conexão:', error);
      throw error;
    }
  }

  // Projetos
  static async getProjects() {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Erro ao buscar projetos:', error);
        throw error;
      }
      
      console.log('Projetos carregados:', data?.length || 0);
      return data || [];
    } catch (error) {
      console.error('Erro no getProjects:', error);
      throw error;
    }
  }

  static async createProject(project: Tables['projects']['Insert']) {
    try {
      console.log('Criando projeto:', project);
      
      const { data, error } = await supabase
        .from('projects')
        .insert(project)
        .select()
        .single();
      
      if (error) {
        console.error('Erro ao criar projeto:', error);
        throw error;
      }
      
      console.log('Projeto criado:', data);
      return data;
    } catch (error) {
      console.error('Erro no createProject:', error);
      throw error;
    }
  }

  static async updateProject(id: string, updates: Tables['projects']['Update']) {
    try {
      console.log('Atualizando projeto:', id, updates);
      
      const { data, error } = await supabase
        .from('projects')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        console.error('Erro ao atualizar projeto:', error);
        throw error;
      }
      
      console.log('Projeto atualizado:', data);
      return data;
    } catch (error) {
      console.error('Erro no updateProject:', error);
      throw error;
    }
  }

  static async deleteProject(id: string) {
    try {
      console.log('Deletando projeto:', id);
      
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error('Erro ao deletar projeto:', error);
        throw error;
      }
      
      console.log('Projeto deletado:', id);
    } catch (error) {
      console.error('Erro no deleteProject:', error);
      throw error;
    }
  }

  // Certificados
  static async getCertificates() {
    try {
      const { data, error } = await supabase
        .from('certificates')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Erro ao buscar certificados:', error);
        throw error;
      }
      
      console.log('Certificados carregados:', data?.length || 0);
      return data || [];
    } catch (error) {
      console.error('Erro no getCertificates:', error);
      throw error;
    }
  }

  static async createCertificate(certificate: Tables['certificates']['Insert']) {
    try {
      const { data, error } = await supabase
        .from('certificates')
        .insert(certificate)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erro no createCertificate:', error);
      throw error;
    }
  }

  static async updateCertificate(id: string, updates: Tables['certificates']['Update']) {
    try {
      const { data, error } = await supabase
        .from('certificates')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erro no updateCertificate:', error);
      throw error;
    }
  }

  static async deleteCertificate(id: string) {
    try {
      const { error } = await supabase
        .from('certificates')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    } catch (error) {
      console.error('Erro no deleteCertificate:', error);
      throw error;
    }
  }

  // Habilidades
  static async getSkills() {
    try {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('category', { ascending: true });
      
      if (error) {
        console.error('Erro ao buscar habilidades:', error);
        throw error;
      }
      
      console.log('Habilidades carregadas:', data?.length || 0);
      return data || [];
    } catch (error) {
      console.error('Erro no getSkills:', error);
      throw error;
    }
  }

  static async createSkill(skill: Tables['skills']['Insert']) {
    try {
      const { data, error } = await supabase
        .from('skills')
        .insert(skill)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erro no createSkill:', error);
      throw error;
    }
  }

  static async updateSkill(id: string, updates: Tables['skills']['Update']) {
    try {
      const { data, error } = await supabase
        .from('skills')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erro no updateSkill:', error);
      throw error;
    }
  }

  static async deleteSkill(id: string) {
    try {
      const { error } = await supabase
        .from('skills')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    } catch (error) {
      console.error('Erro no deleteSkill:', error);
      throw error;
    }
  }

  // Cursos
  static async getCourses() {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Erro ao buscar cursos:', error);
        throw error;
      }
      
      console.log('Cursos carregados:', data?.length || 0);
      return data || [];
    } catch (error) {
      console.error('Erro no getCourses:', error);
      throw error;
    }
  }

  static async createCourse(course: Tables['courses']['Insert']) {
    try {
      const { data, error } = await supabase
        .from('courses')
        .insert(course)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erro no createCourse:', error);
      throw error;
    }
  }

  static async updateCourse(id: string, updates: Tables['courses']['Update']) {
    try {
      const { data, error } = await supabase
        .from('courses')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erro no updateCourse:', error);
      throw error;
    }
  }

  static async deleteCourse(id: string) {
    try {
      const { error } = await supabase
        .from('courses')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    } catch (error) {
      console.error('Erro no deleteCourse:', error);
      throw error;
    }
  }

  // Conquistas
  static async getAchievements() {
    try {
      const { data, error } = await supabase
        .from('achievements')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Erro ao buscar conquistas:', error);
        throw error;
      }
      
      console.log('Conquistas carregadas:', data?.length || 0);
      return data || [];
    } catch (error) {
      console.error('Erro no getAchievements:', error);
      throw error;
    }
  }

  static async createAchievement(achievement: Tables['achievements']['Insert']) {
    try {
      const { data, error } = await supabase
        .from('achievements')
        .insert(achievement)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erro no createAchievement:', error);
      throw error;
    }
  }

  static async updateAchievement(id: string, updates: Tables['achievements']['Update']) {
    try {
      const { data, error } = await supabase
        .from('achievements')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erro no updateAchievement:', error);
      throw error;
    }
  }

  static async deleteAchievement(id: string) {
    try {
      const { error } = await supabase
        .from('achievements')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    } catch (error) {
      console.error('Erro no deleteAchievement:', error);
      throw error;
    }
  }

  // Informações Pessoais
  static async getPersonalInfo() {
    try {
      const { data, error } = await supabase
        .from('personal_info')
        .select('*')
        .limit(1)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        console.error('Erro ao buscar informações pessoais:', error);
        throw error;
      }
      
      console.log('Informações pessoais carregadas:', data ? 'Sim' : 'Não');
      return data;
    } catch (error) {
      console.error('Erro no getPersonalInfo:', error);
      throw error;
    }
  }

  static async updatePersonalInfo(info: Tables['personal_info']['Insert']) {
    try {
      // Primeiro, verificar se já existe um registro
      const existing = await this.getPersonalInfo();
      
      if (existing) {
        const { data, error } = await supabase
          .from('personal_info')
          .update(info)
          .eq('id', existing.id)
          .select()
          .single();
        
        if (error) throw error;
        return data;
      } else {
        const { data, error } = await supabase
          .from('personal_info')
          .insert(info)
          .select()
          .single();
        
        if (error) throw error;
        return data;
      }
    } catch (error) {
      console.error('Erro no updatePersonalInfo:', error);
      throw error;
    }
  }

  // Feedbacks
  static async getFeedbacks() {
    try {
      const { data, error } = await supabase
        .from('feedbacks')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Erro ao buscar feedbacks:', error);
        throw error;
      }
      
      console.log('Feedbacks carregados:', data?.length || 0);
      return data || [];
    } catch (error) {
      console.error('Erro no getFeedbacks:', error);
      throw error;
    }
  }

  static async createFeedback(feedback: Tables['feedbacks']['Insert']) {
    try {
      const { data, error } = await supabase
        .from('feedbacks')
        .insert(feedback)
        .select()
        .single();
      
      if (error) {
        console.error('Erro ao criar feedback:', error);
        throw error;
      }
      
      console.log('Feedback criado:', data);
      return data;
    } catch (error) {
      console.error('Erro no createFeedback:', error);
      throw error;
    }
  }

  // Autenticação
  static async signIn(email: string, password: string) {
    try {
      console.log('Tentando fazer login com:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error('Erro no login:', error);
        throw error;
      }
      
      console.log('Login realizado com sucesso:', data.user?.email);
      return data;
    } catch (error) {
      console.error('Erro no signIn:', error);
      throw error;
    }
  }

  static async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Erro no logout:', error);
        throw error;
      }
      console.log('Logout realizado com sucesso');
    } catch (error) {
      console.error('Erro no signOut:', error);
      throw error;
    }
  }

  static async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Erro ao buscar usuário atual:', error);
        throw error;
      }
      return user;
    } catch (error) {
      console.error('Erro no getCurrentUser:', error);
      return null;
    }
  }

  // Upload de imagens
  static async uploadImage(file: File, bucket: string = 'portfolio-images'): Promise<string> {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(fileName, file);
      
      if (error) {
        console.error('Erro no upload:', error);
        throw error;
      }
      
      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(fileName);
      
      console.log('Imagem enviada:', publicUrl);
      return publicUrl;
    } catch (error) {
      console.error('Erro no uploadImage:', error);
      throw error;
    }
  }
}