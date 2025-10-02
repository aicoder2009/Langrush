import { useState, useCallback } from 'react';
import { type Question } from '../services/languageDatabase';

export interface Answer {
  questionId: number;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  timeSpent: number;
}

export interface GameState {
  status: 'ready' | 'playing' | 'paused' | 'finished';
  currentQuestionIndex: number;
  answers: Answer[];
  lives: number;
  startTime: number | null;
  endTime: number | null;
}

export function useGameState(mode: string, questions: Question[]) {
  const getLivesForMode = (gameMode: string) => {
    if (gameMode === 'endless' || gameMode === 'perfect') return 3;
    if (gameMode === 'zen') return Infinity;
    return Infinity;
  };

  const [gameState, setGameState] = useState<GameState>({
    status: 'ready',
    currentQuestionIndex: 0,
    answers: [],
    lives: getLivesForMode(mode),
    startTime: null,
    endTime: null
  });

  const startGame = useCallback(() => {
    setGameState({
      status: 'playing',
      currentQuestionIndex: 0,
      answers: [],
      lives: getLivesForMode(mode),
      startTime: Date.now(),
      endTime: null
    });
  }, [mode]);

  const submitAnswer = useCallback((userAnswer: string, currentQuestion: Question) => {
    const isCorrect = currentQuestion.acceptableAnswers.some(
      acceptable => acceptable.toLowerCase() === userAnswer.toLowerCase()
    );

    const answerRecord: Answer = {
      questionId: currentQuestion.id,
      userAnswer,
      correctAnswer: currentQuestion.correctAnswer,
      isCorrect,
      timeSpent: Date.now() - (gameState.startTime || 0) -
                gameState.answers.reduce((sum, a) => sum + a.timeSpent, 0)
    };

    const newAnswers = [...gameState.answers, answerRecord];
    const newLives = isCorrect ? gameState.lives : gameState.lives - 1;
    const isLastQuestion = gameState.currentQuestionIndex === questions.length - 1;
    const isGameOver = newLives === 0 || (mode === 'perfect' && !isCorrect);

    if (isGameOver || isLastQuestion) {
      setGameState(prev => ({
        ...prev,
        answers: newAnswers,
        lives: newLives,
        status: 'finished',
        endTime: Date.now()
      }));
      return { finished: true, isCorrect };
    } else {
      setGameState(prev => ({
        ...prev,
        answers: newAnswers,
        lives: newLives,
        currentQuestionIndex: prev.currentQuestionIndex + 1
      }));
      return { finished: false, isCorrect };
    }
  }, [gameState, mode, questions]);

  const pauseGame = useCallback(() => {
    setGameState(prev => ({ ...prev, status: 'paused' }));
  }, []);

  const resumeGame = useCallback(() => {
    setGameState(prev => ({ ...prev, status: 'playing' }));
  }, []);

  return {
    gameState,
    startGame,
    submitAnswer,
    pauseGame,
    resumeGame
  };
}
