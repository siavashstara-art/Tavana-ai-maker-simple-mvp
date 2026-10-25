import React, { useState } from 'react';
import { AppSettings } from '../types';
import { Settings, Save, Key, Building, CheckCircle2, Shield, Database } from 'lucide-react';

interface SettingsModalProps {
  settings: AppSettings;
  onSaveSettings: (settings: AppSettings) => void;
  onClose: () => void;
  draftsCount: number;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  settings,
  onSaveSettings,
  onClose,
  draftsCount,
}) => {
  const [defaultBusinessName, setDefaultBusinessName] = useState(
    settings.defaultBusinessName || 'استودیو توانا'
  );
  const [defaultTone, setDefaultTone] = useState(
    settings.defaultTone || 'حرفه‌ای و متقاعدکننده'
  );
  const [geminiApiKey, setGeminiApiKey] = useState(settings.geminiApiKey || '');
  const [savedMessage, setSavedMessage] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings({
      ...settings,
      defaultBusinessName,
      defaultTone,
      geminiApiKey,
    });
    setSavedMessage(true);
    setTimeout(() => {
      setSavedMessage(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FFFCF7] border border-[#E8DED2] rounded-2xl shadow-xl max-w-lg w-full p-6 space-y-5 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E8DED2]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#FAF2EA] text-[#A96F38] flex items-center justify-center">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#573921]">تنظیمات استودیو توانا</h2>
              <p className="text-[11px] text-[#77716B]">پیکربندی پیش‌فرض‌ها و کلید هوش مصنوعی</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#77716B] hover:text-[#573921] text-xs font-semibold px-2 py-1 rounded-lg hover:bg-[#FAF6F0]"
          >
            بستن ✕
          </button>
        </div>

        {savedMessage && (
          <div className="p-3 bg-[#F1F4EF] text-[#879779] border border-[#879779]/30 rounded-xl text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>تنظیمات با موفقیت ذخیره شد.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Default Business Name */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#573921] flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-[#A96F38]" />
              <span>نام کسب‌وکار پیش‌فرض</span>
            </label>
            <input
              type="text"
              value={defaultBusinessName}
              onChange={(e) => setDefaultBusinessName(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl tavana-input"
            />
          </div>

          {/* Default Tone */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#573921]">لحن پیش‌فرض تولید متن</label>
            <select
              value={defaultTone}
              onChange={(e) => setDefaultTone(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl tavana-input bg-[#FAF6F0]"
            >
              <option value="حرفه‌ای و متقاعدکننده">حرفه‌ای و متقاعدکننده</option>
              <option value="صمیمی و گرم">صمیمی و گرم</option>
              <option value="رسمی و فاخر">رسمی و فاخر</option>
              <option value="الهام‌بخش و لوکس">الهام‌بخش و لوکس</option>
            </select>
          </div>

          {/* Gemini API Key */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#573921] flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-[#C5A16A]" />
              <span>کلید API هوش مصنوعی (Gemini API Key - اختیاری)</span>
            </label>
            <input
              type="password"
              value={geminiApiKey}
              onChange={(e) => setGeminiApiKey(e.target.value)}
              placeholder="در صورت لزوم کلید شخصی اختصاصی را وارد کنید"
              className="w-full px-3 py-2 text-xs rounded-xl tavana-input font-mono dir-ltr"
            />
            <p className="text-[10px] text-[#77716B] pt-0.5">
              در صورت خالی بودن، کلید سیستمی محیط توسعه یا دستیار محتوای داخلی فعال خواهد بود.
            </p>
          </div>

          {/* Database Stats */}
          <div className="p-3 bg-[#FAF6F0] rounded-xl border border-[#E8DED2] flex items-center justify-between text-xs text-[#573921]">
            <span className="flex items-center gap-1.5 font-medium">
              <Database className="w-4 h-4 text-[#879779]" />
              تعداد پیش‌نویس‌های دیتابیس محلی:
            </span>
            <span className="font-bold bg-[#FFFCF7] px-2.5 py-0.5 rounded-lg border border-[#E8DED2]">
              {draftsCount} مورد
            </span>
          </div>

          {/* Footer Buttons */}
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E8DED2]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium rounded-xl text-[#77716B] hover:text-[#573921] hover:bg-[#FAF6F0] transition-colors"
            >
              انصراف
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2 text-xs font-bold rounded-xl text-white bg-[#A96F38] hover:bg-[#935F2E] transition-all"
            >
              <Save className="w-4 h-4" />
              <span>ذخیره تغییرات</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
