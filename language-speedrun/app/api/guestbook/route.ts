import { NextResponse } from 'next/server';

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

// In-memory storage for serverless environment
// Note: This resets on each deployment. For persistent storage, use Vercel KV, Postgres, or similar
let memoryStore: { guestbook: GuestbookEntry[]; scores: ScoreEntry[] } = {
  guestbook: [],
  scores: []
};

async function loadData(): Promise<{ guestbook: GuestbookEntry[]; scores: ScoreEntry[] }> {
  return memoryStore;
}

async function saveData(data: { guestbook: GuestbookEntry[]; scores: ScoreEntry[] }): Promise<void> {
  memoryStore = data;
}

export async function GET() {
  const data = await loadData();
  return NextResponse.json({
    guestbook: data.guestbook,
    scores: data.scores.slice(-100) // Return last 100 scores
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, data: requestData } = body;

    // Input validation
    if (!action || typeof action !== 'string') {
      return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
    }

    const data = await loadData();

    if (action === 'sign') {
      // Validate username
      if (!requestData?.username || typeof requestData.username !== 'string') {
        return NextResponse.json({ success: false, error: 'Username is required' }, { status: 400 });
      }

      const username = requestData.username.trim();
      if (username.length < 2 || username.length > 20) {
        return NextResponse.json({ success: false, error: 'Username must be 2-20 characters' }, { status: 400 });
      }

      // Sanitize username (remove potentially harmful characters)
      const sanitizedUsername = username.replace(/[<>"'&]/g, '');
      if (sanitizedUsername !== username) {
        return NextResponse.json({ success: false, error: 'Username contains invalid characters' }, { status: 400 });
      }

      // Add new guestbook entry
      const entry: GuestbookEntry = {
        username: sanitizedUsername,
        timestamp: Date.now()
      };

      // Check if username already exists
      const existingIndex = data.guestbook.findIndex(e => e.username === sanitizedUsername);
      if (existingIndex >= 0) {
        data.guestbook[existingIndex] = entry; // Update timestamp
      } else {
        data.guestbook.push(entry);
      }

      await saveData(data);
      return NextResponse.json({ success: true, entry });
    }

    if (action === 'submit-score') {
      // Add new score
      const scoreEntry: ScoreEntry = {
        username: requestData.username,
        mode: requestData.mode,
        score: requestData.score,
        time: requestData.time,
        timestamp: Date.now()
      };

      data.scores.push(scoreEntry);
      await saveData(data);

      return NextResponse.json({ success: true, scoreEntry });
    }

    if (action === 'get-leaderboard') {
      // Calculate leaderboard
      const leaderboard = calculateLeaderboard(data.scores);
      return NextResponse.json({ success: true, leaderboard });
    }

    return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
  } catch {
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}

function calculateLeaderboard(scores: ScoreEntry[]) {
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
