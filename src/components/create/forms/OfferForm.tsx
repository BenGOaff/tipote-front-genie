import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Wand2, RefreshCw, Save, Send, X, Package } from "lucide-react";

interface OfferFormProps {
  onGenerate: (params: any) => Promise<string>;
  onSave: (data: any) => Promise<void>;
  onClose: () => void;
  isGenerating: boolean;
  isSaving: boolean;
}

const offerTypes = [
  { id: "lead_magnet", label: "Lead Magnet (gratuit)" },
  { id: "paid_training", label: "Formation payante" },
];

export function OfferForm({ onGenerate, onSave, onClose, isGenerating, isSaving }: OfferFormProps) {
  const [offerType, setOfferType] = useState("lead_magnet");
  const [theme, setTheme] = useState("");
  const [target, setTarget] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [title, setTitle] = useState("");

  const handleGenerate = async () => {
    const content = await onGenerate({
      type: "offer",
      offerType,
      theme,
      target,
    });
    if (content) {
      setGeneratedContent(content);
      if (!title) setTitle(theme || `Offre ${offerType}`);
    }
  };

  const handleSave = async (status: "draft" | "published") => {
    await onSave({
      title,
      content: generatedContent,
      type: "offer",
      platform: offerType,
      status,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Package className="w-5 h-5" />
          Créer une Offre
        </h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-5 h-5" />
        </Button>
      </div>

      <p className="text-sm text-muted-foreground">
        L'offre créée sera automatiquement ajoutée à votre pyramide d'offres.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Type d'offre</Label>
            <Select value={offerType} onValueChange={setOfferType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {offerTypes.map((t) => (
                  <SelectItem key={t.id} value={t.id}>{t.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Thème / Sujet *</Label>
            <Input
              placeholder="Ex: Guide complet du marketing digital"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Cible (pré-remplie depuis persona)</Label>
            <Input
              placeholder="Ex: Entrepreneurs débutants, PME..."
              value={target}
              onChange={(e) => setTarget(e.target.value)}
            />
          </div>

          <Button onClick={handleGenerate} disabled={isGenerating || !theme} className="w-full">
            {isGenerating ? (
              <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Génération...</>
            ) : (
              <><Wand2 className="w-4 h-4 mr-2" />Générer (titre + pitch + structure + contenu)</>
            )}
          </Button>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Titre de l'offre</Label>
            <Input
              placeholder="Titre de votre offre"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Prévisualisation</Label>
            <Textarea
              value={generatedContent}
              onChange={(e) => setGeneratedContent(e.target.value)}
              rows={14}
              placeholder="Le contenu généré apparaîtra ici (titre, pitch, structure du contenu, contenu complet)..."
              className="resize-none"
            />
          </div>

          {generatedContent && (
            <div className="flex gap-2 flex-wrap">
              <Button variant="outline" size="sm" onClick={handleGenerate} disabled={isGenerating}>
                <RefreshCw className="w-4 h-4 mr-1" />Régénérer
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleSave("draft")} disabled={!title || isSaving}>
                <Save className="w-4 h-4 mr-1" />Brouillon
              </Button>
              <Button size="sm" onClick={() => handleSave("published")} disabled={!title || isSaving}>
                <Send className="w-4 h-4 mr-1" />Publier & Ajouter à la pyramide
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
