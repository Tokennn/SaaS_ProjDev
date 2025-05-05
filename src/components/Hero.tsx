// import React, { useEffect, useRef } from 'react';
// import { Button } from "@/components/ui/button";
// import gsap from 'gsap';
// import { ArrowRight } from 'lucide-react';

// interface HeroProps {
//   onStartClick: () => void;
// }

// const Hero: React.FC<HeroProps> = ({ onStartClick }) => {
//   const titleRef = useRef<HTMLHeadingElement>(null);
//   const subtitleRef = useRef<HTMLParagraphElement>(null);
//   const buttonRef = useRef<HTMLDivElement>(null);
//   const imageRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const tl = gsap.timeline();
    
//     tl.from(titleRef.current, {
//       y: 50,
//       opacity: 0,
//       duration: 0.8,
//       ease: "power3.out"
//     })
//     .from(subtitleRef.current, {
//       y: 30,
//       opacity: 0,
//       duration: 0.8,
//       ease: "power3.out"
//     }, "-=0.4")
//     .from(buttonRef.current, {
//       y: 20,
//       opacity: 0,
//       duration: 0.6,
//       ease: "power3.out"
//     }, "-=0.4")
//     .from(imageRef.current, {
//       scale: 0.9,
//       opacity: 0,
//       duration: 1,
//       ease: "power3.out"
//     }, "-=0.6");

//     return () => {
//       tl.kill();
//     };
//   }, []);

//   return (
//     <section className="min-h-screen pt-24 pb-16 px-6 md:px-12 flex flex-col items-center justify-center relative hero-gradient overflow-hidden">
//       <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background z-0"></div>
      
//       <div className="max-w-5xl mx-auto text-center z-10 relative">
//         <h1 ref={titleRef} className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
//           Découvrez <span className="gradient-text">les langages parfaits</span> pour votre projet
//         </h1>
        
//         <p ref={subtitleRef} className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
//           Notre assistant intelligent vous guide pour identifier les technologies idéales en fonction de vos besoins spécifiques, avec des explications détaillées sur les raisons de ces choix.
//         </p>
        
//         <div ref={buttonRef} className="mb-16">
//           <Button 
//             onClick={onStartClick} 
//             size="lg" 
//             className="bg-gradient-to-r from-custom-blue to-custom-purple hover:opacity-90 transition-opacity text-white px-8 py-6 rounded-lg text-lg font-medium"
//           >
//             Trouver mes langages
//             <ArrowRight className="ml-2 h-5 w-5" />
//           </Button>
//         </div>
//       </div>
      
//       <div ref={imageRef} className="relative w-full max-w-4xl mx-auto z-10">
//         <div className="glassmorphism rounded-xl p-6 relative overflow-hidden">
//           <div className="absolute inset-0 bg-gradient-to-r from-custom-blue/10 to-custom-purple/10"></div>
//           <div className="grid grid-cols-3 gap-4">
//             {[1, 2, 3].map((_, i) => (
//               <div key={i} className="bg-white/80 p-4 rounded-lg shadow-sm">
//                 <div className="h-6 w-3/4 bg-gray-200 rounded mb-3"></div>
//                 <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
//                 <div className="h-4 w-5/6 bg-gray-200 rounded mb-2"></div>
//                 <div className="h-4 w-4/6 bg-gray-200 rounded"></div>
//               </div>
//             ))}
//           </div>
//         </div>
        
//         <div className="absolute -bottom-6 -right-6 h-24 w-24 bg-gradient-to-r from-custom-teal to-custom-blue rounded-full blur-xl opacity-50"></div>
//         <div className="absolute -top-8 -left-8 h-32 w-32 bg-gradient-to-r from-custom-purple to-custom-pink rounded-full blur-xl opacity-50"></div>
//       </div>
//     </section>
//   );
// };

// export default Hero;


import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";

interface HeroProps {
  onStartClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartClick }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const btnAnimRef = useRef<HTMLButtonElement>(null); 

  useEffect(() => {
    const tl = gsap.timeline();

    tl.from(titleRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    })
      .from(
        subtitleRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.4"
      )
      .from(
        buttonRef.current,
        {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.4"
      )
      .from(
        imageRef.current,
        {
          scale: 0.9,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.6"
      );

    // Animation du bouton en boucle (léger rebond)
    gsap.to(btnAnimRef.current, {
      y: -5,
      repeat: -1,
      yoyo: true,
      duration: 0.6,
      ease: "easeInOut",
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section className="min-h-screen pt-24 pb-16 px-6 md:px-12 flex flex-col items-center justify-center relative hero-gradient overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background z-0"></div>

      <div className="max-w-5xl mx-auto text-center z-10 relative">
        <h1
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
        >
          Découvrez{" "}
          <span className="gradient-text">les langages parfaits</span> pour
          votre projet
        </h1>

        <p
          ref={subtitleRef}
          className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto"
        >
          Notre assistant intelligent vous guide pour identifier les
          technologies idéales en fonction de vos besoins spécifiques, avec des
          explications détaillées sur les raisons de ces choix.
        </p>

        {/* Animation GSAP sur le bouton */}
        <div ref={buttonRef} className="mb-16">
          <button ref={btnAnimRef}>
            <Button
              onClick={onStartClick}
              size="lg"
              className="bg-gradient-to-r from-custom-blue to-custom-purple hover:opacity-90 transition-opacity text-white px-8 py-6 rounded-lg text-lg font-medium"
            >
              Trouver mes langages
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </button>
        </div>
      </div>

      {/* Animation GSAP sur l'image */}
      <div
        ref={imageRef}
        className="relative w-full max-w-4xl mx-auto z-10"
      >
        <div className="glassmorphism rounded-xl p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-custom-blue/10 to-custom-purple/10"></div>
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="bg-white/80 p-4 rounded-lg shadow-sm">
                <div className="h-6 w-3/4 bg-gray-200 rounded mb-3"></div>
                <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
                <div className="h-4 w-5/6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 w-4/6 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute -bottom-6 -right-6 h-24 w-24 bg-gradient-to-r from-custom-teal to-custom-blue rounded-full blur-xl opacity-50"></div>
        <div className="absolute -top-8 -left-8 h-32 w-32 bg-gradient-to-r from-custom-purple to-custom-pink rounded-full blur-xl opacity-50"></div>
      </div>
    </section>
  );
};

export default Hero;