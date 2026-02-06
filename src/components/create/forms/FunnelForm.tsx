import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Loader2, Wand2, Save, Send, X, Route,
  LayoutTemplate, Download, Copy, Coins, ExternalLink,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { type SystemeTemplate } from "@/data/systemeTemplates";
import { FunnelTemplateModal } from "./FunnelTemplateModal";
import { FunnelChatBar } from "./FunnelChatBar";
import ReactMarkdown from "react-markdown";

interface FunnelFormProps {
  onGenerate: (params: any) => Promise<string>;
  onSave: (data: any) => Promise<void>;
  onClose: () => void;
  isGenerating: boolean;
  isSaving: boolean;
}

type Step = "template" | "configure" | "preview";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export function FunnelForm({ onGenerate, onSave, onClose, isGenerating, isSaving }: FunnelFormProps) {
  const { toast } = useToast();

  // State
  const [step, setStep] = useState<Step>("template");
  const [selectedTemplate, setSelectedTemplate] = useState<SystemeTemplate | null>(null);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [linkedOffer, setLinkedOffer] = useState("");
  const [title, setTitle] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [previousContent, setPreviousContent] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [hasPendingChanges, setHasPendingChanges] = useState(false);
  const [isChatLoading, setIsChatLoading] = useState(false);

  const funnelType = selectedTemplate?.type === "capture" ? "capture_page" : "sales_page";
  const creditCost = funnelType === "capture_page" ? 4 : 6;

  const handleSelectTemplate = (template: SystemeTemplate) => {
    setSelectedTemplate(template);
    setStep("configure");
  };

  const handleGenerate = async () => {
    const content = await onGenerate({
      type: "funnel",
      funnelType,
      linkedOffer,
      templateName: selectedTemplate?.name,
      templateStyle: selectedTemplate?.category.join(", "),
    });
    if (content) {
      setGeneratedContent(content);
      if (!title) setTitle(`${selectedTemplate?.name}: ${linkedOffer || funnelType}`);
      setStep("preview");
    }
  };

  const handleChatMessage = async (message: string): Promise<string> => {
    setIsChatLoading(true);
    setChatMessages((prev) => [...prev, { role: "user", content: message }]);
    setPreviousContent(generatedContent);

    try {
      const result = await onGenerate({
        type: "funnel",
        funnelType,
        linkedOffer,
        templateName: selectedTemplate?.name,
        modification: message,
        currentContent: generatedContent,
      });

      if (result) {
        setGeneratedContent(result);
        setHasPendingChanges(true);
        const reply = "Modifications appliquées ✓";
        setChatMessages((prev) => [...prev, { role: "assistant", content: reply }]);
        return reply;
      }
      return "";
    } catch {
      return "";
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleAcceptChanges = () => {
    setPreviousContent("");
    setHasPendingChanges(false);
    toast({ title: "Modifications acceptées ✓" });
  };

  const handleRejectChanges = () => {
    if (previousContent) setGeneratedContent(previousContent);
    setPreviousContent("");
    setHasPendingChanges(false);
    toast({ title: "Modifications annulées" });
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(generatedContent);
    toast({ title: "Texte copié !" });
  };

  const handleDownloadHtml = () => {
    const htmlContent = `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<style>body{font-family:system-ui,sans-serif;max-width:800px;margin:0 auto;padding:2rem;line-height:1.6;color:#1a1a1a}
h1{font-size:2rem;margin-bottom:1rem}h2{font-size:1.5rem;margin-top:2rem}
ul{padding-left:1.5rem}li{margin-bottom:0.5rem}
.cta{display:inline-block;background:#2563eb;color:white;padding:12px 32px;border-radius:8px;text-decoration:none;font-weight:600;margin-top:1rem}
</style></head>
<body>
${generatedContent.replace(/\n/g, "<br/>")}
</body></html>`;
    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title || "funnel"}.html`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: "HTML téléchargé !" });
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Route className="w-5 h-5" />
          Créer un Funnel
        </h2>
        <div className="flex items-center gap-3">
          {/* Step indicators */}
          <div className="hidden sm:flex items-center gap-1 text-xs">
            {(["template", "configure", "preview"] as Step[]).map((s, i) => (
              <div key={s} className="flex items-center gap-1">
                {i > 0 && <div className="w-4 h-px bg-border" />}
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    step === s
                      ? "bg-primary text-primary-foreground"
                      : ["template", "configure", "preview"].indexOf(step) > i
                      ? "bg-primary/20 text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {i + 1}
                </div>
              </div>
            ))}
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Step 1: Template Selection */}
      {step === "template" && (
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Commence par choisir un template visuel pour ton funnel.
          </p>

          {selectedTemplate ? (
            <Card className="p-4 flex items-center gap-4">
              <img
                src={selectedTemplate.imageUrl}
                alt={selectedTemplate.name}
                className="w-20 h-14 rounded object-cover"
              />
              <div className="flex-1">
                <p className="font-semibold">{selectedTemplate.name}</p>
                <p className="text-xs text-muted-foreground">{selectedTemplate.description}</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => setShowTemplateModal(true)}>
                Changer
              </Button>
              <Button size="sm" onClick={() => setStep("configure")}>
                Continuer
              </Button>
            </Card>
          ) : (
            <Button
              variant="outline"
              className="w-full h-32 border-dashed flex flex-col gap-2"
              onClick={() => setShowTemplateModal(true)}
            >
              <LayoutTemplate className="w-8 h-8 text-muted-foreground" />
              <span>Parcourir les templates</span>
            </Button>
          )}
        </div>
      )}

      {/* Step 2: Configure & Generate */}
      {step === "configure" && selectedTemplate && (
        <div className="space-y-4">
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
            <Button variant="ghost" size="sm" onClick={() => setStep("template")}>
              Changer
            </Button>
          </Card>

          <div className="space-y-2">
            <Label>Offre liée (depuis ta pyramide ou description libre)</Label>
            <Input
              placeholder="Ex: Formation Instagram pour coachs"
              value={linkedOffer}
              onChange={(e) => setLinkedOffer(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              L'IA utilisera ton profil/persona pour personnaliser le texte.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={handleGenerate}
              disabled={isGenerating || !linkedOffer}
              className="flex-1"
            >
              {isGenerating ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Génération...</>
              ) : (
                <><Wand2 className="w-4 h-4 mr-2" />Générer le copywriting</>
              )}
            </Button>
            <Badge variant="outline" className="gap-1 whitespace-nowrap">
              <Coins className="w-3.5 h-3.5" />
              {creditCost} crédits
            </Badge>
          </div>
        </div>
      )}

      {/* Step 3: Preview + Chat */}
      {step === "preview" && selectedTemplate && (
        <div className="space-y-4">
          {/* Template + Title header */}
          <div className="flex items-center gap-3 flex-wrap">
            <img
              src={selectedTemplate.imageUrl}
              alt={selectedTemplate.name}
              className="w-12 h-8 rounded object-cover"
            />
            <div className="flex-1 min-w-0">
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Titre du funnel"
                className="font-semibold"
              />
            </div>
          </div>

          {/* Two-column preview */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Visual preview (template image) */}
            <Card className="overflow-hidden">
              <div className="p-3 border-b bg-muted/30 flex items-center justify-between">
                <span className="text-sm font-medium">Aperçu template</span>
                {selectedTemplate.shareLink && (
                  <Button variant="ghost" size="sm" asChild>
                    <a href={selectedTemplate.shareLink} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-3.5 h-3.5 mr-1" />
                      Systeme.io
                    </a>
                  </Button>
                )}
              </div>
              <div className="p-4 max-h-[400px] overflow-auto bg-muted/20">
                <img
                  src={selectedTemplate.imageUrl}
                  alt={selectedTemplate.name}
                  className="w-full rounded"
                />
              </div>
            </Card>

            {/* Text preview */}
            <Card className="overflow-hidden flex flex-col">
              <div className="p-3 border-b bg-muted/30 flex items-center justify-between">
                <span className="text-sm font-medium">Copywriting généré</span>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" onClick={handleCopyText}>
                    <Copy className="w-3.5 h-3.5 mr-1" />
                    Copier
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handleDownloadHtml}>
                    <Download className="w-3.5 h-3.5 mr-1" />
                    HTML
                  </Button>
                </div>
              </div>
              <div className="p-4 flex-1 max-h-[400px] overflow-auto prose prose-sm max-w-none">
                <ReactMarkdown>{generatedContent}</ReactMarkdown>
              </div>
            </Card>
          </div>

          {/* Chat bar for modifications */}
          <FunnelChatBar
            onSendMessage={handleChatMessage}
            onAccept={handleAcceptChanges}
            onReject={handleRejectChanges}
            isLoading={isChatLoading || isGenerating}
            hasPendingChanges={hasPendingChanges}
            messages={chatMessages}
          />

          {/* Save actions */}
          <div className="flex gap-2 flex-wrap justify-end">
            <Button variant="outline" size="sm" onClick={() => handleSave("draft")} disabled={!title || isSaving}>
              <Save className="w-4 h-4 mr-1" />
              Brouillon
            </Button>
            <Button size="sm" onClick={() => handleSave("published")} disabled={!title || isSaving}>
              <Send className="w-4 h-4 mr-1" />
              Publier
            </Button>
          </div>
        </div>
      )}

      {/* Template Modal */}
      <FunnelTemplateModal
        open={showTemplateModal}
        onClose={() => setShowTemplateModal(false)}
        onSelect={handleSelectTemplate}
        filterType={selectedTemplate?.type}
      />
    </div>
  );
}
