export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type InquiryType =
  | "enterprise_automation"
  | "development"
  | "education"
  | "general";

export type InquiryStatus = "pending" | "in_progress" | "done" | "spam";

export type ApplicationStatus =
  | "pending"
  | "confirmed"
  | "cancelled"
  | "completed";

export type Database = {
  public: {
    Tables: {
      inquiries: {
        Row: {
          id: string;
          name: string;
          company: string | null;
          email: string;
          phone: string;
          inquiry_type: InquiryType;
          subject: string;
          message: string;
          privacy_consent: boolean;
          status: InquiryStatus;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          company?: string | null;
          email: string;
          phone: string;
          inquiry_type: InquiryType;
          subject: string;
          message: string;
          privacy_consent: boolean;
          status?: InquiryStatus;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          company?: string | null;
          email?: string;
          phone?: string;
          inquiry_type?: InquiryType;
          subject?: string;
          message?: string;
          privacy_consent?: boolean;
          status?: InquiryStatus;
          created_at?: string;
        };
        Relationships: [];
      };
      courses: {
        Row: {
          id: string;
          title: string;
          slug: string;
          description: string;
          target_audience: string;
          curriculum: Json;
          duration: string;
          difficulty: string;
          price: number | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          description: string;
          target_audience: string;
          curriculum?: Json;
          duration: string;
          difficulty: string;
          price?: number | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          description?: string;
          target_audience?: string;
          curriculum?: Json;
          duration?: string;
          difficulty?: string;
          price?: number | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      course_applications: {
        Row: {
          id: string;
          course_id: string;
          applicant_name: string;
          email: string;
          phone: string;
          company: string | null;
          participant_count: number;
          preferred_date: string | null;
          message: string | null;
          privacy_consent: boolean;
          status: ApplicationStatus;
          created_at: string;
        };
        Insert: {
          id?: string;
          course_id: string;
          applicant_name: string;
          email: string;
          phone: string;
          company?: string | null;
          participant_count?: number;
          preferred_date?: string | null;
          message?: string | null;
          privacy_consent: boolean;
          status?: ApplicationStatus;
          created_at?: string;
        };
        Update: {
          id?: string;
          course_id?: string;
          applicant_name?: string;
          email?: string;
          phone?: string;
          company?: string | null;
          participant_count?: number;
          preferred_date?: string | null;
          message?: string | null;
          privacy_consent?: boolean;
          status?: ApplicationStatus;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "course_applications_course_id_fkey";
            columns: ["course_id"];
            isOneToOne: false;
            referencedRelation: "courses";
            referencedColumns: ["id"];
          },
        ];
      };
      projects: {
        Row: {
          id: string;
          title: string;
          slug: string;
          category: string;
          summary: string;
          problem: string;
          solution: string;
          technologies: string[];
          thumbnail: string | null;
          content: string;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          category: string;
          summary: string;
          problem: string;
          solution: string;
          technologies?: string[];
          thumbnail?: string | null;
          content: string;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          category?: string;
          summary?: string;
          problem?: string;
          solution?: string;
          technologies?: string[];
          thumbnail?: string | null;
          content?: string;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      insights: {
        Row: {
          id: string;
          title: string;
          slug: string;
          category: string;
          summary: string;
          content: string;
          thumbnail: string | null;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          category: string;
          summary: string;
          content: string;
          thumbnail?: string | null;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          category?: string;
          summary?: string;
          content?: string;
          thumbnail?: string | null;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      admin_users: {
        Row: {
          user_id: string;
          email: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          email: string;
          created_at?: string;
        };
        Update: {
          user_id?: string;
          email?: string;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      is_admin: {
        Args: Record<string, never>;
        Returns: boolean;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};
