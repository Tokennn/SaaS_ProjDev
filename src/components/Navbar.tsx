import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full py-4 px-6 md:px-12 flex items-center justify-between fixed top-0 z-50 backdrop-blur-md">
      <Link to="/" className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-md bg-gradient-to-r from-custom-blue to-custom-purple flex items-center justify-center text-white font-bold">
          LS
        </div>
        <span className="text-xl font-bold hidden sm:block">LangSensei</span>
      </Link>
      
      {/* Bouton du menu hamburger pour mobile */}
      <button 
        className="md:hidden p-2"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Menu"
      >
        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Menu de navigation */}
      <nav className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row absolute md:relative top-full left-0 w-full md:w-auto bg-background/95 md:bg-transparent backdrop-blur-md md:backdrop-blur-none p-4 md:p-0 gap-4 md:gap-6 items-center`}>
        <a href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors w-full md:w-auto text-center">
          Accueil
        </a>
        <Link to="/auth" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors w-full md:w-auto text-center">
          Connexion
        </Link>
        <Link to="/RegisterForm" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors w-full md:w-auto text-center">
          S'enregistrer
        </Link>
        <Link to="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors w-full md:w-auto text-center">
          À propos
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
