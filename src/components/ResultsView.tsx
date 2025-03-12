import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Download } from 'lucide-react';
import gsap from 'gsap';

interface ResultsViewProps {
  results: {
    languages: string[];
    explanations: {
      language: string;
      reason: string;
    }[];
  };
  onBack: () => void;
  onReset: () => void;
}

const ResultsView: React.FC<ResultsViewProps> = ({ results, onBack, onReset }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(containerRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );
    
    tl.fromTo(headingRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
      "-=0.4"
    );
    
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll('.result-card');
      tl.fromTo(cards,
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.5, 
          stagger: 0.1,
          ease: "power3.out" 
        },
        "-=0.2"
      );
    }
    
    return () => {
      tl.kill();
    };
  }, [results]);
  
  const handleExport = () => {
    const resultsText = `
Recommandations de langages pour votre projet:

${results.languages.join(', ')}

Explications:
${results.explanations.map(exp => `- ${exp.language}: ${exp.reason}`).join('\n')}
    `;
    
    const blob = new Blob([resultsText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'recommendations-langages.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div ref={containerRef} className="min-h-screen pt-24 pb-16 px-6 md:px-12 flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl mx-auto">
        <h2 ref={headingRef} className="text-3xl md:text-4xl font-bold mb-8 text-center">
          <span className="gradient-text">Recommandations</span> pour votre projet
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10" ref={cardsRef}>
          {results.languages.map((language, index) => {
            const explanation = results.explanations.find(e => e.language.includes(language));
            
            return (
              <Card key={index} className="p-6 result-card hover:shadow-lg transition-shadow">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-custom-blue to-custom-purple flex items-center justify-center text-white font-bold mb-4">
                  {language.charAt(0)}
                </div>
                <h3 className="text-xl font-bold mb-2">{language}</h3>
                {explanation && (
                  <p className="text-muted-foreground text-sm">{explanation.reason}</p>
                )}
              </Card>
            );
          })}
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button variant="outline" onClick={onBack} className="flex-1">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Revenir au questionnaire
          </Button>
          
          <Button onClick={handleExport} variant="secondary" className="flex-1">
            <Download className="mr-2 h-4 w-4" />
            Exporter les résultats
          </Button>
          
          <Button onClick={onReset} className="bg-gradient-to-r from-custom-blue to-custom-purple hover:opacity-90 transition-opacity flex-1">
            Recommencer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResultsView;
