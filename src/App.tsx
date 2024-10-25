import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/auth';
import { useThemeStore } from './store/theme';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import AuthLayout from './components/auth/AuthLayout';
import Dashboard from './components/Dashboard';
import { LoginForm } from './components/auth/LoginForm';
import { RegisterForm } from './components/auth/RegisterForm';
import { ForgotPasswordForm } from './components/auth/ForgotPasswordForm';
import { ResetPasswordForm } from './components/auth/ResetPasswordForm';
import LandingPage from './components/landing/LandingPage';

function App() {
  const { token } = useAuthStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={!token ? <LandingPage /> : <Navigate to="/dashboard" />} />
          <Route element={<AuthLayout />}>
            <Route path="/login" element={!token ? <LoginForm /> : <Navigate to="/dashboard" />} />
            <Route path="/register" element={!token ? <RegisterForm /> : <Navigate to="/dashboard" />} />
            <Route path="/forgot-password" element={!token ? <ForgotPasswordForm /> : <Navigate to="/dashboard" />} />
            <Route path="/reset-password" element={!token ? <ResetPasswordForm /> : <Navigate to="/dashboard" />} />
          </Route>
          <Route
            path="/dashboard/*"
            element={token ? <Dashboard /> : <Navigate to="/login" />}
          />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" />
    </>
  );
}

export default App;