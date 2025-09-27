
import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import BackToTopButton from './components/BackToTopButton';

const Home = lazy(() => import('./pages/Home'));
const Features = lazy(() => import('./pages/Features'));
const Roadmap = lazy(() => import('./pages/Roadmap'));
const MockInterviews = lazy(() => import('./pages/MockInterviews'));
const ResumeFeedback = lazy(() => import('./pages/ResumeFeedback'));
const AptitudeCoding = lazy(() => import('./pages/AptitudeCoding'));
const ProgressTracking = lazy(() => import('./pages/ProgressTracking'));
const Contact = lazy(() => import('./pages/Contact'));
const Login = lazy(() => import('./pages/Login'));
const NotFound = lazy(() => import('./components/NotFound'));

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-slate-50">
      <Header />
      <main className="flex-grow">
        <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/interviews" element={<MockInterviews />} />
            <Route path="/resume" element={<ResumeFeedback />} />
            <Route path="/aptitude" element={<AptitudeCoding />} />
            <Route path="/progress" element={<ProgressTracking />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <BackToTopButton />
    </div>
  );
};

export default App;
