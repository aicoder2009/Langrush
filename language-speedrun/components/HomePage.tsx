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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 sm:p-6 md:p-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-6xl">
          {/* Header Section */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="mb-6">
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 drop-shadow-2xl mb-4 animate-pulse">
                LANGRUSH
              </h1>
              <div className="flex items-center justify-center gap-4 text-yellow-400 text-xl sm:text-2xl md:text-3xl font-black">
                <span className="animate-bounce">⚡</span>
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text">SPEEDRUN CHALLENGE</span>
                <span className="animate-bounce animation-delay-150">⚡</span>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <div className="bg-black/40 backdrop-blur-md border-2 border-yellow-400/50 px-6 py-3 rounded-2xl shadow-lg shadow-yellow-400/20">
                <span className="text-yellow-400 font-black text-lg">🎮 {personalBests.totalGamesPlayed || 0} GAMES</span>
              </div>
            </div>
          </div>

          {/* Game Modes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 md:gap-8">
            {modes.map((mode, index) => (
              <button
                key={mode.id}
                onClick={() => onSelectMode(mode.id)}
                className="group relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl hover:shadow-yellow-500/50 transform hover:scale-105 transition-all duration-300 border-4 border-yellow-400/20 hover:border-yellow-400 active:scale-95 overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Glowing effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/0 via-pink-500/0 to-purple-500/0 group-hover:from-yellow-400/20 group-hover:via-pink-500/20 group-hover:to-purple-500/20 rounded-3xl transition-all duration-500" />

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-bl-full" />

                <div className="relative">
                  {/* Icon */}
                  <div className="text-7xl sm:text-8xl mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 filter drop-shadow-lg">
                    {mode.icon}
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-3 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 uppercase tracking-wider">
                    {mode.name}
                  </h2>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-gray-300 mb-4 font-bold uppercase tracking-wide">
                    {mode.description}
                  </p>

                  {/* Stats Badge */}
                  <div className="inline-flex items-center gap-2 bg-black/50 px-4 py-2 rounded-xl border-2 border-yellow-400/30 backdrop-blur-sm">
                    <span className="text-xs sm:text-sm font-black text-yellow-400 uppercase">
                      {mode.stat}
                    </span>
                  </div>

                  {/* PLAY button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 rounded-3xl">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-black text-xl sm:text-2xl px-8 py-4 rounded-2xl shadow-2xl transform scale-110 animate-pulse">
                      ▶ PLAY
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Footer CTA */}
          <div className="text-center mt-12">
            <div className="inline-block bg-black/40 backdrop-blur-md rounded-3xl px-8 py-4 border-2 border-yellow-400/50 shadow-lg shadow-yellow-400/20">
              <p className="text-yellow-400 text-base sm:text-lg font-black uppercase tracking-wider">
                🏆 SELECT YOUR CHALLENGE 🏆
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
