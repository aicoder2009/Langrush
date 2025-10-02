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
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          Game Complete! 🎉
        </h1>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-blue-50 rounded-xl p-6 text-center">
            <div className="text-sm text-gray-600 mb-2">Time</div>
            <div className="text-3xl font-bold text-blue-600">{stats.formatTime}</div>
          </div>
          <div className="bg-green-50 rounded-xl p-6 text-center">
            <div className="text-sm text-gray-600 mb-2">Accuracy</div>
            <div className="text-3xl font-bold text-green-600">{stats.accuracy}%</div>
          </div>
        </div>

        <div className="text-center mb-8">
          <div className="text-xl mb-4">
            ✅ {stats.correctCount} / {stats.totalCount} correct
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {gameData.answers.map((answer, i) => (
              <span key={i} className="text-3xl">
                {answer.isCorrect ? '✅' : '❌'}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <button
            onClick={handleShare}
            className="w-full py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-colors"
          >
            {copied ? '✓ Copied!' : '📋 Share Results'}
          </button>

          <button
            onClick={onPlayAgain}
            className="w-full py-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-colors"
          >
            🔄 Play Again
          </button>

          <button
            onClick={onMenu}
            className="w-full py-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-xl transition-colors"
          >
            🏠 Main Menu
          </button>
        </div>
      </div>
    </div>
  );
}
