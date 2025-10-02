'use client';

interface DifficultySelectionProps {
  mode: string;
  onSelectDifficulty: (difficulty: string) => void;
  onBack: () => void;
}

export default function DifficultySelection({ mode, onSelectDifficulty, onBack }: DifficultySelectionProps) {
  const getModeInfo = () => {
    switch (mode) {
      case 'sprint':
        return { name: 'Sprint', icon: '🏃' };
      case 'timeattack':
        return { name: 'Time Attack', icon: '⏰' };
      case 'endless':
        return { name: 'Endless', icon: '♾️' };
      case 'perfect':
        return { name: 'Perfect Run', icon: '💎' };
      default:
        return { name: 'Game', icon: '🎮' };
    }
  };

  const modeInfo = getModeInfo();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md">
        <button
          onClick={onBack}
          className="mb-8 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <span className="text-xl">←</span>
          <span className="font-medium">Back</span>
        </button>

        <div className="text-center mb-8">
          <div className="text-6xl mb-4">{modeInfo.icon}</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Choose Difficulty
          </h1>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => onSelectDifficulty('easy')}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold text-2xl py-6 rounded-2xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Easy
          </button>

          <button
            onClick={() => onSelectDifficulty('medium')}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold text-2xl py-6 rounded-2xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Medium
          </button>

          <button
            onClick={() => onSelectDifficulty('hard')}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-bold text-2xl py-6 rounded-2xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Hard
          </button>
        </div>
      </div>
    </div>
  );
}
