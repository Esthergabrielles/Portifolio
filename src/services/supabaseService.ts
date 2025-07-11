import { supabase } from '../lib/supabaseClient';

export class SupabaseService {
  // 📄 Personal Info
  static async getPersonalInfo() {
    const { data, error } = await supabase
      .from('personal_info')
      .select('*')
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  static async updatePersonalInfo(dataToUpdate: any) {
    // Primeiro, verificar se já existe um registro
    const { data: existing } = await supabase
      .from('personal_info')
      .select('id')
      .single();

    if (existing) {
      // Atualizar registro existente
      const { error } = await supabase
        .from('personal_info')
        .update(dataToUpdate)
        .eq('id', existing.id);
      
      if (error) throw error;
    } else {
      // Criar novo registro
      const { error } = await supabase
        .from('personal_info')
        .insert(dataToUpdate);
      
      if (error) throw error;
    }
  }

  static async uploadImage(file: File, bucket: string = 'images'): Promise<string> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

    // Upload do arquivo
    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, { 
        upsert: true,
        cacheControl: '3600'
      });

    if (uploadError) {
      console.error('Error uploading file:', uploadError);
      throw new Error(`Failed to upload image: ${uploadError.message}`);
    }

    // Obter URL pública
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

    return data.publicUrl;
  }

  // 📄 Projects
  static async createProject(data: any) {
    const { error } = await supabase.from('projects').insert(data);
    if (error) throw error;
  }

  static async updateProject(id: string, data: any) {
    const { error } = await supabase
      .from('projects')
      .update(data)
      .eq('id', id);
    if (error) throw error;
  }

  static async deleteProject(id: string) {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);
    if (error) throw error;
  }

  static async getProjects() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  }

  // 📄 Certificates
  static async createCertificate(data: any) {
    const { error } = await supabase.from('certificates').insert(data);
    if (error) throw error;
  }

  static async updateCertificate(id: string, data: any) {
    const { error } = await supabase
      .from('certificates')
      .update(data)
      .eq('id', id);
    if (error) throw error;
  }

  static async deleteCertificate(id: string) {
    const { error } = await supabase
      .from('certificates')
      .delete()
      .eq('id', id);
    if (error) throw error;
  }

  static async getCertificates() {
    const { data, error } = await supabase
      .from('certificates')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  }

  // 📄 Skills
  static async createSkill(data: any) {
    const { error } = await supabase.from('skills').insert(data);
    if (error) throw error;
  }

  static async updateSkill(id: string, data: any) {
    const { error } = await supabase
      .from('skills')
      .update(data)
      .eq('id', id);
    if (error) throw error;
  }

  static async deleteSkill(id: string) {
    const { error } = await supabase
      .from('skills')
      .delete()
      .eq('id', id);
    if (error) throw error;
  }

  static async getSkills() {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  }

  // 📄 Courses
  static async createCourse(data: any) {
    const { error } = await supabase.from('courses').insert(data);
    if (error) throw error;
  }

  static async updateCourse(id: string, data: any) {
    const { error } = await supabase
      .from('courses')
      .update(data)
      .eq('id', id);
    if (error) throw error;
  }

  static async deleteCourse(id: string) {
    const { error } = await supabase
      .from('courses')
      .delete()
      .eq('id', id);
    if (error) throw error;
  }

  static async getCourses() {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  }

  // 📄 Achievements
  static async createAchievement(data: any) {
    const { error } = await supabase.from('achievements').insert(data);
    if (error) throw error;
  }

  static async updateAchievement(id: string, data: any) {
    const { error } = await supabase
      .from('achievements')
      .update(data)
      .eq('id', id);
    if (error) throw error;
  }

  static async deleteAchievement(id: string) {
    const { error } = await supabase
      .from('achievements')
      .delete()
      .eq('id', id);
    if (error) throw error;
  }

  static async getAchievements() {
    const { data, error } = await supabase
      .from('achievements')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  }

  // 📄 Feedbacks
  static async getFeedbacks() {
    const { data, error } = await supabase
      .from('feedbacks')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  }

  static async createFeedback(data: { rating: number; feedback_text?: string; category?: string; ip_address?: string; user_agent?: string }) {
    const { error } = await supabase.from('feedbacks').insert(data);
    if (error) throw error;
  }
}