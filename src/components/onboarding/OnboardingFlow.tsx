import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { StepProfile } from "./StepProfile";
import { StepBusiness } from "./StepBusiness";
import { StepGoals } from "./StepGoals";
import { Progress } from "@/components/ui/progress";
import { Sparkles } from "lucide-react";

export interface OnboardingData {
  // Écran 1 - Profil personnel
  firstName: string;
  ageRange: string;
  gender: string;
  country: string;
  // Écran 2 - Business
  niche: string;
  persona: string;
  businessType: string;
  maturity: string;
  audienceSize: string;
  hasOffers: boolean;
  offerPrice: string;
  offerSalesCount: string;
  toolsUsed: string[];
  weeklyTime: string;
  // Écran 3 - Objectifs
  financialGoal: string;
  psychologicalGoal: string;
  contentPreference: string;
  preferredTone: string;
}

const initialData: OnboardingData = {
  firstName: "",
  ageRange: "",
  gender: "",
  country: "",
  niche: "",
  persona: "",
  businessType: "",
  maturity: "",
  audienceSize: "",
  hasOffers: false,
  offerPrice: "",
  offerSalesCount: "",
  toolsUsed: [],
  weeklyTime: "",
  financialGoal: "",
  psychologicalGoal: "",
  contentPreference: "",
  preferredTone: "",
};

export const OnboardingFlow = () => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<OnboardingData>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  const updateData = (updates: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleComplete = async () => {
    if (!user) return;
    
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          display_name: data.firstName,
          first_name: data.firstName,
          age_range: data.ageRange,
          gender: data.gender,
          country: data.country,
          niche: data.niche,
          persona: data.persona,
          business_type: data.businessType,
          maturity: data.maturity,
          audience_size: data.audienceSize,
          has_offers: data.hasOffers,
          offer_price: data.offerPrice,
          offer_sales_count: data.offerSalesCount,
          tools_used: data.toolsUsed,
          weekly_time: data.weeklyTime,
          financial_goal: data.financialGoal,
          psychological_goal: data.psychologicalGoal,
          content_preference: data.contentPreference,
          preferred_tone: data.preferredTone,
          onboarding_completed: true,
        })
        .eq("user_id", user.id);

      if (error) throw error;

      toast({
        title: "Bienvenue dans Tipote™ !",
        description: "Votre profil a été configuré avec succès.",
      });

      navigate("/dashboard");
    } catch (error) {
      console.error("Erreur onboarding:", error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder votre profil.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex flex-col">
      {/* Header */}
      <header className="p-6 border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl">Tipote™</span>
          </div>
          <div className="text-sm text-muted-foreground">
            Étape {step} sur {totalSteps}
          </div>
        </div>
      </header>

      {/* Progress bar */}
      <div className="px-6 py-4 bg-background/50">
        <div className="max-w-2xl mx-auto">
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-2xl mx-auto">
          {step === 1 && (
            <StepProfile
              data={data}
              updateData={updateData}
              onNext={nextStep}
            />
          )}
          {step === 2 && (
            <StepBusiness
              data={data}
              updateData={updateData}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}
          {step === 3 && (
            <StepGoals
              data={data}
              updateData={updateData}
              onComplete={handleComplete}
              onBack={prevStep}
              isSubmitting={isSubmitting}
            />
          )}
        </div>
      </main>
    </div>
  );
};
