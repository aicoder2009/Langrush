'use client';

import { useState, useEffect } from 'react';
import { isLoggedIn } from '../services/auth';
import AuthScreen from '../components/AuthScreen';
import HomePage from '../components/HomePage';
import GameScreen from '../components/GameScreen';
import ResultsScreen from '../components/ResultsScreen';

export default function Home() {
  const [screen, setScreen] = useState<'auth' | 'home' | 'game' | 'results'>('auth');
  const [selectedMode, setSelectedMode] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [showDifficultyOverlay, setShowDifficultyOverlay] = useState(false);
  const [gameResults, setGameResults] = useState<{
    mode: string;
    time: number;
    answers: Array<{ questionId: number; userAnswer: string; correctAnswer: string; isCorrect: boolean; timeSpent: number }>;
    questions: Array<{ id: number; text: string; correctAnswer: string; acceptableAnswers: string[] }>;
  } | null>(null);

  // Check if user is already logged in on mount
  useEffect(() => {
    if (isLoggedIn()) {
      setScreen('home');
    }
  }, []);

  const handleSelectMode = (mode: string) => {
    setSelectedMode(mode);
    setShowDifficultyOverlay(true);
  };

  const handleSelectDifficulty = (difficulty: string) => {
    setSelectedDifficulty(difficulty);
    setShowDifficultyOverlay(false);
    setScreen('game');
  };

  const handleGameFinish = (results: {
    mode: string;
    time: number;
    answers: Array<{ questionId: number; userAnswer: string; correctAnswer: string; isCorrect: boolean; timeSpent: number }>;
    questions: Array<{ id: number; text: string; correctAnswer: string; acceptableAnswers: string[] }>;
  }) => {
    setGameResults(results);
    setScreen('results');
  };

  const handlePlayAgain = () => {
    setScreen('game');
  };

  const handleReturnToMenu = () => {
    setScreen('home');
    setSelectedMode(null);
    setGameResults(null);
  };

  const handleAuthenticated = () => {
    setScreen('home');
  };

  return (
    <>
      {screen === 'auth' && (
        <AuthScreen
          onAuthenticated={handleAuthenticated}
        />
      )}

      {screen === 'home' && (
        <>
          <HomePage onSelectMode={handleSelectMode} />

          {/* Difficulty Selection Overlay */}
          {showDifficultyOverlay && selectedMode && (
            <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
              <div className="bg-[#F5F4ED] rounded-3xl p-8 max-w-md mx-4 border-4 border-white shadow-2xl">
                <h2 className="text-3xl font-black text-center mb-6">Select Difficulty</h2>
                <div className="space-y-3">
                  {['easy', 'medium', 'hard'].map((diff) => (
                    <button
                      key={diff}
                      onClick={() => handleSelectDifficulty(diff)}
                      className={`w-full py-4 px-6 rounded-full font-bold text-lg transition-all ${
                        diff === 'easy'
                          ? 'bg-gradient-to-br from-green-400 to-green-500 hover:from-green-500 hover:to-green-600'
                          : diff === 'medium'
                          ? 'bg-gradient-to-br from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600'
                          : 'bg-gradient-to-br from-red-400 to-red-500 hover:from-red-500 hover:to-red-600'
                      } text-white border-4 border-white shadow-lg hover:shadow-xl`}
                    >
                      {diff.charAt(0).toUpperCase() + diff.slice(1)}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setShowDifficultyOverlay(false)}
                  className="w-full mt-4 py-3 px-6 rounded-full font-bold text-gray-600 bg-white hover:bg-gray-100 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {screen === 'game' && selectedMode && selectedDifficulty && (
        <GameScreen
          mode={selectedMode}
          difficulty={selectedDifficulty}
          onFinish={handleGameFinish}
          onQuit={handleReturnToMenu}
        />
      )}

      {screen === 'results' && gameResults && (
        <ResultsScreen
          gameData={gameResults}
          onPlayAgain={handlePlayAgain}
          onMenu={handleReturnToMenu}
        />
      )}
    </>
  );
}
