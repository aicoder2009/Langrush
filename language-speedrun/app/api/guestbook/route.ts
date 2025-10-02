import { NextResponse } from 'next/server';

// In-memory storage for now (will be replaced with a database in production)
// Use environment variables or a proper database for production
// For development, consider using a file-based storage or external service
import { promises as fs } from 'fs';
import path from 'path';

// Temporary file-based storage for development
const DATA_FILE = path.join(process.cwd(), 'data', 'guestbook.json');

interface GuestbookEntry {
  username: string;
  timestamp: number;
}

interface ScoreEntry {
  username: string;
  mode: string;
  score: number;
  time: number;
  timestamp: number;
}

async function loadData(): Promise<{ guestbook: GuestbookEntry[]; scores: ScoreEntry[] }> {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return { guestbook: [], scores: [] };
  }
}

async function saveData(data: { guestbook: GuestbookEntry[]; scores: ScoreEntry[] }): Promise<void> {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

export async function GET() {
  return NextResponse.json({
    guestbook,
    scores: scores.slice(-100) // Return last 100 scores
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, data } = body;
    const body = await request.json();
    const { action, data } = body;

    // Input validation
    if (!action || typeof action !== 'string') {
      return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
    }

    if (action === 'sign') {
      // Validate username
      if (!data?.username || typeof data.username !== 'string') {
        return NextResponse.json({ success: false, error: 'Username is required' }, { status: 400 });
      }

      const username = data.username.trim();
      if (username.length < 2 || username.length > 20) {
        return NextResponse.json({ success: false, error: 'Username must be 2-20 characters' }, { status: 400 });
      }

      // Sanitize username (remove potentially harmful characters)
      const sanitizedUsername = username.replace(/[<>\"'&]/g, '');
      if (sanitizedUsername !== username) {
        return NextResponse.json({ success: false, error: 'Username contains invalid characters' }, { status: 400 });
      }
      // Check if username already exists
      const existingIndex = guestbook.findIndex(e => e.username === data.username);
      if (existingIndex >= 0) {
        guestbook[existingIndex] = entry; // Update timestamp
      } else {
        guestbook.push(entry);
      }

      return NextResponse.json({ success: true, entry });
    }

    if (action === 'submit-score') {
      // Add new score
      const scoreEntry = {
        username: data.username,
        mode: data.mode,
        score: data.score,
        time: data.time,
        timestamp: Date.now()
      };

      scores.push(scoreEntry);

      return NextResponse.json({ success: true, scoreEntry });
    }

    if (action === 'get-leaderboard') {
      // Calculate leaderboard
      const leaderboard = calculateLeaderboard();
      return NextResponse.json({ success: true, leaderboard });
    }

    return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}

function calculateLeaderboard() {
  const userScores: { [username: string]: { totalScore: number; streak: number } } = {};

  scores.forEach(score => {
    if (!userScores[score.username]) {
      userScores[score.username] = { totalScore: 0, streak: 0 };
    }
    userScores[score.username].totalScore += score.score;
  });

  // Calculate streaks (simplified - number of days played)
  const userDays: { [username: string]: Set<string> } = {};
  scores.forEach(score => {
    const date = new Date(score.timestamp).toDateString();
    if (!userDays[score.username]) {
      userDays[score.username] = new Set();
    }
    userDays[score.username].add(date);
  });

  Object.keys(userDays).forEach(username => {
    userScores[username].streak = userDays[username].size;
  });

  return Object.entries(userScores)
    .map(([username, data]) => ({
      username,
      totalScore: data.totalScore,
      streak: data.streak
    }))
    .sort((a, b) => b.totalScore - a.totalScore);
}
