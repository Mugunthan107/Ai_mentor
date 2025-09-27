import React from 'react';
// FIX: Import Variants type from framer-motion.
import { motion, Variants } from 'framer-motion';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

// FIX: Explicitly type cardVariants with Variants to ensure correct type inference.
const cardVariants: Variants = {
  offscreen: {
    y: 50,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center"
      variants={cardVariants}
      whileHover={{ y: -5 }}
    >
      <div className="bg-blue-100 text-blue-600 rounded-full p-4 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
      <p className="text-slate-500">{description}</p>
    </motion.div>
  );
};

export default FeatureCard;