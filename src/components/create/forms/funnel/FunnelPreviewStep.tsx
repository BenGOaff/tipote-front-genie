import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Save, Send, Download, Copy, ExternalLink, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { FunnelChatBar } from "../FunnelChatBar";
import ReactMarkdown from "react-markdown";
import { type CaptureContent, type SalesContent } from "@/data/funnelHtmlTemplates";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface FunnelPreviewStepProps {
  mode: "visual" | "text_only";
  title: string;
  setTitle: (v: string) => void;
  generatedContent: string;
  structuredContent: CaptureContent | SalesContent | null;
  htmlPreview: string | null;
  pageType: "capture" | "sales";
  // Chat
  chatMessages: ChatMessage[];
  onChatMessage: (message: string) => Promise<string>;
  onAcceptChanges: () => void;
  onRejectChanges: () => void;
  isChatLoading: boolean;
  hasPendingChanges: boolean;
  isGenerating: boolean;
  // Save
  onSave: (status: "draft" | "published") => void;
  isSaving: boolean;
}

export function FunnelPreviewStep({
  mode,
  title,
  setTitle,
  generatedContent,
  structuredContent,
  htmlPreview,
  pageType,
  chatMessages,
  onChatMessage,
  onAcceptChanges,
  onRejectChanges,
  isChatLoading,
  hasPendingChanges,
  isGenerating,
  onSave,
  isSaving,
}: FunnelPreviewStepProps) {
  const { toast } = useToast();

  const handleCopyText = () => {
    navigator.clipboard.writeText(generatedContent);
    toast({ title: "Texte copié !" });
  };

  const handleDownloadHtml = () => {
    let htmlContent: string;
    if (mode === "visual" && htmlPreview) {
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

  const handlePreviewNewTab = () => {
    if (!htmlPreview) return;
    const blob = new Blob([htmlPreview], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  return (
    <div className="space-y-4">
      {/* Title */}
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Titre du funnel"
            className="font-semibold text-base"
          />
        </div>
      </div>

      {/* Preview area */}
      {mode === "visual" && htmlPreview ? (
        <div className="space-y-4">
          {/* Visual preview */}
          <Card className="overflow-hidden">
            <div className="p-3 border-b bg-muted/30 flex items-center justify-between">
              <span className="text-sm font-medium flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5" />
                Aperçu de ta page
              </span>
              <div className="flex gap-1">
                <Button variant="ghost" size="sm" onClick={handlePreviewNewTab}>
                  <ExternalLink className="w-3.5 h-3.5 mr-1" />
                  Nouvel onglet
                </Button>
                <Button variant="ghost" size="sm" onClick={handleDownloadHtml}>
                  <Download className="w-3.5 h-3.5 mr-1" />
                  Télécharger HTML
                </Button>
              </div>
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

          {/* Text content (collapsible) */}
          <Card className="overflow-hidden">
            <div className="p-3 border-b bg-muted/30 flex items-center justify-between">
              <span className="text-sm font-medium">Copywriting</span>
              <Button variant="ghost" size="sm" onClick={handleCopyText}>
                <Copy className="w-3.5 h-3.5 mr-1" />
                Copier le texte
              </Button>
            </div>
            <div className="p-4 max-h-[300px] overflow-auto prose prose-sm max-w-none">
              {structuredContent ? (
                <StructuredContentDisplay content={structuredContent} pageType={pageType} />
              ) : (
                <ReactMarkdown>{generatedContent}</ReactMarkdown>
              )}
            </div>
          </Card>
        </div>
      ) : (
        /* Text-only preview */
        <Card className="overflow-hidden">
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
          <div className="p-4 max-h-[500px] overflow-auto prose prose-sm max-w-none">
            <ReactMarkdown>{generatedContent}</ReactMarkdown>
          </div>
        </Card>
      )}

      {/* Chat bar */}
      <FunnelChatBar
        onSendMessage={onChatMessage}
        onAccept={onAcceptChanges}
        onReject={onRejectChanges}
        isLoading={isChatLoading || isGenerating}
        hasPendingChanges={hasPendingChanges}
        messages={chatMessages}
      />

      {/* Save actions */}
      <div className="flex gap-2 flex-wrap justify-end">
        <Button variant="outline" size="sm" onClick={() => onSave("draft")} disabled={!title || isSaving}>
          <Save className="w-4 h-4 mr-1" />
          Enregistrer en brouillon
        </Button>
        <Button size="sm" onClick={() => onSave("published")} disabled={!title || isSaving}>
          <Send className="w-4 h-4 mr-1" />
          Publier
        </Button>
      </div>
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
