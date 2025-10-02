'use client';

import { useState, useEffect } from 'react';
import { useGameState } from '../hooks/useGameState';
import { useTimer } from '../hooks/useTimer';
import { generateQuestions } from '../services/languageDatabase';
import Timer from './Timer';
import ProgressBar from './ProgressBar';
import LivesIndicator from './LivesIndicator';
import QuestionDisplay from './QuestionDisplay';
import AnswerInput from './AnswerInput';

interface GameScreenProps {
  mode: string;
  difficulty: string;
  onFinish: (results: any) => void;
  onQuit: () => void;
}

export default function GameScreen({ mode, difficulty, onFinish, onQuit }: GameScreenProps) {
  const [questions] = useState(() => generateQuestions(mode, difficulty));
  const { gameState, startGame, submitAnswer } = useGameState(mode, questions);
  const { time, formatTime } = useTimer(gameState.status === 'playing');
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(false);
  const [lastCorrectAnswer, setLastCorrectAnswer] = useState<string>('');

  useEffect(() => {
    startGame();
  }, [startGame]);

  useEffect(() => {
    if (gameState.status === 'finished') {
      setTimeout(() => {
        onFinish({
          mode,
          time,
          answers: gameState.answers,
          questions: questions
        });
      }, 1500);
    }
  }, [gameState.status, mode, time, gameState.answers, questions, onFinish]);

  const handleSubmit = (answer: string) => {
    const currentQuestion = questions[gameState.currentQuestionIndex];
    const result = submitAnswer(answer, currentQuestion);

    setLastAnswerCorrect(result.isCorrect);
    setLastCorrectAnswer(currentQuestion.correctAnswer);
    setShowFeedback(true);

    setTimeout(() => {
      setShowFeedback(false);
    }, 1500);
  };

  if (gameState.status === 'ready' || questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-2xl sm:text-3xl text-gray-800 font-bold animate-pulse">Loading game...</div>
      </div>
    );
  }

  const currentQuestion = questions[gameState.currentQuestionIndex];

  // Progress segments
  const progressSegments = Array.from({ length: questions.length }, (_, i) => {
    if (i < gameState.currentQuestionIndex) return 'bg-blue-400';
    if (i === gameState.currentQuestionIndex) return 'bg-blue-400';
    return 'bg-gray-300';
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F4ED] p-6">
      <div className="w-full max-w-md mx-auto flex-1 flex flex-col">
        {/* Progress Bar */}
        <div className="flex gap-1 mb-4">
          {progressSegments.map((color, i) => (
            <div key={i} className={`h-2 flex-1 rounded-full ${color}`} />
          ))}
          <span className="ml-4 font-mono text-sm">{formatTime()}</span>
        </div>

        {/* Question */}
        <div className="flex-1 flex items-center justify-center mb-6">
          <h1 className="text-4xl font-black text-center leading-tight px-4">
            {currentQuestion.text}
          </h1>
        </div>

        {/* Answer Container */}
        <div className="bg-[#FFDA57] rounded-3xl p-6 border-4 border-white shadow-lg">
          <div className="mb-4">
            <AnswerInput
              onSubmit={handleSubmit}
              disabled={showFeedback || gameState.status !== 'playing'}
              showFeedback={showFeedback}
              isCorrect={lastAnswerCorrect}
            />
          </div>

          {showFeedback && !lastAnswerCorrect && (
            <div className="bg-white rounded-full px-5 py-3 mb-4">
              <p className="text-center font-medium">
                Answer: <span className="font-bold">{lastCorrectAnswer}</span>
              </p>
            </div>
          )}

          <button
            onClick={onQuit}
            className="w-full bg-[#00917A] text-white font-bold py-4 px-6 rounded-full hover:bg-[#007a68] transition-colors"
          >
            Back to Menu
          </button>
        </div>
      </div>
    </div>
  );
}
