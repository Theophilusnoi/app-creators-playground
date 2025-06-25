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
      activity_logs: {
        Row: {
          action: string
          created_at: string
          description: string
          id: string
          metadata: Json | null
          project_id: string | null
          user_id: string
        }
        Insert: {
          action: string
          created_at?: string
          description: string
          id?: string
          metadata?: Json | null
          project_id?: string | null
          user_id: string
        }
        Update: {
          action?: string
          created_at?: string
          description?: string
          id?: string
          metadata?: Json | null
          project_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "activity_logs_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      akashic_access: {
        Row: {
          access_level: number
          created_at: string
          expires_at: string | null
          id: string
          karmic_insights: string | null
          lifetime_focus: string
          records_retrieved: Json | null
          soul_signature: string
          user_id: string
          verification_hash: string | null
        }
        Insert: {
          access_level?: number
          created_at?: string
          expires_at?: string | null
          id?: string
          karmic_insights?: string | null
          lifetime_focus: string
          records_retrieved?: Json | null
          soul_signature: string
          user_id: string
          verification_hash?: string | null
        }
        Update: {
          access_level?: number
          created_at?: string
          expires_at?: string | null
          id?: string
          karmic_insights?: string | null
          lifetime_focus?: string
          records_retrieved?: Json | null
          soul_signature?: string
          user_id?: string
          verification_hash?: string | null
        }
        Relationships: []
      }
      akashic_records: {
        Row: {
          created_at: string | null
          id: string
          lifetime_focus: string
          records_retrieved: Json | null
          soul_signature: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          lifetime_focus: string
          records_retrieved?: Json | null
          soul_signature: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          lifetime_focus?: string
          records_retrieved?: Json | null
          soul_signature?: string
          user_id?: string
        }
        Relationships: []
      }
      daily_protection_logs: {
        Row: {
          created_at: string
          id: string
          practice_details: Json | null
          practice_type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          practice_details?: Json | null
          practice_type: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          practice_details?: Json | null
          practice_type?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          spiritual_level: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          spiritual_level?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          spiritual_level?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      spiritual_assessments: {
        Row: {
          awareness: number
          compassion: number
          created_at: string | null
          id: string
          inner_peace: number
          notes: string | null
          presence: number
          spiritual_level: string
          user_id: string
          wisdom: number
        }
        Insert: {
          awareness: number
          compassion: number
          created_at?: string | null
          id?: string
          inner_peace: number
          notes?: string | null
          presence: number
          spiritual_level: string
          user_id: string
          wisdom: number
        }
        Update: {
          awareness?: number
          compassion?: number
          created_at?: string | null
          id?: string
          inner_peace?: number
          notes?: string | null
          presence?: number
          spiritual_level?: string
          user_id?: string
          wisdom?: number
        }
        Relationships: []
      }
      spiritual_practices: {
        Row: {
          created_at: string | null
          id: string
          practice_details: Json | null
          practice_type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          practice_details?: Json | null
          practice_type: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          practice_details?: Json | null
          practice_type?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      spiritual_recommendations: {
        Row: {
          assessment_id: string | null
          created_at: string
          description: string | null
          id: string
          priority: number | null
          recommendation_type: string
          title: string
          user_id: string
        }
        Insert: {
          assessment_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          priority?: number | null
          recommendation_type: string
          title: string
          user_id: string
        }
        Update: {
          assessment_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          priority?: number | null
          recommendation_type?: string
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      task_assignments: {
        Row: {
          assigned_by: string
          assigned_to: string
          created_at: string
          description: string | null
          due_date: string | null
          id: string
          priority: string | null
          project_id: string | null
          status: string | null
          task_title: string
          updated_at: string
        }
        Insert: {
          assigned_by: string
          assigned_to: string
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          priority?: string | null
          project_id?: string | null
          status?: string | null
          task_title: string
          updated_at?: string
        }
        Update: {
          assigned_by?: string
          assigned_to?: string
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          priority?: string | null
          project_id?: string | null
          status?: string | null
          task_title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "task_assignments_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      team_comments: {
        Row: {
          content: string
          created_at: string
          id: string
          mentioned_users: string[] | null
          project_id: string | null
          report_id: string | null
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          mentioned_users?: string[] | null
          project_id?: string | null
          report_id?: string | null
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          mentioned_users?: string[] | null
          project_id?: string | null
          report_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "team_comments_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          created_at: string
          email_notifications: boolean | null
          id: string
          phone_number: string | null
          push_notifications: boolean | null
          sms_notifications: boolean | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email_notifications?: boolean | null
          id?: string
          phone_number?: string | null
          push_notifications?: boolean | null
          sms_notifications?: boolean | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email_notifications?: boolean | null
          id?: string
          phone_number?: string | null
          push_notifications?: boolean | null
          sms_notifications?: boolean | null
          updated_at?: string
          user_id?: string
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
