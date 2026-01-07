import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Target, ArrowLeft, Sparkles, Loader2, Lightbulb } from "lucide-react";
import { OnboardingData } from "./OnboardingFlow";

interface StepGoalsProps {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  onComplete: () => void;
  onBack: () => void;
  isSubmitting: boolean;
}

const challengeOptions = [
  { value: "pas_communaute", label: "Pas de communauté" },
  { value: "pas_offre_claire", label: "Pas d'offre claire" },
  { value: "pas_assez_trafic", label: "Pas assez de trafic" },
  { value: "pas_idee_business", label: "Pas d'idée de business" },
  { value: "peur_credibilite", label: "Peur de ne pas être crédible" },
];

const communicationStyleOptions = [
  { value: "textes_longs", label: "✍️ Par écrit (textes longs)" },
  { value: "textes_courts", label: "📝 Par écrit (textes courts)" },
  { value: "video", label: "🎬 Par vidéo" },
  { value: "live", label: "🎙️ En live (coaching 1:1 ou de groupes)" },
];

const toneOptions = [
  { value: "decontracte", label: "Décontracté mais professionnel" },
  { value: "provocant", label: "Provocant" },
  { value: "humour", label: "Humour décalé" },
  { value: "empathie", label: "Avec empathie" },
  { value: "bienveillance", label: "Avec bienveillance" },
  { value: "autorite", label: "Avec autorité" },
  { value: "serieux", label: "Avec sérieux" },
];

export const StepGoals = ({ data, updateData, onComplete, onBack, isSubmitting }: StepGoalsProps) => {
  const isValid = data.communicationStyle && data.preferredTones.length > 0;

  const toggleTone = (tone: string) => {
    const current = data.preferredTones || [];
    if (current.includes(tone)) {
      updateData({ preferredTones: current.filter(t => t !== tone) });
    } else if (current.length < 3) {
      updateData({ preferredTones: [...current, tone] });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4">
          <Target className="w-8 h-8 text-primary-foreground" />
        </div>
        <h1 className="text-2xl font-display font-bold mb-2">Ce qui te rend unique</h1>
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <Lightbulb className="w-4 h-4" />
          <p className="text-sm">Ces 3 questions permettent à l'IA de créer du contenu qui te ressemble vraiment.</p>
        </div>
      </div>

      <Card className="p-6 space-y-6">
        {/* Valeur unique */}
        <div className="space-y-2">
          <Label htmlFor="uniqueValue">
            Qu'est-ce qui te différencie de tes concurrents ? Qu'est-ce que tu apportes que les autres n'apportent pas ?
          </Label>
          <Textarea
            id="uniqueValue"
            placeholder="Décris ta valeur unique..."
            value={data.uniqueValue}
            onChange={(e) => updateData({ uniqueValue: e.target.value })}
            rows={3}
          />
        </div>

        {/* Force inexploitée */}
        <div className="space-y-2">
          <Label htmlFor="untappedStrength">
            Qu'est-ce que tu réussis particulièrement bien ?
          </Label>
          <Textarea
            id="untappedStrength"
            placeholder="Ex: expliquer des choses compliquées simplement, créer de beaux visuels, rédiger des textes captivants, réaliser des vidéos intéressantes..."
            value={data.untappedStrength}
            onChange={(e) => updateData({ untappedStrength: e.target.value })}
            rows={2}
          />
        </div>

        {/* Plus grand défi */}
        <div className="space-y-3">
          <Label>Quel est ton plus grand défi business en ce moment ? (une seule chose, la plus bloquante)</Label>
          <Select value={data.biggestChallenge} onValueChange={(value) => updateData({ biggestChallenge: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionne ton plus grand défi" />
            </SelectTrigger>
            <SelectContent>
              {challengeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Définition du succès */}
        <div className="space-y-2">
          <Label htmlFor="successDefinition">
            Ta définition du succès ? Quand tu te regardes dans un avenir où tu as réussi, qu'est-ce que tu te dis :
          </Label>
          <Textarea
            id="successDefinition"
            placeholder="Décris à quoi ressemble le succès pour toi..."
            value={data.successDefinition}
            onChange={(e) => updateData({ successDefinition: e.target.value })}
            rows={2}
          />
        </div>

        {/* Retours clients */}
        <div className="space-y-2">
          <Label htmlFor="clientFeedback">
            Colle ici un retour client ou un message qui t'a fait plaisir — L'IA utilisera ce vocabulaire pour tes contenus
          </Label>
          <Textarea
            id="clientFeedback"
            placeholder="Copie-colle ici un ou plusieurs retours clients..."
            value={data.clientFeedback}
            onChange={(e) => updateData({ clientFeedback: e.target.value })}
            rows={3}
          />
        </div>

        {/* Style de communication */}
        <div className="space-y-3">
          <Label>Tu préfères communiquer *</Label>
          <RadioGroup
            value={data.communicationStyle}
            onValueChange={(value) => updateData({ communicationStyle: value })}
            className="grid grid-cols-1 sm:grid-cols-2 gap-2"
          >
            {communicationStyleOptions.map((option) => (
              <div key={option.value} className="flex items-center">
                <RadioGroupItem value={option.value} id={`comm-${option.value}`} className="peer sr-only" />
                <Label
                  htmlFor={`comm-${option.value}`}
                  className="flex-1 cursor-pointer rounded-lg border-2 border-muted bg-background p-3 text-center text-sm font-medium transition-all hover:bg-muted/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Tons préférés (3 max) */}
        <div className="space-y-3">
          <Label>Comment préfères-tu parler à ton audience (3 choix possibles) *</Label>
          <div className="flex flex-wrap gap-2">
            {toneOptions.map((tone) => {
              const isSelected = data.preferredTones.includes(tone.value);
              return (
                <div
                  key={tone.value}
                  onClick={() => toggleTone(tone.value)}
                  className={`px-3 py-2 rounded-lg border-2 cursor-pointer text-sm font-medium transition-all ${
                    isSelected
                      ? "border-primary bg-primary/5"
                      : "border-muted bg-background hover:bg-muted/50"
                  } ${!isSelected && data.preferredTones.length >= 3 ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {tone.label}
                </div>
              );
            })}
          </div>
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
