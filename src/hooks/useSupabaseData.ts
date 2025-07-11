import { useState, useEffect } from 'react';
import { SupabaseService } from '../services/supabaseService';
import type { Database } from '../lib/supabase';

type Tables = Database['public']['Tables'];

export const useSupabaseData = () => {
  const [data, setData] = useState<{
    projects: Tables['projects']['Row'][];
    certificates: Tables['certificates']['Row'][];
    skills: Tables['skills']['Row'][];
    courses: Tables['courses']['Row'][];
    achievements: Tables['achievements']['Row'][];
    personalInfo: Tables['personal_info']['Row'] | null;
    feedbacks: Tables['feedbacks']['Row'][];
  }>({
    projects: [],
    certificates: [],
    skills: [],
    courses: [],
    achievements: [],
    personalInfo: null,
    feedbacks: []
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadAllData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [
        projects,
        certificates,
        skills,
        courses,
        achievements,
        personalInfo,
        feedbacks
      ] = await Promise.all([
        SupabaseService.getProjects(),
        SupabaseService.getCertificates(),
        SupabaseService.getSkills(),
        SupabaseService.getCourses(),
        SupabaseService.getAchievements(),
        SupabaseService.getPersonalInfo(),
        SupabaseService.getFeedbacks().catch(() => []) // Feedbacks podem falhar se não autenticado
      ]);

      setData({
        projects,
        certificates,
        skills,
        courses,
        achievements,
        personalInfo,
        feedbacks
      });
    } catch (err) {
      console.error('Erro ao carregar dados:', err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  // Função para atualizar dados específicos
  const refreshProjects = async () => {
    try {
      const projects = await SupabaseService.getProjects();
      setData(prev => ({ ...prev, projects }));
    } catch (err) {
      console.error('Erro ao atualizar projetos:', err);
    }
  };

  const refreshCertificates = async () => {
    try {
      const certificates = await SupabaseService.getCertificates();
      setData(prev => ({ ...prev, certificates }));
    } catch (err) {
      console.error('Erro ao atualizar certificados:', err);
    }
  };

  const refreshSkills = async () => {
    try {
      const skills = await SupabaseService.getSkills();
      setData(prev => ({ ...prev, skills }));
    } catch (err) {
      console.error('Erro ao atualizar habilidades:', err);
    }
  };

  const refreshCourses = async () => {
    try {
      const courses = await SupabaseService.getCourses();
      setData(prev => ({ ...prev, courses }));
    } catch (err) {
      console.error('Erro ao atualizar cursos:', err);
    }
  };

  const refreshAchievements = async () => {
    try {
      const achievements = await SupabaseService.getAchievements();
      setData(prev => ({ ...prev, achievements }));
    } catch (err) {
      console.error('Erro ao atualizar conquistas:', err);
    }
  };

  const refreshPersonalInfo = async () => {
    try {
      const personalInfo = await SupabaseService.getPersonalInfo();
      setData(prev => ({ ...prev, personalInfo }));
    } catch (err) {
      console.error('Erro ao atualizar informações pessoais:', err);
    }
  };

  const refreshFeedbacks = async () => {
    try {
      const feedbacks = await SupabaseService.getFeedbacks();
      setData(prev => ({ ...prev, feedbacks }));
    } catch (err) {
      console.error('Erro ao atualizar feedbacks:', err);
    }
  };

  return {
    data,
    loading,
    error,
    refresh: loadAllData,
    refreshProjects,
    refreshCertificates,
    refreshSkills,
    refreshCourses,
    refreshAchievements,
    refreshPersonalInfo,
    refreshFeedbacks
  };
};