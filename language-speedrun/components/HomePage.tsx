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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-5xl">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12 animate-fade-in">
          <div className="inline-block bg-white/10 backdrop-blur-md rounded-3xl px-6 py-3 mb-6 border border-white/20">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white drop-shadow-lg">
              🌍 Language Sprint
            </h1>
          </div>
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 font-medium drop-shadow-md px-4">
            How fast can you identify languages?
          </p>
          <div className="mt-4 flex items-center justify-center gap-3 text-white/80 text-sm sm:text-base">
            <span className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              📊 {personalBests.totalGamesPlayed || 0} games played
            </span>
          </div>
        </div>

        {/* Game Modes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6 mb-8">
          {modes.map((mode, index) => (
            <button
              key={mode.id}
              onClick={() => onSelectMode(mode.id)}
              className="group relative bg-white/95 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-2xl hover:shadow-3xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 border-2 border-white/50 hover:border-white active:scale-95"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/10 group-hover:to-purple-500/10 rounded-3xl transition-all duration-300" />

              <div className="relative">
                {/* Icon */}
                <div className="text-6xl sm:text-7xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {mode.icon}
                </div>

                {/* Title */}
                <h2 className="text-2xl sm:text-3xl font-black mb-3 text-gray-800 group-hover:text-indigo-600 transition-colors">
                  {mode.name}
                </h2>

                {/* Description */}
                <p className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed">
                  {mode.description}
                </p>

                {/* Stats Badge */}
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-50 to-purple-50 px-4 py-2 rounded-full border border-indigo-100">
                  <span className="text-xs sm:text-sm font-bold text-indigo-700">
                    {mode.stat}
                  </span>
                </div>

                {/* Play arrow indicator */}
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-indigo-500 text-white rounded-full p-2 shadow-lg">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Footer Info */}
        <div className="text-center space-y-3">
          <div className="inline-block bg-white/10 backdrop-blur-md rounded-2xl px-6 py-3 border border-white/20">
            <p className="text-white/90 text-sm sm:text-base font-medium">
              🎯 Choose a mode to start your language challenge!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
