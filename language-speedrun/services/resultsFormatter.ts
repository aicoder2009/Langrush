import { type GameStats } from './scoreManager';

export interface GameData {
  mode: string;
  time: number;
  answers: Array<{
    isCorrect: boolean;
  }>;
}

export function formatShareableResults(gameData: GameData, stats: GameStats): string {
  const modeNames: Record<string, string> = {
    sprint: 'Sprint 🏃',
    timeattack: 'Time Attack ⏰',
    endless: 'Endless ♾️',
    perfect: 'Perfect Run 💎'
  };

  const checkmarks = gameData.answers
    .map(a => a.isCorrect ? '✅' : '❌')
    .join('');

  return `
🌍 Language ${modeNames[gameData.mode]}
⏱️ ${stats.formatTime} | ✅ ${stats.correctCount}/${stats.totalCount} (${stats.accuracy}%)

${checkmarks}

Play at: [YOUR_URL_HERE]
  `.trim();
}
