import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/auth';
import { useThemeStore } from './store/theme';
import { useEffect } from 'react';
import AuthLayout from './components/auth/AuthLayout';
import Dashboard from './components/Dashboard';
import Login from './components/auth/Login';
import Verify from './components/auth/Verify';
import LandingPage from './components/landing/LandingPage';

function App() {
  const { token } = useAuthStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={!token ? <LandingPage /> : <Navigate to="/workspace" />} />
        <Route element={<AuthLayout />}>
          <Route path="/login" element={!token ? <Login /> : <Navigate to="/workspace" />} />
          <Route path="/verify" element={!token ? <Verify /> : <Navigate to="/workspace" />} />
        </Route>
        <Route
          path="/workspace/*"
          element={token ? <Dashboard /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}