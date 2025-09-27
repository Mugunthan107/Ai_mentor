
import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { getResumeFeedback } from '../services/geminiService';

const ResumeFeedback: React.FC = () => {
    const { user } = useAuth();
    const [file, setFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [feedback, setFeedback] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setFeedback(null);
            setError(null);
        }
    };

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
            setFeedback(null);
            setError(null);
        }
    };

    const analyzeResume = useCallback(async () => {
        if (!file) {
            setError("Please upload a file first.");
            return;
        }
        setIsLoading(true);
        setError(null);
        setFeedback(null);
        try {
            // In a real app, you'd parse the PDF/DOCX to text before sending.
            // Here, we'll just simulate with the file name.
            const mockText = `Resume content for ${file.name}`;
            const result = await getResumeFeedback(mockText);
            setFeedback(result);
        } catch (err) {
            setError("Failed to get feedback. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }, [file]);
    
    if (!user) {
        return (
             <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <h2 className="text-3xl font-bold text-slate-800">Get Expert Resume Feedback</h2>
                <p className="text-slate-500 mt-2 mb-6 max-w-md">Log in to upload your resume and receive instant, AI-driven suggestions.</p>
                <Link to="/login"><Button>Login to Start</Button></Link>
            </div>
        )
    }

    return (
        <div className="py-12 bg-slate-50 min-h-[80vh]">
            <div className="container mx-auto px-4">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-8"
                >
                    <h1 className="text-4xl font-extrabold text-slate-800">Resume Feedback</h1>
                    <p className="mt-2 text-lg text-slate-500">Upload your resume to get instant AI analysis.</p>
                </motion.div>
                
                <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                        <div 
                            onDragEnter={handleDragEnter}
                            onDragLeave={handleDragLeave}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            className={`relative border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-colors duration-300 ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-slate-300 bg-white hover:border-blue-400'}`}
                        >
                            <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
                            <div className="flex flex-col items-center justify-center space-y-4 text-slate-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                                <p className="font-semibold">Drag & drop your file here</p>
                                <p className="text-sm">or click to browse</p>
                                <p className="text-xs">PDF, DOC, DOCX up to 5MB</p>
                            </div>
                        </div>
                        {file && (
                            <div className="mt-4 p-4 bg-white rounded-lg shadow-sm border flex justify-between items-center">
                                <span className="text-sm text-slate-700 font-medium truncate">{file.name}</span>
                                <button onClick={() => { setFile(null); setFeedback(null); }} className="text-red-500 hover:text-red-700">&times;</button>
                            </div>
                        )}
                        <div className="mt-6">
                            <Button onClick={analyzeResume} disabled={!file || isLoading} className="w-full">
                                {isLoading ? 'Analyzing...' : 'Get AI Feedback'}
                            </Button>
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-bold text-slate-800 mb-4">Feedback Report</h3>
                        {error && <div className="text-red-500 p-3 bg-red-50 rounded-md">{error}</div>}
                        {isLoading && (
                            <div className="flex items-center justify-center h-full">
                                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
                            </div>
                        )}
                        {feedback ? (
                            <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: feedback.replace(/\n/g, '<br />') }} />
                        ) : (
                           !isLoading && <p className="text-slate-400">Your feedback will appear here once you upload and analyze your resume.</p>
                        )}
                    </motion.div>
                </div>

            </div>
        </div>
    );
};

export default ResumeFeedback;
