import { createI18n } from 'vue-i18n';
import zhCN from './locales/zh-CN.json';
import enUS from './locales/en-US.json';

// 支持的语言类型
export type Locale = 'zh-CN' | 'en-US';

// 消息对象
const messages = {
  'zh-CN': zhCN,
  'en-US': enUS,
};

// 创建 i18n 实例
export const i18n = createI18n({
  legacy: false,
  locale: 'zh-CN',
  fallbackLocale: 'zh-CN',
  messages,
});

// 获取浏览器语言
export function getBrowserLocale(): Locale {
  const browserLang = navigator.language || (navigator as any).userLanguage;
  if (browserLang.startsWith('zh')) {
    return 'zh-CN';
  }
  return 'en-US';
}

// 保存语言设置
export async function saveLocale(locale: Locale): Promise<void> {
  if (typeof chrome !== 'undefined' && chrome.storage) {
    await chrome.storage.local.set({ locale });
  }
}

// 加载语言设置
export async function loadLocale(): Promise<Locale> {
  if (typeof chrome !== 'undefined' && chrome.storage) {
    const result = await chrome.storage.local.get('locale');
    if (result.locale) {
      return result.locale as Locale;
    }
  }
  return getBrowserLocale();
}

// 切换语言
export async function switchLocale(locale: Locale): Promise<void> {
  i18n.global.locale.value = locale;
  await saveLocale(locale);
}

// 清除语言设置（用于跟随浏览器）
export async function clearLocale(): Promise<void> {
  if (typeof chrome !== 'undefined' && chrome.storage) {
    await chrome.storage.local.remove('locale');
  }
  const browserLocale = getBrowserLocale();
  i18n.global.locale.value = browserLocale;
}
