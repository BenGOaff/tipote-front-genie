import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PartyPopper, Sparkles } from "lucide-react";
import { useTutorial } from "@/hooks/useTutorial";
import { useEffect, useState } from "react";

export function TourCompleteModal() {
  const { phase, setPhase } = useTutorial();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (phase === 'tour_complete') {
      setIsOpen(true);
    }
  }, [phase]);

  const handleClose = () => {
    setIsOpen(false);
    setPhase('completed');
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden border-none">
        <div className="gradient-primary p-8 text-center">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center animate-pulse">
              <PartyPopper className="w-10 h-10 text-primary-foreground" />
            </div>
            {/* Confetti animation */}
            <div className="absolute -top-2 -left-2 w-4 h-4 rounded-full bg-yellow-300 animate-bounce" style={{ animationDelay: '0.1s' }} />
            <div className="absolute -top-1 -right-3 w-3 h-3 rounded-full bg-pink-300 animate-bounce" style={{ animationDelay: '0.2s' }} />
            <div className="absolute -bottom-1 -left-3 w-3 h-3 rounded-full bg-blue-300 animate-bounce" style={{ animationDelay: '0.3s' }} />
            <div className="absolute -bottom-2 -right-2 w-4 h-4 rounded-full bg-green-300 animate-bounce" style={{ animationDelay: '0.15s' }} />
          </div>
          
          <h2 className="text-2xl font-bold text-primary-foreground mb-3">
            Tu es prêt·e ! 🎉
          </h2>
          
          <p className="text-primary-foreground/90 text-lg mb-4">
            Le tour est terminé. Tu connais maintenant les bases de Tipote.
          </p>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-6 text-left">
            <p className="text-primary-foreground/90 font-medium mb-2">
              💡 Prochaine étape suggérée :
            </p>
            <p className="text-primary-foreground/80">
              Va dans <strong>Créer</strong> pour générer ton premier contenu !
            </p>
          </div>
          
          <Button 
            onClick={handleClose}
            variant="secondary"
            size="lg"
            className="w-full text-lg"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            C'est parti !
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
