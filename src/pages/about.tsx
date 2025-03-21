import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }} // Départ en bas avec opacité 0
      animate={{ opacity: 1, y: 0 }} // Arrive en fondu avec montée
      transition={{ duration: 0.6, ease: "easeOut" }} // Durée et fluidité
      className="min-h-screen flex items-center justify-center bg-gray-100 p-8"
    >
      <div className="max-w-3xl bg-white shadow-lg rounded-2xl p-6">
        {/* <h1 className="text-3xl font-bold text-gray-800 mb-4">À Propos</h1> */}
        <p className="text-gray-600 font-bold text-black text-lg">
          Bienvenue sur notre plateforme SaaS ! Notre mission est de fournir des solutions innovantes
          et performantes pour aider les entreprises à atteindre leurs objectifs.
        </p>
        <p className="text-gray-600 font-bold text-black text-lg mt-4">
          Nous mettons un point d'honneur à allier technologie et simplicité d'utilisation afin de garantir
          une expérience utilisateur optimale.
        </p>
      </div>
    </motion.div>
  );
};

export default About;