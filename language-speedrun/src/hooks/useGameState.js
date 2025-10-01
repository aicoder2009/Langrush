import { useState, useCallback } from 'react';

export function useGameState(mode, questions) {
  const [gameState, setGameState] = useState({
    status: 'ready', // 'ready' | 'playing' | 'paused' | 'finished'
    currentQuestionIndex: 0,
    answers: [],
    lives: mode === 'endless' || mode === 'perfect' ? 3 : Infinity,
    startTime: null,
    endTime: null
  });

  const startGame = useCallback(() => {
    setGameState({
      status: 'playing',
      currentQuestionIndex: 0,
      answers: [],
      lives: mode === 'endless' || mode === 'perfect' ? 3 : Infinity,
      startTime: Date.now(),
      endTime: null
    });
  }, [mode]);

  const submitAnswer = useCallback((userAnswer, currentQuestion) => {
    const isCorrect = currentQuestion.acceptableAnswers.some(
      acceptable => acceptable.toLowerCase() === userAnswer.toLowerCase()
    );

    const answerRecord = {
      questionId: currentQuestion.id,
      userAnswer,
      correctAnswer: currentQuestion.correctAnswer,
      isCorrect,
      timeSpent: Date.now() - gameState.startTime -
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
