// Serviço para gerenciar dados do portfólio
export interface PortfolioData {
  projects: any[];
  certificates: any[];
  skills: any[];
  courses: any[];
  achievements: any[];
  personalInfo: any;
  postmanCollections: any[];
  feedbacks?: any[];
}

export class PortfolioService {
  private static readonly STORAGE_KEY = 'portfolioData';

  static async saveData(data: PortfolioData): Promise<boolean> {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
      return false;
    }
  }

  static loadData(): PortfolioData | null {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      return null;
    }
  }

  static async uploadImage(file: File): Promise<string> {
    // Em produção, implementar upload real para serviço de imagens
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(file);
    });
  }

  static exportBackup(data: PortfolioData): void {
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `portfolio-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  static async importBackup(file: File): Promise<PortfolioData> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          resolve(data);
        } catch (error) {
          reject(new Error('Arquivo de backup inválido'));
        }
      };
      reader.onerror = () => reject(new Error('Erro ao ler arquivo'));
      reader.readAsText(file);
    });
  }
}