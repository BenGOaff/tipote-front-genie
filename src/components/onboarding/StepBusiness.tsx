import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Briefcase, ArrowRight, ArrowLeft } from "lucide-react";
import { OnboardingData } from "./OnboardingFlow";

interface StepBusinessProps {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const niches = [
  { value: "argent", label: "💰 Argent & Business" },
  { value: "sante", label: "🏃 Santé & Bien-être" },
  { value: "devperso", label: "🧠 Développement personnel" },
  { value: "relations", label: "❤️ Relations" },
];

const businessTypes = [
  { value: "coaching", label: "Coaching / Consulting" },
  { value: "formation", label: "Formation en ligne" },
  { value: "freelance", label: "Freelance / Prestataire" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "saas", label: "SaaS / App" },
  { value: "autre", label: "Autre" },
];

const maturities = [
  { value: "0-500", label: "0 - 500€/mois" },
  { value: "500-5000", label: "500€ - 5k€/mois" },
  { value: "5000+", label: "5k€+/mois" },
];

const audienceSizes = [
  { value: "0-500", label: "0 - 500" },
  { value: "500-2000", label: "500 - 2 000" },
  { value: "2000-10000", label: "2 000 - 10 000" },
  { value: "10000+", label: "10 000+" },
];

const toolsList = [
  "Systeme.io",
  "Mailchimp",
  "ConvertKit",
  "Canva",
  "Notion",
  "Calendly",
  "Stripe",
  "WordPress",
  "Autre",
];

const weeklyTimes = [
  { value: "1-5h", label: "1-5 heures" },
  { value: "5-10h", label: "5-10 heures" },
  { value: "10-20h", label: "10-20 heures" },
  { value: "20h+", label: "20+ heures" },
];

export const StepBusiness = ({ data, updateData, onNext, onBack }: StepBusinessProps) => {
  const isValid = data.niche && data.persona && data.businessType && data.maturity && data.weeklyTime;

  const toggleTool = (tool: string) => {
    const current = data.toolsUsed || [];
    if (current.includes(tool)) {
      updateData({ toolsUsed: current.filter((t) => t !== tool) });
    } else {
      updateData({ toolsUsed: [...current, tool] });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4">
          <Briefcase className="w-8 h-8 text-primary-foreground" />
        </div>
        <h1 className="text-2xl font-display font-bold mb-2">Votre business</h1>
        <p className="text-muted-foreground">
          Ces informations permettent à l'IA de personnaliser vos contenus
        </p>
      </div>

      <Card className="p-6 space-y-6">
        <div className="space-y-3">
          <Label>Niche principale *</Label>
          <RadioGroup
            value={data.niche}
            onValueChange={(value) => updateData({ niche: value })}
            className="grid grid-cols-2 gap-2"
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
          <Label htmlFor="persona">
            Qui voulez-vous aider, à faire quoi, et comment ? *
          </Label>
          <Textarea
            id="persona"
            placeholder="Ex: J'aide les entrepreneurs à automatiser leur marketing grâce à l'IA..."
            value={data.persona}
            onChange={(e) => updateData({ persona: e.target.value })}
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label>Type de business *</Label>
          <Select value={data.businessType} onValueChange={(value) => updateData({ businessType: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez votre type" />
            </SelectTrigger>
            <SelectContent>
              {businessTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label>Chiffre d'affaires actuel *</Label>
          <RadioGroup
            value={data.maturity}
            onValueChange={(value) => updateData({ maturity: value })}
            className="grid grid-cols-3 gap-2"
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

        <div className="space-y-2">
          <Label>Taille de votre audience (réseaux + emails)</Label>
          <Select value={data.audienceSize} onValueChange={(value) => updateData({ audienceSize: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez une fourchette" />
            </SelectTrigger>
            <SelectContent>
              {audienceSizes.map((size) => (
                <SelectItem key={size.value} value={size.value}>
                  {size.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Checkbox
              id="hasOffers"
              checked={data.hasOffers}
              onCheckedChange={(checked) => updateData({ hasOffers: !!checked })}
            />
            <Label htmlFor="hasOffers">J'ai déjà des offres payantes</Label>
          </div>
          
          {data.hasOffers && (
            <div className="grid grid-cols-2 gap-3 ml-6">
              <div className="space-y-2">
                <Label htmlFor="offerPrice">Prix moyen</Label>
                <Input
                  id="offerPrice"
                  placeholder="Ex: 497€"
                  value={data.offerPrice}
                  onChange={(e) => updateData({ offerPrice: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="offerSales">Nombre de ventes</Label>
                <Input
                  id="offerSales"
                  placeholder="Ex: 50"
                  value={data.offerSalesCount}
                  onChange={(e) => updateData({ offerSalesCount: e.target.value })}
                />
              </div>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <Label>Outils utilisés</Label>
          <div className="flex flex-wrap gap-2">
            {toolsList.map((tool) => (
              <div
                key={tool}
                onClick={() => toggleTool(tool)}
                className={`px-3 py-1.5 rounded-full border cursor-pointer text-sm transition-all ${
                  data.toolsUsed.includes(tool)
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background border-border hover:bg-muted"
                }`}
              >
                {tool}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Label>Temps disponible par semaine *</Label>
          <RadioGroup
            value={data.weeklyTime}
            onValueChange={(value) => updateData({ weeklyTime: value })}
            className="grid grid-cols-2 sm:grid-cols-4 gap-2"
          >
            {weeklyTimes.map((t) => (
              <div key={t.value} className="flex items-center">
                <RadioGroupItem value={t.value} id={`time-${t.value}`} className="peer sr-only" />
                <Label
                  htmlFor={`time-${t.value}`}
                  className="flex-1 cursor-pointer rounded-lg border-2 border-muted bg-background p-3 text-center text-sm font-medium transition-all hover:bg-muted/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                >
                  {t.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour
        </Button>
        <Button onClick={onNext} disabled={!isValid} size="lg">
          Continuer
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};
