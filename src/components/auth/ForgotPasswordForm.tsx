import { useState } from 'react';
import { z } from 'zod';
import { toast } from 'react-hot-toast';
import { Mail } from 'lucide-react';
import { requestPasswordReset } from '../../lib/api';

const emailSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      const validatedData = emailSchema.parse({ email });
      setLoading(true);

      await requestPasswordReset(validatedData.email);
      setSuccess(true);
      toast.success('Password reset instructions sent to your email');
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError(error.errors[0].message);
      } else {
        setError('Failed to send reset instructions. Please try again.');
        toast.error('Failed to send reset instructions');
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center">
        <h3 className="text-lg font-medium text-gray-900">Check your email</h3>
        <p className="mt-2 text-sm text-gray-500">
          We've sent password reset instructions to {email}
        </p>
      </div>
    );
  }

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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="you@example.com"
          />
          <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-2" />
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Sending instructions...' : 'Reset password'}
      </button>
    </form>
  );
};