import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Sparkles, Rocket } from "lucide-react";
import { useTutorial } from "@/hooks/useTutorial";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export function WelcomeModal() {
  const { showWelcome, setShowWelcome, setPhase, skipTutorial } = useTutorial();
  const { user } = useAuth();
  const [firstName, setFirstName] = useState<string>("");
  const [onboardingCompleted, setOnboardingCompleted] = useState<boolean | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) return;
      
      const { data } = await supabase
        .from('profiles')
        .select('first_name, onboarding_completed')
        .eq('user_id', user.id)
        .single();
      
      if (data?.first_name) {
        setFirstName(data.first_name);
      }
      setOnboardingCompleted(data?.onboarding_completed || false);
    };
    
    loadProfile();
  }, [user]);

  const handleStart = async () => {
    setShowWelcome(false);
    
    // Si l'onboarding est déjà terminé, passer directement au tour guidé
    if (onboardingCompleted) {
      setPhase('tour_today');
    }
    // Sinon, l'utilisateur fera l'onboarding et le tour commencera après
  };

  const handleSkip = () => {
    skipTutorial();
  };

  return (
    <Dialog open={showWelcome} onOpenChange={setShowWelcome}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden border-none">
        <div className="gradient-primary p-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-8 h-8 text-primary-foreground" />
          </div>
          
          <h2 className="text-2xl font-bold text-primary-foreground mb-2">
            Bienvenue {firstName ? firstName : ""} ! 👋
          </h2>
          
          <p className="text-primary-foreground/90 text-lg mb-6">
            Je suis Tipote, ton partenaire business.
          </p>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-6 text-left">
            <p className="text-primary-foreground/90 mb-3 font-medium">
              {onboardingCompleted ? "Je vais te faire visiter :" : "Dans les 5 prochaines minutes :"}
            </p>
            <ul className="space-y-2 text-primary-foreground/80">
              {onboardingCompleted ? (
                <>
                  <li className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">1</span>
                    La page Aujourd'hui — ton tableau de bord
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">2</span>
                    Créer — génère du contenu en quelques clics
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">3</span>
                    Ma Stratégie — ton plan personnalisé
                  </li>
                </>
              ) : (
                <>
                  <li className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">1</span>
                    Tu me présentes ton business (3 questions rapides)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">2</span>
                    Je génère ton plan stratégique personnalisé
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">3</span>
                    Je te fais visiter l'app
                  </li>
                </>
              )}
            </ul>
          </div>
          
          <p className="text-primary-foreground font-medium mb-6">
            Prêt·e ?
          </p>
          
          <div className="space-y-3">
            <Button 
              onClick={handleStart}
              variant="secondary"
              size="lg"
              className="w-full text-lg"
            >
              <Rocket className="w-5 h-5 mr-2" />
              C'est parti !
            </Button>
            
            <button
              onClick={handleSkip}
              className="text-primary-foreground/60 text-sm hover:text-primary-foreground/80 transition-colors underline underline-offset-2"
            >
              Passer
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
