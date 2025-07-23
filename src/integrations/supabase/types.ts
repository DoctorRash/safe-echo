export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      deliveries: {
        Row: {
          created_at: string | null
          delivery_date: string | null
          donation_id: string | null
          evidence_photos: string[] | null
          id: string
          notes: string | null
          partner_id: string | null
          quantity_delivered: number
          request_id: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          delivery_date?: string | null
          donation_id?: string | null
          evidence_photos?: string[] | null
          id?: string
          notes?: string | null
          partner_id?: string | null
          quantity_delivered: number
          request_id: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          delivery_date?: string | null
          donation_id?: string | null
          evidence_photos?: string[] | null
          id?: string
          notes?: string | null
          partner_id?: string | null
          quantity_delivered?: number
          request_id?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "deliveries_donation_id_fkey"
            columns: ["donation_id"]
            isOneToOne: false
            referencedRelation: "donations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deliveries_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "deliveries_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "requests"
            referencedColumns: ["id"]
          },
        ]
      }
      donations: {
        Row: {
          amount: number | null
          created_at: string | null
          donor_id: string
          id: string
          message: string | null
          pickup_method: string | null
          quantity: number | null
          status: string | null
          type: Database["public"]["Enums"]["donation_type"]
          updated_at: string | null
        }
        Insert: {
          amount?: number | null
          created_at?: string | null
          donor_id: string
          id?: string
          message?: string | null
          pickup_method?: string | null
          quantity?: number | null
          status?: string | null
          type: Database["public"]["Enums"]["donation_type"]
          updated_at?: string | null
        }
        Update: {
          amount?: number | null
          created_at?: string | null
          donor_id?: string
          id?: string
          message?: string | null
          pickup_method?: string | null
          quantity?: number | null
          status?: string | null
          type?: Database["public"]["Enums"]["donation_type"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "donations_donor_id_fkey"
            columns: ["donor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      gbv_reports: {
        Row: {
          ai_processed_summary: string | null
          created_at: string
          description: string | null
          id: string
          incident_date: string | null
          incident_time: string | null
          incident_type: string
          language_code: string
          location_details: string | null
          location_state: string | null
          perpetrator_relationship: string | null
          session_id: string
          status: string
          updated_at: string
        }
        Insert: {
          ai_processed_summary?: string | null
          created_at?: string
          description?: string | null
          id?: string
          incident_date?: string | null
          incident_time?: string | null
          incident_type: string
          language_code?: string
          location_details?: string | null
          location_state?: string | null
          perpetrator_relationship?: string | null
          session_id?: string
          status?: string
          updated_at?: string
        }
        Update: {
          ai_processed_summary?: string | null
          created_at?: string
          description?: string | null
          id?: string
          incident_date?: string | null
          incident_time?: string | null
          incident_type?: string
          language_code?: string
          location_details?: string | null
          location_state?: string | null
          perpetrator_relationship?: string | null
          session_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          address: string | null
          created_at: string | null
          email: string
          full_name: string
          id: string
          organization: string | null
          phone: string | null
          role: Database["public"]["Enums"]["user_role"]
          state: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          email: string
          full_name: string
          id?: string
          organization?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          state?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          address?: string | null
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          organization?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          state?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      requests: {
        Row: {
          address: string
          approved_at: string | null
          contact_person: string
          created_at: string | null
          girls_served: number
          id: string
          institution_name: string
          phone: string
          quantity_requested: number
          reason: string
          requester_id: string
          state: string
          status: Database["public"]["Enums"]["request_status"] | null
          updated_at: string | null
          urgency_level: string | null
        }
        Insert: {
          address: string
          approved_at?: string | null
          contact_person: string
          created_at?: string | null
          girls_served: number
          id?: string
          institution_name: string
          phone: string
          quantity_requested: number
          reason: string
          requester_id: string
          state: string
          status?: Database["public"]["Enums"]["request_status"] | null
          updated_at?: string | null
          urgency_level?: string | null
        }
        Update: {
          address?: string
          approved_at?: string | null
          contact_person?: string
          created_at?: string | null
          girls_served?: number
          id?: string
          institution_name?: string
          phone?: string
          quantity_requested?: number
          reason?: string
          requester_id?: string
          state?: string
          status?: Database["public"]["Enums"]["request_status"] | null
          updated_at?: string | null
          urgency_level?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "requests_requester_id_fkey"
            columns: ["requester_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      support_resources: {
        Row: {
          address: string | null
          created_at: string
          email: string | null
          id: string
          is_active: boolean
          language_codes: string[] | null
          name: string
          phone: string | null
          state: string | null
          type: string
          website: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string
          email?: string | null
          id?: string
          is_active?: boolean
          language_codes?: string[] | null
          name: string
          phone?: string | null
          state?: string | null
          type: string
          website?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string
          email?: string | null
          id?: string
          is_active?: boolean
          language_codes?: string[] | null
          name?: string
          phone?: string | null
          state?: string | null
          type?: string
          website?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: { user_uuid: string }
        Returns: Database["public"]["Enums"]["user_role"]
      }
    }
    Enums: {
      donation_type: "pads" | "funds"
      request_status:
        | "pending"
        | "approved"
        | "matched"
        | "delivered"
        | "completed"
      user_role: "admin" | "donor" | "requester" | "partner"
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
    Enums: {
      donation_type: ["pads", "funds"],
      request_status: [
        "pending",
        "approved",
        "matched",
        "delivered",
        "completed",
      ],
      user_role: ["admin", "donor", "requester", "partner"],
    },
  },
} as const
