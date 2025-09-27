
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RoadmapStep } from '../types';
import EnhancedRoadmap from '../components/EnhancedRoadmap';

const roadmapData: RoadmapStep[] = [
  { id: 1, title: 'Foundations of Web Development', description: 'Master HTML, CSS, and JavaScript. Understand the core concepts that power the web.', duration: '4 Weeks' },
  { id: 2, title: 'Learn a Frontend Framework', description: 'Dive deep into React. Learn about components, state management, and hooks.', duration: '6 Weeks' },
  { id: 3, title: 'Backend Development', description: 'Explore Node.js and Express. Learn to build APIs and manage databases with MongoDB.', duration: '6 Weeks' },
  { id: 4, title: 'Data Structures & Algorithms', description: 'Strengthen your problem-solving skills. Focus on common patterns for technical interviews.', duration: '5 Weeks' },
  { id: 5, title: 'Build & Deploy Projects', description: 'Apply your knowledge by building full-stack applications and deploying them to the cloud.', duration: '4 Weeks' },
  { id: 6, title: 'Interview Preparation', description: 'Utilize our platform for mock interviews, resume feedback, and final preparations.', duration: '2 Weeks' },
];


const Roadmap: React.FC = () => {
    const [viewMode, setViewMode] = useState<'enhanced' | 'classic'>('enhanced');
    
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0 }
    };
    if (viewMode === 'enhanced') {
        return (
            <div>
                {/* Toggle Button */}
                <div className="fixed top-20 right-6 z-50">
                    <button
                        onClick={() => setViewMode('classic')}
                        className="bg-white shadow-lg px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                    >
                        Classic View
                    </button>
                </div>
                <EnhancedRoadmap />
            </div>
        );
    }

    return (
        <div className="py-16 bg-slate-50">
            <div className="container mx-auto px-6">
                {/* Toggle Button */}
                <div className="text-right mb-8">
                    <button
                        onClick={() => setViewMode('enhanced')}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Enhanced Search
                    </button>
                </div>

                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                  <h1 className="text-4xl font-extrabold text-slate-800">Your Frontend Developer Roadmap</h1>
                  <p className="mt-2 text-lg text-slate-500">A step-by-step guide to landing your first frontend developer role.</p>
                </motion.div>

                <div className="relative max-w-6xl mx-auto">
                  {/* Timeline Line */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-blue-200 hidden md:block"></div>
                  
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-16"
                  >
                    {roadmapData.map((step, index) => (
                      <motion.div key={step.id} variants={itemVariants} className="relative flex items-center w-full">
                        {/* Left side card (even indices: 0, 2, 4...) */}
                        {index % 2 === 0 && (
                          <div className="w-full md:w-1/2 md:pr-8">
                            <div className="p-6 bg-white rounded-xl shadow-lg border-l-4 border-blue-500 md:border-none hover:shadow-xl transition-shadow">
                              <span className="text-sm font-semibold text-blue-600">{step.duration}</span>
                              <h3 className="text-xl font-bold text-slate-800 mt-1">{step.title}</h3>
                              <p className="text-slate-500 mt-2">{step.description}</p>
                            </div>
                          </div>
                        )}
                        
                        {/* Timeline Circle - positioned absolutely in center */}
                        <div className="hidden md:flex justify-center items-center w-12 h-12 rounded-full bg-blue-500 text-white font-bold shadow-md absolute left-1/2 transform -translate-x-1/2 z-10">
                          {step.id}
                        </div>
                        
                        {/* Right side card (odd indices: 1, 3, 5...) */}
                        {index % 2 === 1 && (
                          <div className="w-full md:w-1/2 md:pl-8 md:text-right">
                            <div className="p-6 bg-white rounded-xl shadow-lg border-l-4 border-green-500 md:border-none hover:shadow-xl transition-shadow">
                              <span className="text-sm font-semibold text-blue-600">{step.duration}</span>
                              <h3 className="text-xl font-bold text-slate-800 mt-1">{step.title}</h3>
                              <p className="text-slate-500 mt-2">{step.description}</p>
                            </div>
                          </div>
                        )}
                        
                        {/* Empty spacer div for proper flex alignment */}
                        {index % 2 === 0 && <div className="hidden md:block w-1/2"></div>}
                        {index % 2 === 1 && <div className="hidden md:block w-1/2"></div>}
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Roadmap;
