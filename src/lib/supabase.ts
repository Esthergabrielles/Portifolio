import { supabase } from './supabaseClient';

export class SupabaseService {
  // 📄 Personal Info
  static async getPersonalInfo() {
    const { data, error } = await supabase
      .from('personal_info')
      .select('*')
      .single();

    if (error) throw error;
    return data;
  }

  static async updatePersonalInfo(dataToUpdate: any) {
    const { error } = await supabase
      .from('personal_info')
      .update(dataToUpdate)
      .eq('id', dataToUpdate.id);

    if (error) throw error;
  }

  static async uploadProfilePicture(file: File, userId: string) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}-${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase
      .storage
      .from('profile_pictures')
      .upload(fileName, file, { upsert: true });

    if (uploadError) throw uploadError;

    const { data: publicUrlData } = supabase
      .storage
      .from('profile_pictures')
      .getPublicUrl(fileName);

    if (!publicUrlData?.publicUrl) {
      throw new Error('Não foi possível obter a URL pública da imagem.');
    }

    return publicUrlData.publicUrl;
  }

  static async updateProfilePictureUrl(userId: string, url: string) {
    const { error } = await supabase
      .from('personal_info')
      .update({ photo_url: url })
      .eq('user_id', userId);

    if (error) throw error;
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
    return data;
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
    return data;
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
    return data;
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
    return data;
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
    return data;
  }

  // 📄 Feedbacks
  static async getFeedbacks() {
    const { data, error } = await supabase
      .from('feedbacks')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  }
}
