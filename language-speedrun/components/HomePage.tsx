'use client';

import { useState, useEffect } from 'react';
import { getPersonalBests, type PersonalBests } from '../services/scoreManager';

interface HomePageProps {
  onSelectMode: (mode: string) => void;
}

export default function HomePage({ onSelectMode }: HomePageProps) {
  const [personalBests, setPersonalBests] = useState<PersonalBests>({});

  useEffect(() => {
    setPersonalBests(getPersonalBests());
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
      description: '10 languages as fast as possible',
      stat: personalBests.sprint?.bestTime
        ? `Best: ${formatTime(personalBests.sprint.bestTime)}`
        : 'Not played yet'
    },
    {
      id: 'timeattack',
      name: 'Time Attack',
      icon: '⏰',
      description: '60 seconds, maximum languages',
      stat: personalBests.timeattack?.highScore
        ? `Best: ${personalBests.timeattack.highScore} languages`
        : 'Not played yet'
    },
    {
      id: 'endless',
      name: 'Endless',
      icon: '♾️',
      description: 'Keep going until 3 strikes',
      stat: personalBests.endless?.highScore
        ? `Best: ${personalBests.endless.highScore} languages`
        : 'Not played yet'
    },
    {
      id: 'perfect',
      name: 'Perfect Run',
      icon: '💎',
      description: '20 languages, no mistakes',
      stat: personalBests.perfect?.completions
        ? `Completed ${personalBests.perfect.completions} times`
        : 'Not completed'
    }
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-5xl">
        <div className="text-center mb-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-2">
            🌍 Language Sprint
          </h1>
          <p className="text-base sm:text-lg text-gray-600 mb-2">
            How fast can you identify languages?
          </p>
          <p className="text-sm text-gray-500">
            Total games: {personalBests.totalGamesPlayed || 0}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {modes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => onSelectMode(mode.id)}
              className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 border-2 border-transparent hover:border-purple-500 overflow-hidden"
            >
              <div className="relative">
                <div className="text-5xl sm:text-6xl mb-3">{mode.icon}</div>
                <h2 className="text-xl sm:text-2xl font-bold mb-2 text-gray-900">{mode.name}</h2>
                <p className="text-sm sm:text-base text-gray-600 mb-3">{mode.description}</p>
                <div className="text-xs sm:text-sm font-semibold text-blue-600">
                  {mode.stat}
                </div>

                {/* PLAY button overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-purple-500/90 rounded-2xl">
                  <div className="bg-white text-purple-600 font-black text-xl sm:text-2xl px-6 py-3 rounded-xl shadow-2xl">
                    ▶ PLAY
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
