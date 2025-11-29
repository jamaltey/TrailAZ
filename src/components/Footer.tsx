import { Mountain } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const { t } = useTranslation();

  return (
    <footer className="mt-20 border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="mb-4 flex items-center gap-2">
              <Mountain className="h-8 w-8" style={{ color: 'var(--teal-primary)' }} />
              <span className="text-xl" style={{ fontWeight: 600 }}>
                TrailAZ
              </span>
            </div>
            <p className="mb-4 text-gray-600">{t('footer.description')}</p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="bg-teal-primary rounded-full px-3 py-1 text-white">
                {t('footer.prototype')}
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-gray-900">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-teal-primary text-gray-600 transition-colors"
                >
                  {t('nav.home')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('mountains')}
                  className="hover:text-teal-primary text-gray-600 transition-colors"
                >
                  {t('nav.mountains')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('planner')}
                  className="hover:text-teal-primary text-gray-600 transition-colors"
                >
                  {t('nav.planner')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('faq')}
                  className="hover:text-teal-primary text-gray-600 transition-colors"
                >
                  {t('nav.faq')}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Language */}
          <div>
            <h4 className="mb-4 text-gray-900">{t('footer.contactUs')}</h4>
            <ul className="mb-6 space-y-2">
              <li className="text-gray-600">{t('footer.about')}</li>
              <li className="text-gray-600">{t('footer.contactUs')}</li>
              <li className="text-gray-600">{t('footer.accessibility')}</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8 text-center text-sm text-gray-500">
          <p>© 2025 TrailAZ. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
}
