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
      discipline_topics: {
        Row: {
          created_at: string
          discipline_id: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          discipline_id: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          discipline_id?: string
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "discipline_topics_discipline_id_fkey"
            columns: ["discipline_id"]
            isOneToOne: false
            referencedRelation: "edital_disciplines"
            referencedColumns: ["id"]
          },
        ]
      }
      edital_disciplines: {
        Row: {
          code: string | null
          created_at: string
          edital_id: string
          id: string
          name: string
          weight: number | null
        }
        Insert: {
          code?: string | null
          created_at?: string
          edital_id: string
          id?: string
          name: string
          weight?: number | null
        }
        Update: {
          code?: string | null
          created_at?: string
          edital_id?: string
          id?: string
          name?: string
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "edital_disciplines_edital_id_fkey"
            columns: ["edital_id"]
            isOneToOne: false
            referencedRelation: "editals"
            referencedColumns: ["id"]
          },
        ]
      }
      editals: {
        Row: {
          created_at: string
          exam_date: string | null
          id: string
          logo_url: string | null
          organization: string
          salary: number | null
          title: string
          user_id: string
          vagas: number | null
          year: number
        }
        Insert: {
          created_at?: string
          exam_date?: string | null
          id?: string
          logo_url?: string | null
          organization: string
          salary?: number | null
          title: string
          user_id: string
          vagas?: number | null
          year: number
        }
        Update: {
          created_at?: string
          exam_date?: string | null
          id?: string
          logo_url?: string | null
          organization?: string
          salary?: number | null
          title?: string
          user_id?: string
          vagas?: number | null
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "editals_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          id: string
          username: string | null
        }
        Insert: {
          created_at?: string
          id: string
          username?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          username?: string | null
        }
        Relationships: []
      }
      reviews: {
        Row: {
          completed: boolean | null
          created_at: string
          id: string
          review_date: string
          study_session_id: string | null
          subject: string
          user_id: string
        }
        Insert: {
          completed?: boolean | null
          created_at?: string
          id?: string
          review_date: string
          study_session_id?: string | null
          subject: string
          user_id: string
        }
        Update: {
          completed?: boolean | null
          created_at?: string
          id?: string
          review_date?: string
          study_session_id?: string | null
          subject?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_study_session_id_fkey"
            columns: ["study_session_id"]
            isOneToOne: false
            referencedRelation: "study_sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      study_sessions: {
        Row: {
          chapter: string | null
          created_at: string
          end_time: string | null
          id: string
          pages_read: number | null
          start_time: string
          subject: string
          user_id: string
        }
        Insert: {
          chapter?: string | null
          created_at?: string
          end_time?: string | null
          id?: string
          pages_read?: number | null
          start_time?: string
          subject: string
          user_id: string
        }
        Update: {
          chapter?: string | null
          created_at?: string
          end_time?: string | null
          id?: string
          pages_read?: number | null
          start_time?: string
          subject?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "study_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      topic_subtopics: {
        Row: {
          created_at: string
          id: string
          name: string
          topic_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          topic_id: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          topic_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "topic_subtopics_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "discipline_topics"
            referencedColumns: ["id"]
          },
        ]
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
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
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
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
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
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
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
