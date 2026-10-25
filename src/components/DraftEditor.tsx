import React, { useState, useEffect } from 'react';
import { Draft, BusinessCategory, DraftStatus } from '../types';
import { generateStudioContent } from '../services/aiService';
import {
  Save,
  Sparkles,
  Copy,
  Check,
  ArrowRight,
  Trash2,
  Tags,
  Sliders,
  Wand2,
  FileText,
  Clock,
  Zap,
} from 'lucide-react';

interface DraftEditorProps {
  draft: Draft | null;
  categories: BusinessCategory[];
  onSave: (draft: Draft) => void;
  onDelete: (id: string) => void;
  onBack: () => void;
}

export const DraftEditor: React.FC<DraftEditorProps> = ({
  draft,
  categories,
  onSave,
  onDelete,
  onBack,
}) => {
  const [title, setTitle] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [contentType, setContentType] = useState('');
  const [tone, setTone] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [content, setContent] = useState('');
  const [keywordsText, setKeywordsText] = useState('');
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState<DraftStatus>('draft');
  const [isFavorite, setIsFavorite] = useState(false);

  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (draft) {
      setTitle(draft.title || '');
      setBusinessName(draft.businessName || '');
      setCategoryId(draft.categoryId || categories[0]?.id || 'ecommerce');
      setContentType(draft.contentType || 'کپشن اینستاگرام');
      setTone(draft.tone || 'حرفه‌ای و متقاعدکننده');
      setTargetAudience(draft.targetAudience || 'مخاطبان هدف');
      setContent(draft.content || '');
      setKeywordsText(draft.keywords ? draft.keywords.join('، ') : '');
      setNotes(draft.notes || '');
      setStatus(draft.status || 'draft');
      setIsFavorite(Boolean(draft.isFavorite));
    } else {
      // Initialize new draft default state
      setTitle('پیش‌نویس محتوای جدید');
      setBusinessName('استودیو توانا');
      setCategoryId(categories[0]?.id || 'ecommerce');
      setContentType('کپشن اینستاگرام');
      setTone('حرفه‌ای و متقاعدکننده');
      setTargetAudience('مخاطبان ارزشمند کسب‌وکار');
      setContent('');
      setKeywordsText('تولید محتوا، کیفیت، پشتیبانی');
      setNotes('');
      setStatus('draft');
      setIsFavorite(false);
    }
  }, [draft, categories]);

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const keywords = keywordsText
      .split(/[،,]/)
      .map((k) => k.trim())
      .filter(Boolean);

    const updated: Draft = {
      id: draft ? draft.id : `draft-${Date.now()}`,
      title: title.trim() || 'پیش‌نویس بدون عنوان',
      businessName: businessName.trim() || 'استودیو توانا',
      categoryId: categoryId || 'ecommerce',
      contentType: contentType.trim() || 'عمومی',
      tone: tone.trim() || 'حرفه‌ای',
      targetAudience: targetAudience.trim() || 'عام',
      content,
      keywords,
      notes,
      status,
      isFavorite,
      createdAt: draft ? draft.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    onSave(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleAiGenerate = async (
    actionType: 'generate' | 'shorten' | 'expand' | 'formal' | 'friendly' | 'hashtags' = 'generate'
  ) => {
    setIsGenerating(true);
    const keywords = keywordsText
      .split(/[،,]/)
      .map((k) => k.trim())
      .filter(Boolean);

    const cat = categories.find((c) => c.id === categoryId);

    try {
      const generated = await generateStudioContent({
        businessName,
        categoryName: cat ? cat.nameFa : 'عمومی',
        contentType,
        tone,
        targetAudience,
        promptDescription: content || title,
        keywords,
        actionType,
      });

      if (actionType === 'generate') {
        setContent(generated);
      } else {
        setContent((prev) => `${prev}\n\n--- 🪄 ویرایش هوشمند (${actionType}): ---\n${generated}`);
      }
    } catch (err) {
      console.error('Generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Header Controls */}
      <div className="bg-[#FFFCF7] p-4 sm:p-5 rounded-2xl border border-[#E8DED2] shadow-tavana flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl bg-[#FAF6F0] text-[#77716B] hover:text-[#573921] hover:bg-[#F2E9DD] transition-colors border border-[#E8DED2]"
            title="بازگشت به فهرست"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-[#573921]">
              {draft ? 'ویرایش پیش‌نویس استودیو' : 'ایجاد پیش‌نویس محتوای جدید'}
            </h1>
            <p className="text-xs text-[#77716B]">
              مشخصات کسب‌وکار و محتوا را تنظیم کرده و با هوش مصنوعی توانا تولید و ذخیره کنید.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          {draft && (
            <button
              onClick={() => {
                if (confirm('آیا از حذف این پیش‌نویس اطمینان دارید؟')) {
                  onDelete(draft.id);
                  onBack();
                }
              }}
              className="px-3 py-2 text-xs font-semibold rounded-xl text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 transition-colors"
            >
              <Trash2 className="w-4 h-4 inline ml-1" />
              حذف
            </button>
          )}

          <button
            onClick={handleCopy}
            disabled={!content}
            className="px-3 py-2 text-xs font-semibold rounded-xl text-[#573921] bg-[#FAF6F0] border border-[#E8DED2] hover:bg-[#F2E9DD] transition-colors disabled:opacity-50"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 inline ml-1 text-[#879779]" />
                کپی شد!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 inline ml-1" />
                کپی متن
              </>
            )}
          </button>

          <button
            onClick={() => handleSave()}
            className="flex items-center gap-1.5 px-5 py-2 text-xs font-bold rounded-xl text-white bg-[#A96F38] hover:bg-[#935F2E] active:scale-98 shadow-sm transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{savedSuccess ? 'ذخیره شد ✓' : 'ذخیره پیش‌نویس'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Form Inputs vs Content Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Context & Metadata Inputs (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="tavana-card p-5 space-y-4">
            <h2 className="text-sm font-bold text-[#573921] flex items-center gap-2 pb-2 border-b border-[#E8DED2]">
              <Sliders className="w-4 h-4 text-[#A96F38]" />
              <span>تنظیمات و پارامترهای محتوا</span>
            </h2>

            {/* Title */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#573921]">عنوان پیش‌نویس</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="مثال: پست معرفی محصول جدید..."
                className="w-full px-3 py-2 text-xs rounded-xl tavana-input"
              />
            </div>

            {/* Business Name */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#573921]">نام کسب‌وکار / برند</label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="مثال: چرم فاخر توانا"
                className="w-full px-3 py-2 text-xs rounded-xl tavana-input"
              />
            </div>

            {/* Category */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#573921]">دسته‌بندی اصلی</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl tavana-input bg-[#FAF6F0] cursor-pointer"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nameFa} ({c.nameEn})
                  </option>
                ))}
              </select>
            </div>

            {/* Content Type */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#573921]">نوع محتوا</label>
              <input
                type="text"
                value={contentType}
                onChange={(e) => setContentType(e.target.value)}
                placeholder="مثال: کپشن اینستاگرام، پیامک تبلیغاتی، پروپوزال"
                className="w-full px-3 py-2 text-xs rounded-xl tavana-input"
              />
            </div>

            {/* Tone */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#573921]">لحن بیان</label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl tavana-input bg-[#FAF6F0] cursor-pointer"
              >
                <option value="حرفه‌ای و متقاعدکننده">حرفه‌ای و متقاعدکننده</option>
                <option value="صمیمی و گرم">صمیمی و گرم (شبکه‌های اجتماعی)</option>
                <option value="رسمی و فاخر">رسمی و فاخر (B2B و اداری)</option>
                <option value="الهام‌بخش و لوکس">الهام‌بخش و لوکس (برندینگ)</option>
                <option value="آموزشی و راهنما">آموزشی و راهنما</option>
              </select>
            </div>

            {/* Target Audience */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#573921]">مخاطبان هدف</label>
              <input
                type="text"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder="مثال: شیک‌پوشان، مدیران استارتاپ"
                className="w-full px-3 py-2 text-xs rounded-xl tavana-input"
              />
            </div>

            {/* Keywords */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#573921] flex items-center gap-1">
                <Tags className="w-3.5 h-3.5 text-[#879779]" />
                <span>کلمات کلیدی (با کاما جدا کنید)</span>
              </label>
              <input
                type="text"
                value={keywordsText}
                onChange={(e) => setKeywordsText(e.target.value)}
                placeholder="تخفیف، کیفیت، چرم طبیعی"
                className="w-full px-3 py-2 text-xs rounded-xl tavana-input"
              />
            </div>

            {/* Status & Favorite */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#573921]">وضعیت پیش‌نویس</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as DraftStatus)}
                  className="w-full px-3 py-2 text-xs rounded-xl tavana-input bg-[#FAF6F0]"
                >
                  <option value="draft">پیش‌نویس اولیه</option>
                  <option value="in_review">در حال بررسی</option>
                  <option value="final">نهایی و آماده انتشار</option>
                </select>
              </div>

              <div className="space-y-1 flex flex-col justify-end">
                <label
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`flex items-center justify-center gap-2 px-3 py-2 text-xs font-bold rounded-xl border cursor-pointer transition-all ${
                    isFavorite
                      ? 'bg-[#FAF6EF] text-[#A96F38] border-[#C5A16A]'
                      : 'bg-[#FAF6F0] text-[#77716B] border-[#E8DED2]'
                  }`}
                >
                  <span className={isFavorite ? 'text-[#C5A16A]' : ''}>★</span>
                  <span>{isFavorite ? 'نشان‌شده' : 'علامت‌گذاری'}</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Editor Workspace & AI Generation (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* AI Generator Action Box */}
          <div className="bg-gradient-to-r from-[#FAF6EF] via-[#FFFCF7] to-[#FAF6EF] p-4 rounded-2xl border border-[#C5A16A]/40 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#A96F38] text-white flex items-center justify-center">
                <Wand2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-[#573921]">تولیدگر هوشمند استودیو توانا</h3>
                <p className="text-[11px] text-[#77716B]">بر اساس مشخصات فرم، متن جدید تولید کنید.</p>
              </div>
            </div>

            <button
              onClick={() => handleAiGenerate('generate')}
              disabled={isGenerating}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold rounded-xl text-white bg-[#A96F38] hover:bg-[#935F2E] active:scale-98 shadow-sm transition-all disabled:opacity-50 cursor-pointer"
            >
              {isGenerating ? (
                <>
                  <Zap className="w-4 h-4 animate-spin text-white" />
                  <span>در حال تولید متن...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-[#C5A16A]" />
                  <span>تولید متن با هوش مصنوعی</span>
                </>
              )}
            </button>
          </div>

          {/* Quick AI Refine Toolbar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-[11px]">
            <span className="text-[#77716B] font-semibold shrink-0">ابزار ویرایش سریع:</span>
            <button
              onClick={() => handleAiGenerate('shorten')}
              disabled={isGenerating || !content}
              className="px-2.5 py-1 rounded-lg bg-[#FFFCF7] border border-[#E8DED2] text-[#573921] hover:bg-[#FAF6F0] transition-colors shrink-0 disabled:opacity-40"
            >
              ✂️ خلاصه‌سازی
            </button>
            <button
              onClick={() => handleAiGenerate('expand')}
              disabled={isGenerating || !content}
              className="px-2.5 py-1 rounded-lg bg-[#FFFCF7] border border-[#E8DED2] text-[#573921] hover:bg-[#FAF6F0] transition-colors shrink-0 disabled:opacity-40"
            >
              📝 بسط و گسترش
            </button>
            <button
              onClick={() => handleAiGenerate('formal')}
              disabled={isGenerating || !content}
              className="px-2.5 py-1 rounded-lg bg-[#FFFCF7] border border-[#E8DED2] text-[#573921] hover:bg-[#FAF6F0] transition-colors shrink-0 disabled:opacity-40"
            >
              👔 رسمی‌تر
            </button>
            <button
              onClick={() => handleAiGenerate('friendly')}
              disabled={isGenerating || !content}
              className="px-2.5 py-1 rounded-lg bg-[#FFFCF7] border border-[#E8DED2] text-[#573921] hover:bg-[#FAF6F0] transition-colors shrink-0 disabled:opacity-40"
            >
              💛 صمیمی‌تر
            </button>
            <button
              onClick={() => handleAiGenerate('hashtags')}
              disabled={isGenerating || !content}
              className="px-2.5 py-1 rounded-lg bg-[#FFFCF7] border border-[#E8DED2] text-[#573921] hover:bg-[#FAF6F0] transition-colors shrink-0 disabled:opacity-40"
            >
              #️⃣ تولید هشتگ
            </button>
          </div>

          {/* Textarea Workspace */}
          <div className="tavana-card p-5 space-y-3">
            <div className="flex items-center justify-between text-xs text-[#77716B]">
              <span className="font-semibold text-[#573921] flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-[#A96F38]" />
                <span>متن اصلی پیش‌نویس</span>
              </span>
              <span>تعداد کاراکتر: {content.length}</span>
            </div>

            <textarea
              rows={12}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="متن پیش‌نویس را اینجا بنویسید یا دکمه تولید با هوش مصنوعی را بزنید..."
              className="w-full p-4 text-xs sm:text-sm rounded-xl tavana-input leading-relaxed resize-y dir-rtl text-right min-h-[280px]"
            />

            {/* Notes Section */}
            <div className="pt-2 border-t border-[#E8DED2]">
              <label className="text-xs font-semibold text-[#573921] mb-1 block">
                یادداشت‌های داخلی و توضیحات جانبی (اختیاری)
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="مثال: تاریخ انتشار جمعه ساعت ۱۸، هماهنگی با تیم گرافیک..."
                className="w-full px-3 py-2 text-xs rounded-xl tavana-input"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
