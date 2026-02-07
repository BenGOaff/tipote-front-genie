import { useState, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Loader2, Wand2, Save, Send, X, Route,
  LayoutTemplate, Download, Copy, Coins, FileText,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { type SystemeTemplate } from "@/data/systemeTemplates";
import { FunnelTemplateModal } from "./FunnelTemplateModal";
import { FunnelChatBar } from "./FunnelChatBar";
import { generateTemplateHtml, type CaptureContent, type SalesContent } from "@/data/funnelHtmlTemplates";
import ReactMarkdown from "react-markdown";

interface FunnelFormProps {
  onGenerate: (params: any) => Promise<string>;
  onSave: (data: any) => Promise<void>;
  onClose: () => void;
  isGenerating: boolean;
  isSaving: boolean;
}

type FunnelMode = "with_template" | "text_only" | null;
type Step = "mode" | "template" | "configure" | "preview";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export function FunnelForm({ onGenerate, onSave, onClose, isGenerating, isSaving }: FunnelFormProps) {
  const { toast } = useToast();

  const [mode, setMode] = useState<FunnelMode>(null);
  const [step, setStep] = useState<Step>("mode");
  const [selectedTemplate, setSelectedTemplate] = useState<SystemeTemplate | null>(null);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [linkedOffer, setLinkedOffer] = useState("");
  const [title, setTitle] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [structuredContent, setStructuredContent] = useState<CaptureContent | SalesContent | null>(null);
  const [previousContent, setPreviousContent] = useState("");
  const [previousStructured, setPreviousStructured] = useState<CaptureContent | SalesContent | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [hasPendingChanges, setHasPendingChanges] = useState(false);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [funnelPageType, setFunnelPageType] = useState<"capture" | "sales">("capture");

  const funnelType = selectedTemplate
    ? (selectedTemplate.type === "capture" ? "capture_page" : "sales_page")
    : (funnelPageType === "capture" ? "capture_page" : "sales_page");
  const creditCost = funnelType === "capture_page" ? 4 : 6;

  // Generate HTML preview from structured content
  const htmlPreview = useMemo(() => {
    if (mode !== "with_template" || !selectedTemplate || !structuredContent) {
      // Show lorem ipsum preview
      if (mode === "with_template" && selectedTemplate) {
        return generateTemplateHtml(selectedTemplate.id, selectedTemplate.type === "capture" ? "capture" : "sales");
      }
      return null;
    }
    const pageType = selectedTemplate.type === "capture" ? "capture" : "sales";
    return generateTemplateHtml(selectedTemplate.id, pageType, structuredContent);
  }, [mode, selectedTemplate, structuredContent]);

  const handleSelectMode = (m: FunnelMode) => {
    setMode(m);
    if (m === "with_template") {
      setStep("template");
    } else {
      setStep("configure");
    }
  };

  const handleSelectTemplate = (template: SystemeTemplate) => {
    setSelectedTemplate(template);
    setStep("configure");
  };

  const parseStructuredContent = useCallback((content: string): CaptureContent | SalesContent | null => {
    try {
      const parsed = JSON.parse(content);
      if (parsed.headline) return parsed;
    } catch {
      // Not JSON, return null
    }
    return null;
  }, []);

  const handleGenerate = async () => {
    const useStructured = mode === "with_template" && selectedTemplate;
    const content = await onGenerate({
      type: "funnel",
      funnelType,
      linkedOffer,
      templateName: selectedTemplate?.name,
      templateStyle: selectedTemplate?.category.join(", "),
      useStructured: !!useStructured,
      pageType: funnelType === "capture_page" ? "capture" : "sales",
    });
    if (content) {
      setGeneratedContent(content);
      if (useStructured) {
        const parsed = parseStructuredContent(content);
        setStructuredContent(parsed);
      }
      if (!title) setTitle(`${selectedTemplate?.name || funnelType}: ${linkedOffer || ""}`);
      setStep("preview");
    }
  };

  const handleChatMessage = async (message: string): Promise<string> => {
    setIsChatLoading(true);
    setChatMessages((prev) => [...prev, { role: "user", content: message }]);
    setPreviousContent(generatedContent);
    setPreviousStructured(structuredContent);

    try {
      const useStructured = mode === "with_template" && selectedTemplate;
      const result = await onGenerate({
        type: "funnel",
        funnelType,
        linkedOffer,
        templateName: selectedTemplate?.name,
        modification: message,
        currentContent: generatedContent,
        useStructured: !!useStructured,
        pageType: funnelType === "capture_page" ? "capture" : "sales",
      });

      if (result) {
        setGeneratedContent(result);
        if (useStructured) {
          const parsed = parseStructuredContent(result);
          if (parsed) setStructuredContent(parsed);
        }
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
    setPreviousStructured(null);
    setHasPendingChanges(false);
    toast({ title: "Modifications acceptées ✓" });
  };

  const handleRejectChanges = () => {
    if (previousContent) setGeneratedContent(previousContent);
    if (previousStructured) setStructuredContent(previousStructured);
    setPreviousContent("");
    setPreviousStructured(null);
    setHasPendingChanges(false);
    toast({ title: "Modifications annulées" });
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(generatedContent);
    toast({ title: "Texte copié !" });
  };

  const handleDownloadHtml = () => {
    let htmlContent: string;
    if (mode === "with_template" && htmlPreview) {
      htmlContent = htmlPreview;
    } else {
      htmlContent = `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<style>body{font-family:system-ui,sans-serif;max-width:800px;margin:0 auto;padding:2rem;line-height:1.6;color:#1a1a1a}
h1{font-size:2rem;margin-bottom:1rem}h2{font-size:1.5rem;margin-top:2rem}
ul{padding-left:1.5rem}li{margin-bottom:0.5rem}
.cta{display:inline-block;background:#2563eb;color:white;padding:12px 32px;border-radius:8px;text-decoration:none;font-weight:600;margin-top:1rem}
</style></head>
<body>${generatedContent.replace(/\n/g, "<br/>")}</body></html>`;
    }
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

  const stepIndex = ["mode", "template", "configure", "preview"].indexOf(step);
  const visibleSteps = mode === "with_template"
    ? ["mode", "template", "configure", "preview"]
    : ["mode", "configure", "preview"];
  const currentStepIdx = visibleSteps.indexOf(step);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Route className="w-5 h-5" />
          Créer un Funnel
        </h2>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1 text-xs">
            {visibleSteps.map((s, i) => (
              <div key={s} className="flex items-center gap-1">
                {i > 0 && <div className="w-4 h-px bg-border" />}
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    step === s
                      ? "bg-primary text-primary-foreground"
                      : currentStepIdx > i
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

      {/* Step 0: Mode Selection */}
      {step === "mode" && (
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Choisis comment tu veux créer ton funnel.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <button
              onClick={() => handleSelectMode("with_template")}
              className="group text-left rounded-xl border-2 border-border p-6 hover:border-primary transition-all space-y-3"
            >
              <LayoutTemplate className="w-8 h-8 text-primary" />
              <h3 className="font-semibold text-lg">Avec template visuel</h3>
              <p className="text-sm text-muted-foreground">
                Choisis un style parmi nos templates haute qualité. L'IA remplira le texte automatiquement.
                Tu pourras prévisualiser le rendu final et télécharger le HTML.
              </p>
              <Badge variant="secondary" className="mt-2">Recommandé</Badge>
            </button>
            <button
              onClick={() => handleSelectMode("text_only")}
              className="group text-left rounded-xl border-2 border-border p-6 hover:border-primary transition-all space-y-3"
            >
              <FileText className="w-8 h-8 text-muted-foreground" />
              <h3 className="font-semibold text-lg">Texte uniquement</h3>
              <p className="text-sm text-muted-foreground">
                L'IA génère uniquement le copywriting. Pas de visuel, juste le texte prêt à copier-coller
                dans Systeme.io ou ailleurs.
              </p>
            </button>
          </div>
        </div>
      )}

      {/* Step 1: Template Selection (only for with_template mode) */}
      {step === "template" && mode === "with_template" && (
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Choisis un template visuel. Il servira de base pour générer ta page.
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
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs">
                    Style: {selectedTemplate.htmlStyle || "modern"}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {selectedTemplate.type === "capture" ? "Capture" : "Vente"}
                  </Badge>
                </div>
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

          {/* Lorem ipsum preview */}
          {selectedTemplate && htmlPreview && (
            <Card className="overflow-hidden">
              <div className="p-3 border-b bg-muted/30">
                <span className="text-sm font-medium">Aperçu du style (texte de démonstration)</span>
              </div>
              <div className="h-[400px]">
                <iframe
                  srcDoc={htmlPreview}
                  title="Aperçu template"
                  className="w-full h-full border-0"
                  sandbox="allow-scripts"
                />
              </div>
            </Card>
          )}
        </div>
      )}

      {/* Step 2: Configure & Generate */}
      {step === "configure" && (
        <div className="space-y-4">
          {mode === "with_template" && selectedTemplate && (
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
          )}

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
      {step === "preview" && (
        <div className="space-y-4">
          {/* Title */}
          <div className="flex items-center gap-3 flex-wrap">
            {selectedTemplate && (
              <img
                src={selectedTemplate.imageUrl}
                alt={selectedTemplate.name}
                className="w-12 h-8 rounded object-cover"
              />
            )}
            <div className="flex-1 min-w-0">
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Titre du funnel"
                className="font-semibold"
              />
            </div>
          </div>

          {/* Preview area */}
          {mode === "with_template" && htmlPreview ? (
            <div className="grid md:grid-cols-2 gap-4">
              {/* HTML visual preview */}
              <Card className="overflow-hidden">
                <div className="p-3 border-b bg-muted/30 flex items-center justify-between">
                  <span className="text-sm font-medium">Aperçu visuel</span>
                  <Button variant="ghost" size="sm" onClick={handleDownloadHtml}>
                    <Download className="w-3.5 h-3.5 mr-1" />
                    HTML
                  </Button>
                </div>
                <div className="h-[500px]">
                  <iframe
                    srcDoc={htmlPreview}
                    title="Aperçu funnel"
                    className="w-full h-full border-0"
                    sandbox="allow-scripts"
                  />
                </div>
              </Card>

              {/* Text preview */}
              <Card className="overflow-hidden flex flex-col">
                <div className="p-3 border-b bg-muted/30 flex items-center justify-between">
                  <span className="text-sm font-medium">Copywriting</span>
                  <Button variant="ghost" size="sm" onClick={handleCopyText}>
                    <Copy className="w-3.5 h-3.5 mr-1" />
                    Copier
                  </Button>
                </div>
                <div className="p-4 flex-1 max-h-[500px] overflow-auto prose prose-sm max-w-none">
                  {structuredContent ? (
                    <StructuredContentDisplay content={structuredContent} pageType={funnelType === "capture_page" ? "capture" : "sales"} />
                  ) : (
                    <ReactMarkdown>{generatedContent}</ReactMarkdown>
                  )}
                </div>
              </Card>
            </div>
          ) : (
            /* Text-only preview */
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
              <div className="p-4 flex-1 max-h-[500px] overflow-auto prose prose-sm max-w-none">
                <ReactMarkdown>{generatedContent}</ReactMarkdown>
              </div>
            </Card>
          )}

          {/* Chat bar */}
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

      <FunnelTemplateModal
        open={showTemplateModal}
        onClose={() => setShowTemplateModal(false)}
        onSelect={handleSelectTemplate}
        filterType={selectedTemplate?.type}
      />
    </div>
  );
}

// ─── Structured Content Display ──────────────────────────────────

function StructuredContentDisplay({ content, pageType }: { content: CaptureContent | SalesContent; pageType: "capture" | "sales" }) {
  if (pageType === "capture") {
    const c = content as CaptureContent;
    return (
      <div className="space-y-3">
        <h2 className="text-lg font-bold">{c.headline}</h2>
        <p className="text-muted-foreground">{c.subtitle}</p>
        <ul className="list-disc pl-5 space-y-1">
          {c.bullets.map((b, i) => <li key={i}>{b}</li>)}
        </ul>
        <p className="font-semibold text-primary">{c.ctaText}</p>
        {c.proofText && <p className="text-sm text-muted-foreground italic">{c.proofText}</p>}
      </div>
    );
  }
  const c = content as SalesContent;
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">{c.headline}</h2>
      <p className="text-muted-foreground">{c.subtitle}</p>
      <div>
        <h3 className="font-semibold text-destructive">{c.problemTitle}</h3>
        <p className="text-sm">{c.problemText}</p>
      </div>
      <div>
        <h3 className="font-semibold">{c.solutionTitle}</h3>
        <p className="text-sm">{c.solutionText}</p>
      </div>
      <ul className="list-disc pl-5 space-y-1">
        {c.benefits.map((b, i) => <li key={i}>{b}</li>)}
      </ul>
      {c.testimonials?.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-semibold">Témoignages</h3>
          {c.testimonials.map((t, i) => (
            <blockquote key={i} className="border-l-2 border-primary pl-3 text-sm italic">
              "{t.text}" — <strong>{t.name}</strong>
            </blockquote>
          ))}
        </div>
      )}
      <div>
        <h3 className="font-semibold">{c.offerTitle}</h3>
        <ul className="list-disc pl-5 space-y-1">
          {c.offerItems.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      </div>
      {c.bonuses?.length > 0 && (
        <div>
          <h3 className="font-semibold">🎁 Bonus</h3>
          <ul className="list-disc pl-5 space-y-1">
            {c.bonuses.map((b, i) => <li key={i}>{b}</li>)}
          </ul>
        </div>
      )}
      <p className="text-sm italic">🛡️ {c.guarantee}</p>
      <p className="font-semibold text-primary">{c.ctaText}</p>
      {c.urgencyText && <p className="text-sm font-semibold text-destructive">{c.urgencyText}</p>}
    </div>
  );
}
