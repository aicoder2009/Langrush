import React, { useState } from 'react';
import HomePage from './components/HomePage';
import GameScreen from './components/GameScreen';
import ResultsScreen from './components/ResultsScreen';

export default function App() {
  const [screen, setScreen] = useState('home'); // 'home' | 'game' | 'results'
  const [selectedMode, setSelectedMode] = useState(null);
  const [gameResults, setGameResults] = useState(null);

  const handleSelectMode = (mode) => {
    setSelectedMode(mode);
    setScreen('game');
  };

  const handleGameFinish = (results) => {
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
    <div className="min-h-screen">
      {screen === 'home' && (
        <HomePage onSelectMode={handleSelectMode} />
      )}

      {screen === 'game' && (
        <GameScreen
          mode={selectedMode}
          onFinish={handleGameFinish}
          onQuit={handleReturnToMenu}
        />
      )}

      {screen === 'results' && (
        <ResultsScreen
          gameData={gameResults}
          onPlayAgain={handlePlayAgain}
          onMenu={handleReturnToMenu}
        />
      )}
    </div>
  );
}
