'use client';

import { useState } from 'react';
import { createGuestUser } from '../services/auth';

interface AuthScreenProps {
  onAuthenticated: () => void;
}

export default function AuthScreen({ onAuthenticated }: AuthScreenProps) {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (username.trim().length < 2) {
      setError('Name must be at least 2 characters');
      return;
    }

    const result = createGuestUser(username.trim());

    if (result.success) {
      onAuthenticated();
    } else {
      setError(result.error || 'An error occurred');
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F4ED] flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        {/* Retro Header */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-black italic text-gray-900 mb-4">Linguarush</h1>
          <div className="bg-gradient-to-br from-purple-400 to-purple-500 rounded-2xl p-6 border-4 border-white shadow-lg">
            <p className="text-white font-bold text-lg mb-2">🎮 Welcome to the Guestbook! 🎮</p>
            <p className="text-white text-sm opacity-90">Sign your name to join the fun!</p>
          </div>
        </div>

        {/* Guestbook Card */}
        <div className="bg-white rounded-3xl p-8 border-4 border-gray-200 shadow-lg">
          <div className="text-center mb-6">
            <h3 className="text-3xl font-black mb-2">✍️ Sign the Guestbook</h3>
            <p className="text-gray-600 text-sm">Enter your name to start playing!</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-bold mb-2 text-gray-700">
                Your Name
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-6 py-4 text-lg rounded-full border-4 border-gray-300 focus:border-purple-500 focus:outline-none font-medium"
                placeholder="Enter your name..."
                required
                minLength={2}
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
              className="w-full bg-gradient-to-br from-green-400 to-green-500 text-white font-black text-xl py-4 px-6 rounded-full hover:from-green-500 hover:to-green-600 transition-all border-4 border-white shadow-lg"
            >
              Let's Play! 🚀
            </button>
          </form>

          <div className="mt-6 pt-6 border-t-2 border-gray-200">
            <p className="text-center text-xs text-gray-500">
              💾 Your scores are saved locally on this device
            </p>
          </div>
        </div>

        {/* Retro Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 font-medium">
            🌟 No passwords, no hassle - just games! 🌟
          </p>
        </div>
      </div>
    </div>
  );
}
