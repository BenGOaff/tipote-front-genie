export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      contents: {
        Row: {
          content: string | null
          created_at: string
          id: string
          platform: string | null
          published_at: string | null
          scheduled_at: string | null
          status: string
          title: string
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: string
          platform?: string | null
          published_at?: string | null
          scheduled_at?: string | null
          status?: string
          title: string
          type?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: string
          platform?: string | null
          published_at?: string | null
          scheduled_at?: string | null
          status?: string
          title?: string
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          age_range: string | null
          audience_size: string | null
          biggest_blocker: string | null
          biggest_challenge: string | null
          business_type: string | null
          client_feedback: string | null
          communication_style: string | null
          content_preference: string | null
          country: string | null
          created_at: string
          display_name: string | null
          email_list_size: string | null
          financial_goal: string | null
          first_name: string | null
          gender: string | null
          has_offers: boolean | null
          id: string
          main_goal_90_days: string | null
          main_goals: string[] | null
          maturity: string | null
          mission_statement: string | null
          niche: string | null
          offer_price: string | null
          offer_sales_count: string | null
          offers: Json | null
          onboarding_completed: boolean | null
          persona: string | null
          preferred_tone: string | null
          preferred_tones: string[] | null
          psychological_goal: string | null
          social_audience: string | null
          social_links: Json | null
          success_definition: string | null
          tools_used: string[] | null
          unique_value: string | null
          untapped_strength: string | null
          updated_at: string
          user_id: string
          weekly_hours: string | null
          weekly_time: string | null
        }
        Insert: {
          age_range?: string | null
          audience_size?: string | null
          biggest_blocker?: string | null
          biggest_challenge?: string | null
          business_type?: string | null
          client_feedback?: string | null
          communication_style?: string | null
          content_preference?: string | null
          country?: string | null
          created_at?: string
          display_name?: string | null
          email_list_size?: string | null
          financial_goal?: string | null
          first_name?: string | null
          gender?: string | null
          has_offers?: boolean | null
          id?: string
          main_goal_90_days?: string | null
          main_goals?: string[] | null
          maturity?: string | null
          mission_statement?: string | null
          niche?: string | null
          offer_price?: string | null
          offer_sales_count?: string | null
          offers?: Json | null
          onboarding_completed?: boolean | null
          persona?: string | null
          preferred_tone?: string | null
          preferred_tones?: string[] | null
          psychological_goal?: string | null
          social_audience?: string | null
          social_links?: Json | null
          success_definition?: string | null
          tools_used?: string[] | null
          unique_value?: string | null
          untapped_strength?: string | null
          updated_at?: string
          user_id: string
          weekly_hours?: string | null
          weekly_time?: string | null
        }
        Update: {
          age_range?: string | null
          audience_size?: string | null
          biggest_blocker?: string | null
          biggest_challenge?: string | null
          business_type?: string | null
          client_feedback?: string | null
          communication_style?: string | null
          content_preference?: string | null
          country?: string | null
          created_at?: string
          display_name?: string | null
          email_list_size?: string | null
          financial_goal?: string | null
          first_name?: string | null
          gender?: string | null
          has_offers?: boolean | null
          id?: string
          main_goal_90_days?: string | null
          main_goals?: string[] | null
          maturity?: string | null
          mission_statement?: string | null
          niche?: string | null
          offer_price?: string | null
          offer_sales_count?: string | null
          offers?: Json | null
          onboarding_completed?: boolean | null
          persona?: string | null
          preferred_tone?: string | null
          preferred_tones?: string[] | null
          psychological_goal?: string | null
          social_audience?: string | null
          social_links?: Json | null
          success_definition?: string | null
          tools_used?: string[] | null
          unique_value?: string | null
          untapped_strength?: string | null
          updated_at?: string
          user_id?: string
          weekly_hours?: string | null
          weekly_time?: string | null
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
