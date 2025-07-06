import { useState, useEffect } from 'react';
import { PortfolioService, PortfolioData } from '../services/portfolioService';

export const usePortfolioData = () => {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const savedData = PortfolioService.loadData();
      if (savedData) {
        setData(savedData);
      } else {
        // Carregar dados iniciais se não houver dados salvos
        await loadInitialData();
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadInitialData = async () => {
    try {
      // Importar dados iniciais dos arquivos
      const portfolioModule = await import('../data/portfolio');
      
      const initialData: PortfolioData = {
        projects: portfolioModule.projects || [],
        certificates: portfolioModule.certificates || [],
        skills: [
          ...(portfolioModule.technicalSkills?.map(skill => ({ ...skill, category: 'technical' })) || []),
          ...(portfolioModule.qaDocumentations?.map(skill => ({ ...skill, category: 'documentation' })) || []),
          ...(portfolioModule.softSkills?.map(skill => ({ ...skill, category: 'soft' })) || [])
        ],
        courses: [
          {
            id: '1',
            name: 'Quality Assurance',
            institution: 'Mate Academy',
            progress: 95,
            status: 'in-progress',
            category: 'Tecnologia',
            startDate: '2024',
            expectedEnd: 'Dezembro 2024',
            description: 'Formação completa em Quality Assurance com foco em testes automatizados e metodologias ágeis.',
            skills: ['Testes Automatizados', 'Selenium', 'API Testing', 'Metodologias Ágeis', 'Bug Tracking'],
            color: 'from-purple-500 to-purple-600'
          },
          {
            id: '2',
            name: 'FullStack Python',
            institution: 'Mate Academy',
            progress: 15,
            status: 'in-progress',
            category: 'Desenvolvimento',
            startDate: '2024',
            expectedEnd: 'Junho 2025',
            description: 'Curso completo de desenvolvimento web com Python, Django, React e tecnologias modernas.',
            skills: ['Python', 'Django', 'React', 'PostgreSQL', 'APIs REST', 'DevOps'],
            color: 'from-yellow-500 to-yellow-600'
          }
        ],
        achievements: [
          {
            id: '1',
            title: 'Funcionária Destaque',
            organization: 'Destra Gestão de Terceiros',
            date: '2024',
            description: 'Reconhecida como Funcionária Destaque em Novembro/2024 por excelência em auditorias documentais.',
            type: 'recognition'
          }
        ],
        personalInfo: {
          name: 'Esther Gabrielle',
          title: 'QA Junior',
          description: 'Iniciando minha carreira em QA com paixão por encontrar bugs e garantir qualidade.',
          email: 'esthergabriellesouza@gmail.com',
          phone: '(19) 98926-1419',
          location: 'Santa Bárbara d\'Oeste, SP - Brasil',
          profileImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop'
        },
        postmanCollections: [],
        feedbacks: []
      };
      
      setData(initialData);
      await saveData(initialData);
    } catch (error) {
      console.error('Erro ao carregar dados iniciais:', error);
    }
  };

  const saveData = async (newData?: PortfolioData) => {
    setSaving(true);
    try {
      const dataToSave = newData || data;
      if (dataToSave) {
        const success = await PortfolioService.saveData(dataToSave);
        if (success && newData) {
          setData(newData);
        }
        return success;
      }
      return false;
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
      return false;
    } finally {
      setSaving(false);
    }
  };

  const updateData = async (updates: Partial<PortfolioData>) => {
    if (data) {
      const newData = { ...data, ...updates };
      const success = await saveData(newData);
      return success;
    }
    return false;
  };

  const addItem = async (section: keyof PortfolioData, item: any) => {
    if (data && Array.isArray(data[section])) {
      const itemWithId = { ...item, id: item.id || Date.now().toString() };
      const updatedSection = [...(data[section] as any[]), itemWithId];
      return await updateData({ [section]: updatedSection });
    }
    return false;
  };

  const updateItem = async (section: keyof PortfolioData, itemId: string, updatedItem: any) => {
    if (data && Array.isArray(data[section])) {
      const updatedSection = (data[section] as any[]).map(item => 
        item.id === itemId ? { ...item, ...updatedItem } : item
      );
      return await updateData({ [section]: updatedSection });
    }
    return false;
  };

  const deleteItem = async (section: keyof PortfolioData, itemId: string) => {
    if (data && Array.isArray(data[section])) {
      const updatedSection = (data[section] as any[]).filter(item => item.id !== itemId);
      return await updateData({ [section]: updatedSection });
    }
    return false;
  };

  return {
    data,
    loading,
    saving,
    saveData,
    updateData,
    addItem,
    updateItem,
    deleteItem,
    loadData
  };
};