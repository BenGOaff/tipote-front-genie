import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useTutorial } from "@/hooks/useTutorial";
import { supabase } from "@/integrations/supabase/client";
import { OnboardingFlow } from "@/components/onboarding/OnboardingFlow";
import { PyramidSelection } from "@/components/onboarding/PyramidSelection";
import { Loader2 } from "lucide-react";

type OnboardingStep = "loading" | "onboarding" | "pyramid" | "done";

const Onboarding = () => {
  const { user, loading: authLoading } = useAuth();
  const { setPhase, setShowWelcome } = useTutorial();
  const navigate = useNavigate();
  const [step, setStep] = useState<OnboardingStep>("loading");
  const [profileData, setProfileData] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      if (authLoading) return;
      
      if (!user) {
        navigate("/");
        return;
      }

      try {
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("user_id", user.id)
          .single();

        if (error && error.code !== "PGRST116") {
          console.error("Erreur vérification profil:", error);
        }

        // Si l'onboarding et la pyramide sont complétés
        if (profile?.onboarding_completed && profile?.pyramid_selected_at) {
          navigate("/dashboard");
          return;
        }

        // Si l'onboarding est complété mais pas la pyramide
        if (profile?.onboarding_completed && !profile?.pyramid_selected_at) {
          setProfileData(profile);
          setStep("pyramid");
          return;
        }

        // Sinon, montrer l'onboarding
        setStep("onboarding");
      } catch (error) {
        console.error("Erreur:", error);
        setStep("onboarding");
      }
    };

    checkOnboardingStatus();
  }, [user, authLoading, navigate]);

  const handleOnboardingComplete = (data: Record<string, unknown>) => {
    setProfileData(data);
    setStep("pyramid");
  };

  const handlePyramidComplete = () => {
    // Après la sélection de pyramide, démarrer Phase 2 du tutoriel
    setShowWelcome(false);
    setPhase('api_settings');
    navigate("/dashboard/settings");
  };

  if (authLoading || step === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (step === "pyramid" && profileData) {
    return <PyramidSelection profileData={profileData} onComplete={handlePyramidComplete} />;
  }

  return <OnboardingFlow onComplete={handleOnboardingComplete} />;
};

export default Onboarding;
