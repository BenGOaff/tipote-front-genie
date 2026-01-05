import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Wand2, RefreshCw, Save, Calendar, Send, X } from "lucide-react";

interface ArticleFormProps {
  onGenerate: (params: any) => Promise<string>;
  onSave: (data: any) => Promise<void>;
  onClose: () => void;
  isGenerating: boolean;
  isSaving: boolean;
}

export function ArticleForm({ onGenerate, onSave, onClose, isGenerating, isSaving }: ArticleFormProps) {
  const [subject, setSubject] = useState("");
  const [seoKeyword, setSeoKeyword] = useState("");
  const [links, setLinks] = useState("");
  const [cta, setCta] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [title, setTitle] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");

  const handleGenerate = async () => {
    const content = await onGenerate({
      type: "article",
      subject,
      seoKeyword,
      links: links || undefined,
      cta,
    });
    if (content) {
      setGeneratedContent(content);
      if (!title) setTitle(subject || seoKeyword);
    }
  };

  const handleSave = async (status: "draft" | "scheduled" | "published") => {
    await onSave({
      title,
      content: generatedContent,
      type: "article",
      platform: "blog",
      status,
      scheduled_at: scheduledAt || undefined,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Article de Blog</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-5 h-5" />
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Sujet ou mot-clé SEO *</Label>
            <Input
              placeholder="Ex: Comment augmenter son trafic organique"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Mot-clé SEO principal</Label>
            <Input
              placeholder="Ex: trafic organique"
              value={seoKeyword}
              onChange={(e) => setSeoKeyword(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Liens à placer (optionnel)</Label>
            <Input
              placeholder="https://... (séparés par des virgules)"
              value={links}
              onChange={(e) => setLinks(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>CTA final</Label>
            <Input
              placeholder="Ex: Téléchargez notre guide gratuit"
              value={cta}
              onChange={(e) => setCta(e.target.value)}
            />
          </div>

          <Button onClick={handleGenerate} disabled={isGenerating || !subject} className="w-full">
            {isGenerating ? (
              <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Génération...</>
            ) : (
              <><Wand2 className="w-4 h-4 mr-2" />Générer (titre SEO + meta + mots-clés + article)</>
            )}
          </Button>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Titre (pour sauvegarde)</Label>
            <Input
              placeholder="Titre de votre article"
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
              placeholder="Le contenu généré apparaîtra ici (titre SEO, meta description, mots-clés, article H1/H2...)..."
              className="resize-none"
            />
          </div>

          {generatedContent && (
            <>
              <div className="space-y-2">
                <Label>Planifier pour</Label>
                <Input
                  type="datetime-local"
                  value={scheduledAt}
                  onChange={(e) => setScheduledAt(e.target.value)}
                />
              </div>

              <div className="flex gap-2 flex-wrap">
                <Button variant="outline" size="sm" onClick={handleGenerate} disabled={isGenerating}>
                  <RefreshCw className="w-4 h-4 mr-1" />Régénérer
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleSave("draft")} disabled={!title || isSaving}>
                  <Save className="w-4 h-4 mr-1" />Brouillon
                </Button>
                {scheduledAt && (
                  <Button variant="secondary" size="sm" onClick={() => handleSave("scheduled")} disabled={!title || isSaving}>
                    <Calendar className="w-4 h-4 mr-1" />Planifier
                  </Button>
                )}
                <Button size="sm" onClick={() => handleSave("published")} disabled={!title || isSaving}>
                  <Send className="w-4 h-4 mr-1" />Publier
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
