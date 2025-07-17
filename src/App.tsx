import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import AdminRoute from './components/AdminRoute';
import Footer from './components/Footer';
import InteractiveElements from './components/InteractiveElements';

const About = lazy(() => import('./components/About'));
const Projects = lazy(() => import('./components/Projects'));
const Process = lazy(() => import('./components/Process'));
const Skills = lazy(() => import('./components/Skills'));
const Courses = lazy(() => import('./components/Courses'));
const Certificates = lazy(() => import('./components/Certificates'));
const Achievements = lazy(() => import('./components/Achievements'));
const Contact = lazy(() => import('./components/Contact'));

function App() {
  return (
    <Router>
      <InteractiveElements />
      <Routes>
        <Route path="/admin" element={<AdminRoute />} />
        <Route path="/" element={
          <div className="min-h-screen bg-white dark:bg-slate-900 transition-all duration-500">
            <Header />
            <Hero />
            <Suspense fallback={<div className="text-center py-24">Carregando...</div>}>
              <About />
              <Projects />
              <Process />
              <Skills />
              <Courses />
              <Certificates />
              <Achievements />
              <Contact />
            </Suspense>
            <Footer />
          </div>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;