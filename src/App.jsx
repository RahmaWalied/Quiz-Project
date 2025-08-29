import React, { useState } from "react";
import { questions } from "./data/questions";
import { QuestionCard } from "./Components/QuestionCard";
import Confetti from "react-confetti";
import Lottie from "lottie-react";
import quizAnimation from "/public/Question.json";

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleAnswer = (option) => {
    if (showFeedback) return;
    setSelectedAnswer(option);
    setShowFeedback(true);

    if (option === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
  };

  const goToNext = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setIsFinished(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setIsFinished(false);
  };

  const calculateProgress = () => {
    if (isFinished) return 100;
    const baseProgress = (currentQuestion / questions.length) * 100;
    const questionProgress = selectedAnswer ? (1 / questions.length) * 100 : 0;
    return baseProgress + questionProgress;
  };

  const percentage = (score / questions.length) * 100;
  const showConfetti = isFinished && percentage > 50;

  return (
    <div className="h-screen w-full bg-gradient-to-br from-gray-900 via-purple-900 to-black flex items-center justify-center flex-col p-6 relative">
      {showConfetti && <Confetti />}

      {/* Title with Lottie */}
      <div className="text-center mb-8 flex flex-col items-center">
        <div className="flex items-center gap-3">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-400 to-purple-600 bg-clip-text text-transparent drop-shadow-lg mb-5">
            Quiz App
          </h1>
          <div className="w-24 h-24">
            <Lottie animationData={quizAnimation} loop={true} />
          </div>
        </div>
        <p className="text-gray-300 mt-2 text-lg tracking-wide">
          Test Your Knowledge 🎯
        </p>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-2xl mb-8">
        <div className="bg-gray-700 h-4 rounded-full overflow-hidden">
          <div
            className="h-4 bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-500 ease-out"
            style={{ width: `${calculateProgress()}%` }}
          ></div>
        </div>
        <p className="text-right text-sm text-gray-400 mt-1">
          {Math.round(calculateProgress())}%
        </p>
      </div>

      {isFinished ? (
        <div className="text-center bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 max-w-lg">
          <h2 className="text-4xl font-bold mb-4 text-green-400">
            🎉 Quiz Completed!
          </h2>
          <p className="text-xl mb-6 text-gray-200">
            You Scored{" "}
            <span className="text-green-400 font-bold text-2xl">{score}</span> /
            <span className="font-bold text-2xl"> {questions.length}</span>{" "}
            ({Math.round(percentage)}%)
          </p>
          <button
            className="bg-gradient-to-r from-indigo-600 to-purple-600 py-3 px-8 rounded-xl font-semibold shadow-lg cursor-pointer transform hover:scale-105 transition-all"
            onClick={restartQuiz}
          >
            🔄 Restart Quiz
          </button>
        </div>
      ) : (
        <>
          <QuestionCard
            showFeedback={showFeedback}
            onAnswer={handleAnswer}
            current={currentQuestion}
            total={questions.length}
            data={questions[currentQuestion]}
            selected={selectedAnswer}
          />
          <div className="mt-8 min-h-[60px] flex justify-center">
            {showFeedback && (
              <button
                className="bg-gradient-to-r from-indigo-600 to-purple-600 py-3 px-8 rounded-xl font-semibold shadow-lg cursor-pointer transform hover:scale-105 transition-all"
                onClick={goToNext}
              >
                {currentQuestion + 1 < questions.length
                  ? "➡️ Continue"
                  : "🏆 See Results"}
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
