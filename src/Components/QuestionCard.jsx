import React from "react";
import { motion } from "framer-motion";

export const QuestionCard = ({
  data,
  onAnswer,
  showFeedback,
  selected,
  current,
  total,
}) => {
  const { question, options, answer } = data;

  const getButtonStyle = (option) => {
    if (!showFeedback) {
      return "bg-white/10 hover:bg-white/20 hover:scale-[1.03] border border-white/20 shadow-md";
    }
    if (option === answer)
      return "bg-green-500/90 border border-green-400 text-white shadow-lg";
    if (option === selected)
      return "bg-red-500/90 border border-red-400 text-white shadow-lg";
    return "bg-gray-700/70 border border-gray-600 text-gray-300";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-gray-900/60 backdrop-blur-xl p-10 rounded-3xl shadow-2xl w-full max-w-2xl border border-white/20"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-purple-300 tracking-wide">
          Question {current + 1} / {total}
        </h2>
        <motion.span
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          key={current}
          className="text-xs font-medium bg-purple-600/30 px-4 py-1 rounded-full text-purple-200 border border-purple-400/40"
        >
          {selected
            ? Math.round(((current + 1) / total) * 100) + "% Complete"
            : Math.round((current / total) * 100) + "% Complete"}
        </motion.span>
      </div>

      {/* Question */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-2xl font-bold text-white mb-2 text-center leading-relaxed"
      >
        {question}
      </motion.p>

      {/* Options */}
      <div className="grid gap-3">
        {options.map((option, index) => (
          <motion.button
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.03 }}
            className={`${getButtonStyle(
              option
            )} px-5 py-3 cursor-pointer rounded-xl text-left font-medium transition-all duration-300`}
            key={index}
            onClick={() => onAnswer(option)}
            disabled={showFeedback}
          >
            {option}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};
