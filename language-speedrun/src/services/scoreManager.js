const STORAGE_KEY = 'langspeed_stats';

export function saveScore(mode, stats) {
  const existing = getPersonalBests();

  switch (mode) {
    case 'sprint':
      if (!existing.sprint || stats.totalTime < existing.sprint.bestTime) {
        existing.sprint = {
          ...existing.sprint,
          bestTime: stats.totalTime,
          bestAccuracy: stats.accuracy,
          gamesPlayed: (existing.sprint?.gamesPlayed || 0) + 1
        };
      } else {
        existing.sprint = {
          ...existing.sprint,
          gamesPlayed: (existing.sprint?.gamesPlayed || 0) + 1
        };
      }
      break;
    case 'timeattack':
      if (!existing.timeattack || stats.correctCount > existing.timeattack.highScore) {
        existing.timeattack = {
          ...existing.timeattack,
          highScore: stats.correctCount,
          gamesPlayed: (existing.timeattack?.gamesPlayed || 0) + 1
        };
      } else {
        existing.timeattack = {
          ...existing.timeattack,
          gamesPlayed: (existing.timeattack?.gamesPlayed || 0) + 1
        };
      }
      break;
    case 'endless':
      if (!existing.endless || stats.correctCount > existing.endless.highScore) {
        existing.endless = {
          ...existing.endless,
          highScore: stats.correctCount,
          gamesPlayed: (existing.endless?.gamesPlayed || 0) + 1
        };
      } else {
        existing.endless = {
          ...existing.endless,
          gamesPlayed: (existing.endless?.gamesPlayed || 0) + 1
        };
      }
      break;
    case 'perfect':
      if (stats.accuracy === 100) {
        existing.perfect = {
          ...existing.perfect,
          bestTime: Math.min(stats.totalTime, existing.perfect?.bestTime || Infinity),
          completions: (existing.perfect?.completions || 0) + 1,
          gamesPlayed: (existing.perfect?.gamesPlayed || 0) + 1
        };
      } else {
        existing.perfect = {
          ...existing.perfect,
          gamesPlayed: (existing.perfect?.gamesPlayed || 0) + 1
        };
      }
      break;
  }

  existing.totalGamesPlayed = (existing.totalGamesPlayed || 0) + 1;
  existing.lastPlayed = new Date().toISOString();

  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  return existing;
}

export function getPersonalBests() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}
