import {
  Menu as HeadlessMenu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react';
import { Globe, Menu, Mountain, Search, X } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onHighContrastToggle: () => void;
  highContrast: boolean;
}

export function Header({
  currentPage,
  onNavigate,
  onHighContrastToggle,
  highContrast,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const { t, i18n } = useTranslation();
  const { user } = useAuth();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: t('nav.home') },
    { id: 'mountains', label: t('nav.mountains') },
    { id: 'activities', label: t('nav.activities') },
    { id: 'planner', label: t('nav.planner') },
    { id: 'faq', label: t('nav.faq') },
  ];

  const authLabel = t('nav.auth', { defaultValue: 'Log in' });

  const languages = [
    { code: 'en' as const, label: 'EN', name: 'English' },
    { code: 'ru' as const, label: 'RU', name: 'Русский' },
    { code: 'az' as const, label: 'AZ', name: 'Azərbaycan' },
  ];

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'border-b border-gray-200 bg-white/95 shadow-md backdrop-blur-md'
          : currentPage === 'home'
            ? 'bg-transparent'
            : 'border-b border-gray-200 bg-white/70 backdrop-blur-md'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <Mountain className="h-8 w-8" style={{ color: 'var(--teal-primary)' }} />
            <span
              className={`text-xl ${!isScrolled && currentPage === 'home' ? 'text-white' : 'text-gray-900'}`}
              style={{ fontWeight: 600 }}
            >
              TrailAZ
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-6 lg:flex">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`transition-colors ${
                  currentPage === item.id
                    ? 'text-teal-primary'
                    : !isScrolled && currentPage === 'home'
                      ? 'hover:text-teal-lighter text-white'
                      : 'hover:text-teal-primary text-gray-700'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="hidden items-center gap-3 lg:flex">
            {!user ? (
              <button
                onClick={() => onNavigate('auth')}
                className={`rounded-full px-4 py-2 text-sm font-semibold shadow-sm transition ${
                  currentPage === 'auth'
                    ? 'bg-teal-primary text-white shadow-md shadow-emerald-200/40'
                    : !isScrolled && currentPage === 'home'
                      ? 'bg-white/20 text-white hover:bg-white/30'
                      : 'bg-teal-50 text-teal-700 hover:bg-teal-100'
                }`}
              >
                {authLabel}
              </button>
            ) : (
              <button
                onClick={() => onNavigate('profile')}
                className={`rounded-full px-4 py-2 text-sm font-semibold shadow-sm transition ${
                  currentPage === 'profile'
                    ? 'bg-teal-primary text-white shadow-md shadow-emerald-200/40'
                    : !isScrolled && currentPage === 'home'
                      ? 'bg-white/20 text-white hover:bg-white/30'
                      : 'bg-teal-50 text-teal-700 hover:bg-teal-100'
                }`}
              >
                {t('nav.profile', { defaultValue: 'Profile' })}
              </button>
            )}

            {/* Search Button */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className={`rounded-lg p-2 transition-colors ${
                !isScrolled && currentPage === 'home'
                  ? 'text-white hover:bg-white/20'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Language Selector */}
            <HeadlessMenu as="div" className="relative">
              <MenuButton
                className={`flex items-center gap-2 rounded-lg px-3 py-2 transition-colors ${
                  !isScrolled && currentPage === 'home'
                    ? 'text-white hover:bg-white/20'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Globe className="h-5 w-5" />
                <span className="text-sm" style={{ fontWeight: 600 }}>
                  {languages.find(l => l.code === i18n.language)?.label}
                </span>
              </MenuButton>
              <Transition
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <MenuItems className="absolute right-0 top-12 min-w-[150px] rounded-lg border border-gray-200 bg-white py-2 shadow-xl focus:outline-none">
                  {languages.map(lang => (
                    <MenuItem key={lang.code}>
                      {({ active }) => (
                        <button
                          onClick={() => i18n.changeLanguage(lang.code)}
                          className={`w-full px-4 py-2 text-left transition-colors ${active ? 'bg-gray-100' : ''} ${
                            i18n.language === lang.code ? 'bg-teal-lighter text-teal-primary' : ''
                          }`}
                        >
                          <span
                            className="text-sm"
                            style={{ fontWeight: i18n.language === lang.code ? 600 : 400 }}
                          >
                            {lang.label} - {lang.name}
                          </span>
                        </button>
                      )}
                    </MenuItem>
                  ))}
                </MenuItems>
              </Transition>
            </HeadlessMenu>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`rounded-lg p-2 lg:hidden ${!isScrolled && currentPage === 'home' ? 'text-white' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="animate-fade-in-up pb-4">
            <input
              type="text"
              placeholder={t('mountains.searchPlaceholder')}
              className="focus:ring-teal-primary w-full rounded-xl border border-gray-300 bg-white px-4 py-3 focus:ring-2 focus:outline-none"
              autoFocus
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  onNavigate('mountains');
                  setSearchOpen(false);
                }
              }}
            />
          </div>
        )}

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="animate-fade-in-up border-gray-200 bg-white/95 p-4 rounded-md backdrop-blur-md lg:hidden">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full rounded-lg px-4 py-3 text-left transition-colors ${
                  currentPage === item.id ? 'bg-teal-primary text-white' : 'hover:bg-gray-100'
                }`}
              >
                {item.label}
              </button>
            ))}

            {!user ? (
              <button
                onClick={() => {
                  onNavigate('auth');
                  setMobileMenuOpen(false);
                }}
                className="bg-teal-primary hover:bg-teal-light mt-2 w-full rounded-lg px-4 py-3 text-white shadow transition-colors"
                style={{ fontWeight: 600 }}
              >
                {authLabel}
              </button>
            ) : (
              <button
                onClick={() => {
                  onNavigate('profile');
                  setMobileMenuOpen(false);
                }}
                className="bg-teal-primary hover:bg-teal-light mt-2 w-full rounded-lg px-4 py-3 text-white shadow transition-colors"
                style={{ fontWeight: 600 }}
              >
                {t('nav.profile', { defaultValue: 'Profile' })}
              </button>
            )}

            <div className="mt-4 space-y-2 border-t border-gray-200 pt-4">
              <div className="px-4 py-2 text-sm text-gray-600">
                {t('nav.language', { defaultValue: 'Language' })}
              </div>
              {languages.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => {
                    i18n.changeLanguage(lang.code);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full rounded-lg px-4 py-2 text-left transition-colors ${
                    i18n.language === lang.code
                      ? 'bg-teal-lighter text-teal-primary'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {lang.label} - {lang.name}
                </button>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
