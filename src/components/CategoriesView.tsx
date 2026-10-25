import React from 'react';
import { BusinessCategory, ContentTemplate } from '../types';
import { INITIAL_TEMPLATES } from '../services/db';
import {
  FolderKanban,
  Sparkles,
  ArrowLeft,
  Briefcase,
  ShoppingBag,
  Share2,
  Headphones,
  Cpu,
  CheckCircle2,
} from 'lucide-react';

interface CategoriesViewProps {
  categories: BusinessCategory[];
  onSelectTemplate: (template: ContentTemplate) => void;
}

export const CategoriesView: React.FC<CategoriesViewProps> = ({
  categories,
  onSelectTemplate,
}) => {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShoppingBag':
        return <ShoppingBag className="w-5 h-5" />;
      case 'Share2':
        return <Share2 className="w-5 h-5" />;
      case 'Briefcase':
        return <Briefcase className="w-5 h-5" />;
      case 'Headphones':
        return <Headphones className="w-5 h-5" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="bg-[#FFFCF7] p-6 rounded-2xl border border-[#E8DED2] shadow-tavana space-y-2">
        <h1 className="text-xl font-extrabold text-[#573921] flex items-center gap-2">
          <FolderKanban className="w-6 h-6 text-[#879779]" />
          <span>دسته‌بندی‌های کسب‌وکار و قالب‌های آماده</span>
        </h1>
        <p className="text-xs sm:text-sm text-[#77716B]">
          با انتخاب قالب‌های استاندارد هر حوزه، سرعت تولید محتوا و دقت پاسخ‌دهی را تا چندین برابر افزایش دهید.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="tavana-card p-5 shadow-tavana-hover flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                  style={{ backgroundColor: cat.accentColor }}
                >
                  {getCategoryIcon(cat.icon)}
                </div>
                <div>
                  <h2 className="text-base font-bold text-[#573921]">{cat.nameFa}</h2>
                  <span className="text-[11px] font-medium text-[#77716B]">{cat.nameEn}</span>
                </div>
              </div>

              <p className="text-xs text-[#77716B] leading-relaxed">{cat.description}</p>
            </div>

            <div className="pt-3 border-t border-[#E8DED2]/60 flex items-center justify-between text-xs">
              <span className="text-[11px] text-[#879779] font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                آماده بهره‌برداری
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Templates Section */}
      <div className="space-y-4 pt-4">
        <h2 className="text-lg font-bold text-[#573921] flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#C5A16A]" />
          <span>قالب‌های پیش‌فرض پیشنهاد استودیو</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {INITIAL_TEMPLATES.map((temp) => (
            <div
              key={temp.id}
              className="tavana-card p-5 shadow-tavana-hover flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold text-[#A96F38] bg-[#FAF2EA] px-2.5 py-0.5 rounded-md border border-[#E8DED2]">
                    {temp.contentType}
                  </span>
                  <span className="text-[11px] text-[#77716B]">لحن: {temp.defaultTone}</span>
                </div>

                <h3 className="text-sm font-bold text-[#573921] mb-1">{temp.titleFa}</h3>
                <p className="text-xs text-[#77716B] leading-relaxed mb-2">{temp.descriptionFa}</p>
                <div className="text-[11px] text-[#573921] bg-[#FAF6F0] p-2.5 rounded-xl border border-[#E8DED2]">
                  💡 راهنما: {temp.promptHint}
                </div>
              </div>

              <button
                onClick={() => onSelectTemplate(temp)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold rounded-xl text-white bg-[#A96F38] hover:bg-[#935F2E] transition-all cursor-pointer mt-2"
              >
                <span>شروع ساخت با این قالب</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
