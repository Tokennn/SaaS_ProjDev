import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import gsap from 'gsap';
import { toast } from "sonner";

interface QuestionFormProps {
  onComplete: (results: any) => void;
  onBack: () => void;
}

const QuestionForm: React.FC<QuestionFormProps> = ({ onComplete, onBack }) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    projectType: '',
    projectSize: '',
    timeline: '',
    performance: '',
    budget: '',
    experience: '',
    industries: [],
    description: '',
    features: '',
    mobileNeeded: ''
  });
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(formRef.current, 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
    );

    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    if (step > 0) {
      gsap.fromTo(formRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [step]);

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleMultiSelect = (field: string, value: string) => {
    const values = formData[field as keyof typeof formData] as string[] || [];
    if (values.includes(value)) {
      setFormData({
        ...formData,
        [field]: values.filter(v => v !== value)
      });
    } else {
      setFormData({
        ...formData,
        [field]: [...values, value]
      });
    }
  };

  const handleNext = () => {
    if (step === 0 && !formData.projectType) {
      toast.error("Veuillez sélectionner un type de projet");
      return;
    }
    
    if (step === questions.length - 1) {
      const results = analyzeAnswers(formData);
      onComplete(results);
    } else {
      const tl = gsap.timeline();
      tl.to(formRef.current, { opacity: 0, x: -50, duration: 0.3, ease: "power2.in" })
        .call(() => setStep(step + 1));
    }
  };

  const handleBack = () => {
    if (step === 0) {
      const tl = gsap.timeline();
      tl.to(formRef.current, { opacity: 0, y: 50, duration: 0.3, ease: "power2.in" })
        .call(() => onBack());
    } else {
      const tl = gsap.timeline();
      tl.to(formRef.current, { opacity: 0, x: 50, duration: 0.3, ease: "power2.in" })
        .call(() => setStep(step - 1));
    }
  };

  const questions = [
    {
      title: "Quel type de projet souhaitez-vous réaliser ?",
      field: "projectType",
      type: "radio",
      options: [
        { value: "web", label: "Site Web / Application Web" },
        { value: "mobile", label: "Application Mobile" },
        { value: "desktop", label: "Application Bureau" },
        { value: "game", label: "Jeu Vidéo" },
        { value: "datascience", label: "Analyse de Données / IA" },
        { value: "backend", label: "Backend / API" }
      ]
    },
    {
      title: "Quelle est l'envergure de votre projet ?",
      field: "projectSize",
      type: "radio",
      options: [
        { value: "small", label: "Petit (projet personnel ou MVP)" },
        { value: "medium", label: "Moyen (application avec plusieurs fonctionnalités)" },
        { value: "large", label: "Grand (produit complexe ou entreprise)" }
      ]
    },
    {
      title: "Quel est votre délai pour ce projet ?",
      field: "timeline",
      type: "radio",
      options: [
        { value: "urgent", label: "Urgent (< 1 mois)" },
        { value: "normal", label: "Normal (1-6 mois)" },
        { value: "relaxed", label: "Flexible (> 6 mois)" }
      ]
    },
    {
      title: "La performance est-elle critique pour votre projet ?",
      field: "performance",
      type: "radio",
      options: [
        { value: "high", label: "Très importante (temps réel, haute charge)" },
        { value: "medium", label: "Moyennement importante" },
        { value: "low", label: "Peu importante (projet simple ou MVP)" }
      ]
    },
    {
      title: "Quel est votre niveau d'expérience en programmation ?",
      field: "experience",
      type: "radio",
      options: [
        { value: "beginner", label: "Débutant" },
        { value: "intermediate", label: "Intermédiaire" },
        { value: "advanced", label: "Avancé" }
      ]
    },
    {
      title: "Dans quel(s) secteur(s) s'inscrit votre projet ?",
      field: "industries",
      type: "checkbox",
      options: [
        { value: "ecommerce", label: "E-commerce" },
        { value: "finance", label: "Finance" },
        { value: "healthcare", label: "Santé" },
        { value: "education", label: "Éducation" },
        { value: "entertainment", label: "Divertissement" },
        { value: "social", label: "Réseau social" },
        { value: "productivity", label: "Productivité" },
        { value: "other", label: "Autre" }
      ]
    },
    {
      title: "Décrivez brièvement votre projet",
      field: "description",
      type: "textarea",
      placeholder: "Expliquez votre idée, objectifs, fonctionnalités principales..."
    }
  ];

  const analyzeAnswers = (data: any) => {
    // This is a simplified recommendation engine
    // In a real app, this would be more sophisticated
    
    let recommendedLanguages = [];
    let explanations = [];
    
    // Web projects
    if (data.projectType === 'web') {
      recommendedLanguages.push('JavaScript', 'TypeScript', 'HTML', 'CSS');
      explanations.push({
        language: 'JavaScript/TypeScript', 
        reason: 'Indispensable pour le développement web moderne, TypeScript apporte un typage statique qui réduit les erreurs et améliore la maintenabilité.'
      });
      
      if (data.performance === 'high') {
        recommendedLanguages.push('React', 'Next.js');
        explanations.push({
          language: 'React/Next.js', 
          reason: 'Framework performant avec rendu côté serveur pour des applications web rapides et optimisées pour le SEO.'
        });
      } else {
        recommendedLanguages.push('React', 'Vue.js');
        explanations.push({
          language: 'React/Vue.js', 
          reason: 'Frameworks populaires et faciles à apprendre pour créer des interfaces utilisateur interactives.'
        });
      }
      
      if (data.projectSize === 'large') {
        recommendedLanguages.push('Node.js', 'Express');
        explanations.push({
          language: 'Node.js/Express', 
          reason: 'Parfait pour créer des APIs robustes et gérer le backend de votre application web complexe.'
        });
      }
      
      if (data.industries.includes('ecommerce')) {
        recommendedLanguages.push('Shopify/Liquid', 'WooCommerce');
        explanations.push({
          language: 'Shopify/WooCommerce', 
          reason: 'Solutions spécialisées pour l\'e-commerce avec de nombreuses fonctionnalités intégrées.'
        });
      }
    }
    
    // Mobile projects
    if (data.projectType === 'mobile') {
      if (data.timeline === 'urgent' || data.projectSize === 'small') {
        recommendedLanguages.push('React Native', 'Flutter');
        explanations.push({
          language: 'React Native/Flutter', 
          reason: 'Frameworks multi-plateformes permettant de développer pour iOS et Android avec une seule base de code, idéal pour les délais courts.'
        });
      } else {
        recommendedLanguages.push('Swift (iOS)', 'Kotlin (Android)');
        explanations.push({
          language: 'Swift/Kotlin', 
          reason: 'Langages natifs offrant les meilleures performances et accès à toutes les fonctionnalités des plateformes iOS et Android.'
        });
      }
      
      if (data.performance === 'high') {
        if (!recommendedLanguages.includes('Swift (iOS)')) {
          recommendedLanguages.push('Swift (iOS)', 'Kotlin (Android)');
          explanations.push({
            language: 'Swift/Kotlin', 
            reason: 'Pour les applications nécessitant des performances élevées, les langages natifs sont recommandés.'
          });
        }
      }
    }
    
    // Data Science / AI
    if (data.projectType === 'datascience') {
      recommendedLanguages.push('Python', 'R');
      explanations.push({
        language: 'Python', 
        reason: 'Langage de référence pour la data science et l\'IA, avec des bibliothèques comme TensorFlow, PyTorch, pandas et scikit-learn.'
      });
      
      if (data.performance === 'high') {
        recommendedLanguages.push('Julia');
        explanations.push({
          language: 'Julia', 
          reason: 'Langage moderne combinant la facilité d\'utilisation de Python avec des performances proches du C pour le calcul scientifique.'
        });
      }
    }
    
    // Game development
    if (data.projectType === 'game') {
      if (data.experience === 'beginner') {
        recommendedLanguages.push('Unity (C#)', 'Godot (GDScript)');
        explanations.push({
          language: 'Unity/Godot', 
          reason: 'Moteurs de jeu accessibles aux débutants avec une grande communauté et de nombreuses ressources d\'apprentissage.'
        });
      } else {
        recommendedLanguages.push('Unreal Engine (C++)');
        explanations.push({
          language: 'Unreal Engine (C++)', 
          reason: 'Moteur puissant pour les jeux professionnels offrant des graphismes de haute qualité et des performances optimales.'
        });
      }
    }
    
    // Desktop applications
    if (data.projectType === 'desktop') {
      if (data.experience === 'beginner' || data.timeline === 'urgent') {
        recommendedLanguages.push('Electron (JavaScript)');
        explanations.push({
          language: 'Electron', 
          reason: 'Permet de créer des applications bureau multi-plateformes avec des technologies web (HTML, CSS, JavaScript).'
        });
      } else {
        recommendedLanguages.push('C#/.NET', 'Java');
        explanations.push({
          language: 'C#/.NET/Java', 
          reason: 'Langages robustes pour des applications bureau performantes et maintenables à long terme.'
        });
      }
      
      if (data.performance === 'high') {
        recommendedLanguages.push('C++');
        explanations.push({
          language: 'C++', 
          reason: 'Langage de bas niveau offrant d\'excellentes performances pour les applications exigeantes.'
        });
      }
    }
    
    // Backend / API
    if (data.projectType === 'backend') {
      if (data.experience === 'beginner') {
        recommendedLanguages.push('Node.js', 'Python (Django/Flask)');
        explanations.push({
          language: 'Node.js/Python', 
          reason: 'Écosystèmes accessibles avec une courbe d\'apprentissage douce et une grande communauté pour vous aider.'
        });
      } else if (data.performance === 'high') {
        recommendedLanguages.push('Go', 'Rust');
        explanations.push({
          language: 'Go/Rust', 
          reason: 'Langages modernes conçus pour la concurrence et les performances, parfaits pour les services backend à haute charge.'
        });
      } else {
        recommendedLanguages.push('Java (Spring)', 'C# (.NET)');
        explanations.push({
          language: 'Java/C#', 
          reason: 'Langages matures avec des frameworks éprouvés pour construire des API robustes et maintenables.'
        });
      }
      
      if (data.industries.includes('finance')) {
        if (!recommendedLanguages.includes('Java (Spring)')) {
          recommendedLanguages.push('Java (Spring)');
          explanations.push({
            language: 'Java', 
            reason: 'Très utilisé dans le secteur financier pour sa stabilité, sa sécurité et sa robustesse.'
          });
        }
      }
    }
    
    return {
      languages: [...new Set(recommendedLanguages)],
      explanations: explanations
    };
  };

  const currentQuestion = questions[step];

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 md:px-12 flex flex-col items-center justify-center">
      <Card ref={formRef} className="w-full max-w-2xl mx-auto p-8 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-muted">
          <div 
            className="h-full bg-gradient-to-r from-custom-blue to-custom-purple transition-all duration-300"
            style={{ width: `${(step / (questions.length - 1)) * 100}%` }}
          ></div>
        </div>
        
        <h2 className="text-2xl font-bold mb-6">{currentQuestion.title}</h2>
        
        {currentQuestion.type === 'radio' && (
          <RadioGroup
            value={formData[currentQuestion.field as keyof typeof formData] as string}
            onValueChange={(value) => handleChange(currentQuestion.field, value)}
            className="space-y-3"
          >
            {currentQuestion.options?.map((option) => (
              <div key={option.value} className="flex items-center space-x-2 p-4 rounded-lg border hover:border-primary hover:bg-muted/50 transition-all cursor-pointer">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value} className="flex-1 cursor-pointer">{option.label}</Label>
              </div>
            ))}
          </RadioGroup>
        )}
        
        {currentQuestion.type === 'checkbox' && (
          <div className="space-y-3">
            {currentQuestion.options?.map((option) => (
              <div 
                key={option.value} 
                className={`flex items-center space-x-2 p-4 rounded-lg border hover:border-primary hover:bg-muted/50 transition-all cursor-pointer ${
                  (formData[currentQuestion.field as keyof typeof formData] as string[])?.includes(option.value) 
                    ? 'border-primary bg-primary/5' 
                    : ''
                }`}
                onClick={() => handleMultiSelect(currentQuestion.field, option.value)}
              >
                <div className={`h-5 w-5 rounded-sm border flex items-center justify-center ${
                  (formData[currentQuestion.field as keyof typeof formData] as string[])?.includes(option.value)
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-muted-foreground'
                }`}>
                  {(formData[currentQuestion.field as keyof typeof formData] as string[])?.includes(option.value) && (
                    <Check className="h-3.5 w-3.5" />
                  )}
                </div>
                <span className="flex-1">{option.label}</span>
              </div>
            ))}
          </div>
        )}
        
        {currentQuestion.type === 'textarea' && (
          <Textarea
            value={formData[currentQuestion.field as keyof typeof formData] as string}
            onChange={(e) => handleChange(currentQuestion.field, e.target.value)}
            placeholder={currentQuestion.placeholder}
            className="w-full h-32"
          />
        )}
        
        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {step === 0 ? 'Retour' : 'Précédent'}
          </Button>
          
          <Button onClick={handleNext}>
            {step === questions.length - 1 ? 'Terminer' : 'Suivant'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default QuestionForm;
