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
  onFinish: (results: any) => void;
  onQuit: () => void;
}

export default function GameScreen({ mode, onFinish, onQuit }: GameScreenProps) {
  const [questions] = useState(() => generateQuestions(mode));
  const { gameState, startGame, submitAnswer } = useGameState(mode, questions);
  const { time, formatTime } = useTimer(gameState.status === 'playing');
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(false);

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
    setShowFeedback(true);

    setTimeout(() => {
      setShowFeedback(false);
    }, 1500);
  };

  if (gameState.status === 'ready' || questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
        <div className="text-2xl sm:text-3xl text-white font-bold animate-pulse">Loading game...</div>
      </div>
    );
  }

  const currentQuestion = questions[gameState.currentQuestionIndex];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-3 sm:p-4 md:p-6">
      <div className="w-full max-w-3xl bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 border-2 border-white/50">
        {/* Header Stats */}
        <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="flex-shrink-0">
            <Timer time={formatTime()} />
          </div>
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-4 sm:px-6 py-2 sm:py-3 rounded-full border-2 border-indigo-100">
            <span className="text-base sm:text-lg font-black text-indigo-700">
              {gameState.currentQuestionIndex + 1} / {questions.length}
            </span>
          </div>
          {gameState.lives !== Infinity && (
            <div className="flex-shrink-0">
              <LivesIndicator lives={gameState.lives} />
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mb-6 sm:mb-8">
          <ProgressBar
            current={gameState.currentQuestionIndex + 1}
            total={questions.length}
          />
        </div>

        {/* Question Display */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 border-2 border-indigo-100 shadow-inner">
          <QuestionDisplay text={currentQuestion.text} />
        </div>

        {/* Answer Input Section */}
        <div className="mt-6 sm:mt-8 flex flex-col items-center space-y-4">
          <AnswerInput
            onSubmit={handleSubmit}
            disabled={showFeedback || gameState.status !== 'playing'}
            showFeedback={showFeedback}
            isCorrect={lastAnswerCorrect}
          />

          {showFeedback && !lastAnswerCorrect && (
            <div className="bg-red-50 border-2 border-red-200 rounded-xl px-4 sm:px-6 py-3 sm:py-4 animate-shake">
              <p className="text-sm sm:text-base text-red-600 text-center">
                Correct answer: <span className="font-black text-red-700">{currentQuestion.correctAnswer}</span>
              </p>
            </div>
          )}

          {showFeedback && lastAnswerCorrect && (
            <div className="bg-green-50 border-2 border-green-200 rounded-xl px-4 sm:px-6 py-3 sm:py-4 animate-bounce">
              <p className="text-sm sm:text-base text-green-600 text-center font-bold">
                ✅ Correct!
              </p>
            </div>
          )}

          <p className="text-xs sm:text-sm text-gray-500 text-center px-4">
            💡 Type or select from suggestions • Press <kbd className="px-2 py-1 bg-gray-100 rounded border border-gray-300 text-xs font-mono">Enter</kbd> to submit
          </p>
        </div>

        {/* Quit Button */}
        <div className="mt-6 sm:mt-8 flex justify-center">
          <button
            onClick={onQuit}
            className="group px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 font-semibold rounded-full transition-all duration-200 border-2 border-gray-200 hover:border-gray-300 active:scale-95"
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Menu
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
