export type DraftStatus = 'draft' | 'in_review' | 'final';

export interface BusinessCategory {
  id: string;
  nameFa: string;
  nameEn: string;
  icon: string; // Lucide icon name
  accentColor: string;
  bgColor: string;
  description: string;
}

export interface Draft {
  id: string;
  title: string;
  businessName: string;
  categoryId: string;
  contentType: string;
  tone: string;
  targetAudience: string;
  content: string;
  keywords: string[];
  notes?: string;
  parameters?: Record<string, string | number>;
  status: DraftStatus;
  isFavorite: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface ContentTemplate {
  id: string;
  titleFa: string;
  categoryId: string;
  contentType: string;
  defaultTone: string;
  descriptionFa: string;
  promptHint: string;
}

export interface AppSettings {
  defaultBusinessName: string;
  defaultCategory: string;
  defaultTone: string;
  autoSave: boolean;
  geminiApiKey: string;
  lastBackupDate?: string;
}

export interface BackupData {
  version: string;
  exportedAt: string;
  drafts: Draft[];
  settings: AppSettings;
}
