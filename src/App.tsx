import { Routes, Route, Navigate } from 'react-router-dom';

import { Layout } from './components/Layout/Layout';
import { VacanciesLayout } from './pages/VacanciesLayout';
import { VacanciesPage } from './pages/VacanciesPage';
import { AboutPage } from './pages/AboutPage';
import VacancyPage from './pages/VacancyPage';
import { NotFoundPage } from './pages/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/vacancies/moscow" replace />} />

      
        <Route path="vacancies" element={<VacanciesLayout />}>
          <Route index element={<Navigate to="moscow" replace />} />
          <Route path=":city" element={<VacanciesPage />} />
        </Route>

       
        <Route path="vacancy/:id" element={<VacancyPage />} />

        <Route path="about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;