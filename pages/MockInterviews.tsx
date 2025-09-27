import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

interface Message {
  text: string;
  sender: 'user' | 'ai';
}

const MockInterviews: React.FC = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'ai', text: "Hello! I'm your AI interviewer. When you're ready, tell me a bit about yourself to begin." }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = () => {
    if (input.trim() === '') return;
    // FIX: Explicitly type the new user message object to conform to the Message interface.
    const userMessage: Message = { sender: 'user', text: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      // FIX: Explicitly type the new AI message object to conform to the Message interface.
      const aiMessage: Message = { sender: 'ai', text: "That's interesting. Can you tell me about a challenging project you've worked on?" };
      setMessages([...newMessages, aiMessage]);
      setIsTyping(false);
    }, 2000);
  };
  
  if (!user) {
    return (
         <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <h2 className="text-3xl font-bold text-slate-800">Practice Makes Perfect</h2>
            <p className="text-slate-500 mt-2 mb-6 max-w-md">Log in to start your personalized mock interview session with our AI.</p>
            <Link to="/login"><Button>Login to Start</Button></Link>
        </div>
    )
  }

  return (
    <div className="py-12 bg-slate-50">
      <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
        >
          <h1 className="text-4xl font-extrabold text-slate-800">Mock Interview</h1>
          <p className="mt-2 text-lg text-slate-500">Practice with our AI interviewer.</p>
        </motion.div>

        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg flex flex-col h-[70vh]">
          <div className="flex-1 p-6 space-y-4 overflow-y-auto">
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : ''}`}
              >
                {msg.sender === 'ai' && <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">AI</div>}
                <div className={`px-4 py-2 rounded-2xl max-w-sm md:max-w-md ${msg.sender === 'user' ? 'bg-blue-500 text-white rounded-br-none' : 'bg-slate-100 text-slate-800 rounded-bl-none'}`}>
                  {msg.text}
                </div>
                 {msg.sender === 'user' && <img src={user.photoURL || `https://i.pravatar.cc/150?u=${user.uid}`} className="w-8 h-8 rounded-full flex-shrink-0" alt="user avatar"/>}
              </motion.div>
            ))}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-end gap-2"
              >
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">AI</div>
                <div className="px-4 py-2 rounded-2xl bg-slate-100 rounded-bl-none">
                  <div className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-75"></span>
                      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150"></span>
                      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200"></span>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 border-t bg-white rounded-b-xl">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your answer..."
                className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button onClick={handleSend} className="bg-blue-600 text-white rounded-full p-3 hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockInterviews;