import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Target, ArrowLeft, Sparkles, Loader2 } from "lucide-react";
import { OnboardingData } from "./OnboardingFlow";

interface StepGoalsProps {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  onComplete: () => void;
  onBack: () => void;
  isSubmitting: boolean;
}

const financialGoals = [
  { value: "1000", label: "1 000€/mois" },
  { value: "3000", label: "3 000€/mois" },
  { value: "5000", label: "5 000€/mois" },
  { value: "10000", label: "10 000€/mois" },
  { value: "20000+", label: "20 000€+/mois" },
];

const psychologicalGoals = [
  { value: "liberte", label: "🏖️ Plus de liberté" },
  { value: "reconnaissance", label: "⭐ Reconnaissance & impact" },
  { value: "securite", label: "🛡️ Sécurité financière" },
  { value: "passion", label: "❤️ Vivre de ma passion" },
  { value: "famille", label: "👨‍👩‍👧‍👦 Temps avec ma famille" },
];

const contentPreferences = [
  { value: "ecriture", label: "✍️ Écriture (posts, articles, emails)" },
  { value: "video", label: "🎬 Vidéo (YouTube, TikTok, Reels)" },
  { value: "mixte", label: "🔄 Les deux" },
];

const tones = [
  { value: "professionnel", label: "Professionnel" },
  { value: "decontracte", label: "Décontracté" },
  { value: "inspirant", label: "Inspirant" },
  { value: "humoristique", label: "Humoristique" },
  { value: "educatif", label: "Éducatif" },
  { value: "provocateur", label: "Provocateur" },
];

export const StepGoals = ({ data, updateData, onComplete, onBack, isSubmitting }: StepGoalsProps) => {
  const isValid = data.financialGoal && data.psychologicalGoal && data.contentPreference && data.preferredTone;

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4">
          <Target className="w-8 h-8 text-primary-foreground" />
        </div>
        <h1 className="text-2xl font-display font-bold mb-2">Vos objectifs</h1>
        <p className="text-muted-foreground">
          Dernière étape ! L'IA utilisera ces informations pour vous guider
        </p>
      </div>

      <Card className="p-6 space-y-6">
        <div className="space-y-2">
          <Label>Objectif financier mensuel *</Label>
          <Select value={data.financialGoal} onValueChange={(value) => updateData({ financialGoal: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez votre objectif" />
            </SelectTrigger>
            <SelectContent>
              {financialGoals.map((goal) => (
                <SelectItem key={goal.value} value={goal.value}>
                  {goal.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label>Objectif principal (au-delà de l'argent) *</Label>
          <RadioGroup
            value={data.psychologicalGoal}
            onValueChange={(value) => updateData({ psychologicalGoal: value })}
            className="grid grid-cols-1 sm:grid-cols-2 gap-2"
          >
            {psychologicalGoals.map((goal) => (
              <div key={goal.value} className="flex items-center">
                <RadioGroupItem value={goal.value} id={goal.value} className="peer sr-only" />
                <Label
                  htmlFor={goal.value}
                  className="flex-1 cursor-pointer rounded-lg border-2 border-muted bg-background p-3 text-center text-sm font-medium transition-all hover:bg-muted/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                >
                  {goal.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <Label>Préférence de contenu *</Label>
          <RadioGroup
            value={data.contentPreference}
            onValueChange={(value) => updateData({ contentPreference: value })}
            className="grid grid-cols-1 sm:grid-cols-3 gap-2"
          >
            {contentPreferences.map((pref) => (
              <div key={pref.value} className="flex items-center">
                <RadioGroupItem value={pref.value} id={pref.value} className="peer sr-only" />
                <Label
                  htmlFor={pref.value}
                  className="flex-1 cursor-pointer rounded-lg border-2 border-muted bg-background p-3 text-center text-sm font-medium transition-all hover:bg-muted/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                >
                  {pref.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label>Ton préféré pour vos contenus *</Label>
          <Select value={data.preferredTone} onValueChange={(value) => updateData({ preferredTone: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez votre ton" />
            </SelectTrigger>
            <SelectContent>
              {tones.map((tone) => (
                <SelectItem key={tone.value} value={tone.value}>
                  {tone.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack} disabled={isSubmitting}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour
        </Button>
        <Button onClick={onComplete} disabled={!isValid || isSubmitting} size="lg" className="gap-2">
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Configuration...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Commencer avec Tipote™
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
