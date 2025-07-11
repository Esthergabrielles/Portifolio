export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      achievements: {
        Row: {
          created_at: string | null
          date: string
          description: string
          id: string
          organization: string
          title: string
          type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          date: string
          description: string
          id?: string
          organization: string
          title: string
          type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          date?: string
          description?: string
          id?: string
          organization?: string
          title?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      certificates: {
        Row: {
          category: string
          created_at: string | null
          date: string
          description: string | null
          id: string
          image: string
          issuer: string
          name: string
          skills: string[] | null
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          date: string
          description?: string | null
          id?: string
          image: string
          issuer: string
          name: string
          skills?: string[] | null
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          date?: string
          description?: string | null
          id?: string
          image?: string
          issuer?: string
          name?: string
          skills?: string[] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      courses: {
        Row: {
          category: string
          color: string | null
          completed_date: string | null
          created_at: string | null
          description: string | null
          expected_end: string | null
          id: string
          institution: string
          logo: string | null
          name: string
          progress: number
          skills: string[] | null
          start_date: string
          status: string
          updated_at: string | null
        }
        Insert: {
          category: string
          color?: string | null
          completed_date?: string | null
          created_at?: string | null
          description?: string | null
          expected_end?: string | null
          id?: string
          institution: string
          logo?: string | null
          name: string
          progress?: number
          skills?: string[] | null
          start_date: string
          status: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          color?: string | null
          completed_date?: string | null
          created_at?: string | null
          description?: string | null
          expected_end?: string | null
          id?: string
          institution?: string
          logo?: string | null
          name?: string
          progress?: number
          skills?: string[] | null
          start_date?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      feedbacks: {
        Row: {
          category: string | null
          created_at: string | null
          feedback_text: string | null
          id: string
          ip_address: string | null
          rating: number
          user_agent: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          feedback_text?: string | null
          id?: string
          ip_address?: string | null
          rating: number
          user_agent?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          feedback_text?: string | null
          id?: string
          ip_address?: string | null
          rating?: number
          user_agent?: string | null
        }
        Relationships: []
      }
      personal_info: {
        Row: {
          created_at: string | null
          description: string
          email: string
          id: string
          location: string
          name: string
          phone: string
          profile_image: string
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          email: string
          id?: string
          location: string
          name: string
          phone: string
          profile_image: string
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          email?: string
          id?: string
          location?: string
          name?: string
          phone?: string
          profile_image?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          company: string
          created_at: string | null
          description: string
          details: string
          id: string
          image: string
          name: string
          technologies: string[] | null
          type: string
          updated_at: string | null
        }
        Insert: {
          company: string
          created_at?: string | null
          description: string
          details: string
          id?: string
          image: string
          name: string
          technologies?: string[] | null
          type: string
          updated_at?: string | null
        }
        Update: {
          company?: string
          created_at?: string | null
          description?: string
          details?: string
          id?: string
          image?: string
          name?: string
          technologies?: string[] | null
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      skills: {
        Row: {
          category: string
          created_at: string | null
          icon: string
          id: string
          level: number
          name: string
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          icon: string
          id?: string
          level: number
          name: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          icon?: string
          id?: string
          level?: number
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
        Database["public"]["Views"])
    ? (Database["public"]["Tables"] &
        Database["public"]["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
    ? Database["public"]["Enums"][PublicEnumNameOrOptions]
    : never