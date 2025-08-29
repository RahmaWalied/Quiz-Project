import React, { useState, useEffect } from "react";
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
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // تحديث حجم الشاشة للـ Confetti
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-purple-900 to-black flex flex-col items-center p-4 sm:p-6 overflow-y-auto">
      {/* Confetti */}
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={200}
        />
      )}

      {/* Title with Lottie */}
      <div className="text-center mb-6 flex flex-col items-center">
        <div className="flex items-center gap-3">
          <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-indigo-400 to-purple-600 bg-clip-text text-transparent drop-shadow-lg mb-3 sm:mb-5">
            Quiz App
          </h1>
          <div className="w-20 h-20 sm:w-24 sm:h-24">
            <Lottie animationData={quizAnimation} loop={true} />
          </div>
        </div>
        <p className="text-gray-300 mt-2 text-sm sm:text-lg tracking-wide">
          Test Your Knowledge 🎯
        </p>
      </div>

      {/* Progress bar */}
      {!isFinished && (
        <div className="w-full max-w-xl mb-4 px-2">
          <div className="bg-gray-700 h-3 sm:h-4 rounded-full overflow-hidden">
            <div
              className="h-3 sm:h-4 bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-500 ease-out"
              style={{ width: `${calculateProgress()}%` }}
            ></div>
          </div>
          <p className="text-right text-xs sm:text-sm text-gray-400 mt-1">
            {Math.round(calculateProgress())}%
          </p>
        </div>
      )}

      {/* Question Card & Button */}
      {!isFinished && (
        <>
          <QuestionCard
            showFeedback={showFeedback}
            onAnswer={handleAnswer}
            current={currentQuestion}
            total={questions.length}
            data={questions[currentQuestion]}
            selected={selectedAnswer}
          />
          <div className="mt-6 sm:mt-8 flex justify-center w-full">
            {showFeedback && (
              <button
                className="bg-gradient-to-r from-indigo-600 to-purple-600 py-2 sm:py-3 px-6 sm:px-8 rounded-xl font-semibold shadow-lg cursor-pointer transform hover:scale-105 transition-all"
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

      {/* Finished Quiz */}
      {isFinished && (
        <div className="text-center bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-8 max-w-lg w-full mb-6">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 text-green-400">
            🎉 Quiz Completed!
          </h2>
          <p className="text-lg sm:text-xl mb-4 sm:mb-6 text-gray-200">
            You Scored{" "}
            <span className="text-green-400 font-bold text-xl sm:text-2xl">{score}</span> /
            <span className="font-bold text-xl sm:text-2xl"> {questions.length}</span>{" "}
            ({Math.round(percentage)}%)
          </p>
          <button
            className="bg-gradient-to-r from-indigo-600 to-purple-600 py-2 sm:py-3 px-6 sm:px-8 rounded-xl font-semibold shadow-lg cursor-pointer transform hover:scale-105 transition-all"
            onClick={restartQuiz}
          >
            🔄 Restart Quiz
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
