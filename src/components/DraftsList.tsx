import React, { useState, useMemo } from 'react';
import { Draft, BusinessCategory, DraftStatus } from '../types';
import {
  Search,
  Filter,
  Star,
  Copy,
  Check,
  Edit,
  Trash2,
  FileText,
  Clock,
  Sparkles,
  Share2,
  Download,
  Plus,
} from 'lucide-react';

interface DraftsListProps {
  drafts: Draft[];
  categories: BusinessCategory[];
  onSelectDraft: (draft: Draft) => void;
  onDeleteDraft: (id: string) => void;
  onToggleFavorite: (draft: Draft) => void;
  onNewDraftClick: () => void;
  onExportJSON: () => void;
}

export const DraftsList: React.FC<DraftsListProps> = ({
  drafts,
  categories,
  onSelectDraft,
  onDeleteDraft,
  onToggleFavorite,
  onNewDraftClick,
  onExportJSON,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categoryMap = useMemo(() => {
    const map = new Map<string, BusinessCategory>();
    categories.forEach((c) => map.set(c.id, c));
    return map;
  }, [categories]);

  const filteredDrafts = useMemo(() => {
    return drafts.filter((d) => {
      const matchesSearch =
        d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = selectedCategory === 'all' || d.categoryId === selectedCategory;
      const matchesStatus = statusFilter === 'all' || d.status === statusFilter;
      const matchesFavorite = !onlyFavorites || d.isFavorite;

      return matchesSearch && matchesCategory && matchesStatus && matchesFavorite;
    });
  }, [drafts, searchQuery, selectedCategory, statusFilter, onlyFavorites]);

  const handleCopyText = (id: string, text: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getStatusBadge = (status: DraftStatus) => {
    switch (status) {
      case 'final':
        return (
          <span className="text-xs font-semibold text-[#879779] bg-[#F1F4EF] px-2.5 py-0.5 rounded-md border border-[#879779]/20">
            نهایی
          </span>
        );
      case 'in_review':
        return (
          <span className="text-xs font-semibold text-[#C5A16A] bg-[#FAF6EF] px-2.5 py-0.5 rounded-md border border-[#C5A16A]/20">
            در حال بررسی
          </span>
        );
      default:
        return (
          <span className="text-xs font-semibold text-[#77716B] bg-[#F4F2F0] px-2.5 py-0.5 rounded-md border border-[#E8DED2]">
            پیش‌نویس
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Hero Bar */}
      <div className="bg-gradient-to-r from-[#FFFCF7] via-[#FAF6F0] to-[#FFFCF7] p-6 rounded-2xl border border-[#E8DED2] shadow-tavana flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#573921] flex items-center gap-2">
            <FileText className="w-6 h-6 text-[#A96F38]" />
            <span>مدیریت و بایگانی پیش‌نویس‌های استودیو</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#77716B] mt-1">
            محتوای ذخیره‌شده، نسخه‌های اولیه و متون نهایی کسب‌وکار خود را جستجو، ویرایش یا خروجی بگیرید.
          </p>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <button
            onClick={onExportJSON}
            className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-xl text-[#573921] bg-[#FFFCF7] border border-[#E8DED2] hover:bg-[#F7F1E8] hover:border-[#C5A16A] transition-all"
          >
            <Download className="w-4 h-4 text-[#C5A16A]" />
            <span>خروجی JSON</span>
          </button>

          <button
            onClick={onNewDraftClick}
            className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl text-white bg-[#A96F38] hover:bg-[#935F2E] active:scale-98 shadow-sm transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>ایجاد پیش‌نویس جدید</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-[#FFFCF7] p-4 rounded-xl border border-[#E8DED2] shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Search Box */}
          <div className="relative w-full md:flex-1">
            <Search className="w-4 h-4 text-[#77716B] absolute right-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجو در عنوان، متن، کسب‌وکار یا کلمات کلیدی..."
              className="w-full pl-3 pr-9 py-2 text-xs rounded-xl tavana-input"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[#77716B] hover:text-[#573921]"
              >
                پاک‌سازی
              </button>
            )}
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            {/* Category select */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 text-xs rounded-xl tavana-input bg-[#FAF6F0] cursor-pointer shrink-0"
            >
              <option value="all">همه دسته‌بندی‌ها</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nameFa}
                </option>
              ))}
            </select>

            {/* Status select */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 text-xs rounded-xl tavana-input bg-[#FAF6F0] cursor-pointer shrink-0"
            >
              <option value="all">همه وضعیت‌ها</option>
              <option value="draft">پیش‌نویس اولیه</option>
              <option value="in_review">در حال بررسی</option>
              <option value="final">نهایی و تاییدشده</option>
            </select>

            {/* Favorites Toggle */}
            <button
              onClick={() => setOnlyFavorites(!onlyFavorites)}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl border transition-all shrink-0 ${
                onlyFavorites
                  ? 'bg-[#FAF6EF] text-[#A96F38] border-[#C5A16A]'
                  : 'bg-[#FAF6F0] text-[#77716B] border-[#E8DED2] hover:text-[#573921]'
              }`}
            >
              <Star className={`w-3.5 h-3.5 ${onlyFavorites ? 'fill-[#C5A16A] text-[#C5A16A]' : ''}`} />
              <span>نشان‌شده‌ها</span>
            </button>
          </div>
        </div>

        {/* Unboxed filter stats metadata */}
        <div className="flex items-center justify-between text-[11px] text-[#77716B] pt-1 border-t border-[#E8DED2]/60">
          <div className="flex items-center gap-2">
            <span>تعداد کل پیش‌نویس‌ها: {drafts.length}</span>
            <span aria-hidden="true">·</span>
            <span>نمایش داده‌شده: {filteredDrafts.length}</span>
          </div>
          {(selectedCategory !== 'all' || statusFilter !== 'all' || searchQuery || onlyFavorites) && (
            <button
              onClick={() => {
                setSelectedCategory('all');
                setStatusFilter('all');
                setSearchQuery('');
                setOnlyFavorites(false);
              }}
              className="text-[#A96F38] hover:underline font-medium"
            >
              بازنشانی فیلترها
            </button>
          )}
        </div>
      </div>

      {/* Draft Cards List */}
      {filteredDrafts.length === 0 ? (
        <div className="bg-[#FFFCF7] p-12 text-center rounded-2xl border border-[#E8DED2] shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#FAF2EA] text-[#A96F38] flex items-center justify-center mx-auto">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[#573921]">هیچ پیش‌نویسی یافت نشد</h3>
          <p className="text-xs text-[#77716B] max-w-sm mx-auto">
            موردی منطبق با جستجو یا فیلترهای انتخابی شما پیدا نشد. می‌توانید فیلترها را پاک کرده یا یک پیش‌نویس تازه ایجاد کنید.
          </p>
          <button
            onClick={onNewDraftClick}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl text-white bg-[#A96F38] hover:bg-[#935F2E] transition-colors mt-2"
          >
            <Plus className="w-4 h-4" />
            <span>ساخت اولین پیش‌نویس</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredDrafts.map((draft) => {
            const cat = categoryMap.get(draft.categoryId);

            return (
              <div
                key={draft.id}
                onClick={() => onSelectDraft(draft)}
                className="tavana-card p-5 shadow-tavana-hover cursor-pointer group flex flex-col justify-between transition-all"
              >
                <div>
                  {/* Card Header & Unboxed Metadata */}
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-[11px] text-[#77716B] mb-1">
                        <span className="font-semibold text-[#879779]">
                          {cat ? cat.nameFa : 'عمومی'}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{draft.businessName}</span>
                        <span aria-hidden="true">·</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#77716B]" />
                          {new Date(draft.updatedAt).toLocaleDateString('fa-IR')}
                        </span>
                      </div>

                      <h2 className="text-base font-bold text-[#573921] group-hover:text-[#A96F38] transition-colors line-clamp-1">
                        {draft.title}
                      </h2>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(draft);
                      }}
                      title={draft.isFavorite ? 'حذف از نشان‌شده‌ها' : 'افزودن به نشان‌شده‌ها'}
                      className="p-1.5 rounded-lg text-[#77716B] hover:text-[#C5A16A] transition-colors"
                    >
                      <Star
                        className={`w-4 h-4 ${
                          draft.isFavorite ? 'fill-[#C5A16A] text-[#C5A16A]' : ''
                        }`}
                      />
                    </button>
                  </div>

                  {/* Content Preview */}
                  <p className="text-xs text-[#77716B] line-clamp-3 leading-relaxed mb-3 dir-rtl text-right">
                    {draft.content || 'هنوز متنی ثبت نشده است...'}
                  </p>

                  {/* Tags & Badges */}
                  {draft.keywords && draft.keywords.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 mb-3">
                      {draft.keywords.slice(0, 3).map((kw, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] text-[#573921] bg-[#FAF6F0] px-2 py-0.5 rounded-md border border-[#E8DED2]"
                        >
                          #{kw}
                        </span>
                      ))}
                      {draft.keywords.length > 3 && (
                        <span className="text-[10px] text-[#77716B]">
                          +{draft.keywords.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Footer Controls & Status */}
                <div className="pt-3 border-t border-[#E8DED2]/60 flex items-center justify-between gap-2 mt-2">
                  <div className="flex items-center gap-2">
                    {getStatusBadge(draft.status)}
                    <span className="text-[11px] text-[#77716B] bg-[#FAF6F0] px-2 py-0.5 rounded-md border border-[#E8DED2]">
                      {draft.contentType}
                    </span>
                  </div>

                  <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={(e) => handleCopyText(draft.id, draft.content, e)}
                      title="کپی متن"
                      className="p-1.5 text-[#77716B] hover:text-[#573921] hover:bg-[#FAF6F0] rounded-lg transition-colors flex items-center gap-1 text-[11px]"
                    >
                      {copiedId === draft.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#879779]" />
                          <span className="text-[#879779] font-medium">کپی شد</span>
                        </>
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>

                    <button
                      onClick={() => onSelectDraft(draft)}
                      title="ویرایش پیش‌نویس"
                      className="p-1.5 text-[#77716B] hover:text-[#A96F38] hover:bg-[#FAF6F0] rounded-lg transition-colors"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm(`آیا از حذف پیش‌نویس "${draft.title}" اطمینان دارید؟`)) {
                          onDeleteDraft(draft.id);
                        }
                      }}
                      title="حذف پیش‌نویس"
                      className="p-1.5 text-[#77716B] hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
