export function formatShareableResults(gameData, stats) {
  const modeNames = {
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
