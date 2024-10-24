import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/auth';
import AuthLayout from './components/auth/AuthLayout';
import Dashboard from './components/Dashboard.tsx';
import Login from './components/auth/Login';
import Verify from './components/auth/Verify';

function App() {
  const { token } = useAuthStore();

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={!token ? <Login /> : <Navigate to="/" />} />
          <Route path="/verify" element={!token ? <Verify /> : <Navigate to="/" />} />
        </Route>
        <Route
          path="/*"
          element={token ? <Dashboard /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;