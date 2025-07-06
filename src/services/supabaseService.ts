import { supabase } from '../lib/supabase';
import type { Database } from '../lib/supabase';

type Tables = Database['public']['Tables'];

export class SupabaseService {
  // Projetos
  static async getProjects() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }

  static async createProject(project: Tables['projects']['Insert']) {
    const { data, error } = await supabase
      .from('projects')
      .insert(project)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async updateProject(id: string, updates: Tables['projects']['Update']) {
    const { data, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async deleteProject(id: string) {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }

  // Certificados
  static async getCertificates() {
    const { data, error } = await supabase
      .from('certificates')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }

  static async createCertificate(certificate: Tables['certificates']['Insert']) {
    const { data, error } = await supabase
      .from('certificates')
      .insert(certificate)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async updateCertificate(id: string, updates: Tables['certificates']['Update']) {
    const { data, error } = await supabase
      .from('certificates')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async deleteCertificate(id: string) {
    const { error } = await supabase
      .from('certificates')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }

  // Habilidades
  static async getSkills() {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('category', { ascending: true });
    
    if (error) throw error;
    return data;
  }

  static async createSkill(skill: Tables['skills']['Insert']) {
    const { data, error } = await supabase
      .from('skills')
      .insert(skill)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async updateSkill(id: string, updates: Tables['skills']['Update']) {
    const { data, error } = await supabase
      .from('skills')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async deleteSkill(id: string) {
    const { error } = await supabase
      .from('skills')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }

  // Cursos
  static async getCourses() {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }

  static async createCourse(course: Tables['courses']['Insert']) {
    const { data, error } = await supabase
      .from('courses')
      .insert(course)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async updateCourse(id: string, updates: Tables['courses']['Update']) {
    const { data, error } = await supabase
      .from('courses')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async deleteCourse(id: string) {
    const { error } = await supabase
      .from('courses')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }

  // Conquistas
  static async getAchievements() {
    const { data, error } = await supabase
      .from('achievements')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }

  static async createAchievement(achievement: Tables['achievements']['Insert']) {
    const { data, error } = await supabase
      .from('achievements')
      .insert(achievement)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async updateAchievement(id: string, updates: Tables['achievements']['Update']) {
    const { data, error } = await supabase
      .from('achievements')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async deleteAchievement(id: string) {
    const { error } = await supabase
      .from('achievements')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }

  // Informações Pessoais
  static async getPersonalInfo() {
    const { data, error } = await supabase
      .from('personal_info')
      .select('*')
      .limit(1)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  static async updatePersonalInfo(info: Tables['personal_info']['Insert']) {
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
  }

  // Feedbacks
  static async getFeedbacks() {
    const { data, error } = await supabase
      .from('feedbacks')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }

  static async createFeedback(feedback: Tables['feedbacks']['Insert']) {
    const { data, error } = await supabase
      .from('feedbacks')
      .insert(feedback)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  // Autenticação
  static async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    return data;
  }

  static async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }

  static async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  }

  // Upload de imagens
  static async uploadImage(file: File, bucket: string = 'portfolio-images'): Promise<string> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file);
    
    if (error) throw error;
    
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);
    
    return publicUrl;
  }
}