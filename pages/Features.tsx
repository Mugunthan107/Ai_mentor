
import React from 'react';
import { motion } from 'framer-motion';

const FeatureItem = ({ icon, title, text, reverse = false }: {icon: string, title: string, text: string, reverse?: boolean}) => {
    const itemVariants = {
      hidden: { opacity: 0, x: reverse ? 50 : -50 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
    };

    return (
        <motion.div
            className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${reverse ? 'md:flex-row-reverse' : ''}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={itemVariants}
        >
            <div className="md:w-1/2">
                <img src={icon} alt={title} className="rounded-lg shadow-2xl w-full" />
            </div>
            <div className="md:w-1/2">
                <h3 className="text-3xl font-bold text-slate-800 mb-4">{title}</h3>
                <p className="text-slate-500 leading-relaxed">{text}</p>
            </div>
        </motion.div>
    )
}

const Features: React.FC = () => {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
        >
          <h1 className="text-4xl font-extrabold text-slate-800">Platform Features</h1>
          <p className="mt-2 text-lg text-slate-500">Discover the tools that will shape your career.</p>
        </motion.div>
        
        <div className="space-y-20">
            <FeatureItem 
                icon="https://picsum.photos/seed/interview/800/600"
                title="AI-Powered Mock Interviews"
                text="Our advanced AI conducts realistic interviews, providing instant, actionable feedback on your answers, communication skills, and body language. Prepare for any scenario and walk into your real interview with confidence."
            />
             <FeatureItem 
                icon="https://picsum.photos/seed/resume/800/600"
                title="Intelligent Resume Feedback"
                text="Upload your resume and get a comprehensive analysis in seconds. We check for keywords, formatting, and common mistakes to ensure your resume gets past automated screening systems and catches the eye of recruiters."
                reverse
            />
             <FeatureItem 
                icon="https://picsum.photos/seed/aptitude/800/600"
                title="Aptitude & Coding Practice"
                text="Access a vast library of aptitude questions and coding challenges curated from top tech companies. Hone your problem-solving skills, track your performance, and benchmark yourself against peers."
            />
             <FeatureItem 
                icon="https://picsum.photos/seed/progress/800/600"
                title="Dynamic Progress Tracking"
                text="Visualize your growth with our interactive dashboard. Track your scores, identify areas for improvement, and see how you stack up. Our data-driven insights help you focus your efforts where they matter most."
                reverse
            />
        </div>
      </div>
    </div>
  );
};

export default Features;
