import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await api.auth.register(name, email, password);
      if (response.token && response.user) {
        login(response.token, response.user);
        navigate('/');
      } else {
        setError(response.message || 'Registration failed');
      }
    } catch (err) {
      setError('Failed to register. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg dark:bg-black">
        <h1 className="text-2xl font-bold text-center text-neutral-900 dark:text-white">Create an Account</h1>
        {error && (
          <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4 dark:text-white">
          <Input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
            Sign up
          </Button>
        </form>
        <p className="text-sm text-center text-neutral-600">
          Already have an account?{' '}
          <a
            href="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
} 