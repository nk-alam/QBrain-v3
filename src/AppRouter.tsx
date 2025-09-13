import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import AdminPanel from './admin/AdminPanel';
import BlogPage from './pages/BlogPage';
import BlogPost from './pages/BlogPost';
import AchievementsPage from './pages/AchievementsPage';
import AchievementDetailPage from './pages/AchievementDetailPage';
import TeamPage from './pages/TeamPage';
import ContactPage from './pages/ContactPage';
import JoinTeamPage from './pages/JoinTeamPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import DonatePage from './pages/DonatePage';
import ClickSoundProvider from './components/ClickSoundProvider';

const AppRouter = () => {

  return (
    <HelmetProvider>
      <Router>
        <ClickSoundProvider>
          <div>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/achievements" element={<AchievementsPage />} />
              <Route path="/achievements/:id" element={<AchievementDetailPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/projects/:slug" element={<ProjectDetailPage />} />
              <Route path="/team" element={<TeamPage />} />
              <Route path="/join" element={<JoinTeamPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/donate" element={<DonatePage />} />
              <Route path="/Qadmin" element={<AdminPanel />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
            </Routes>
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#1e293b',
                  color: '#fff',
                  border: '1px solid #334155'
                }
              }}
            />
          </div>
        </ClickSoundProvider>
      </Router>
    </HelmetProvider>
  );
};

export default AppRouter;