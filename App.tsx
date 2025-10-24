import React, { useState, useEffect, useRef } from 'react';
import { Message } from './types';
import { postMessage } from './services/api';
import Header from './components/Header';
import ChatBubble from './components/ChatBubble';
import ChatInput from './components/ChatInput';
import TypingIndicator from './components/TypingIndicator';
import SuggestedQuestions from './components/SuggestedQuestions';

const SUGGESTED_QUESTIONS = [
  "Je veux participer à des cultes speciaux, comment faire",
  "Comment faire pour recevoir la prière",
  "Où trouver le livre du prophète Kacou Philippe en audio ou l'application"
];

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [session, setSession] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSuggested, setShowSuggested] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load session and messages from localStorage on initial render
  useEffect(() => {
    try {
      const storedSession = localStorage.getItem('chat_session');
      const storedMessages = localStorage.getItem('chat_messages');

      if (storedSession && storedMessages && JSON.parse(storedMessages).length > 1) {
        setSession(storedSession);
        setMessages(JSON.parse(storedMessages));
        setShowSuggested(false);
      } else {
        // Start a new session
        const newSession = crypto.randomUUID();
        setSession(newSession);
        const initialMessage: Message = {
          id: crypto.randomUUID(),
          text: "Bonjour! Je suis l'assistant de Media Chretien. Comment puis-je vous aider aujourd'hui concernant le Message du Prophète Kacou Philippe?",
          sender: 'bot',
        };
        setMessages([initialMessage]);
        setShowSuggested(true); // Show suggestions for new session
      }
    } catch (error) {
      console.error("Failed to load from localStorage, starting a new session.", error);
      // Fallback to a new session if localStorage is corrupt
      const newSession = crypto.randomUUID();
      setSession(newSession);
      setMessages([{
        id: crypto.randomUUID(),
        text: "Bonjour! Je suis l'assistant de Media Chretien. Comment puis-je vous aider?",
        sender: 'bot',
      }]);
      setShowSuggested(true);
    }
  }, []);

  // Save session and messages to localStorage whenever they change
  useEffect(() => {
    // Avoid saving the initial empty state
    if (session && messages.length > 0) {
      try {
        localStorage.setItem('chat_session', session);
        localStorage.setItem('chat_messages', JSON.stringify(messages));
      } catch (error) {
        console.error("Failed to save to localStorage", error);
      }
    }
  }, [session, messages]);


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (text: string) => {
    if (showSuggested) {
      setShowSuggested(false); // Hide suggestions on first message
    }

    const userMessage: Message = {
      id: crypto.randomUUID(),
      text,
      sender: 'user',
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    const botResponseText = await postMessage(session, text);

    const botMessage: Message = {
      id: crypto.randomUUID(),
      text: botResponseText,
      sender: botResponseText.startsWith("Désolé, une erreur est survenue") ? 'system' : 'bot',
    };

    setMessages((prev) => [...prev, botMessage]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-screen font-sans bg-gray-900 text-gray-100">
      <Header 
        title="Media Chretien APP" 
        slogan="Ce qu'il faut savoir sur le Message du prophète Kacou Philippe"
      />
      <main className="flex-1 overflow-y-auto pt-24 pb-4">
        <div className="max-w-4xl mx-auto px-4">
            {messages.map((msg) => (
              <ChatBubble key={msg.id} message={msg} />
            ))}
            {showSuggested && !isLoading && (
              <SuggestedQuestions 
                questions={SUGGESTED_QUESTIONS} 
                onQuestionClick={handleSendMessage} 
              />
            )}
            {isLoading && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      </main>
      <footer className="sticky bottom-0 left-0 right-0">
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </footer>
    </div>
  );
};

export default App;
