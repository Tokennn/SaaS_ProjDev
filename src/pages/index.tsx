import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import QuestionForm from '@/components/QuestionForm';
import ResultsView from '@/components/ResultsView';
import { ChatBox } from '@/components/ChatBox';

const Index = () => {
  const [view, setView] = useState<'landing' | 'form' | 'results'>('landing');
  const [results, setResults] = useState<any>(null);
  const [showChat, setShowChat] = useState(false);

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

      {/* Bouton de chat flottant */}
      <button
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors z-50"
      >
        {showChat ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      {/* ChatBox */}
      <div className={`fixed bottom-20 right-4 z-50 transition-all duration-300 ease-in-out transform ${showChat ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'}`}>
        <ChatBox />
      </div>
    </div>
  );
};

export default Index;
