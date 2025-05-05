import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Lock } from "lucide-react";
import gsap from "gsap";
import LogoHeader from "@/components/LogoHeader";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const googleBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.from(cardRef.current, {
      scale: 0.95,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    })
    .from(
      formRef.current?.children,
      {
        y: 20,
        opacity: 0,
        stagger: 0.15,
        duration: 0.6,
        ease: "power3.out",
      },
      "-=0.4"
    )
    .from(
      googleBtnRef.current,
      {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      },
      "-=0.4"
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 px-4">
      <LogoHeader /> {/* Logo AU-DESSUS du formulaire */}

      <Card
        ref={cardRef}
        className="w-full max-w-md p-6 rounded-2xl shadow-md bg-white border border-gray-200 mt-4"
      >
        <CardContent className="p-0">
          <div className="flex justify-center mb-4 text-gray-700">
            <Lock size={32} />
          </div>
          <h2 className="text-2xl font-bold text-center">Te revoila !</h2>
          <p className="text-center text-sm text-gray-600 mt-1">
          Pas de compte ?{" "}
          <Link to="/registerform" className="text-pink-500 font-medium hover:underline">
            S'enregistrer.
          </Link>
          </p>

          <form ref={formRef} className="space-y-4 mt-6">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Email
              </label>
              <Input type="email" placeholder="Entrer votre email" />
            </div>

            <div>
              <label className="flex justify-between items-center text-sm font-medium text-gray-700 mb-1">
                Mot de Passe
                <a href="#" className="text-pink-500 text-xs hover:underline">
                  Mot de passe oublié?
                </a>
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Entrer votre mot de passe"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-500"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <Button className="w-full bg-black text-white hover:bg-gray-900">
              Continuer
            </Button>
          </form>

          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-sm text-gray-500">ou</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <Button
            ref={googleBtnRef}
            variant="outline"
            className="w-full flex items-center justify-center gap-2 border-gray-300"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Continuer avec Google
          </Button>

          <p className="text-xs text-gray-500 text-center mt-4">
            En signant,vous acceptez les{" "}
            <a href="#" className="text-pink-500 hover:underline">
              Terms of Service.
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}