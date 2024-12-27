import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Profile() {
  const { user, token, login } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [about, setAbout] = useState(user?.about || '');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    if (!token) {
      setError('You must be logged in to update your profile');
      setIsLoading(false);
      return;
    }

    try {
      const response = await api.user.updateProfile(token, {
        name,
        about,
      });

      if (response.user) {
        login(token, response.user);
        setSuccess('Profile updated successfully');
      } else {
        setError(response.message || 'Failed to update profile');
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-8">
        Profile Settings
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6 dark:text-neutral-100">
        {error && (
          <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-950/50 rounded-md">
            {error}
          </div>
        )}
        {success && (
          <div className="p-3 text-sm text-green-500 bg-green-50 dark:bg-green-950/50 rounded-md">
            {success}
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-900 dark:text dark:text-neutral-100">
            Name
          </label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
            About
          </label>
          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="w-full p-2 rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100"
            rows={4}
          />
        </div>
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? 'Saving...' : 'Save Changes'}
        </Button>
      </form>
    </div>
  );
} 