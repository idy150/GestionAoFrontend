import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import HomePage from './components/HomePage';
import { LoginPage } from './components/auth/LoginPage';
import { Layout } from './components/layout/Layout';
import Dashboard from './components/dashboard/Dashboard';
import { PhaseContent } from './components/phases/PhaseContent';

function App() {
  return (
    <Router>
      <AppProvider> {/* Déplacé ici pour couvrir toute l'application */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard/*"
          element={
            <Layout> {/* Layout seulement pour les routes dashboard */}
              <Routes>
                <Route index element={<Dashboard />} />
                <Route path="project/:projectId" element={<PhaseContent />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </Layout>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} /> {/* Catch-all route */}
      </Routes>
      </AppProvider>
    </Router>
  );
}

export default App;