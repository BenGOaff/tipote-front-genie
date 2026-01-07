import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, ArrowRight } from "lucide-react";
import { OnboardingData } from "./OnboardingFlow";

interface StepProfileProps {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  onNext: () => void;
}

const countries = [
  "France", "Belgique", "Suisse", "Canada", "Luxembourg", 
  "Monaco", "Maroc", "Tunisie", "Algérie", "Sénégal", "Autre"
];

const niches = [
  { value: "argent", label: "💰 Argent & business" },
  { value: "sante", label: "🏃 Santé & bien-être" },
  { value: "devperso", label: "🧠 Dev perso" },
  { value: "relations", label: "❤️ Relations" },
  { value: "autre", label: "🔮 Autre" },
];

const maturities = [
  { value: "pas_lance", label: "Pas encore lancé" },
  { value: "lance_pas_vendu", label: "Lancé mais pas vendu" },
  { value: "moins_500", label: "< 500€/mois" },
  { value: "500_2000", label: "500 - 2000€/mois" },
  { value: "plus_2000", label: "> 2000€/mois" },
];

const blockers = [
  { value: "temps", label: "Manque de temps" },
  { value: "argent", label: "Manque d'argent" },
  { value: "connaissance", label: "Manque de connaissance" },
  { value: "organisation", label: "Manque d'organisation" },
];

export const StepProfile = ({ data, updateData, onNext }: StepProfileProps) => {
  const isValid = data.firstName && data.country && data.niche && data.missionStatement && data.maturity && data.biggestBlocker;

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8 text-primary-foreground" />
        </div>
        <h1 className="text-2xl font-display font-bold mb-2">Toi & ton business</h1>
        <p className="text-muted-foreground">
          Ces informations nous aident à personnaliser ton expérience
        </p>
      </div>

      <Card className="p-6 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="firstName">Prénom *</Label>
          <Input
            id="firstName"
            placeholder="Ton prénom"
            value={data.firstName}
            onChange={(e) => updateData({ firstName: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label>Pays *</Label>
          <Select value={data.country} onValueChange={(value) => updateData({ country: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionne ton pays" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label>Dans quel domaine exerces-tu ? *</Label>
          <RadioGroup
            value={data.niche}
            onValueChange={(value) => updateData({ niche: value })}
            className="grid grid-cols-2 sm:grid-cols-3 gap-2"
          >
            {niches.map((niche) => (
              <div key={niche.value} className="flex items-center">
                <RadioGroupItem value={niche.value} id={niche.value} className="peer sr-only" />
                <Label
                  htmlFor={niche.value}
                  className="flex-1 cursor-pointer rounded-lg border-2 border-muted bg-background p-3 text-center text-sm font-medium transition-all hover:bg-muted/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                >
                  {niche.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="missionStatement">Décris en une phrase : qui aides-tu à faire quoi ? *</Label>
          <Textarea
            id="missionStatement"
            placeholder="Ex: J'aide les plombiers à trouver plus de clients grâce à leur fiche Google My Business"
            value={data.missionStatement}
            onChange={(e) => updateData({ missionStatement: e.target.value })}
            rows={3}
          />
        </div>

        <div className="space-y-3">
          <Label>Où en es-tu aujourd'hui ? *</Label>
          <RadioGroup
            value={data.maturity}
            onValueChange={(value) => updateData({ maturity: value })}
            className="grid grid-cols-1 sm:grid-cols-2 gap-2"
          >
            {maturities.map((m) => (
              <div key={m.value} className="flex items-center">
                <RadioGroupItem value={m.value} id={`mat-${m.value}`} className="peer sr-only" />
                <Label
                  htmlFor={`mat-${m.value}`}
                  className="flex-1 cursor-pointer rounded-lg border-2 border-muted bg-background p-3 text-center text-sm font-medium transition-all hover:bg-muted/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                >
                  {m.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <Label>Ton plus gros blocage aujourd'hui *</Label>
          <RadioGroup
            value={data.biggestBlocker}
            onValueChange={(value) => updateData({ biggestBlocker: value })}
            className="grid grid-cols-2 gap-2"
          >
            {blockers.map((b) => (
              <div key={b.value} className="flex items-center">
                <RadioGroupItem value={b.value} id={`block-${b.value}`} className="peer sr-only" />
                <Label
                  htmlFor={`block-${b.value}`}
                  className="flex-1 cursor-pointer rounded-lg border-2 border-muted bg-background p-3 text-center text-sm font-medium transition-all hover:bg-muted/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                >
                  {b.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </Card>

      <div className="flex justify-end">
        <Button onClick={onNext} disabled={!isValid} size="lg">
          Continuer
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};
