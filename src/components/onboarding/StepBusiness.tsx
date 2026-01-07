import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Briefcase, ArrowRight, ArrowLeft, Plus, Trash2 } from "lucide-react";
import { OnboardingData, Offer, SocialLink } from "./OnboardingFlow";

interface StepBusinessProps {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const audienceSizes = [
  { value: "0-500", label: "0 - 500" },
  { value: "500-2000", label: "500 - 2 000" },
  { value: "2000-10000", label: "2 000 - 10 000" },
  { value: "10000+", label: "10 000+" },
];

const socialPlatforms = [
  "Facebook", "LinkedIn", "X", "Instagram", "Snapchat", "Threads", "TikTok"
];

const weeklyHoursOptions = [
  { value: "moins_5h", label: "< 5h" },
  { value: "5_10h", label: "5 - 10h" },
  { value: "10_20h", label: "10 - 20h" },
  { value: "plus_20h", label: "> 20h" },
];

const goal90DaysOptions = [
  { value: "creer_offre", label: "Créer ma première offre" },
  { value: "construire_audience", label: "Construire mon audience" },
  { value: "premieres_ventes", label: "Faire mes premières ventes" },
  { value: "augmenter_ca", label: "Augmenter mon CA" },
  { value: "automatiser", label: "Automatiser" },
];

const mainGoalsOptions = [
  { value: "devenir_riche", label: "💰 Devenir riche" },
  { value: "fier", label: "⭐ Être fier de mes activités" },
  { value: "aider", label: "🤝 Aider les autres" },
  { value: "temps_libre", label: "⏰ Avoir plus de temps libre" },
];

export const StepBusiness = ({ data, updateData, onNext, onBack }: StepBusinessProps) => {
  const isValid = data.socialAudience && data.weeklyHours && data.mainGoal90Days && data.mainGoals.length > 0;

  const addOffer = () => {
    const newOffer: Offer = { name: "", type: "", price: "", salesCount: "", link: "" };
    updateData({ offers: [...data.offers, newOffer] });
  };

  const updateOffer = (index: number, field: keyof Offer, value: string) => {
    const newOffers = [...data.offers];
    newOffers[index] = { ...newOffers[index], [field]: value };
    updateData({ offers: newOffers });
  };

  const removeOffer = (index: number) => {
    updateData({ offers: data.offers.filter((_, i) => i !== index) });
  };

  const toggleSocialPlatform = (platform: string) => {
    const existing = data.socialLinks.find(l => l.platform === platform);
    if (existing) {
      updateData({ socialLinks: data.socialLinks.filter(l => l.platform !== platform) });
    } else if (data.socialLinks.length < 2) {
      updateData({ socialLinks: [...data.socialLinks, { platform, url: "" }] });
    }
  };

  const updateSocialLink = (platform: string, url: string) => {
    updateData({
      socialLinks: data.socialLinks.map(l => 
        l.platform === platform ? { ...l, url } : l
      )
    });
  };

  const toggleMainGoal = (goal: string) => {
    const current = data.mainGoals || [];
    if (current.includes(goal)) {
      updateData({ mainGoals: current.filter(g => g !== goal) });
    } else if (current.length < 2) {
      updateData({ mainGoals: [...current, goal] });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4">
          <Briefcase className="w-8 h-8 text-primary-foreground" />
        </div>
        <h1 className="text-2xl font-display font-bold mb-2">Ta situation actuelle</h1>
        <p className="text-muted-foreground">
          Ces informations permettent à l'IA de mieux te conseiller
        </p>
      </div>

      <Card className="p-6 space-y-6">
        {/* Offres existantes */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Checkbox
              id="hasOffers"
              checked={data.hasOffers}
              onCheckedChange={(checked) => {
                updateData({ hasOffers: !!checked, offers: checked ? data.offers : [] });
              }}
            />
            <Label htmlFor="hasOffers">As-tu déjà des offres à vendre ?</Label>
          </div>
          
          {data.hasOffers && (
            <div className="ml-6 space-y-4">
              <p className="text-sm text-muted-foreground">Liste tes offres :</p>
              {data.offers.map((offer, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-3 relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 h-6 w-6"
                    onClick={() => removeOffer(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      placeholder="Nom de l'offre"
                      value={offer.name}
                      onChange={(e) => updateOffer(index, "name", e.target.value)}
                    />
                    <Input
                      placeholder="Type (coaching, formation...)"
                      value={offer.type}
                      onChange={(e) => updateOffer(index, "type", e.target.value)}
                    />
                    <Input
                      placeholder="Prix (ex: 497€)"
                      value={offer.price}
                      onChange={(e) => updateOffer(index, "price", e.target.value)}
                    />
                    <Input
                      placeholder="Nb ventes"
                      value={offer.salesCount}
                      onChange={(e) => updateOffer(index, "salesCount", e.target.value)}
                    />
                  </div>
                  <Input
                    placeholder="Lien vers l'offre (optionnel)"
                    value={offer.link}
                    onChange={(e) => updateOffer(index, "link", e.target.value)}
                  />
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={addOffer}>
                <Plus className="w-4 h-4 mr-2" />
                Ajouter une offre
              </Button>
            </div>
          )}
        </div>

        {/* Taille audience réseaux */}
        <div className="space-y-2">
          <Label>Taille de ton audience réseaux (environ) *</Label>
          <Select value={data.socialAudience} onValueChange={(value) => updateData({ socialAudience: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionne une fourchette" />
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

        {/* Réseaux sociaux (2 max) */}
        <div className="space-y-3">
          <Label>Les principaux réseaux que tu utilises (2 max)</Label>
          <div className="flex flex-wrap gap-2">
            {socialPlatforms.map((platform) => {
              const isSelected = data.socialLinks.some(l => l.platform === platform);
              return (
                <div
                  key={platform}
                  onClick={() => toggleSocialPlatform(platform)}
                  className={`px-3 py-1.5 rounded-full border cursor-pointer text-sm transition-all ${
                    isSelected
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background border-border hover:bg-muted"
                  } ${!isSelected && data.socialLinks.length >= 2 ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {platform}
                </div>
              );
            })}
          </div>
          {data.socialLinks.length > 0 && (
            <div className="space-y-2 mt-3">
              {data.socialLinks.map((link) => (
                <Input
                  key={link.platform}
                  placeholder={`Lien de ton profil ${link.platform}`}
                  value={link.url}
                  onChange={(e) => updateSocialLink(link.platform, e.target.value)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Taille liste email */}
        <div className="space-y-2">
          <Label htmlFor="emailListSize">Nombre d'emails dans ta liste (environ)</Label>
          <Input
            id="emailListSize"
            placeholder="Ex: 500"
            value={data.emailListSize}
            onChange={(e) => updateData({ emailListSize: e.target.value })}
          />
        </div>

        {/* Temps disponible */}
        <div className="space-y-3">
          <Label>Temps disponible par semaine pour ton business *</Label>
          <RadioGroup
            value={data.weeklyHours}
            onValueChange={(value) => updateData({ weeklyHours: value })}
            className="grid grid-cols-2 sm:grid-cols-4 gap-2"
          >
            {weeklyHoursOptions.map((t) => (
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

        {/* Objectif 90 jours */}
        <div className="space-y-3">
          <Label>Ton objectif prioritaire pour les 90 prochains jours *</Label>
          <RadioGroup
            value={data.mainGoal90Days}
            onValueChange={(value) => updateData({ mainGoal90Days: value })}
            className="grid grid-cols-1 sm:grid-cols-2 gap-2"
          >
            {goal90DaysOptions.map((goal) => (
              <div key={goal.value} className="flex items-center">
                <RadioGroupItem value={goal.value} id={`goal90-${goal.value}`} className="peer sr-only" />
                <Label
                  htmlFor={`goal90-${goal.value}`}
                  className="flex-1 cursor-pointer rounded-lg border-2 border-muted bg-background p-3 text-center text-sm font-medium transition-all hover:bg-muted/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                >
                  {goal.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Objectifs principaux (2 max) */}
        <div className="space-y-3">
          <Label>Ton objectif principal avec ton business, au-delà de l'argent (2 choix max) *</Label>
          <div className="grid grid-cols-2 gap-2">
            {mainGoalsOptions.map((goal) => {
              const isSelected = data.mainGoals.includes(goal.value);
              return (
                <div
                  key={goal.value}
                  onClick={() => toggleMainGoal(goal.value)}
                  className={`p-3 rounded-lg border-2 cursor-pointer text-center text-sm font-medium transition-all ${
                    isSelected
                      ? "border-primary bg-primary/5"
                      : "border-muted bg-background hover:bg-muted/50"
                  } ${!isSelected && data.mainGoals.length >= 2 ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {goal.label}
                </div>
              );
            })}
          </div>
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
