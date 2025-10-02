'use client';

import { useState } from 'react';
import HomePage from '../components/HomePage';
import GameScreen from '../components/GameScreen';
import ResultsScreen from '../components/ResultsScreen';

export default function Home() {
  const [screen, setScreen] = useState<'home' | 'game' | 'results'>('home');
  const [selectedMode, setSelectedMode] = useState<string | null>(null);
  const [gameResults, setGameResults] = useState<any>(null);

  const handleSelectMode = (mode: string) => {
    setSelectedMode(mode);
    setScreen('game');
  };

  const handleGameFinish = (results: any) => {
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

  return (
    <>
      {screen === 'home' && (
        <HomePage onSelectMode={handleSelectMode} />
      )}

      {screen === 'game' && selectedMode && (
        <GameScreen
          mode={selectedMode}
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
