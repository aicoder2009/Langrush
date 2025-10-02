import { getCurrentUsername } from './auth';

export interface RoundTime {
  questionIndex: number;
  timeMs: number;
  timestamp: string;
}

export interface SessionData {
  username: string;
  mode: string;
  roundTimes: RoundTime[];
  sessionStarted: string;
}

const SESSION_KEY = 'language-sprint-current-session';
const HISTORY_KEY = 'language-sprint-round-history';

export function startNewSession(mode: string): void {
  if (typeof window === 'undefined') return;

  const session: SessionData = {
    username: getCurrentUsername(),
    mode,
    roundTimes: [],
    sessionStarted: new Date().toISOString()
  };

  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function recordRoundTime(questionIndex: number, timeMs: number): void {
  if (typeof window === 'undefined') return;

  const sessionData = localStorage.getItem(SESSION_KEY);
  if (!sessionData) return;

  const session: SessionData = JSON.parse(sessionData);

  session.roundTimes.push({
    questionIndex,
    timeMs,
    timestamp: new Date().toISOString()
  });

  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function getPreviousRoundTime(questionIndex: number): number | null {
  if (typeof window === 'undefined') return null;

  const sessionData = localStorage.getItem(SESSION_KEY);
  if (!sessionData) return null;

  const session: SessionData = JSON.parse(sessionData);

  // Find the most recent round time for this question index (excluding current)
  const previousRounds = session.roundTimes.filter(
    rt => rt.questionIndex === questionIndex
  );

  if (previousRounds.length === 0) return null;

  // Return the most recent one (last in array)
  return previousRounds[previousRounds.length - 1].timeMs;
}

export function getCurrentSessionRoundTime(questionIndex: number): number | null {
  if (typeof window === 'undefined') return null;

  const sessionData = localStorage.getItem(SESSION_KEY);
  if (!sessionData) return null;

  const session: SessionData = JSON.parse(sessionData);
  const round = session.roundTimes.find(rt => rt.questionIndex === questionIndex);

  return round ? round.timeMs : null;
}

export function getTimeDifference(currentTime: number, questionIndex: number): {
  difference: number;
  isFaster: boolean;
  showComparison: boolean;
} | null {
  const previousTime = getPreviousRoundTime(questionIndex);

  if (previousTime === null) {
    return null;
  }

  const difference = Math.abs(currentTime - previousTime);
  const isFaster = currentTime < previousTime;

  // Only show comparison if difference is more than 1 second (1000ms)
  const showComparison = difference > 1000;

  return {
    difference,
    isFaster,
    showComparison
  };
}

export function saveSessionToHistory(): void {
  if (typeof window === 'undefined') return;

  const sessionData = localStorage.getItem(SESSION_KEY);
  if (!sessionData) return;

  const session: SessionData = JSON.parse(sessionData);

  // Get existing history
  const historyData = localStorage.getItem(HISTORY_KEY);
  const history: SessionData[] = historyData ? JSON.parse(historyData) : [];

  // Add current session to history
  history.push(session);

  // Keep last 50 sessions
  const recentHistory = history.slice(-50);

  localStorage.setItem(HISTORY_KEY, JSON.stringify(recentHistory));
}

export function clearCurrentSession(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(SESSION_KEY);
}

export function formatTimeDifference(differenceMs: number): string {
  const totalSeconds = Math.floor(differenceMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  }
  return `${seconds}s`;
}
