import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import { ActivitiesPage } from './pages/ActivitiesPage';
import { FAQPage } from './pages/FAQPage';
import { HomePage } from './pages/HomePage';
import { MountainsPage } from './pages/MountainsPage';
import { PlannerPage } from './pages/PlannerPage';

type AppRoutesProps = {
  onNavigate: (page: string, data?: any) => void;
  plannerData: any;
};

export function AppRoutes({ onNavigate, plannerData }: AppRoutesProps) {
  const location = useLocation();
  const state = (location.state as any) ?? plannerData;

  return (
    <Routes>
      <Route path="/" element={<HomePage onNavigate={onNavigate} />} />
      <Route
        path="/mountains"
        element={<MountainsPage onNavigate={onNavigate} filterData={state} />}
      />
      <Route path="/activities" element={<ActivitiesPage onNavigate={onNavigate} />} />
      <Route
        path="/planner"
        element={<PlannerPage preselectedMountain={state?.selectedMountain} />}
      />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
