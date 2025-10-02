'use client';

import { useState, useEffect, memo, useCallback } from 'react';
import { getPersonalBests, type PersonalBests } from '../services/scoreManager';
import { getLeaderboard, getCurrentUser, getCurrentStreak, type LeaderboardEntry } from '../services/leaderboard';

interface HomePageProps {
  onSelectMode: (mode: string) => void;
}

const HomePage = memo(({ onSelectMode }: HomePageProps) => {
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
      id: 'timeattack',
      name: 'Time Attack',
      icon: '⏱️',
      description: '60 seconds'
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
    timeattack: 'from-red-400 to-red-500',
    zen: 'from-blue-400 to-blue-500',
    endless: 'from-green-400 to-green-500'
  };

  return (
    <div className="min-h-screen bg-[#F5F4ED] p-4 flex flex-col">
      <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="text-center py-4 mb-4">
          <h1 className="text-4xl sm:text-5xl font-black italic mb-1">
            Pick Game
          </h1>
          <h2 className="text-4xl sm:text-5xl font-black italic text-gray-900">
            To Play
          </h2>
          {currentStreak > 0 && (
            <div className="mt-2 inline-block text-base font-bold text-orange-600">
              🔥 {currentStreak} day streak
            </div>
          )}
        </div>

        {/* Game Modes Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {modes.map((mode) => (
            <div
              key={mode.id}
              className={`relative bg-gradient-to-br ${modeColors[mode.id as keyof typeof modeColors]} rounded-2xl p-4 sm:p-6 border-4 border-white shadow-lg overflow-hidden`}
            >
              <div className="relative z-10">
                <div className="bg-white rounded-full px-3 py-1 sm:px-4 sm:py-2 inline-block mb-2">
                  <h3 className="text-lg sm:text-xl font-black">{mode.name}</h3>
                </div>
                <div className="text-4xl sm:text-5xl mb-2">{mode.icon}</div>
                <p className="text-white font-medium text-sm mb-3">{mode.description}</p>
                <button
                  onClick={() => onSelectMode(mode.id)}
                  className="w-full bg-black text-white font-bold py-2 px-4 text-sm rounded-full hover:bg-gray-900 transition-colors flex items-center justify-center gap-1"
                >
                  Play ▶
                </button>
              </div>
              {/* Decorative stars */}
              <div className="absolute top-2 right-2 text-white text-xl">✦</div>
            </div>
          ))}
        </div>

        {/* Leaderboard Toggle */}
        <div className="text-center mb-4">
          <button
            onClick={() => setShowLeaderboard(!showLeaderboard)}
            className="bg-white px-4 py-2 rounded-full font-bold shadow hover:shadow-md transition-all text-sm"
          >
            {showLeaderboard ? '▲ Hide' : '▼ View'} Leaderboard
          </button>
        </div>

        {/* Leaderboard Section */}
        {showLeaderboard && (
          <div className="max-w-2xl mx-auto mb-4">
            <div className="bg-yellow-300 rounded-2xl p-4 border-4 border-white shadow-lg">
              <h2 className="text-xl font-black text-center mb-3">
                🏆 Top Players
              </h2>
              <div className="space-y-1 max-h-64 overflow-y-auto">
                {leaderboard.length === 0 ? (
                  <p className="text-center text-gray-700 py-4">No players yet!</p>
                ) : (
                  leaderboard.slice(0, 10).map((entry, index) => (
                    <div
                      key={entry.username}
                      className={`${
                        entry.username === currentUser
                          ? 'bg-green-400'
                          : 'bg-white'
                      } rounded-full px-3 py-2 flex items-center justify-between text-sm`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-black text-gray-900 w-6 h-6 flex items-center justify-center bg-gray-100 rounded-full text-xs">
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span className="font-medium text-gray-900">
                          {entry.username}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {entry.streak > 0 && (
                          <span className="text-xs">🔥{entry.streak}</span>
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
        <footer className="text-center text-xs text-gray-600 py-3 mt-auto">
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
});

HomePage.displayName = 'HomePage';

export default HomePage;
