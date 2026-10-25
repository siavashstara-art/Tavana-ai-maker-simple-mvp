import React from 'react';
import { Sparkles, FolderKanban, Database, Settings, Plus, FileText } from 'lucide-react';

interface HeaderProps {
  activeTab: 'drafts' | 'editor' | 'categories' | 'backup';
  setActiveTab: (tab: 'drafts' | 'editor' | 'categories' | 'backup') => void;
  onNewDraftClick: () => void;
  onOpenSettings: () => void;
  draftsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onNewDraftClick,
  onOpenSettings,
  draftsCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FFFCF7]/90 backdrop-blur-md border-b border-[#E8DED2] shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#A96F38] to-[#C5A16A] text-white flex items-center justify-center shadow-sm">
            <Sparkles className="w-5.5 h-5.5" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-[#573921] leading-tight tracking-tight">
              استودیو توانا
            </span>
            <span className="text-[11px] font-medium text-[#77716B] leading-none">
              TAVANA Studio
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-[#F7F1E8] p-1.5 rounded-xl border border-[#E8DED2]">
          <button
            onClick={() => setActiveTab('drafts')}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'drafts'
                ? 'bg-[#FFFCF7] text-[#573921] shadow-xs border border-[#E8DED2]/60'
                : 'text-[#77716B] hover:text-[#573921] hover:bg-[#FFFCF7]/50'
            }`}
          >
            <FileText className="w-4 h-4 text-[#A96F38]" />
            <span>پیش‌نویس‌ها</span>
            {draftsCount > 0 && (
              <span className="bg-[#FAF2EA] text-[#A96F38] px-1.5 py-0.5 rounded-md text-[10px] font-bold border border-[#E8DED2]">
                {draftsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('editor')}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'editor'
                ? 'bg-[#FFFCF7] text-[#573921] shadow-xs border border-[#E8DED2]/60'
                : 'text-[#77716B] hover:text-[#573921] hover:bg-[#FFFCF7]/50'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#C5A16A]" />
            <span>استودیوی ساخت</span>
          </button>

          <button
            onClick={() => setActiveTab('categories')}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'categories'
                ? 'bg-[#FFFCF7] text-[#573921] shadow-xs border border-[#E8DED2]/60'
                : 'text-[#77716B] hover:text-[#573921] hover:bg-[#FFFCF7]/50'
            }`}
          >
            <FolderKanban className="w-4 h-4 text-[#879779]" />
            <span>دسته‌بندی‌ها و قالب‌ها</span>
          </button>

          <button
            onClick={() => setActiveTab('backup')}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'backup'
                ? 'bg-[#FFFCF7] text-[#573921] shadow-xs border border-[#E8DED2]/60'
                : 'text-[#77716B] hover:text-[#573921] hover:bg-[#FFFCF7]/50'
            }`}
          >
            <Database className="w-4 h-4 text-[#573921]" />
            <span>پشتیبان‌گیری JSON</span>
          </button>
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenSettings}
            title="تنظیمات استودیو"
            className="p-2.5 rounded-xl border border-[#E8DED2] bg-[#FFFCF7] text-[#77716B] hover:text-[#573921] hover:bg-[#F7F1E8] transition-colors"
          >
            <Settings className="w-4.5 h-4.5" />
          </button>

          <button
            onClick={onNewDraftClick}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl text-white bg-[#A96F38] hover:bg-[#935F2E] active:bg-[#7C4E23] shadow-sm transition-all whitespace-nowrap active:scale-98 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>پیش‌نویس جدید</span>
          </button>
        </div>

      </div>
    </header>
  );
};
