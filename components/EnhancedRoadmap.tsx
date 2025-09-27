import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RoadmapStep } from '../types';

interface SearchResult {
  title: string;
  link: string;
  snippet: string;
}

interface RoadmapTemplate {
  title: string;
  description: string;
  steps: RoadmapStep[];
}

const roadmapTemplates: Record<string, RoadmapTemplate> = {
  'machine learning': {
    title: 'Machine Learning Roadmap',
    description: 'A comprehensive guide to becoming a machine learning engineer',
    steps: [
      { id: 1, title: 'Mathematics & Statistics', description: 'Master linear algebra, calculus, and statistics fundamentals', duration: '6 Weeks' },
      { id: 2, title: 'Programming Foundation', description: 'Learn Python, NumPy, Pandas, and data manipulation', duration: '4 Weeks' },
      { id: 3, title: 'Machine Learning Basics', description: 'Understand supervised/unsupervised learning, algorithms, and evaluation', duration: '8 Weeks' },
      { id: 4, title: 'Deep Learning', description: 'Neural networks, TensorFlow/PyTorch, and advanced architectures', duration: '10 Weeks' },
      { id: 5, title: 'MLOps & Deployment', description: 'Model deployment, monitoring, and production systems', duration: '6 Weeks' },
      { id: 6, title: 'Specialization', description: 'Choose focus area: NLP, Computer Vision, or Reinforcement Learning', duration: '8 Weeks' }
    ]
  },
  'web development': {
    title: 'Web Development Roadmap',
    description: 'Complete guide to becoming a full-stack web developer',
    steps: [
      { id: 1, title: 'HTML & CSS Fundamentals', description: 'Master semantic HTML, CSS Grid, Flexbox, and responsive design', duration: '4 Weeks' },
      { id: 2, title: 'JavaScript & ES6+', description: 'Learn modern JavaScript, DOM manipulation, and async programming', duration: '6 Weeks' },
      { id: 3, title: 'Frontend Framework', description: 'Choose React, Vue, or Angular and build dynamic applications', duration: '8 Weeks' },
      { id: 4, title: 'Backend Development', description: 'Node.js, Express, databases (SQL/NoSQL), and API design', duration: '10 Weeks' },
      { id: 5, title: 'DevOps & Deployment', description: 'Git, Docker, cloud platforms, and CI/CD pipelines', duration: '6 Weeks' },
      { id: 6, title: 'Advanced Topics', description: 'Performance optimization, security, testing, and architecture', duration: '8 Weeks' }
    ]
  },
  'data science': {
    title: 'Data Science Roadmap',
    description: 'Path to becoming a data scientist',
    steps: [
      { id: 1, title: 'Statistics & Probability', description: 'Descriptive statistics, inferential statistics, and probability theory', duration: '6 Weeks' },
      { id: 2, title: 'Python Programming', description: 'Python basics, data structures, and object-oriented programming', duration: '4 Weeks' },
      { id: 3, title: 'Data Manipulation', description: 'Pandas, NumPy, data cleaning, and exploratory data analysis', duration: '6 Weeks' },
      { id: 4, title: 'Machine Learning', description: 'Scikit-learn, model selection, and evaluation metrics', duration: '8 Weeks' },
      { id: 5, title: 'Data Visualization', description: 'Matplotlib, Seaborn, Plotly, and storytelling with data', duration: '4 Weeks' },
      { id: 6, title: 'Big Data & Tools', description: 'SQL, cloud platforms, and big data technologies', duration: '8 Weeks' }
    ]
  },
  'digital marketing': {
    title: 'Digital Marketing Roadmap',
    description: 'Complete digital marketing career path',
    steps: [
      { id: 1, title: 'Marketing Fundamentals', description: 'Marketing principles, consumer behavior, and market research', duration: '4 Weeks' },
      { id: 2, title: 'Content Marketing', description: 'Content strategy, creation, SEO, and content distribution', duration: '6 Weeks' },
      { id: 3, title: 'Social Media Marketing', description: 'Platform strategies, community management, and social advertising', duration: '6 Weeks' },
      { id: 4, title: 'Paid Advertising', description: 'Google Ads, Facebook Ads, and programmatic advertising', duration: '8 Weeks' },
      { id: 5, title: 'Analytics & Data', description: 'Google Analytics, data interpretation, and ROI measurement', duration: '6 Weeks' },
      { id: 6, title: 'Marketing Automation', description: 'Email marketing, CRM systems, and marketing technology', duration: '6 Weeks' }
    ]
  }
};

const popularTopics = [
  'Machine Learning', 'Web Development', 'Data Science', 'Digital Marketing',
  'Python Programming', 'React Development', 'Data Analysis', 'UI/UX Design',
  'Cybersecurity', 'Cloud Computing', 'DevOps', 'Mobile Development'
];

const EnhancedRoadmap: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentRoadmap, setCurrentRoadmap] = useState<RoadmapTemplate | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Check if we have API credentials
  const hasApiCredentials = process.env.REACT_APP_GOOGLE_API_KEY && process.env.REACT_APP_SEARCH_ENGINE_ID;

  const generateRoadmapFromSearch = useCallback(async (query: string): Promise<RoadmapStep[]> => {
    if (!hasApiCredentials) {
      throw new Error('Google API credentials not configured');
    }

    const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
    const searchEngineId = process.env.REACT_APP_SEARCH_ENGINE_ID;
    const searchUrl = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${encodeURIComponent(query + ' learning roadmap course tutorial')}`;

    try {
      const response = await fetch(searchUrl);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'Search failed');
      }

      const results: SearchResult[] = data.items?.map((item: any) => ({
        title: item.title,
        link: item.link,
        snippet: item.snippet
      })) || [];

      // Generate roadmap steps from search results
      const steps: RoadmapStep[] = [
        { id: 1, title: 'Foundation & Basics', description: 'Start with fundamental concepts and prerequisites', duration: '4-6 Weeks' },
        { id: 2, title: 'Core Learning', description: 'Dive deep into main concepts and practical applications', duration: '6-8 Weeks' },
        { id: 3, title: 'Hands-on Practice', description: 'Build projects and apply knowledge through practical exercises', duration: '4-6 Weeks' },
        { id: 4, title: 'Advanced Topics', description: 'Explore advanced concepts and specialized areas', duration: '6-8 Weeks' },
        { id: 5, title: 'Real-world Application', description: 'Work on real projects and case studies', duration: '4-6 Weeks' },
        { id: 6, title: 'Mastery & Specialization', description: 'Focus on specific areas and continuous learning', duration: 'Ongoing' }
      ];

      return steps;
    } catch (error) {
      console.error('Search API error:', error);
      throw error;
    }
  }, [hasApiCredentials]);

  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);
    setShowSuggestions(false);

    try {
      // Check for predefined templates first
      const normalizedQuery = query.toLowerCase().trim();
      if (roadmapTemplates[normalizedQuery]) {
        setCurrentRoadmap(roadmapTemplates[normalizedQuery]);
        return;
      }

      // Try to generate from search if API is available
      if (hasApiCredentials) {
        const steps = await generateRoadmapFromSearch(query);
        setCurrentRoadmap({
          title: `${query} Learning Roadmap`,
          description: `A comprehensive learning path for ${query}`,
          steps
        });
      } else {
        // Fallback to generic roadmap
        setCurrentRoadmap({
          title: `${query} Learning Roadmap`,
          description: `A comprehensive learning path for ${query}`,
          steps: [
            { id: 1, title: 'Foundation & Basics', description: 'Start with fundamental concepts and prerequisites', duration: '4-6 Weeks' },
            { id: 2, title: 'Core Learning', description: 'Dive deep into main concepts and practical applications', duration: '6-8 Weeks' },
            { id: 3, title: 'Hands-on Practice', description: 'Build projects and apply knowledge through practical exercises', duration: '4-6 Weeks' },
            { id: 4, title: 'Advanced Topics', description: 'Explore advanced concepts and specialized areas', duration: '6-8 Weeks' },
            { id: 5, title: 'Real-world Application', description: 'Work on real projects and case studies', duration: '4-6 Weeks' },
            { id: 6, title: 'Mastery & Specialization', description: 'Focus on specific areas and continuous learning', duration: 'Ongoing' }
          ]
        });
      }
    } catch (error) {
      setError('Failed to generate roadmap. Please try again.');
      console.error('Roadmap generation error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [generateRoadmapFromSearch, hasApiCredentials]);

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    handleSearch(suggestion);
  };

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

  // Initialize with default roadmap
  useEffect(() => {
    if (!currentRoadmap) {
      setCurrentRoadmap(roadmapTemplates['web development']);
    }
  }, [currentRoadmap]);

  return (
    <div className="py-16 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-extrabold text-slate-800 mb-4">
            Dynamic Learning Roadmap Generator
          </h1>
          <p className="text-lg text-slate-500 mb-8">
            Search for any topic and get a personalized learning roadmap
          </p>

          {/* Search Interface */}
          <div className="max-w-2xl mx-auto relative">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(e.target.value.length > 0);
                }}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
                placeholder="Search for any learning topic (e.g., Machine Learning, Python, Digital Marketing)"
                className="w-full px-6 py-4 text-lg border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
              />
              <button
                onClick={() => handleSearch(searchQuery)}
                disabled={isLoading}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  'Search'
                )}
              </button>
            </div>

            {/* Suggestions Dropdown */}
            <AnimatePresence>
              {showSuggestions && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 bg-white border border-slate-200 rounded-xl shadow-lg z-10 mt-2"
                >
                  <div className="p-4">
                    <p className="text-sm text-slate-500 mb-3">Popular topics:</p>
                    <div className="flex flex-wrap gap-2">
                      {popularTopics.map((topic) => (
                        <button
                          key={topic}
                          onClick={() => handleSuggestionClick(topic)}
                          className="px-3 py-1 bg-slate-100 hover:bg-blue-100 text-slate-700 hover:text-blue-700 rounded-full text-sm transition-colors"
                        >
                          {topic}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* API Status */}
          {!hasApiCredentials && (
            <div >
            
          </div>
          )}
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto mb-8 p-4 bg-red-50 border border-red-200 rounded-lg"
          >
            <p className="text-red-800">{error}</p>
          </motion.div>
        )}

        {/* Roadmap Content */}
        {currentRoadmap && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-800 mb-2">{currentRoadmap.title}</h2>
              <p className="text-lg text-slate-500">{currentRoadmap.description}</p>
            </div>

            <div className="relative max-w-6xl mx-auto">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-blue-200 hidden md:block"></div>
              
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-16"
              >
                {currentRoadmap.steps.map((step, index) => (
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
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default EnhancedRoadmap;
