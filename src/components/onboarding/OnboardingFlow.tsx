import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { StepProfile } from "./StepProfile";
import { StepBusiness } from "./StepBusiness";
import { StepGoals } from "./StepGoals";
import { Progress } from "@/components/ui/progress";
import { Sparkles } from "lucide-react";

export interface Offer {
  name: string;
  type: string;
  price: string;
  salesCount: string;
  link: string;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface OnboardingData {
  // Écran 1 - Toi & ton business
  firstName: string;
  country: string;
  niche: string;
  missionStatement: string;
  maturity: string;
  biggestBlocker: string;
  // Écran 2 - Ta situation actuelle
  hasOffers: boolean;
  offers: Offer[];
  socialAudience: string;
  socialLinks: SocialLink[];
  emailListSize: string;
  weeklyHours: string;
  mainGoal90Days: string;
  mainGoals: string[];
  // Écran 3 - Ce qui te rend unique
  uniqueValue: string;
  untappedStrength: string;
  biggestChallenge: string;
  successDefinition: string;
  clientFeedback: string;
  communicationStyle: string;
  preferredTones: string[];
}

const initialData: OnboardingData = {
  firstName: "",
  country: "",
  niche: "",
  missionStatement: "",
  maturity: "",
  biggestBlocker: "",
  hasOffers: false,
  offers: [],
  socialAudience: "",
  socialLinks: [],
  emailListSize: "",
  weeklyHours: "",
  mainGoal90Days: "",
  mainGoals: [],
  uniqueValue: "",
  untappedStrength: "",
  biggestChallenge: "",
  successDefinition: "",
  clientFeedback: "",
  communicationStyle: "",
  preferredTones: [],
};

interface OnboardingFlowProps {
  onComplete?: (data: Record<string, unknown>) => void;
}

export const OnboardingFlow = ({ onComplete }: OnboardingFlowProps) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<OnboardingData>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
          country: data.country,
          niche: data.niche,
          mission_statement: data.missionStatement,
          maturity: data.maturity,
          biggest_blocker: data.biggestBlocker,
          has_offers: data.hasOffers,
          offers: JSON.parse(JSON.stringify(data.offers)),
          social_audience: data.socialAudience,
          social_links: JSON.parse(JSON.stringify(data.socialLinks)),
          email_list_size: data.emailListSize,
          weekly_hours: data.weeklyHours,
          main_goal_90_days: data.mainGoal90Days,
          main_goals: data.mainGoals,
          unique_value: data.uniqueValue,
          untapped_strength: data.untappedStrength,
          biggest_challenge: data.biggestChallenge,
          success_definition: data.successDefinition,
          client_feedback: data.clientFeedback,
          communication_style: data.communicationStyle,
          preferred_tones: data.preferredTones,
          onboarding_completed: true,
        })
        .eq("user_id", user.id);

      if (error) throw error;

      toast({
        title: "Profil configuré !",
        description: "Choisissez maintenant votre stratégie.",
      });

      // Pass data to parent for pyramid selection
      if (onComplete) {
        onComplete({
          firstName: data.firstName,
          country: data.country,
          niche: data.niche,
          missionStatement: data.missionStatement,
          maturity: data.maturity,
          biggestBlocker: data.biggestBlocker,
          hasOffers: data.hasOffers,
          offers: data.offers,
          socialAudience: data.socialAudience,
          socialLinks: data.socialLinks,
          emailListSize: data.emailListSize,
          weeklyHours: data.weeklyHours,
          mainGoal90Days: data.mainGoal90Days,
          mainGoals: data.mainGoals,
          uniqueValue: data.uniqueValue,
          untappedStrength: data.untappedStrength,
          biggestChallenge: data.biggestChallenge,
          successDefinition: data.successDefinition,
          clientFeedback: data.clientFeedback,
          communicationStyle: data.communicationStyle,
          preferredTones: data.preferredTones,
        });
      }
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
