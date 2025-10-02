'use client';

import { useState } from 'react';
import { createGuestUser } from '../services/auth';

interface GuestModePromptProps {
  onGuestCreated: () => void;
  onBack: () => void;
}

export default function GuestModePrompt({ onGuestCreated, onBack }: GuestModePromptProps) {
  const [tempUsername, setTempUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await createGuestUser(tempUsername);
    setLoading(false);

    if (result.success) {
      onGuestCreated();
    } else {
      setError(result.error || 'An error occurred');
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F4ED] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-black italic mb-2">Guest</h1>
          <h2 className="text-5xl font-black italic text-gray-900">Mode</h2>
        </div>

        <div className="bg-[#FFDA57] rounded-3xl p-8 border-4 border-white shadow-lg">
          <h3 className="text-2xl font-black text-center mb-4">
            Choose a Display Name
          </h3>

          <p className="text-center mb-6 font-medium">
            Your progress won&apos;t be saved permanently
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                value={tempUsername}
                onChange={(e) => setTempUsername(e.target.value)}
                className="w-full px-6 py-4 rounded-full border-4 border-white focus:border-blue-400 focus:outline-none font-bold text-lg text-center"
                placeholder="Enter your name"
                required
                maxLength={20}
              />
            </div>

            {error && (
              <div className="bg-red-100 border-2 border-red-400 rounded-full px-4 py-2 text-center">
                <p className="text-red-700 font-medium text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white font-bold py-4 px-6 rounded-full hover:bg-gray-900 transition-colors disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Start Playing ▶'}
            </button>

            <button
              type="button"
              onClick={onBack}
              className="w-full bg-white text-black font-bold py-4 px-6 rounded-full hover:bg-gray-100 transition-colors"
            >
              ← Back to Login
            </button>
          </form>
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>💡 Tip: Sign up for an account to save your progress!</p>
        </div>
      </div>
    </div>
  );
}
