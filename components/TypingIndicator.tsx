
import React from 'react';
import { BotIcon } from './IconComponents';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-end space-x-3 p-4">
      <div className="flex-shrink-0">
        <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
          <BotIcon className="w-5 h-5 text-gray-300" />
        </div>
      </div>
      <div className="flex items-center space-x-1.5 bg-gray-700 p-3 rounded-2xl rounded-bl-none">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};

export default TypingIndicator;
