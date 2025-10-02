'use client';

import { useState, useEffect } from 'react';
import { formatShareableResults } from '../services/resultsFormatter';
import { saveScore, type GameStats } from '../services/scoreManager';

interface ResultsScreenProps {
  gameData: {
    mode: string;
    time: number;
    answers: Array<{ isCorrect: boolean }>;
  };
  onPlayAgain: () => void;
  onMenu: () => void;
}

export default function ResultsScreen({ gameData, onPlayAgain, onMenu }: ResultsScreenProps) {
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState<GameStats | null>(null);

  useEffect(() => {
    const correctCount = gameData.answers.filter(a => a.isCorrect).length;
    const totalCount = gameData.answers.length;
    const accuracy = Math.round((correctCount / totalCount) * 100);
    const totalTime = gameData.time;

    const formatTime = (ms: number) => {
      const totalSeconds = Math.floor(ms / 1000);
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      const milliseconds = Math.floor((ms % 1000) / 10);
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
    };

    const calculatedStats: GameStats = {
      mode: gameData.mode,
      correctCount,
      totalCount,
      accuracy,
      totalTime,
      formatTime: formatTime(totalTime)
    };

    setStats(calculatedStats);
    saveScore(gameData.mode, calculatedStats);
  }, [gameData]);

  const handleShare = () => {
    if (stats) {
      const shareText = formatShareableResults(gameData, stats);
      navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!stats) return null;

  const getPerformanceEmoji = () => {
    if (stats.accuracy === 100) return '🏆';
    if (stats.accuracy >= 80) return '🌟';
    if (stats.accuracy >= 60) return '👍';
    return '💪';
  };

  const getPerformanceMessage = () => {
    if (stats.accuracy === 100) return 'Perfect Score!';
    if (stats.accuracy >= 80) return 'Excellent Work!';
    if (stats.accuracy >= 60) return 'Good Job!';
    return 'Keep Practicing!';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-3 sm:p-4 md:p-6 relative overflow-hidden">
      {/* Animated background celebration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
        <div className="absolute top-20 right-10 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-10 left-1/3 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-4xl bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl shadow-yellow-500/30 p-6 sm:p-8 md:p-12 border-4 border-yellow-400/40">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-10">
            <div className="text-7xl sm:text-8xl md:text-9xl mb-6 animate-bounce drop-shadow-2xl">
              {getPerformanceEmoji()}
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 mb-3 uppercase tracking-wider drop-shadow-lg">
              {getPerformanceMessage()}
            </h1>
            <p className="text-lg sm:text-xl text-yellow-400 font-black uppercase tracking-widest">
              🏆 MISSION COMPLETE 🏆
            </p>
          </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-4 sm:p-6 text-center border-2 border-blue-200 shadow-lg transform hover:scale-105 transition-transform">
            <div className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2 font-semibold">⏱️ Time</div>
            <div className="text-2xl sm:text-3xl md:text-4xl font-black text-blue-600">{stats.formatTime}</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-4 sm:p-6 text-center border-2 border-green-200 shadow-lg transform hover:scale-105 transition-transform">
            <div className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2 font-semibold">🎯 Accuracy</div>
            <div className="text-2xl sm:text-3xl md:text-4xl font-black text-green-600">{stats.accuracy}%</div>
          </div>
        </div>

        {/* Score Summary */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 border-2 border-purple-200">
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
              ✅ {stats.correctCount} / {stats.totalCount} correct answers
            </div>

            {/* Answer Grid */}
            <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
              {gameData.answers.map((answer, i) => (
                <div
                  key={i}
                  className={`text-2xl sm:text-3xl md:text-4xl transform hover:scale-125 transition-transform ${
                    answer.isCorrect ? 'animate-bounce' : ''
                  }`}
                  style={{ animationDelay: `${i * 50}ms`, animationDuration: '1s' }}
                >
                  {answer.isCorrect ? '✅' : '❌'}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 sm:gap-4">
          <button
            onClick={handleShare}
            className="group w-full py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold text-sm sm:text-base rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:scale-95 border-2 border-blue-400"
          >
            <span className="flex items-center justify-center gap-2">
              {copied ? (
                <>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Copied to Clipboard!
                </>
              ) : (
                <>
                  📋 Share Results
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                  </svg>
                </>
              )}
            </span>
          </button>

          <button
            onClick={onPlayAgain}
            className="group w-full py-3 sm:py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold text-sm sm:text-base rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:scale-95 border-2 border-green-400"
          >
            <span className="flex items-center justify-center gap-2">
              🔄 Play Again
              <svg className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
            </span>
          </button>

          <button
            onClick={onMenu}
            className="group w-full py-3 sm:py-4 bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 font-bold text-sm sm:text-base rounded-2xl transition-all duration-200 border-2 border-gray-300 hover:border-gray-400 active:scale-95"
          >
            <span className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              Main Menu
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
