import { useTutorial } from "@/hooks/useTutorial";
import { WelcomeModal } from "./WelcomeModal";

export function TutorialOverlay() {
  const { phase, isLoading } = useTutorial();
  
  if (isLoading) return null;

  return (
    <>
      <WelcomeModal />
      
      {/* Overlay semi-transparent pour les phases de spotlight */}
      {phase !== 'completed' && phase !== 'welcome' && (
        <div 
          className="fixed inset-0 bg-black/30 z-30 pointer-events-none"
          aria-hidden="true"
        />
      )}
    </>
  );
}
