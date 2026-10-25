import { Draft, AppSettings, BackupData, BusinessCategory, ContentTemplate } from '../types';

const DB_NAME = 'TavanaStudioDB';
const DB_VERSION = 1;
const STORE_DRAFTS = 'drafts';
const STORE_SETTINGS = 'settings';

export const INITIAL_CATEGORIES: BusinessCategory[] = [
  {
    id: 'ecommerce',
    nameFa: 'فروشگاه و خرده‌فروشی',
    nameEn: 'E-Commerce',
    icon: 'ShoppingBag',
    accentColor: '#A96F38',
    bgColor: '#FAF2EA',
    description: 'توضیحات محصول، بنرهای فروش ویژه، پیامک‌های تبلیغاتی و کمپین‌ها',
  },
  {
    id: 'social',
    nameFa: 'شبکه‌های اجتماعی',
    nameEn: 'Social Media',
    icon: 'Share2',
    accentColor: '#879779',
    bgColor: '#F1F4EF',
    description: 'کپشن اینستاگرام، پست لینکدین، سناریو استوری و محتوای تلگرام',
  },
  {
    id: 'branding',
    nameFa: 'برندینگ و خلاقیت',
    nameEn: 'Branding',
    icon: 'Sparkles',
    accentColor: '#C5A16A',
    bgColor: '#FAF6EF',
    description: 'اسلوگان، شعار تبلیغاتی، داستان برند و معرفی ارزش‌های اصلی',
  },
  {
    id: 'b2b',
    nameFa: 'مکاتبات اداری و B2B',
    nameEn: 'Corporate & B2B',
    icon: 'Briefcase',
    accentColor: '#573921',
    bgColor: '#F5EFE9',
    description: 'پیوست‌های تجاری، پروپوزال رسمی، ایمیل‌های کاری و نامه‌های اداری',
  },
  {
    id: 'services',
    nameFa: 'خدماتی و پشتیبانی',
    nameEn: 'Services & Support',
    icon: 'Headphones',
    accentColor: '#77716B',
    bgColor: '#F4F2F0',
    description: 'پاسخ به سوالات متداول مشتریان، قالب‌های پشتیبانی و راهنماها',
  },
  {
    id: 'tech',
    nameFa: 'فناوری و استارتاپ',
    nameEn: 'Tech & Startup',
    icon: 'Cpu',
    accentColor: '#879779',
    bgColor: '#F1F4EF',
    description: 'معرفی محصول جدید، گزارش انتشار، شرح ویژگی‌های فنی و لانچ',
  },
];

export const INITIAL_TEMPLATES: ContentTemplate[] = [
  {
    id: 'temp_product_desc',
    titleFa: 'توضیحات جذاب محصول فروشگاهی',
    categoryId: 'ecommerce',
    contentType: 'توضیحات محصول',
    defaultTone: 'جذاب و متقاعدکننده',
    descriptionFa: 'قالب جامع برای معرفی خصوصیات، مزایا و فراخوان خرید (CTA) محصول',
    promptHint: 'نام محصول، ویژگی‌های کلیدی، مزیت رقابتی و تخفیف احتمالی را وارد کنید.',
  },
  {
    id: 'temp_insta_caption',
    titleFa: 'کپشن تعاملی اینستاگرام',
    categoryId: 'social',
    contentType: 'کپشن اینستاگرام',
    defaultTone: 'صمیمی و گرم',
    descriptionFa: 'شامل قلاب اولیه (Hook)، متن اصلی، هشتگ‌های مرتبط و پرسش تعاملی',
    promptHint: 'موضوع پست، هدف، و سوپراز یا تخفیف ویژه برای مخاطبان را ذکر کنید.',
  },
  {
    id: 'temp_b2b_proposal',
    titleFa: 'پروپوزال همکاری تجاری (B2B)',
    categoryId: 'b2b',
    contentType: 'پروپوزال رسمی',
    defaultTone: 'حرفه‌ای و فاخر',
    descriptionFa: 'ساختار استاندارد شامل مقدمه، ارزش افزوده، شرایط همکاری و گام‌های بعدی',
    promptHint: 'نام شرکت طرف مقابل، زمینه همکاری و پیشنهاد ارزش اصلی را وارد کنید.',
  },
  {
    id: 'temp_brand_slogan',
    titleFa: 'شعار تبلیغاتی و داستان برند',
    categoryId: 'branding',
    contentType: 'شعار و اسلوگان',
    defaultTone: 'الهام‌بخش و لوکس',
    descriptionFa: 'خلق جملات کوتاه ماندگار و تعریف هویت تمایزآفرین کسب‌وکار',
    promptHint: 'حوزه فعالیت، مخاطبان هدف و حس اصلی برند را توضیح دهید.',
  },
];

export const DEFAULT_SETTINGS: AppSettings = {
  defaultBusinessName: 'استودیو توانا',
  defaultCategory: 'ecommerce',
  defaultTone: 'حرفه‌ای و متقاعدکننده',
  autoSave: true,
  geminiApiKey: '',
};

export const INITIAL_DRAFTS: Draft[] = [
  {
    id: 'draft-1',
    title: 'کمپین جشنواره پاییزه فروشگاه کفش چرم',
    businessName: 'چرم فاخر توانا',
    categoryId: 'ecommerce',
    contentType: 'پیامک و بنر تبلیغاتی',
    tone: 'هیجان‌انگیز و فاخر',
    targetAudience: 'علاقه‌مندان به پوشاک چرم طبیعی و شیک‌پوشان',
    content: `🍂 جشنواره پاییزه چرم فاخر توانا شروع شد!
تخفیف ویژه ۳۰٪ روی تمامی محصولات چرم طبیعی به مدت محدود.

زیبایی اصیل، دوام بی‌نظیر و طراحی نوین در انتظار شماست.
جهت مشاهده محصولات جدید و ثبت سفارش فوری کلیک کنید:
[لینک وب‌سایت/فروشگاه]
کد تخفیف: AUTUMN30`,
    keywords: ['چرم طبیعی', 'تخفیف پاییزه', 'کفش چرم', 'هدیه فاخر'],
    status: 'final',
    isFavorite: true,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
  {
    id: 'draft-2',
    title: 'پست اینستاگرام معرفی خدمات پشتیبانی ۲۴ ساعته',
    businessName: 'سامانه ابری توانا',
    categoryId: 'social',
    contentType: 'کپشن اینستاگرام',
    tone: 'صمیمی و اطمینان‌بخش',
    targetAudience: 'صاحبان کسب‌وکارهای آنلاین و مدیران سایت',
    content: `آیا تا به حال ساعت ۲ بامداد با مشکل فنی در سایتت مواجه شدی؟ 🕒💥

تیم پشتیبانی توانا همیشه بیدار است تا کسب‌وکار شما حتی یک دقیقه هم متوقف نشود.
✅ پاسخگویی زیر ۵ دقیقه
✅ کارشناسان متخصص و باحوصله
✅ پشتیبانی در تمامی روزهای تعطیل

همین حالا برای مشاوره رایگان پیام بدید!
نظر شما چیه؟ سرعت پاسخگویی چقدر براتون مهمه؟ برامون کامنت بگذارید 👇`,
    keywords: ['پشتیبانی ۲۴ ساعته', 'خدمات ابری', 'امنیت سایت'],
    status: 'draft',
    isFavorite: false,
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
];

// Open IndexedDB connection
function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      reject(new Error('IndexedDB in browser not supported'));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_DRAFTS)) {
        db.createObjectStore(STORE_DRAFTS, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(STORE_SETTINGS)) {
        db.createObjectStore(STORE_SETTINGS, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// LocalStorage Fallbacks
const LOCAL_STORAGE_DRAFTS_KEY = 'tavana_studio_drafts_v1';
const LOCAL_STORAGE_SETTINGS_KEY = 'tavana_studio_settings_v1';

export async function getAllDrafts(): Promise<Draft[]> {
  try {
    const db = await openDatabase();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_DRAFTS, 'readonly');
      const store = tx.objectStore(STORE_DRAFTS);
      const request = store.getAll();

      request.onsuccess = () => {
        let drafts = request.result as Draft[];
        if (!drafts || drafts.length === 0) {
          // Initialize with default sample drafts
          saveAllDrafts(INITIAL_DRAFTS);
          resolve(INITIAL_DRAFTS);
        } else {
          // Sort by updatedAt descending
          drafts.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
          resolve(drafts);
        }
      };

      request.onerror = () => {
        resolve(getFallbackDrafts());
      };
    });
  } catch (err) {
    console.warn('IndexedDB failed, using localStorage fallback:', err);
    return getFallbackDrafts();
  }
}

function getFallbackDrafts(): Draft[] {
  const raw = localStorage.getItem(LOCAL_STORAGE_DRAFTS_KEY);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {
      // ignore
    }
  }
  localStorage.setItem(LOCAL_STORAGE_DRAFTS_KEY, JSON.stringify(INITIAL_DRAFTS));
  return INITIAL_DRAFTS;
}

export async function saveDraft(draft: Draft): Promise<Draft> {
  const now = new Date().toISOString();
  const updatedDraft: Draft = {
    ...draft,
    updatedAt: now,
    createdAt: draft.createdAt || now,
  };

  try {
    const db = await openDatabase();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_DRAFTS, 'readwrite');
      const store = tx.objectStore(STORE_DRAFTS);
      const request = store.put(updatedDraft);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.warn('IndexedDB write error, saving to localStorage:', err);
  }

  // Always keep localStorage synced as secondary backup
  const current = getFallbackDrafts();
  const index = current.findIndex((d) => d.id === updatedDraft.id);
  if (index >= 0) {
    current[index] = updatedDraft;
  } else {
    current.unshift(updatedDraft);
  }
  localStorage.setItem(LOCAL_STORAGE_DRAFTS_KEY, JSON.stringify(current));

  return updatedDraft;
}

export async function saveAllDrafts(drafts: Draft[]): Promise<void> {
  try {
    const db = await openDatabase();
    const tx = db.transaction(STORE_DRAFTS, 'readwrite');
    const store = tx.objectStore(STORE_DRAFTS);
    store.clear();
    for (const d of drafts) {
      store.put(d);
    }
  } catch (err) {
    console.warn('IndexedDB saveAll failed:', err);
  }
  localStorage.setItem(LOCAL_STORAGE_DRAFTS_KEY, JSON.stringify(drafts));
}

export async function deleteDraft(id: string): Promise<void> {
  try {
    const db = await openDatabase();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_DRAFTS, 'readwrite');
      const store = tx.objectStore(STORE_DRAFTS);
      const request = store.delete(id);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.warn('IndexedDB delete error:', err);
  }

  const current = getFallbackDrafts().filter((d) => d.id !== id);
  localStorage.setItem(LOCAL_STORAGE_DRAFTS_KEY, JSON.stringify(current));
}

export async function getSettings(): Promise<AppSettings> {
  try {
    const db = await openDatabase();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_SETTINGS, 'readonly');
      const store = tx.objectStore(STORE_SETTINGS);
      const request = store.get('main_settings');

      request.onsuccess = () => {
        if (request.result && request.result.data) {
          resolve(request.result.data as AppSettings);
        } else {
          resolve(getFallbackSettings());
        }
      };

      request.onerror = () => resolve(getFallbackSettings());
    });
  } catch {
    return getFallbackSettings();
  }
}

function getFallbackSettings(): AppSettings {
  const raw = localStorage.getItem(LOCAL_STORAGE_SETTINGS_KEY);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {
      // ignore
    }
  }
  return DEFAULT_SETTINGS;
}

export async function saveSettings(settings: AppSettings): Promise<AppSettings> {
  try {
    const db = await openDatabase();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_SETTINGS, 'readwrite');
      const store = tx.objectStore(STORE_SETTINGS);
      const request = store.put({ id: 'main_settings', data: settings });

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.warn('IndexedDB saveSettings failed:', err);
  }

  localStorage.setItem(LOCAL_STORAGE_SETTINGS_KEY, JSON.stringify(settings));
  return settings;
}

// Export All Data to JSON
export async function exportDataJSON(): Promise<string> {
  const drafts = await getAllDrafts();
  const settings = await getSettings();

  const backup: BackupData = {
    version: '1.0.0',
    exportedAt: new Date().toISOString(),
    drafts,
    settings,
  };

  return JSON.stringify(backup, null, 2);
}

// Import JSON with Schema Validation
export async function importDataJSON(jsonString: string): Promise<{ success: boolean; importedCount: number; message: string }> {
  try {
    const parsed = JSON.parse(jsonString);

    if (!parsed || typeof parsed !== 'object') {
      return { success: false, importedCount: 0, message: 'فایل واردشده ساختار JSON معتبری ندارد.' };
    }

    let draftsToImport: Draft[] = [];
    if (Array.isArray(parsed.drafts)) {
      draftsToImport = parsed.drafts;
    } else if (Array.isArray(parsed)) {
      draftsToImport = parsed;
    } else {
      return { success: false, importedCount: 0, message: 'فرمت پشتیبان نامعتبر است (آرایه پیش‌نویس‌ها یافت نشد).' };
    }

    // Validate draft fields
    const validDrafts: Draft[] = draftsToImport.filter((d: any) => {
      return d && typeof d === 'object' && typeof d.id === 'string' && typeof d.title === 'string';
    }).map((d: any) => ({
      id: d.id || `draft-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      title: d.title || 'پیش‌نویس بدون عنوان',
      businessName: d.businessName || 'استودیو توانا',
      categoryId: d.categoryId || 'ecommerce',
      contentType: d.contentType || 'محتوای عمومی',
      tone: d.tone || 'حرفه‌ای',
      targetAudience: d.targetAudience || 'مخاطب عام',
      content: d.content || '',
      keywords: Array.isArray(d.keywords) ? d.keywords : [],
      notes: d.notes || '',
      parameters: d.parameters || {},
      status: d.status === 'final' || d.status === 'in_review' ? d.status : 'draft',
      isFavorite: Boolean(d.isFavorite),
      createdAt: d.createdAt || new Date().toISOString(),
      updatedAt: d.updatedAt || new Date().toISOString(),
    }));

    if (validDrafts.length === 0) {
      return { success: false, importedCount: 0, message: 'هیچ پیش‌نویس معتبری در فایل یافت نشد.' };
    }

    const existingDrafts = await getAllDrafts();
    // Merge by id (existing ones get updated, new ones appended)
    const mergedMap = new Map<string, Draft>();
    existingDrafts.forEach((d) => mergedMap.set(d.id, d));
    validDrafts.forEach((d) => mergedMap.set(d.id, d));

    const finalDrafts = Array.from(mergedMap.values());
    await saveAllDrafts(finalDrafts);

    if (parsed.settings && typeof parsed.settings === 'object') {
      await saveSettings({
        ...DEFAULT_SETTINGS,
        ...parsed.settings,
        lastBackupDate: new Date().toISOString(),
      });
    }

    return {
      success: true,
      importedCount: validDrafts.length,
      message: `${validDrafts.length} پیش‌نویس با موفقیت بازگردانی شد.`,
    };
  } catch (err: any) {
    return {
      success: false,
      importedCount: 0,
      message: `خطا در خواندن فایل JSON: ${err?.message || 'فرمت فایلی نامعتبر'}`,
    };
  }
}
