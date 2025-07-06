import { useState, useEffect } from 'react';
import { useSupabaseData } from './useSupabaseData';
import type { Database } from '../lib/supabase';

type Tables = Database['public']['Tables'];

export interface PortfolioData {
  projects: Tables['projects']['Row'][];
  certificates: Tables['certificates']['Row'][];
  skills: Tables['skills']['Row'][];
  courses: Tables['courses']['Row'][];
  achievements: Tables['achievements']['Row'][];
  personalInfo: Tables['personal_info']['Row'] | null;
  feedbacks?: Tables['feedbacks']['Row'][];
}

export const usePortfolioData = () => {
  const { data: supabaseData, loading, error, refresh } = useSupabaseData();
  const [saving, setSaving] = useState(false);

  // Converter dados do Supabase para o formato esperado pelo portfólio
  const data: PortfolioData = {
    projects: supabaseData.projects,
    certificates: supabaseData.certificates,
    skills: supabaseData.skills,
    courses: supabaseData.courses,
    achievements: supabaseData.achievements,
    personalInfo: supabaseData.personalInfo,
    feedbacks: supabaseData.feedbacks
  };

  const saveData = async (newData?: PortfolioData) => {
    setSaving(true);
    try {
      // Em um ambiente real, você salvaria os dados no Supabase aqui
      // Por enquanto, apenas simular o salvamento
      await new Promise(resolve => setTimeout(resolve, 1000));
      return true;
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
      return false;
    } finally {
      setSaving(false);
    }
  };

  const updateData = async (updates: Partial<PortfolioData>) => {
    // Implementar lógica de atualização específica se necessário
    return await saveData();
  };

  const addItem = async (section: keyof PortfolioData, item: any) => {
    // Implementar lógica de adição específica se necessário
    return await saveData();
  };

  const updateItem = async (section: keyof PortfolioData, itemId: string, updatedItem: any) => {
    // Implementar lógica de atualização específica se necessário
    return await saveData();
  };

  const deleteItem = async (section: keyof PortfolioData, itemId: string) => {
    // Implementar lógica de exclusão específica se necessário
    return await saveData();
  };

  const loadData = async () => {
    await refresh();
  };

  return {
    data,
    loading,
    saving,
    error,
    saveData,
    updateData,
    addItem,
    updateItem,
    deleteItem,
    loadData
  };
};