import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Wand2, RefreshCw, Save, Send, X, Route, ExternalLink } from "lucide-react";

interface FunnelFormProps {
  onGenerate: (params: any) => Promise<string>;
  onSave: (data: any) => Promise<void>;
  onClose: () => void;
  isGenerating: boolean;
  isSaving: boolean;
}

const funnelTypes = [
  { id: "capture_page", label: "Page de capture" },
  { id: "sales_page", label: "Page de vente" },
];

export function FunnelForm({ onGenerate, onSave, onClose, isGenerating, isSaving }: FunnelFormProps) {
  const [funnelType, setFunnelType] = useState("capture_page");
  const [linkedOffer, setLinkedOffer] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [title, setTitle] = useState("");

  const handleGenerate = async () => {
    const content = await onGenerate({
      type: "funnel",
      funnelType,
      linkedOffer,
    });
    if (content) {
      setGeneratedContent(content);
      if (!title) setTitle(`Funnel: ${linkedOffer || funnelType}`);
    }
  };

  const handleSave = async (status: "draft" | "published") => {
    await onSave({
      title,
      content: generatedContent,
      type: "funnel",
      platform: funnelType,
      status,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Route className="w-5 h-5" />
          Créer un Funnel
        </h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-5 h-5" />
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Type de page</Label>
            <Select value={funnelType} onValueChange={setFunnelType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {funnelTypes.map((t) => (
                  <SelectItem key={t.id} value={t.id}>{t.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Offre liée (depuis pyramide ou création)</Label>
            <Input
              placeholder="Sélectionnez ou décrivez l'offre..."
              value={linkedOffer}
              onChange={(e) => setLinkedOffer(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Vous pouvez créer une nouvelle offre dans la section "Offres" puis revenir ici.
            </p>
          </div>

          <Button onClick={handleGenerate} disabled={isGenerating || !linkedOffer} className="w-full">
            {isGenerating ? (
              <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Génération...</>
            ) : (
              <><Wand2 className="w-4 h-4 mr-2" />Générer (copywriting complet)</>
            )}
          </Button>

          <div className="p-4 rounded-lg bg-muted/50 space-y-2">
            <p className="text-sm font-medium">Templates Systeme.io</p>
            <p className="text-xs text-muted-foreground">
              Utilisez le copywriting généré avec les templates Systeme.io pour créer vos pages rapidement.
            </p>
            <Button variant="outline" size="sm" asChild>
              <a href="https://systeme.io" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-1" />
                Ouvrir Systeme.io
              </a>
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Titre du funnel</Label>
            <Input
              placeholder="Titre pour identification"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Prévisualisation du copywriting</Label>
            <Textarea
              value={generatedContent}
              onChange={(e) => setGeneratedContent(e.target.value)}
              rows={14}
              placeholder="Le contenu généré apparaîtra ici (headline, sous-titres, sections, bénéfices, CTA)..."
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
                <Send className="w-4 h-4 mr-1" />Publier
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
