import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { api } from '@/services/api';
export default function Login() {
  const [email, setEmail] = useState('testuser@gmail.com');
  const [password, setPassword] = useState('Test@1234');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await api.auth.login(email, password);
      if (data.token) {
        login(data.token, data.user);
        navigate('/');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-neutral-950">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow dark:bg-black">
        <h2 className="text-center text-3xl font-bold dark:text-white">Sign in</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form className="mt-8 space-y-6 dark:text-white" onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" className="w-full">
            Sign in
          </Button>
        </form>
        <p className="text-sm text-center text-neutral-600">
          Don't have an account?{' '}
          <a
            href="/register"
            className="text-blue-600 hover:underline font-medium"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
} 