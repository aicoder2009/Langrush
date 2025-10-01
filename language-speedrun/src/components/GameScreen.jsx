import React, { useState, useEffect } from 'react';
import { useGameState } from '../hooks/useGameState';
import { useTimer } from '../hooks/useTimer';
import { generateQuestions } from '../services/languageDatabase';
import Timer from './Timer';
import ProgressBar from './ProgressBar';
import LivesIndicator from './LivesIndicator';
import QuestionDisplay from './QuestionDisplay';
import AnswerInput from './AnswerInput';
import { languages } from '../data/languages';

export default function GameScreen({ mode, onFinish, onQuit }) {
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

  const handleSubmit = (answer) => {
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
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl">Loading game...</div>
      </div>
    );
  }

  const currentQuestion = questions[gameState.currentQuestionIndex];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Timer time={formatTime()} />
          <div className="text-lg font-semibold text-gray-600">
            {gameState.currentQuestionIndex + 1} / {questions.length}
          </div>
          {gameState.lives !== Infinity && (
            <LivesIndicator lives={gameState.lives} />
          )}
        </div>

        {/* Progress Bar */}
        <ProgressBar
          current={gameState.currentQuestionIndex + 1}
          total={questions.length}
        />

        {/* Question */}
        <QuestionDisplay
          text={currentQuestion.text}
          questionNumber={gameState.currentQuestionIndex + 1}
        />

        {/* Answer Input */}
        <div className="mt-8 flex flex-col items-center">
          <AnswerInput
            onSubmit={handleSubmit}
            disabled={showFeedback || gameState.status !== 'playing'}
            languages={languages}
            showFeedback={showFeedback}
            isCorrect={lastAnswerCorrect}
          />

          {showFeedback && !lastAnswerCorrect && (
            <div className="mt-4 text-lg text-red-600">
              Correct answer: <span className="font-semibold">{currentQuestion.correctAnswer}</span>
            </div>
          )}

          <p className="mt-4 text-sm text-gray-500">
            Press Enter to submit
          </p>
        </div>

        {/* Quit Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={onQuit}
            className="px-6 py-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            Quit to Menu
          </button>
        </div>
      </div>
    </div>
  );
}
