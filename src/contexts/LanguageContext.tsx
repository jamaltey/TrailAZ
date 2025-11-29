import React, { createContext, useContext, useEffect, useState } from 'react';
import i18n from '../i18n';
import { Language, translations } from '../translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>((i18n.language as Language) || 'en');

  useEffect(() => {
    const saved = localStorage.getItem('language') as Language;
    if (saved && ['en', 'ru', 'az'].includes(saved)) {
      i18n.changeLanguage(saved);
      setLanguageState(saved);
    }

    const handler = (lng: string) => setLanguageState(lng as Language);
    i18n.on('languageChanged', handler);
    return () => {
      i18n.off('languageChanged', handler);
    };
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: i18n.getResourceBundle(language, 'translation') || (translations as any)[language],
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
