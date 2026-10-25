import React from 'react';
import { FileText, Sparkles, FolderKanban, Database } from 'lucide-react';

interface MobileNavProps {
  activeTab: 'drafts' | 'editor' | 'categories' | 'backup';
  setActiveTab: (tab: 'drafts' | 'editor' | 'categories' | 'backup') => void;
  draftsCount: number;
}

export const MobileNavigation: React.FC<MobileNavProps> = ({
  activeTab,
  setActiveTab,
  draftsCount,
}) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FFFCF7] border-t border-[#E8DED2] px-3 py-2 shadow-lg">
      <div className="flex items-center justify-around max-w-md mx-auto">
        <button
          onClick={() => setActiveTab('drafts')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg transition-colors relative ${
            activeTab === 'drafts' ? 'text-[#A96F38] font-bold' : 'text-[#77716B]'
          }`}
        >
          <FileText className="w-5 h-5" />
          <span className="text-[10px]">پیش‌نویس‌ها</span>
          {draftsCount > 0 && (
            <span className="absolute -top-1 right-2 bg-[#A96F38] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              {draftsCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('editor')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg transition-colors ${
            activeTab === 'editor' ? 'text-[#A96F38] font-bold' : 'text-[#77716B]'
          }`}
        >
          <Sparkles className="w-5 h-5" />
          <span className="text-[10px]">استودیو</span>
        </button>

        <button
          onClick={() => setActiveTab('categories')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg transition-colors ${
            activeTab === 'categories' ? 'text-[#A96F38] font-bold' : 'text-[#77716B]'
          }`}
        >
          <FolderKanban className="w-5 h-5" />
          <span className="text-[10px]">قالب‌ها</span>
        </button>

        <button
          onClick={() => setActiveTab('backup')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg transition-colors ${
            activeTab === 'backup' ? 'text-[#A96F38] font-bold' : 'text-[#77716B]'
          }`}
        >
          <Database className="w-5 h-5" />
          <span className="text-[10px]">پشتیبان</span>
        </button>
      </div>
    </div>
  );
};
