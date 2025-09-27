
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import { QuizQuestion } from '../types';

const quizData: QuizQuestion[] = [
    { id: 1, question: "What will be the output of `console.log(typeof null);` in JavaScript?", options: ["null", "undefined", "object", "string"], answer: "object" },
    { id: 2, question: "Which of the following is NOT a valid CSS position value?", options: ["static", "relative", "center", "absolute"], answer: "center" },
    { id: 3, question: "What does `useState` return in a React functional component?", options: ["A state value", "A function to update state", "An array with a state value and an update function", "An object with state properties"], answer: "An array with a state value and an update function" }
];

const AptitudeCoding: React.FC = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [showResult, setShowResult] = useState(false);

    const handleAnswer = (option: string) => {
        setSelectedAnswer(option);
        setShowResult(true);
    };

    const handleNext = () => {
        setShowResult(false);
        setSelectedAnswer(null);
        setCurrentQuestion((prev) => (prev + 1) % quizData.length);
    };

    const question = quizData[currentQuestion];

    return (
        <div className="py-12 bg-slate-50 min-h-[80vh]">
            <div className="container mx-auto px-4">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <h1 className="text-4xl font-extrabold text-slate-800">Aptitude & Coding</h1>
                    <p className="mt-2 text-lg text-slate-500">Test your knowledge and sharpen your skills.</p>
                </motion.div>
                
                <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-8">
                    {/* Aptitude Quiz Section */}
                    <motion.div
                        key={currentQuestion}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white p-8 rounded-xl shadow-lg"
                    >
                        <h2 className="text-xl font-bold text-slate-800 mb-1">Aptitude Quiz</h2>
                        <p className="text-sm text-slate-500 mb-6">Question {currentQuestion + 1} of {quizData.length}</p>
                        <p className="text-lg text-slate-700 font-medium mb-6">{question.question}</p>
                        <div className="space-y-3">
                            {question.options.map((option) => (
                                <button
                                    key={option}
                                    onClick={() => handleAnswer(option)}
                                    disabled={showResult}
                                    className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                                        showResult
                                        ? question.answer === option
                                            ? 'bg-green-100 border-green-400 text-green-800'
                                            : selectedAnswer === option
                                            ? 'bg-red-100 border-red-400 text-red-800'
                                            : 'border-slate-300'
                                        : 'border-slate-300 hover:bg-blue-50 hover:border-blue-400'
                                    }`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                        {showResult && (
                             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 text-center">
                                <Button onClick={handleNext}>Next Question</Button>
                            </motion.div>
                        )}
                    </motion.div>

                    {/* Coding Challenge Section */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-slate-800 p-8 rounded-xl shadow-lg text-slate-100 flex flex-col"
                    >
                        <h2 className="text-xl font-bold mb-4">Coding Challenge</h2>
                        <p className="text-sm text-slate-300 mb-4">Write a JavaScript function to reverse a string.</p>
                        <div className="bg-slate-900 rounded-lg p-4 flex-grow font-mono text-sm">
                            <textarea
                                className="w-full h-full bg-transparent text-slate-100 resize-none focus:outline-none"
                                defaultValue={`function reverseString(str) {\n  // your code here\n}`}
                            />
                        </div>
                        <div className="mt-6">
                            <Button variant="secondary" className="w-full">Run Code</Button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default AptitudeCoding;
