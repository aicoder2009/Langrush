'use client';

import { useState, useEffect } from 'react';
import { createGuestUser } from '../services/auth';

interface AuthScreenProps {
  onAuthenticated: () => void;
}

export default function AuthScreen({ onAuthenticated }: AuthScreenProps) {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [recentPlayers, setRecentPlayers] = useState<{ username: string; timestamp: number }[]>([]);

  useEffect(() => {
    // Fetch recent players from the guestbook
    const fetchRecentPlayers = async () => {
      try {
        const response = await fetch('/api/guestbook');
        const data = await response.json();
        if (data.guestbook) {
          // Get the last 5 players, sorted by most recent
          const recent = data.guestbook
            .sort((a: { timestamp: number }, b: { timestamp: number }) => b.timestamp - a.timestamp)
            .slice(0, 5);
          setRecentPlayers(recent);
        }
      } catch (error) {
        console.error('Failed to fetch recent players:', error);
      }
    };

    fetchRecentPlayers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (username.trim().length < 2) {
      setError('Name must be at least 2 characters');
      return;
    }

    setLoading(true);
    const result = await createGuestUser(username.trim());
    setLoading(false);

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
            {/* Recent Players Section */}
            {recentPlayers.length > 0 && (
              <div className="mb-6 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border-2 border-blue-200">
                <h4 className="text-sm font-bold text-gray-700 mb-3 text-center">
                  🌟 Recent Players 🌟
                </h4>
                <div className="flex flex-wrap gap-2 justify-center">
                  {recentPlayers.map((player, index) => (
                    <div
                      key={index}
                      className="px-3 py-1.5 bg-white rounded-full border-2 border-purple-300 text-sm font-medium text-gray-700 shadow-sm"
                    >
                      {player.username}
                    </div>
                  ))}
                </div>
              </div>
            )}

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
              disabled={loading}
              className="w-full bg-gradient-to-br from-green-400 to-green-500 text-white font-black text-xl py-4 px-6 rounded-full hover:from-green-500 hover:to-green-600 transition-all border-4 border-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : "Let's Play! 🚀"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t-2 border-gray-200">
            <p className="text-center text-xs text-gray-500">
              🌐 Your name and scores are saved online!
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
