import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

const ageRanges = [
  "18-25 ans", "26-35 ans", "36-45 ans", "46-55 ans", "56+ ans"
];

export const StepProfile = ({ data, updateData, onNext }: StepProfileProps) => {
  const isValid = data.firstName && data.ageRange && data.gender && data.country;

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8 text-primary-foreground" />
        </div>
        <h1 className="text-2xl font-display font-bold mb-2">Faisons connaissance</h1>
        <p className="text-muted-foreground">
          Ces informations nous aident à personnaliser votre expérience
        </p>
      </div>

      <Card className="p-6 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="firstName">Prénom *</Label>
          <Input
            id="firstName"
            placeholder="Votre prénom"
            value={data.firstName}
            onChange={(e) => updateData({ firstName: e.target.value })}
          />
        </div>

        <div className="space-y-3">
          <Label>Tranche d'âge *</Label>
          <RadioGroup
            value={data.ageRange}
            onValueChange={(value) => updateData({ ageRange: value })}
            className="grid grid-cols-2 sm:grid-cols-3 gap-2"
          >
            {ageRanges.map((range) => (
              <div key={range} className="flex items-center">
                <RadioGroupItem value={range} id={range} className="peer sr-only" />
                <Label
                  htmlFor={range}
                  className="flex-1 cursor-pointer rounded-lg border-2 border-muted bg-background p-3 text-center text-sm font-medium transition-all hover:bg-muted/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                >
                  {range}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <Label>Genre *</Label>
          <RadioGroup
            value={data.gender}
            onValueChange={(value) => updateData({ gender: value })}
            className="grid grid-cols-3 gap-2"
          >
            {[
              { value: "homme", label: "Homme" },
              { value: "femme", label: "Femme" },
              { value: "autre", label: "Autre" },
            ].map((option) => (
              <div key={option.value} className="flex items-center">
                <RadioGroupItem value={option.value} id={option.value} className="peer sr-only" />
                <Label
                  htmlFor={option.value}
                  className="flex-1 cursor-pointer rounded-lg border-2 border-muted bg-background p-3 text-center text-sm font-medium transition-all hover:bg-muted/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label>Pays *</Label>
          <Select value={data.country} onValueChange={(value) => updateData({ country: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez votre pays" />
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
