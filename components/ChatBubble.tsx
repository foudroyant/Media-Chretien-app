import React from 'react';
import { Message } from '../types';
import { BotIcon, UserIcon, TrashIcon } from './IconComponents';

interface ChatBubbleProps {
  message: Message;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, isSelected, onSelect, onDelete }) => {
  const isUser = message.sender === 'user';
  const isBot = message.sender === 'bot';
  const isSystem = message.sender === 'system';

  if (isSystem) {
    return (
      <div className="text-center text-xs text-gray-500 py-2">
        {message.text}
      </div>
    );
  }

  return (
    <div 
      className={`flex items-end gap-3 p-4 group ${isUser ? 'justify-end' : 'justify-start'} ${!isSystem ? 'cursor-pointer' : ''}`}
      onClick={isSystem ? undefined : () => onSelect(message.id)}
    >
      {isUser && isSelected && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(message.id);
          }}
          className="p-1.5 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
          aria-label="Supprimer le message"
        >
          <TrashIcon className="w-4 h-4" />
        </button>
      )}

      {!isUser && (
        <div className="flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
            <BotIcon className="w-5 h-5 text-gray-300" />
          </div>
        </div>
      )}
      <div
        className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl text-white ${
          isUser
            ? 'bg-blue-600 rounded-br-none'
            : 'bg-gray-700 rounded-bl-none'
        }`}
      >
        {isBot ? (
          <div
            className="text-sm whitespace-pre-wrap [&_a]:text-cyan-300 [&_a]:underline"
            dangerouslySetInnerHTML={{ __html: message.text }}
          />
        ) : (
          <p className="text-sm whitespace-pre-wrap">{message.text}</p>
        )}
      </div>
       {isUser && (
        <div className="flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
            <UserIcon className="w-5 h-5 text-gray-300" />
          </div>
        </div>
      )}

      {!isUser && !isSystem && isSelected && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(message.id);
          }}
          className="p-1.5 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
          aria-label="Supprimer le message"
        >
          <TrashIcon className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default ChatBubble;
