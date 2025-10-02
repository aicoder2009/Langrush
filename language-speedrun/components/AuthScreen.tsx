'use client';

import { useState } from 'react';
import { registerUser, loginUser } from '../services/auth';

interface AuthScreenProps {
  onAuthenticated: () => void;
  onGuestMode: () => void;
}

export default function AuthScreen({ onAuthenticated, onGuestMode }: AuthScreenProps) {
  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = isLogin
      ? loginUser(username, password)
      : registerUser(username, password);

    setLoading(false);

    if (result.success) {
      onAuthenticated();
    } else {
      setError(result.error || 'An error occurred');
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  return (
    <div className="min-h-screen bg-[#F5F4ED] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-black italic text-gray-900">Linguarush</h1>
        </div>

        <div className="bg-white rounded-3xl p-8 border-4 border-gray-200 shadow-lg">
          <h3 className="text-2xl font-black text-center mb-6">
            {isLogin ? 'Login' : 'Sign Up'}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-bold mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-full border-2 border-gray-300 focus:border-blue-500 focus:outline-none font-medium"
                placeholder="Enter username"
                required
                minLength={3}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-bold mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-full border-2 border-gray-300 focus:border-blue-500 focus:outline-none font-medium"
                placeholder="Enter password"
                required
                minLength={4}
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
              className="w-full bg-blue-500 text-white font-bold py-4 px-6 rounded-full hover:bg-blue-600 transition-colors disabled:opacity-50"
            >
              {loading ? 'Please wait...' : isLogin ? 'Login' : 'Sign Up'}
            </button>
          </form>

          <div className="mt-4 text-center">
            <button
              onClick={toggleMode}
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : 'Already have an account? Log in'}
            </button>
          </div>

          <div className="mt-6 pt-6 border-t-2 border-gray-200">
            <button
              onClick={onGuestMode}
              className="w-full bg-gray-100 text-gray-900 font-bold py-4 px-6 rounded-full hover:bg-gray-200 transition-colors"
            >
              Continue as Guest
            </button>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Create an account to save your progress!</p>
        </div>
      </div>
    </div>
  );
}
