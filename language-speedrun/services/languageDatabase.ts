import { languages, type Language } from '../data/languages';

export interface Question {
  id: number;
  text: string;
  correctAnswer: string;
  acceptableAnswers: string[];
  timestamp: number;
}

export function generateQuestions(mode: string): Question[] {
  const questionCounts: Record<string, number> = {
    sprint: 10,
    timeattack: 50,
    endless: 100,
    perfect: 20
  };

  const count = questionCounts[mode] || 10;
  const shuffled = [...languages].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, Math.min(count, languages.length));

  return selected.map((lang, index) => {
    const sampleIndex = Math.floor(Math.random() * lang.samples.length);
    return {
      id: index,
      text: lang.samples[sampleIndex],
      correctAnswer: lang.name,
      acceptableAnswers: lang.acceptableAnswers,
      timestamp: Date.now()
    };
  });
}
