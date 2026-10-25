import { GoogleGenAI } from '@google/genai';

export interface GenerateParams {
  businessName: string;
  categoryName: string;
  contentType: string;
  tone: string;
  targetAudience: string;
  promptDescription: string;
  keywords: string[];
  apiKey?: string;
  actionType?: 'generate' | 'shorten' | 'expand' | 'formal' | 'friendly' | 'hashtags';
}

export async function generateStudioContent(params: GenerateParams): Promise<string> {
  const apiKey = params.apiKey || import.meta.env.VITE_GEMINI_API_KEY || (window as any).GEMINI_API_KEY || '';

  const promptText = buildPersianPrompt(params);

  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: promptText,
      });

      if (response && response.text) {
        return response.text.trim();
      }
    } catch (err) {
      console.warn('Gemini API call warning/fallback:', err);
    }
  }

  // Fallback intelligent draft builder if API key is not supplied or during offline preview
  return simulatePersianContentGeneration(params);
}

function buildPersianPrompt(p: GenerateParams): string {
  const action = p.actionType || 'generate';

  let instructions = '';
  switch (action) {
    case 'shorten':
      instructions = 'لطفاً متن زیر را خلاصه‌تر و فشرده‌تر کنید، اما پیام اصلی و جذابیت آن حفظ شود.';
      break;
    case 'expand':
      instructions = 'لطفاً متن زیر را با جزئیات بیشتر، مثال‌های کاربردی و فراخوان به عمل (CTA) قوی‌تر بسط دهید.';
      break;
    case 'formal':
      instructions = 'لحن متن را کاملاً رسمی، فاخر، محترمانه و مناسب B2B یا نامه‌های اداری کنید.';
      break;
    case 'friendly':
      instructions = 'لحن متن را صمیمی، دوستانه، پرانرژی و جذاب برای شبکه‌های اجتماعی کنید.';
      break;
    case 'hashtags':
      instructions = 'برای محتوای زیر، مجموعه‌ای از بهترین هشتگ‌های پربازدید و مرتبط فارسی بنویسید.';
      break;
    default:
      instructions = `شما یک کپی‌رایتر فوق‌حرفه‌ای و استراتژیست محتوای فارسی در استودیو توانا هستید.
لطفاً یک متن محتوایی عالی، جذاب، روان و کاملاً بدون غلط نگارشی بر اساس مشخصات زیر بنویسید:

🏢 نام کسب‌وکار: ${p.businessName || 'استودیو توانا'}
📂 دسته‌بندی: ${p.categoryName || 'عمومی'}
📝 نوع محتوا: ${p.contentType || 'پست اطلاع‌رسانی'}
🎭 لحن بیان: ${p.tone || 'حرفه‌ای و متقاعدکننده'}
👥 مخاطبان هدف: ${p.targetAudience || 'مخاطبان عمومی'}
📌 کلمات کلیدی اصلی: ${p.keywords.length > 0 ? p.keywords.join('، ') : 'بدون کلمه کلیدی خاص'}
💡 توضیح و هدف اصلی: ${p.promptDescription || 'تولید محتوای جذاب'}

قواعد مهم:
۱. متن باید مستقیم، اثرگذار و با رعایت کامل قواعد نگارش زبان فارسی باشد.
۲. از ساختار تمیز، تیتربندی مناسب و استفاده به‌اندازه از شکلک‌ها (ایموجی) استفاده کنید.
۳. در پایان متن، فراخوان به عمل (Call to Action) روشن و ترغیب‌کننده‌ای قرار دهید.`;
  }

  return instructions;
}

function simulatePersianContentGeneration(p: GenerateParams): string {
  const bName = p.businessName || 'کسب‌وکار شما';
  const cType = p.contentType || 'محتوای خلاقانه';
  const tone = p.tone || 'حرفه‌ای';
  const audience = p.targetAudience || 'مخاطبان هدف';
  const keywordsStr = p.keywords.length > 0 ? p.keywords.join('، ') : 'کیفیت و نوآوری';

  return `✨ ${cType} اختصاصی برای ${bName}

باسلام و احترام،

در مجموعه ${bName}، ما همواره متعهد به ارائه بهترین کیفیت و ایده‌های نوآورانه به شما مخاطبان ارزشمند هستیم.

📌 چرا ${bName} انتخاب اول شماست؟
• کیفیت برتر و استانداردهای روز
• پاسخگویی و پشتیبانی دائم
• تمرکز ویژه بر ${keywordsStr}

🎯 ویژه ${audience}:
اگر به دنبال تجربه‌ای متفاوت با لحنی ${tone} و خدماتی بی‌نقص هستید، همین امروز همراه ما باشید.

💡 جهت کسب اطلاعات بیشتر و مشاوره اختصاصی:
با ما در ارتباط باشید یا پیام بگذارید.

#${bName.replace(/\s+/g, '_')} #${p.categoryName.replace(/\s+/g, '_')} #تولید_محتوا #استودیو_توانا`;
}
