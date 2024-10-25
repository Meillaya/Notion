import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { z } from 'zod';
import { toast } from 'react-hot-toast';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { loginUser } from '../../lib/api';
import { useAuthStore } from '../../store/auth';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const LoginForm = () => {
  const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.setToken);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      const validatedData = loginSchema.parse(formData);
      setLoading(true);

      const { token } = await loginUser(validatedData);
      setToken(token);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path) {
            newErrors[err.path[0]] = err.message;
          }
        });
        setErrors(newErrors);
      } else {
        toast.error('Invalid email or password');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email address
        </label>
        <div className="mt-1 relative">
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="you@example.com"
          />
          <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-2" />
        </div>
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="mt-1 relative">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="appearance-none block w-full px-3 py-2 pl-10 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-2" />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2 text-gray-400 hover:text-gray-500"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password}</p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm">
          <Link
            to="/forgot-password"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Forgot your password?
          </Link>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Signing in...' : 'Sign in'}
      </button>

      <div className="text-sm text-center">
        <span className="text-gray-500">Don't have an account?</span>{' '}
        <Link
          to="/register"
          className="font-medium text-blue-600 hover:text-blue-500"
        >
          Sign up
        </Link>
      </div>
    </form>
  );
};