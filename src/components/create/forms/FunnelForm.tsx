import { useState, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Route, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { type SystemeTemplate } from "@/data/systemeTemplates";
import { generateTemplateHtml, type CaptureContent, type SalesContent } from "@/data/funnelHtmlTemplates";
import { FunnelModeStep } from "./funnel/FunnelModeStep";
import { FunnelTemplateStep } from "./funnel/FunnelTemplateStep";
import { FunnelConfigStep } from "./funnel/FunnelConfigStep";
import { FunnelPreviewStep } from "./funnel/FunnelPreviewStep";

interface FunnelFormProps {
  onGenerate: (params: any) => Promise<string>;
  onSave: (data: any) => Promise<void>;
  onClose: () => void;
  isGenerating: boolean;
  isSaving: boolean;
}

type FunnelMode = "visual" | "text_only" | null;
type Step = "mode" | "template" | "configure" | "preview";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export function FunnelForm({ onGenerate, onSave, onClose, isGenerating, isSaving }: FunnelFormProps) {
  const { toast } = useToast();

  // Flow state
  const [mode, setMode] = useState<FunnelMode>(null);
  const [step, setStep] = useState<Step>("mode");
  const [selectedTemplate, setSelectedTemplate] = useState<SystemeTemplate | null>(null);

  // Config state
  const [linkedOffer, setLinkedOffer] = useState("");
  const [funnelPageType, setFunnelPageType] = useState<"capture" | "sales">("capture");
  const [authorName, setAuthorName] = useState("");
  const [authorPhoto, setAuthorPhoto] = useState("");
  const [offerMockup, setOfferMockup] = useState("");
  const [legalLinks, setLegalLinks] = useState("");

  // Generated state
  const [title, setTitle] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [structuredContent, setStructuredContent] = useState<CaptureContent | SalesContent | null>(null);
  const [previousContent, setPreviousContent] = useState("");
  const [previousStructured, setPreviousStructured] = useState<CaptureContent | SalesContent | null>(null);

  // Chat state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [hasPendingChanges, setHasPendingChanges] = useState(false);
  const [isChatLoading, setIsChatLoading] = useState(false);

  const funnelType = selectedTemplate
    ? (selectedTemplate.type === "capture" ? "capture_page" : "sales_page")
    : (funnelPageType === "capture" ? "capture_page" : "sales_page");
  const creditCost = funnelType === "capture_page" ? 4 : 6;
  const pageType = funnelType === "capture_page" ? "capture" : "sales";

  // HTML preview from structured content
  const htmlPreview = useMemo(() => {
    if (mode !== "visual" || !selectedTemplate) return null;
    if (structuredContent) {
      return generateTemplateHtml(selectedTemplate.id, pageType as "capture" | "sales", structuredContent);
    }
    return null;
  }, [mode, selectedTemplate, structuredContent, pageType]);

  const parseStructuredContent = useCallback((content: string): CaptureContent | SalesContent | null => {
    try {
      const parsed = JSON.parse(content);
      if (parsed.headline) return parsed;
    } catch { /* not JSON */ }
    return null;
  }, []);

  // ─── Handlers ──────────────────────────────────────────────────

  const handleSelectMode = (m: "visual" | "text_only") => {
    setMode(m);
    setStep(m === "visual" ? "template" : "configure");
  };

  const handleSelectTemplate = (template: SystemeTemplate) => {
    setSelectedTemplate(template);
    setStep("configure");
  };

  const handleGenerate = async () => {
    const useStructured = mode === "visual" && !!selectedTemplate;
    const content = await onGenerate({
      type: "funnel",
      funnelType,
      linkedOffer,
      templateName: selectedTemplate?.name,
      templateStyle: selectedTemplate?.category.join(", "),
      useStructured,
      pageType,
      authorName,
      authorPhoto,
      offerMockup,
      legalLinks,
    });
    if (content) {
      setGeneratedContent(content);
      if (useStructured) {
        const parsed = parseStructuredContent(content);
        setStructuredContent(parsed);
      }
      if (!title) setTitle(`${selectedTemplate?.name || funnelType}: ${linkedOffer.slice(0, 40) || ""}`);
      setStep("preview");
    }
  };

  const handleChatMessage = async (message: string): Promise<string> => {
    setIsChatLoading(true);
    setChatMessages((prev) => [...prev, { role: "user", content: message }]);
    setPreviousContent(generatedContent);
    setPreviousStructured(structuredContent);

    try {
      const useStructured = mode === "visual" && !!selectedTemplate;
      const result = await onGenerate({
        type: "funnel",
        funnelType,
        linkedOffer,
        templateName: selectedTemplate?.name,
        modification: message,
        currentContent: generatedContent,
        useStructured,
        pageType,
      });

      if (result) {
        setGeneratedContent(result);
        if (useStructured) {
          const parsed = parseStructuredContent(result);
          if (parsed) setStructuredContent(parsed);
        }
        setHasPendingChanges(true);
        const reply = "Modifications appliquées — vérifie l'aperçu ci-dessus ✓";
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

  const handleSave = async (status: "draft" | "published") => {
    await onSave({
      title,
      content: generatedContent,
      type: "funnel",
      platform: funnelType,
      status,
    });
  };

  // ─── Step progress ────────────────────────────────────────────

  const visibleSteps = mode === "visual"
    ? [{ key: "mode", label: "Format" }, { key: "template", label: "Template" }, { key: "configure", label: "Offre" }, { key: "preview", label: "Résultat" }]
    : [{ key: "mode", label: "Format" }, { key: "configure", label: "Offre" }, { key: "preview", label: "Résultat" }];
  const currentStepIdx = visibleSteps.findIndex((s) => s.key === step);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Route className="w-5 h-5" />
          Créer un Funnel
        </h2>
        <div className="flex items-center gap-3">
          {/* Progress indicator */}
          {mode && (
            <div className="hidden sm:flex items-center gap-1 text-xs">
              {visibleSteps.map((s, i) => (
                <div key={s.key} className="flex items-center gap-1">
                  {i > 0 && <div className="w-6 h-px bg-border" />}
                  <div
                    className={`h-6 px-2.5 rounded-full flex items-center justify-center text-[10px] font-semibold transition-colors ${
                      step === s.key
                        ? "bg-primary text-primary-foreground"
                        : currentStepIdx > i
                        ? "bg-primary/20 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          )}
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Steps */}
      {step === "mode" && (
        <FunnelModeStep onSelectMode={handleSelectMode} />
      )}

      {step === "template" && mode === "visual" && (
        <FunnelTemplateStep
          onSelect={handleSelectTemplate}
          onBack={() => setStep("mode")}
          selectedTemplate={selectedTemplate}
        />
      )}

      {step === "configure" && (
        <FunnelConfigStep
          mode={mode!}
          selectedTemplate={selectedTemplate}
          funnelPageType={funnelPageType}
          setFunnelPageType={setFunnelPageType}
          linkedOffer={linkedOffer}
          setLinkedOffer={setLinkedOffer}
          isGenerating={isGenerating}
          onGenerate={handleGenerate}
          onBack={() => setStep(mode === "visual" ? "template" : "mode")}
          creditCost={creditCost}
          authorName={authorName}
          setAuthorName={setAuthorName}
          authorPhoto={authorPhoto}
          setAuthorPhoto={setAuthorPhoto}
          offerMockup={offerMockup}
          setOfferMockup={setOfferMockup}
          legalLinks={legalLinks}
          setLegalLinks={setLegalLinks}
        />
      )}

      {step === "preview" && (
        <FunnelPreviewStep
          mode={mode!}
          title={title}
          setTitle={setTitle}
          generatedContent={generatedContent}
          structuredContent={structuredContent}
          htmlPreview={htmlPreview}
          pageType={pageType as "capture" | "sales"}
          chatMessages={chatMessages}
          onChatMessage={handleChatMessage}
          onAcceptChanges={handleAcceptChanges}
          onRejectChanges={handleRejectChanges}
          isChatLoading={isChatLoading}
          hasPendingChanges={hasPendingChanges}
          isGenerating={isGenerating}
          onSave={handleSave}
          isSaving={isSaving}
        />
      )}
    </div>
  );
}
