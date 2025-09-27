
import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import ProgressChart from '../components/ProgressChart';

const StatCard = ({ label, value, icon }: {label: string, value: string, icon: React.ReactNode}) => (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-xl shadow-lg flex items-center gap-4"
    >
        <div className="bg-blue-100 text-blue-600 p-3 rounded-full">{icon}</div>
        <div>
            <p className="text-slate-500 text-sm">{label}</p>
            <p className="text-2xl font-bold text-slate-800">{value}</p>
        </div>
    </motion.div>
)

const ProgressTracking: React.FC = () => {
    const { user } = useAuth();
    
    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <h2 className="text-3xl font-bold text-slate-800">Track Your Growth</h2>
                <p className="text-slate-500 mt-2 mb-6 max-w-md">Log in to view your personalized progress dashboard and stay motivated.</p>
                <Link to="/login"><Button>Login to View Progress</Button></Link>
            </div>
        )
    }

  return (
    <div className="py-12 bg-slate-50 min-h-[80vh]">
      <div className="container mx-auto px-4">
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-extrabold text-slate-800">Welcome back, {user.displayName?.split(' ')[0]}!</h1>
          <p className="mt-2 text-lg text-slate-500">Here's a snapshot of your progress. Keep up the great work!</p>
        </motion.div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard label="Quizzes Taken" value="12" icon={<IconQuiz />} />
            <StatCard label="Avg. Score" value="82%" icon={<IconScore />} />
            <StatCard label="Interviews Done" value="5" icon={<IconInterview />} />
            <StatCard label="Skills Mastered" value="8" icon={<IconSkills />} />
        </div>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8"
        >
            <ProgressChart />
        </motion.div>
      </div>
    </div>
  );
};

const IconQuiz = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>;
const IconScore = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const IconInterview = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const IconSkills = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-12v4m-2-2h4m5 4v4m-2-2h4M17 3l-4.5 4.5M19.5 5.5L15 10M17 21l-4.5-4.5M19.5 18.5L15 14" /></svg>;

export default ProgressTracking;
