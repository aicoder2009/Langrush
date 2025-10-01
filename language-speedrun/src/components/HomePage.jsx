import React from 'react';
import { getPersonalBests } from '../services/scoreManager';

export default function HomePage({ onSelectMode }) {
  const personalBests = getPersonalBests();

  const formatTime = (ms) => {
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
      <div className="w-full max-w-4xl">
        <h1 className="text-6xl font-bold text-center mb-4 text-gray-900">
          🌍 Language Sprint
        </h1>
        <p className="text-xl text-center text-gray-600 mb-12">
          How fast can you identify languages?
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {modes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => onSelectMode(mode.id)}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
            >
              <div className="text-6xl mb-4">{mode.icon}</div>
              <h2 className="text-2xl font-bold mb-2 text-gray-900">{mode.name}</h2>
              <p className="text-gray-600 mb-4">{mode.description}</p>
              <div className="text-sm font-semibold text-blue-600">
                {mode.stat}
              </div>
            </button>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-500">
            Total games played: {personalBests.totalGamesPlayed || 0}
          </p>
        </div>
      </div>
    </div>
  );
}
