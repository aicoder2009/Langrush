'use client';

import { useState, useEffect } from 'react';
import { getPersonalBests, type PersonalBests } from '../services/scoreManager';
import { getLeaderboard, getCurrentUser, getCurrentStreak, type LeaderboardEntry } from '../services/leaderboard';

interface HomePageProps {
  onSelectMode: (mode: string) => void;
}

export default function HomePage({ onSelectMode }: HomePageProps) {
  const [personalBests, setPersonalBests] = useState<PersonalBests>({});
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [currentUser, setCurrentUser] = useState<string>('');
  const [currentStreak, setCurrentStreak] = useState<number>(0);
  const [showLeaderboard, setShowLeaderboard] = useState<boolean>(false);

  useEffect(() => {
    setPersonalBests(getPersonalBests());
    setLeaderboard(getLeaderboard());
    setCurrentUser(getCurrentUser());
    setCurrentStreak(getCurrentStreak());
  }, []);

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const modes = [
    {
      id: 'sprint',
      name: 'Sprint',
      icon: '🏃',
      description: '10 questions'
    },
    {
      id: 'zen',
      name: 'Zen',
      icon: '🧘',
      description: 'No timer'
    },
    {
      id: 'endless',
      name: 'Endless',
      icon: '♾️',
      description: '3 lives'
    }
  ];

  const modeColors = {
    sprint: 'from-orange-400 to-orange-500',
    zen: 'from-blue-400 to-blue-500',
    endless: 'from-green-400 to-green-500'
  };

  return (
    <div className="min-h-screen bg-[#F5F4ED] p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center py-8 mb-8">
          <h1 className="text-6xl font-black italic mb-2">
            Pick Game
          </h1>
          <h2 className="text-6xl font-black italic text-gray-900">
            To Play
          </h2>
          {currentStreak > 0 && (
            <div className="mt-4 inline-block text-lg font-bold text-orange-600">
              🔥 {currentStreak} day streak
            </div>
          )}
        </div>

        {/* Game Modes Grid */}
        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          {modes.map((mode) => (
            <div
              key={mode.id}
              className={`relative bg-gradient-to-br ${modeColors[mode.id as keyof typeof modeColors]} rounded-3xl p-8 border-4 border-white shadow-lg overflow-hidden`}
            >
              <div className="relative z-10">
                <div className="bg-white rounded-full px-6 py-3 inline-block mb-4">
                  <h3 className="text-2xl font-black">{mode.name}</h3>
                </div>
                <div className="text-7xl mb-4">{mode.icon}</div>
                <p className="text-white font-medium mb-6">{mode.description}</p>
                <button
                  onClick={() => onSelectMode(mode.id)}
                  className="w-full bg-black text-white font-bold py-4 px-6 rounded-full hover:bg-gray-900 transition-colors flex items-center justify-center gap-2"
                >
                  Play Game ▶
                </button>
              </div>
              {/* Decorative stars */}
              <div className="absolute top-4 right-4 text-white text-2xl">✦</div>
            </div>
          ))}
        </div>

        {/* Leaderboard Toggle */}
        <div className="text-center mb-8">
          <button
            onClick={() => setShowLeaderboard(!showLeaderboard)}
            className="bg-white px-6 py-3 rounded-full font-bold shadow hover:shadow-md transition-all"
          >
            {showLeaderboard ? '▲ Hide' : '▼ View'} Leaderboard
          </button>
        </div>

        {/* Leaderboard Section */}
        {showLeaderboard && (
          <div className="max-w-md mx-auto mb-12">
            <div className="bg-yellow-300 rounded-3xl p-6 border-4 border-white shadow-lg">
              <h2 className="text-2xl font-black text-center mb-6">
                🏆 Top Players
              </h2>
              <div className="space-y-2">
                {leaderboard.length === 0 ? (
                  <p className="text-center text-gray-700 py-8">No players yet!</p>
                ) : (
                  leaderboard.slice(0, 10).map((entry, index) => (
                    <div
                      key={entry.username}
                      className={`${
                        entry.username === currentUser
                          ? 'bg-green-400'
                          : 'bg-white'
                      } rounded-full px-5 py-3 flex items-center justify-between`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-black text-gray-900 w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-sm">
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span className="font-medium text-gray-900">
                          {entry.username}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {entry.streak > 0 && (
                          <span className="text-sm">🔥{entry.streak}</span>
                        )}
                        <span className="font-bold text-gray-900">{entry.totalScore}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center text-sm text-gray-600 pb-6">
          Made with ❤️ in Arizona 🌵 by{' '}
          <a
            href="https://github.com/aicoder2009"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold hover:underline"
          >
            Karthick Arun
          </a>
        </footer>
      </div>
    </div>
  );
}
