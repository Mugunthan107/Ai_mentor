
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import FeatureCard from '../components/FeatureCard';
import { useAuth } from '../hooks/useAuth';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6 },
  },
};

const Home: React.FC = () => {
    const { user } = useAuth();
    
    const features = [
        { icon: <IconAI />, title: 'AI Mock Interviews', description: 'Practice interviews with an AI that gives real-time feedback.' },
        { icon: <IconResume />, title: 'Resume Analyzer', description: 'Get instant feedback on your resume to pass ATS scans.' },
        { icon: <IconRoadmap />, title: 'Personalized Roadmaps', description: 'Customized learning paths to achieve your career goals.' },
        { icon: <IconCode />, title: 'Coding Challenges', description: 'Sharpen your skills with a curated list of coding problems.' },
    ];

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="bg-white"
      >
        <div className="container mx-auto px-6 py-20 text-center">
            <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-extrabold text-slate-800 leading-tight">
                Your Career Journey
                <br />
                <span className="text-blue-600">Starts Here 🚀</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="mt-4 text-lg md:text-xl text-slate-500 max-w-2xl mx-auto">
                AI-powered tools and personalized guidance to help you land your dream tech job. Stop guessing, start preparing.
            </motion.p>
            <motion.div variants={itemVariants} className="mt-8">
                 {user ? (
                     <Link to="/progress"><Button>Go to Dashboard</Button></Link>
                 ) : (
                     <Link to="/login"><Button>Get Started for Free</Button></Link>
                 )}
            </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="py-20 bg-slate-50"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <div className="container mx-auto px-6">
          <motion.h2 variants={itemVariants} className="text-3xl font-bold text-center text-slate-800 mb-2">Everything you need to succeed</motion.h2>
          <motion.p variants={itemVariants} className="text-center text-slate-500 mb-12 max-w-xl mx-auto">From your first line of code to your final interview, we've got you covered.</motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} icon={feature.icon} title={feature.title} description={feature.description} />
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};


const IconAI = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect x="4" y="12" width="16" height="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v-2a3 3 0 0 0-3-3H9m-1 4H6"/></svg>;
const IconResume = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>;
const IconRoadmap = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6.1a3.5 3.5 0 0 0-5 0l-4.5 4.5a3.5 3.5 0 0 0 0 5l1.5 1.5a3.5 3.5 0 0 0 5 0l4.5-4.5a3.5 3.5 0 0 0 0-5l-1.5-1.5z"/></svg>;
const IconCode = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>;

export default Home;
