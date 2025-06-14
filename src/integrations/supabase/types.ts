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
      ai_conversations: {
        Row: {
          created_at: string
          id: string
          messages: Json
          project_id: string | null
          title: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          messages?: Json
          project_id?: string | null
          title?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          messages?: Json
          project_id?: string | null
          title?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_conversations_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      daily_protection_logs: {
        Row: {
          completed_at: string | null
          id: string
          practice_details: Json | null
          practice_type: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          id?: string
          practice_details?: Json | null
          practice_type: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          id?: string
          practice_details?: Json | null
          practice_type?: string
          user_id?: string
        }
        Relationships: []
      }
      dreams: {
        Row: {
          analysis: string | null
          content: string
          created_at: string | null
          dream_date: string
          emotions: string[] | null
          id: string
          lucid_level: number | null
          symbols: string[] | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          analysis?: string | null
          content: string
          created_at?: string | null
          dream_date?: string
          emotions?: string[] | null
          id?: string
          lucid_level?: number | null
          symbols?: string[] | null
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          analysis?: string | null
          content?: string
          created_at?: string | null
          dream_date?: string
          emotions?: string[] | null
          id?: string
          lucid_level?: number | null
          symbols?: string[] | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      emergency_sessions: {
        Row: {
          created_at: string | null
          emergency_id: string | null
          ended_at: string | null
          id: string
          join_code: string | null
          specialist_id: string | null
          started_at: string | null
          status: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          emergency_id?: string | null
          ended_at?: string | null
          id?: string
          join_code?: string | null
          specialist_id?: string | null
          started_at?: string | null
          status?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          emergency_id?: string | null
          ended_at?: string | null
          id?: string
          join_code?: string | null
          specialist_id?: string | null
          started_at?: string | null
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "emergency_sessions_emergency_id_fkey"
            columns: ["emergency_id"]
            isOneToOne: false
            referencedRelation: "spiritual_emergencies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "emergency_sessions_specialist_id_fkey"
            columns: ["specialist_id"]
            isOneToOne: false
            referencedRelation: "specialists"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          budget: number | null
          created_at: string
          description: string | null
          id: string
          name: string
          owner_id: string
          parameters: Json | null
          status: string
          timeline_end: string | null
          timeline_start: string | null
          updated_at: string
        }
        Insert: {
          budget?: number | null
          created_at?: string
          description?: string | null
          id?: string
          name: string
          owner_id: string
          parameters?: Json | null
          status?: string
          timeline_end?: string | null
          timeline_start?: string | null
          updated_at?: string
        }
        Update: {
          budget?: number | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          owner_id?: string
          parameters?: Json | null
          status?: string
          timeline_end?: string | null
          timeline_start?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      resources: {
        Row: {
          content: string
          created_at: string
          creator_id: string
          id: string
          is_ai_generated: boolean | null
          project_id: string | null
          resource_type: string
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          creator_id: string
          id?: string
          is_ai_generated?: boolean | null
          project_id?: string | null
          resource_type: string
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          creator_id?: string
          id?: string
          is_ai_generated?: boolean | null
          project_id?: string | null
          resource_type?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "resources_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      schedule_acknowledgments: {
        Row: {
          acknowledged_at: string
          acknowledged_by: string
          assignment_id: string | null
          created_at: string
          id: string
          notes: string | null
        }
        Insert: {
          acknowledged_at?: string
          acknowledged_by: string
          assignment_id?: string | null
          created_at?: string
          id?: string
          notes?: string | null
        }
        Update: {
          acknowledged_at?: string
          acknowledged_by?: string
          assignment_id?: string | null
          created_at?: string
          id?: string
          notes?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "schedule_acknowledgments_assignment_id_fkey"
            columns: ["assignment_id"]
            isOneToOne: false
            referencedRelation: "schedule_assignments"
            referencedColumns: ["id"]
          },
        ]
      }
      schedule_assignments: {
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
            foreignKeyName: "schedule_assignments_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      simulations: {
        Row: {
          created_at: string
          creator_id: string
          id: string
          name: string
          parameters: Json
          project_id: string
          results: Json | null
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          creator_id: string
          id?: string
          name: string
          parameters?: Json
          project_id: string
          results?: Json | null
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          creator_id?: string
          id?: string
          name?: string
          parameters?: Json
          project_id?: string
          results?: Json | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "simulations_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      soul_guide_conversations: {
        Row: {
          conversation_data: Json | null
          created_at: string | null
          id: string
          last_protection_ritual: string | null
          spiritual_emergency_count: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          conversation_data?: Json | null
          created_at?: string | null
          id?: string
          last_protection_ritual?: string | null
          spiritual_emergency_count?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          conversation_data?: Json | null
          created_at?: string | null
          id?: string
          last_protection_ritual?: string | null
          spiritual_emergency_count?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      specialist_ratings: {
        Row: {
          created_at: string | null
          feedback: string | null
          id: string
          rating: number | null
          session_id: string | null
          specialist_id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          feedback?: string | null
          id?: string
          rating?: number | null
          session_id?: string | null
          specialist_id?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          feedback?: string | null
          id?: string
          rating?: number | null
          session_id?: string | null
          specialist_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "specialist_ratings_specialist_id_fkey"
            columns: ["specialist_id"]
            isOneToOne: false
            referencedRelation: "specialists"
            referencedColumns: ["id"]
          },
        ]
      }
      specialists: {
        Row: {
          available: boolean | null
          created_at: string | null
          credentials: string[] | null
          email: string
          id: string
          languages: string[] | null
          name: string
          rating: number | null
          session_count: number | null
          traditions: string[] | null
        }
        Insert: {
          available?: boolean | null
          created_at?: string | null
          credentials?: string[] | null
          email: string
          id?: string
          languages?: string[] | null
          name: string
          rating?: number | null
          session_count?: number | null
          traditions?: string[] | null
        }
        Update: {
          available?: boolean | null
          created_at?: string | null
          credentials?: string[] | null
          email?: string
          id?: string
          languages?: string[] | null
          name?: string
          rating?: number | null
          session_count?: number | null
          traditions?: string[] | null
        }
        Relationships: []
      }
      spiritual_assessments: {
        Row: {
          awareness: number
          compassion: number
          created_at: string
          id: string
          inner_peace: number
          notes: string | null
          overall_score: number | null
          presence: number
          spiritual_level: string
          updated_at: string
          user_id: string
          wisdom: number
        }
        Insert: {
          awareness: number
          compassion: number
          created_at?: string
          id?: string
          inner_peace: number
          notes?: string | null
          overall_score?: number | null
          presence: number
          spiritual_level: string
          updated_at?: string
          user_id: string
          wisdom: number
        }
        Update: {
          awareness?: number
          compassion?: number
          created_at?: string
          id?: string
          inner_peace?: number
          notes?: string | null
          overall_score?: number | null
          presence?: number
          spiritual_level?: string
          updated_at?: string
          user_id?: string
          wisdom?: number
        }
        Relationships: []
      }
      spiritual_emergencies: {
        Row: {
          crisis_level: number | null
          crisis_type: string | null
          human_specialist_involved: boolean | null
          id: string
          protocol_used: string
          resolved: boolean | null
          resolved_at: string | null
          response_time_seconds: number | null
          tradition: string | null
          triggered_at: string | null
          user_id: string
        }
        Insert: {
          crisis_level?: number | null
          crisis_type?: string | null
          human_specialist_involved?: boolean | null
          id?: string
          protocol_used: string
          resolved?: boolean | null
          resolved_at?: string | null
          response_time_seconds?: number | null
          tradition?: string | null
          triggered_at?: string | null
          user_id: string
        }
        Update: {
          crisis_level?: number | null
          crisis_type?: string | null
          human_specialist_involved?: boolean | null
          id?: string
          protocol_used?: string
          resolved?: boolean | null
          resolved_at?: string | null
          response_time_seconds?: number | null
          tradition?: string | null
          triggered_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      spiritual_goals: {
        Row: {
          created_at: string
          current_level: number
          description: string | null
          goal_type: string
          id: string
          status: string
          target_date: string | null
          target_level: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_level: number
          description?: string | null
          goal_type: string
          id?: string
          status?: string
          target_date?: string | null
          target_level: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_level?: number
          description?: string | null
          goal_type?: string
          id?: string
          status?: string
          target_date?: string | null
          target_level?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      spiritual_milestones: {
        Row: {
          achieved_at: string
          description: string | null
          id: string
          milestone_type: string
          points_awarded: number | null
          title: string
          user_id: string
        }
        Insert: {
          achieved_at?: string
          description?: string | null
          id?: string
          milestone_type: string
          points_awarded?: number | null
          title: string
          user_id: string
        }
        Update: {
          achieved_at?: string
          description?: string | null
          id?: string
          milestone_type?: string
          points_awarded?: number | null
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      spiritual_recommendations: {
        Row: {
          assessment_id: string | null
          created_at: string
          description: string
          id: string
          is_completed: boolean | null
          priority: number | null
          recommendation_type: string
          title: string
          user_id: string
        }
        Insert: {
          assessment_id?: string | null
          created_at?: string
          description: string
          id?: string
          is_completed?: boolean | null
          priority?: number | null
          recommendation_type: string
          title: string
          user_id: string
        }
        Update: {
          assessment_id?: string | null
          created_at?: string
          description?: string
          id?: string
          is_completed?: boolean | null
          priority?: number | null
          recommendation_type?: string
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "spiritual_recommendations_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "spiritual_assessments"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          created_at: string | null
          current_period_end: string | null
          current_period_start: string | null
          id: string
          plan_type: string
          status: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan_type?: string
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan_type?: string
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_curse_journeys: {
        Row: {
          burned_curses: string[] | null
          created_at: string | null
          family_patterns: Json | null
          last_cleansing_date: string | null
          transmutation_rituals: string[] | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          burned_curses?: string[] | null
          created_at?: string | null
          family_patterns?: Json | null
          last_cleansing_date?: string | null
          transmutation_rituals?: string[] | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          burned_curses?: string[] | null
          created_at?: string | null
          family_patterns?: Json | null
          last_cleansing_date?: string | null
          transmutation_rituals?: string[] | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          company: string | null
          created_at: string
          email_notifications: boolean | null
          experience_level: string | null
          expertise: string[] | null
          first_name: string | null
          id: string
          job_title: string | null
          last_name: string | null
          phone_number: string | null
          push_notifications: boolean | null
          sms_notifications: boolean | null
          updated_at: string
        }
        Insert: {
          company?: string | null
          created_at?: string
          email_notifications?: boolean | null
          experience_level?: string | null
          expertise?: string[] | null
          first_name?: string | null
          id: string
          job_title?: string | null
          last_name?: string | null
          phone_number?: string | null
          push_notifications?: boolean | null
          sms_notifications?: boolean | null
          updated_at?: string
        }
        Update: {
          company?: string | null
          created_at?: string
          email_notifications?: boolean | null
          experience_level?: string | null
          expertise?: string[] | null
          first_name?: string | null
          id?: string
          job_title?: string | null
          last_name?: string | null
          phone_number?: string | null
          push_notifications?: boolean | null
          sms_notifications?: boolean | null
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_emergency_metrics: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      has_role: {
        Args: { role_to_check: Database["public"]["Enums"]["user_role"] }
        Returns: boolean
      }
    }
    Enums: {
      user_role: "admin" | "engineer" | "manager" | "executive"
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
    Enums: {
      user_role: ["admin", "engineer", "manager", "executive"],
    },
  },
} as const
