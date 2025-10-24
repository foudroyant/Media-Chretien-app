
import React, { useState } from 'react';
import { SendIcon } from './IconComponents';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (inputValue.trim() && !isLoading) {
      onSendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="p-4 bg-gray-800/50 backdrop-blur-sm border-t border-gray-700">
      <div className="max-w-4xl mx-auto flex items-center space-x-3">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Posez votre question ici..."
          disabled={isLoading}
          className="flex-grow bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-full py-2.5 px-5 focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:opacity-50 transition-all duration-200"
        />
        <button
          onClick={handleSend}
          disabled={isLoading || !inputValue.trim()}
          className="bg-cyan-500 text-white rounded-full p-3 hover:bg-cyan-600 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-cyan-500"
        >
          <SendIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
