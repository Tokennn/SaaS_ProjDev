import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import QuestionForm from '@/components/QuestionForm';
import ResultsView from '@/components/ResultsView';

const Index = () => {
  const [view, setView] = useState<'landing' | 'form' | 'results'>('landing');
  const [results, setResults] = useState<any>(null);

  const handleStartClick = () => {
    setView('form');
  };

  const handleFormComplete = (formResults: any) => {
    setResults(formResults);
    setView('results');
  };

  const handleBackToForm = () => {
    setView('form');
  };

  const handleReset = () => {
    setView('landing');
    setResults(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {view === 'landing' && (
        <Hero onStartClick={handleStartClick} />
      )}
      
      {view === 'form' && (
        <QuestionForm 
          onComplete={handleFormComplete}
          onBack={handleReset}
        />
      )}
      
      {view === 'results' && results && (
        <ResultsView
          results={results}
          onBack={handleBackToForm}
          onReset={handleReset}
        />
      )}
    </div>
  );
};

export default Index;
