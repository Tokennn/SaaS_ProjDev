import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <header className="w-full py-4 px-6 md:px-12 flex items-center justify-between fixed top-0 z-50  backdrop-blur-md">
      <Link to="/" className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-md bg-gradient-to-r from-custom-blue to-custom-purple flex items-center justify-center text-white font-bold">
          LS
        </div>
        <span className="text-xl font-bold hidden sm:block">LangSensei</span>
      </Link>
      
      <nav className="flex items-center gap-6">
        {/* <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hidden md:block">
          Accueil
        </Link> */}
        <a href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hidden md:block">
          Accueil
        </a>
        <Link to="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hidden md:block">
          À propos
        </Link>
        <Button variant="default" size="sm" className="bg-gradient-to-r from-custom-blue to-custom-purple hover:opacity-90 transition-opacity">
          Me
        </Button>
      </nav>
    </header>
  );
};

export default Navbar;
