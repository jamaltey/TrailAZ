import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AccessibilityPanel } from './components/AccessibilityPanel';
import { ChatAssistant } from './components/ChatAssistant';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import './index.css';
import { AppRoutes } from './router';

type Page = 'home' | 'mountains' | 'activities' | 'planner' | 'faq' | 'auth' | 'profile';
type TextSize = 'normal' | 'large' | 'xlarge';

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const [plannerData, setPlannerData] = React.useState<any>(null);
  const [textSize, setTextSize] = React.useState<TextSize>('normal');
  const [highContrast, setHighContrast] = React.useState(false);
  const [dyslexiaFont, setDyslexiaFont] = React.useState(false);

  const pathToPage: Record<string, Page> = {
    '/': 'home',
    '/mountains': 'mountains',
    '/activities': 'activities',
    '/planner': 'planner',
    '/faq': 'faq',
    '/auth': 'auth',
    '/profile': 'profile',
  };

  const pageToPath: Record<Page, string> = {
    home: '/',
    mountains: '/mountains',
    activities: '/activities',
    planner: '/planner',
    faq: '/faq',
    auth: '/auth',
    profile: '/profile',
  };

  const currentPage = pathToPage[location.pathname as keyof typeof pathToPage] || 'home';

  const handleNavigate = (page: string, data?: any) => {
    const target = pageToPath[(page as Page) || 'home'] || '/';
    if (data) {
      setPlannerData(data);
    }
    navigate(target, { state: data });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTextSizeChange = (size: TextSize) => {
    setTextSize(size);
    const root = document.documentElement;
    switch (size) {
      case 'large':
        root.style.setProperty('--font-size', '18px');
        break;
      case 'xlarge':
        root.style.setProperty('--font-size', '20px');
        break;
      default:
        root.style.setProperty('--font-size', '16px');
    }
  };

  const handleContrastToggle = () => {
    setHighContrast(!highContrast);
  };

  const handleDyslexiaFontToggle = () => {
    setDyslexiaFont(!dyslexiaFont);
  };

  React.useEffect(() => {
    if (highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }, [highContrast]);

  React.useEffect(() => {
    if (dyslexiaFont) {
      document.body.classList.add('dyslexia-font');
    } else {
      document.body.classList.remove('dyslexia-font');
    }
  }, [dyslexiaFont]);

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onHighContrastToggle={handleContrastToggle}
        highContrast={highContrast}
      />

      <main>
        <AppRoutes onNavigate={handleNavigate} plannerData={plannerData} />
      </main>

      <Footer onNavigate={handleNavigate} />

      <AccessibilityPanel
        onTextSizeChange={handleTextSizeChange}
        onContrastToggle={handleContrastToggle}
        onDyslexiaFontToggle={handleDyslexiaFontToggle}
        textSize={textSize}
        highContrast={highContrast}
        dyslexiaFont={dyslexiaFont}
      />

      <ChatAssistant />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </LanguageProvider>
  );
}
