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

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F5F4ED] p-6">
      <div className="w-full max-w-md">
        <div className="bg-[#FFDA57] rounded-3xl p-8 border-4 border-white shadow-lg relative overflow-hidden">
          {/* Decorative stars */}
          <div className="absolute top-4 right-4 text-white text-3xl">✦</div>
          <div className="absolute bottom-4 left-4 text-white text-2xl">✦</div>

          <h1 className="text-4xl font-black text-center mb-8">
            You Scored
            <br />
            {stats.accuracy}%!
          </h1>

          <div className="bg-white rounded-2xl p-6 mb-6">
            <div className="text-center mb-4">
              <p className="text-lg font-bold mb-2">
                {stats.correctCount} / {stats.totalCount} Correct
              </p>
              <p className="text-gray-600 font-medium">
                Time: {stats.formatTime}
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {gameData.answers.map((answer, i) => (
                <span key={i} className="text-2xl">
                  {answer.isCorrect ? '✅' : '❌'}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={onPlayAgain}
              className="w-full bg-black text-white font-bold py-4 px-6 rounded-full hover:bg-gray-900 transition-colors"
            >
              Play Again ▶
            </button>

            <button
              onClick={handleShare}
              className="w-full bg-white text-black font-bold py-4 px-6 rounded-full hover:bg-gray-100 transition-colors"
            >
              {copied ? '✓ Copied!' : 'Share Results'}
            </button>

            <button
              onClick={onMenu}
              className="w-full bg-[#00917A] text-white font-bold py-4 px-6 rounded-full hover:bg-[#007a68] transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
