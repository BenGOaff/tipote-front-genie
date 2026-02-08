import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Loader2, Wand2, Coins, ImageIcon, Link2 } from "lucide-react";
import { type SystemeTemplate } from "@/data/systemeTemplates";

interface FunnelConfigStepProps {
  mode: "visual" | "text_only";
  selectedTemplate: SystemeTemplate | null;
  funnelPageType: "capture" | "sales";
  setFunnelPageType: (type: "capture" | "sales") => void;
  linkedOffer: string;
  setLinkedOffer: (v: string) => void;
  isGenerating: boolean;
  onGenerate: () => void;
  onBack: () => void;
  creditCost: number;
  // Visual mode extra fields
  authorName: string;
  setAuthorName: (v: string) => void;
  authorPhoto: string;
  setAuthorPhoto: (v: string) => void;
  offerMockup: string;
  setOfferMockup: (v: string) => void;
  legalLinks: string;
  setLegalLinks: (v: string) => void;
}

export function FunnelConfigStep({
  mode,
  selectedTemplate,
  funnelPageType,
  setFunnelPageType,
  linkedOffer,
  setLinkedOffer,
  isGenerating,
  onGenerate,
  onBack,
  creditCost,
  authorName,
  setAuthorName,
  authorPhoto,
  setAuthorPhoto,
  offerMockup,
  setOfferMockup,
  legalLinks,
  setLegalLinks,
}: FunnelConfigStepProps) {
  const pageType = selectedTemplate
    ? selectedTemplate.type
    : funnelPageType;

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-1" />
          Retour
        </Button>
        <div>
          <h3 className="text-lg font-semibold">Décris ton offre</h3>
          <p className="text-sm text-muted-foreground">
            L'IA utilisera ces informations pour personnaliser le contenu.
          </p>
        </div>
      </div>

      {/* Template reminder for visual mode */}
      {mode === "visual" && selectedTemplate && (
        <Card className="p-3 flex items-center gap-3 bg-muted/50">
          <img
            src={selectedTemplate.imageUrl}
            alt={selectedTemplate.name}
            className="w-16 h-11 rounded object-cover"
          />
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm">{selectedTemplate.name}</p>
            <Badge variant="outline" className="text-[10px]">
              {selectedTemplate.type === "capture" ? "Page de capture" : "Page de vente"}
            </Badge>
          </div>
        </Card>
      )}

      {/* Page type selector (text_only mode only) */}
      {mode === "text_only" && (
        <div className="space-y-2">
          <Label>Type de page</Label>
          <div className="flex gap-2">
            <Button
              variant={funnelPageType === "capture" ? "default" : "outline"}
              size="sm"
              onClick={() => setFunnelPageType("capture")}
            >
              Page de capture
            </Button>
            <Button
              variant={funnelPageType === "sales" ? "default" : "outline"}
              size="sm"
              onClick={() => setFunnelPageType("sales")}
            >
              Page de vente
            </Button>
          </div>
        </div>
      )}

      {/* Offer description */}
      <div className="space-y-2">
        <Label>Ton offre *</Label>
        <Textarea
          placeholder="Ex: Formation Instagram pour coachs sportifs – 297€ – Inclut 6 modules vidéo, des templates et un groupe privé…"
          value={linkedOffer}
          onChange={(e) => setLinkedOffer(e.target.value)}
          rows={3}
        />
        <p className="text-xs text-muted-foreground">
          Décris ton offre ou colle une description existante. Plus tu donnes de détails, meilleur sera le résultat.
        </p>
      </div>

      {/* Visual mode: additional fields */}
      {mode === "visual" && (
        <div className="space-y-4 border-t pt-4">
          <p className="text-sm font-medium text-muted-foreground">
            Informations complémentaires pour le template (optionnel)
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-1.5">
                Nom de l'auteur / marque
              </Label>
              <Input
                placeholder="Ex: Marie Dupont"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5" />
                Photo de l'auteur (URL)
              </Label>
              <Input
                placeholder="https://..."
                value={authorPhoto}
                onChange={(e) => setAuthorPhoto(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5" />
                Mockup de l'offre (URL)
              </Label>
              <Input
                placeholder="https://..."
                value={offerMockup}
                onChange={(e) => setOfferMockup(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-1.5">
                <Link2 className="w-3.5 h-3.5" />
                Liens légaux (CGV, mentions...)
              </Label>
              <Input
                placeholder="https://monsite.com/cgv"
                value={legalLinks}
                onChange={(e) => setLegalLinks(e.target.value)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Generate button */}
      <div className="flex items-center gap-3 pt-2">
        <Button
          onClick={onGenerate}
          disabled={isGenerating || !linkedOffer.trim()}
          className="flex-1"
          size="lg"
        >
          {isGenerating ? (
            <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Génération en cours...</>
          ) : (
            <><Wand2 className="w-4 h-4 mr-2" />Générer {mode === "visual" ? "la page" : "le copywriting"}</>
          )}
        </Button>
        <Badge variant="outline" className="gap-1 whitespace-nowrap py-2">
          <Coins className="w-3.5 h-3.5" />
          {creditCost} crédits
        </Badge>
      </div>
    </div>
  );
}
