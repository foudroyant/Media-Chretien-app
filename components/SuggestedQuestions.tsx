import React from 'react';

interface SuggestedQuestionsProps {
  questions: string[];
  onQuestionClick: (question: string) => void;
}

const SuggestedQuestions: React.FC<SuggestedQuestionsProps> = ({ questions, onQuestionClick }) => {
  return (
    <div className="px-4 py-2" aria-label="Questions suggérées">
      <p className="text-sm text-gray-400 mb-3 text-center">Ou essayez l'une de ces questions :</p>
      <div className="flex flex-col items-center gap-2">
        {questions.map((q, index) => (
          <button
            key={index}
            onClick={() => onQuestionClick(q)}
            className="w-full max-w-md text-left text-sm bg-gray-700/50 hover:bg-gray-700 text-gray-200 font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SuggestedQuestions;
