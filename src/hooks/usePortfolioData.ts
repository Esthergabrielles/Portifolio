import { useState, useEffect } from 'react';
import { useSupabaseData } from './useSupabaseData';
import { SupabaseService } from '../services/supabaseService';
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

  // Função para criar item
  const createItem = async (type: keyof PortfolioData, itemData: any) => {
    setSaving(true);
    try {
      switch (type) {
        case 'projects':
          await SupabaseService.createProject(itemData);
          break;
        case 'certificates':
          await SupabaseService.createCertificate(itemData);
          break;
        case 'skills':
          await SupabaseService.createSkill(itemData);
          break;
        case 'courses':
          await SupabaseService.createCourse(itemData);
          break;
        case 'achievements':
          await SupabaseService.createAchievement(itemData);
          break;
        case 'personalInfo':
          await SupabaseService.updatePersonalInfo(itemData);
          break;
        default:
          throw new Error(`Tipo não suportado: ${type}`);
      }
      
      // Atualizar dados após criação
      await refresh();
      return { success: true };
    } catch (error) {
      console.error(`Erro ao criar ${type}:`, error);
      return { success: false, error: error instanceof Error ? error.message : 'Erro desconhecido' };
    } finally {
      setSaving(false);
    }
  };

  // Função para atualizar item
  const updateItem = async (type: keyof PortfolioData, itemId: string, itemData: any) => {
    setSaving(true);
    try {
      switch (type) {
        case 'projects':
          await SupabaseService.updateProject(itemId, itemData);
          break;
        case 'certificates':
          await SupabaseService.updateCertificate(itemId, itemData);
          break;
        case 'skills':
          await SupabaseService.updateSkill(itemId, itemData);
          break;
        case 'courses':
          await SupabaseService.updateCourse(itemId, itemData);
          break;
        case 'achievements':
          await SupabaseService.updateAchievement(itemId, itemData);
          break;
        case 'personalInfo':
          await SupabaseService.updatePersonalInfo(itemData);
          break;
        default:
          throw new Error(`Tipo não suportado: ${type}`);
      }
      
      // Atualizar dados após atualização
      await refresh();
      return { success: true };
    } catch (error) {
      console.error(`Erro ao atualizar ${type}:`, error);
      return { success: false, error: error instanceof Error ? error.message : 'Erro desconhecido' };
    } finally {
      setSaving(false);
    }
  };

  // Função para deletar item
  const deleteItem = async (type: keyof PortfolioData, itemId: string) => {
    setSaving(true);
    try {
      switch (type) {
        case 'projects':
          await SupabaseService.deleteProject(itemId);
          break;
        case 'certificates':
          await SupabaseService.deleteCertificate(itemId);
          break;
        case 'skills':
          await SupabaseService.deleteSkill(itemId);
          break;
        case 'courses':
          await SupabaseService.deleteCourse(itemId);
          break;
        case 'achievements':
          await SupabaseService.deleteAchievement(itemId);
          break;
        default:
          throw new Error(`Tipo não suportado: ${type}`);
      }
      
      // Atualizar dados após exclusão
      await refresh();
      return { success: true };
    } catch (error) {
      console.error(`Erro ao deletar ${type}:`, error);
      return { success: false, error: error instanceof Error ? error.message : 'Erro desconhecido' };
    } finally {
      setSaving(false);
    }
  };

  // Função para upload de imagem
  const uploadImage = async (file: File) => {
    setSaving(true);
    try {
      const imageUrl = await SupabaseService.uploadImage(file);
      return { success: true, url: imageUrl };
    } catch (error) {
      console.error('Erro ao fazer upload da imagem:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Erro no upload' };
    } finally {
      setSaving(false);
    }
  };

  return {
    data,
    loading,
    saving,
    error,
    refresh,
    createItem,
    updateItem,
    deleteItem,
    uploadImage
  };
};