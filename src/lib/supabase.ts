import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Verificar se as variáveis de ambiente estão configuradas
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Variáveis de ambiente do Supabase não configuradas. Usando modo de demonstração.');
  
  // Criar um cliente mock para demonstração
  const mockClient = {
    from: () => ({
      select: () => ({ data: [], error: null }),
      insert: () => ({ data: null, error: null }),
      update: () => ({ data: null, error: null }),
      delete: () => ({ data: null, error: null }),
      order: () => ({ data: [], error: null }),
      limit: () => ({ data: [], error: null }),
      single: () => ({ data: null, error: null }),
      eq: () => ({ data: null, error: null })
    }),
    auth: {
      signInWithPassword: () => ({ data: null, error: new Error('Demo mode') }),
      signOut: () => ({ error: null }),
      getUser: () => ({ data: { user: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
    },
    storage: {
      from: () => ({
        upload: () => ({ data: null, error: null }),
        getPublicUrl: () => ({ data: { publicUrl: 'https://via.placeholder.com/400' } })
      })
    }
  };
  
  // @ts-ignore
  export const supabase = mockClient;
} else {
  export const supabase = createClient(supabaseUrl, supabaseAnonKey);
}

// Tipos TypeScript para o banco de dados
export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string;
          name: string;
          company: string;
          type: string;
          technologies: string[];
          description: string;
          image: string;
          details: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['projects']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['projects']['Insert']>;
      };
      certificates: {
        Row: {
          id: string;
          name: string;
          issuer: string;
          date: string;
          image: string;
          category: string;
          description: string | null;
          skills: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['certificates']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['certificates']['Insert']>;
      };
      skills: {
        Row: {
          id: string;
          name: string;
          level: number;
          icon: string;
          category: 'technical' | 'documentation' | 'soft';
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['skills']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['skills']['Insert']>;
      };
      courses: {
        Row: {
          id: string;
          name: string;
          institution: string;
          progress: number;
          status: 'completed' | 'in-progress' | 'paused';
          category: string;
          start_date: string;
          expected_end: string | null;
          completed_date: string | null;
          description: string | null;
          skills: string[];
          color: string;
          logo: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['courses']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['courses']['Insert']>;
      };
      achievements: {
        Row: {
          id: string;
          title: string;
          organization: string;
          date: string;
          description: string;
          type: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['achievements']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['achievements']['Insert']>;
      };
      personal_info: {
        Row: {
          id: string;
          name: string;
          title: string;
          description: string;
          email: string;
          phone: string;
          location: string;
          profile_image: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['personal_info']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['personal_info']['Insert']>;
      };
      feedbacks: {
        Row: {
          id: string;
          rating: number;
          feedback_text: string | null;
          category: string | null;
          ip_address: string | null;
          user_agent: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['feedbacks']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['feedbacks']['Insert']>;
      };
    };
  };
}