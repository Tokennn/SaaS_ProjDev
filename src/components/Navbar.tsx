import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';
import { auth } from "@/lib/firebase";
import { User } from "firebase/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast.success("Déconnexion réussie");
      navigate("/auth");
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
      toast.error("Erreur lors de la déconnexion");
    }
  };

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
        {/* <a href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors w-full md:w-auto text-center">
          Accueil
        </a> */}
        {/* <Link to="/auth" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors w-full md:w-auto text-center">
          Connexion
        </Link>
        <Link to="/RegisterForm" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors w-full md:w-auto text-center">
          S'enregistrer
        </Link> */}
        {/* <Link to="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors w-full md:w-auto text-center">
          À propos
        </Link> */}
      </nav>

      <div className="flex items-center">
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="cursor-pointer">
                <AvatarImage src={user.photoURL || undefined} />
                <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => navigate("/profile")}>
                Mon Profil
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSignOut}>
                Se déconnecter
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center gap-4">
            <Link
              to="/about"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              À propos
            </Link>
            <Link
              to="/auth"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Se connecter
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
