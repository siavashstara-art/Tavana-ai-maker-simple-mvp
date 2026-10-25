import React, { useState } from 'react';
import { exportDataJSON, importDataJSON, saveAllDrafts, INITIAL_DRAFTS } from '../services/db';
import {
  Database,
  Download,
  Upload,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  FileJson,
  X,
  ShieldCheck,
} from 'lucide-react';

interface BackupModalProps {
  onRefresh: () => void;
  onClose?: () => void;
}

export const BackupModal: React.FC<BackupModalProps> = ({ onRefresh, onClose }) => {
  const [importStatus, setImportStatus] = useState<{
    type: 'idle' | 'success' | 'error';
    message: string;
  }>({ type: 'idle', message: '' });

  const [jsonText, setJsonText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleExportDownload = async () => {
    try {
      const jsonStr = await exportDataJSON();
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `tavana_studio_backup_${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setImportStatus({
        type: 'success',
        message: 'فایل پشتیبان JSON با موفقیت دانلود شد.',
      });
    } catch (err: any) {
      setImportStatus({
        type: 'error',
        message: `خطا در ساخت فایل خروجی: ${err?.message || 'نامشخص'}`,
      });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const content = event.target?.result as string;
      if (content) {
        setJsonText(content);
        await processImport(content);
      }
    };
    reader.readAsText(file);
  };

  const processImport = async (text: string) => {
    setIsProcessing(true);
    setImportStatus({ type: 'idle', message: '' });

    const result = await importDataJSON(text);
    setIsProcessing(false);

    if (result.success) {
      setImportStatus({
        type: 'success',
        message: result.message,
      });
      onRefresh();
    } else {
      setImportStatus({
        type: 'error',
        message: result.message,
      });
    }
  };

  const handleRestoreDefaults = async () => {
    if (confirm('آیا مطمئن هستید؟ با این کار داده‌های نمونه اولیه استودیو مجدداً بارگذاری می‌شوند.')) {
      await saveAllDrafts(INITIAL_DRAFTS);
      setImportStatus({
        type: 'success',
        message: 'پیش‌نویس‌های نمونه اولیه با موفقیت بازیابی شدند.',
      });
      onRefresh();
    }
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-[#FFFCF7] p-6 rounded-2xl border border-[#E8DED2] shadow-tavana flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-[#573921] flex items-center gap-2">
            <Database className="w-6 h-6 text-[#573921]" />
            <span>پشتیبان‌گیری و مدیریت داده‌های JSON</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#77716B] mt-1">
            از تمام پیش‌نویس‌ها و تنظیمات استودیو فایل پشتیبان (Backup) بگیرید یا داده‌های قبلی را بازگردانی کنید.
          </p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-2 text-[#77716B] hover:text-[#573921] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Alert Status Banner */}
      {importStatus.type !== 'idle' && (
        <div
          className={`p-4 rounded-xl border text-xs font-semibold flex items-center gap-2.5 ${
            importStatus.type === 'success'
              ? 'bg-[#F1F4EF] text-[#879779] border-[#879779]/30'
              : 'bg-red-50 text-red-700 border-red-200'
          }`}
        >
          {importStatus.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 shrink-0" />
          )}
          <span>{importStatus.message}</span>
        </div>
      )}

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Export Box */}
        <div className="tavana-card p-6 space-y-4 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-[#FAF2EA] text-[#A96F38] flex items-center justify-center mb-3">
              <Download className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-[#573921] mb-1">دانلود خروجی پشتیبان (Export JSON)</h2>
            <p className="text-xs text-[#77716B] leading-relaxed">
              یک نسخه دقیق از کلیه پیش‌نویس‌های متنی، کلمات کلیدی، وضعیت‌ها و تنظیمات استودیو را در قالب یک فایل استاندارد JSON دانلود کنید.
            </p>
          </div>

          <button
            onClick={handleExportDownload}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl text-white bg-[#A96F38] hover:bg-[#935F2E] transition-all cursor-pointer shadow-sm"
          >
            <FileJson className="w-4 h-4" />
            <span>دریافت فایل JSON پشتیبان</span>
          </button>
        </div>

        {/* Import Box */}
        <div className="tavana-card p-6 space-y-4 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-[#F1F4EF] text-[#879779] flex items-center justify-center mb-3">
              <Upload className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-[#573921] mb-1">بازگردانی فایل پشتیبان (Import JSON)</h2>
            <p className="text-xs text-[#77716B] leading-relaxed">
              فایل JSON قبلی خود را انتخاب کرده یا متن آن را قرار دهید تا پیش‌نویس‌ها بررسی و وارد شوند.
            </p>
          </div>

          <div className="space-y-3">
            <label className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl text-[#573921] bg-[#FFFCF7] border border-[#E8DED2] hover:bg-[#FAF6F0] hover:border-[#C5A16A] transition-all cursor-pointer">
              <Upload className="w-4 h-4 text-[#879779]" />
              <span>انتخاب فایل JSON از دستگاه</span>
              <input
                type="file"
                accept=".json,application/json"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

      </div>

      {/* Manual JSON Text Import Box */}
      <div className="tavana-card p-6 space-y-4">
        <h3 className="text-sm font-bold text-[#573921] flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#C5A16A]" />
          <span>ورود مستقیم متن JSON یا بررسی ساختار</span>
        </h3>

        <textarea
          rows={5}
          value={jsonText}
          onChange={(e) => setJsonText(e.target.value)}
          placeholder='محتوای فایل JSON پشتیبان را اینجا پیست (Paste) کنید...'
          className="w-full p-3 text-xs rounded-xl tavana-input font-mono dir-ltr text-left"
        />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <button
            onClick={() => processImport(jsonText)}
            disabled={!jsonText.trim() || isProcessing}
            className="w-full sm:w-auto px-5 py-2 text-xs font-bold rounded-xl text-white bg-[#879779] hover:bg-[#748366] disabled:opacity-50 transition-colors"
          >
            {isProcessing ? 'در حال بررسی...' : 'اعتبارسنجی و واردکردن پیش‌نویس‌ها'}
          </button>

          <button
            onClick={handleRestoreDefaults}
            className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-medium rounded-xl text-[#77716B] hover:text-[#573921] hover:bg-[#FAF6F0] transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>بازیابی داده‌های نمونه استودیو</span>
          </button>
        </div>
      </div>
    </div>
  );
};
