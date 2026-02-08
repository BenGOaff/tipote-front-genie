import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Check, Eye } from "lucide-react";
import { type SystemeTemplate, captureTemplates, salesTemplates } from "@/data/systemeTemplates";
import { generateTemplateHtml } from "@/data/funnelHtmlTemplates";

interface FunnelTemplateStepProps {
  onSelect: (template: SystemeTemplate) => void;
  onBack: () => void;
  selectedTemplate: SystemeTemplate | null;
}

export function FunnelTemplateStep({ onSelect, onBack, selectedTemplate }: FunnelTemplateStepProps) {
  const [tab, setTab] = useState<string>("capture");
  const [previewTemplate, setPreviewTemplate] = useState<SystemeTemplate | null>(null);

  const templates = tab === "capture" ? captureTemplates : salesTemplates;

  // Generate preview HTML for the selected preview template
  const previewHtml = previewTemplate
    ? generateTemplateHtml(
        previewTemplate.id,
        previewTemplate.type === "capture" ? "capture" : "sales"
      )
    : null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-1" />
          Retour
        </Button>
        <div>
          <h3 className="text-lg font-semibold">Choisis ton template</h3>
          <p className="text-sm text-muted-foreground">
            Clique sur un template pour voir l'aperçu, puis sélectionne-le.
          </p>
        </div>
      </div>

      {/* Preview modal inline */}
      {previewTemplate ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={() => setPreviewTemplate(null)}>
              <ArrowLeft className="w-4 h-4 mr-1" />
              Retour aux templates
            </Button>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{previewTemplate.name}</span>
              <Badge variant="outline" className="text-xs">
                {previewTemplate.type === "capture" ? "Capture" : "Vente"}
              </Badge>
            </div>
          </div>

          {/* Live HTML preview */}
          {previewHtml && (
            <Card className="overflow-hidden">
              <div className="p-3 border-b bg-muted/30 flex items-center justify-between">
                <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5" />
                  Aperçu du style (texte de démonstration)
                </span>
              </div>
              <div className="h-[450px]">
                <iframe
                  srcDoc={previewHtml}
                  title="Aperçu template"
                  className="w-full h-full border-0"
                  sandbox="allow-scripts"
                />
              </div>
            </Card>
          )}

          <div className="flex gap-3">
            <p className="text-sm text-muted-foreground flex-1">
              {previewTemplate.description}
            </p>
            <Button onClick={() => { onSelect(previewTemplate); setPreviewTemplate(null); }}>
              <Check className="w-4 h-4 mr-1" />
              Utiliser ce template
            </Button>
          </div>
        </div>
      ) : (
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="grid w-full max-w-xs grid-cols-2">
            <TabsTrigger value="capture">Capture ({captureTemplates.length})</TabsTrigger>
            <TabsTrigger value="sales">Vente ({salesTemplates.length})</TabsTrigger>
          </TabsList>

          <TabsContent value={tab} className="mt-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {templates.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setPreviewTemplate(t)}
                  className={`group text-left rounded-lg border overflow-hidden hover:ring-2 hover:ring-primary transition-all ${
                    selectedTemplate?.id === t.id ? "ring-2 ring-primary" : "bg-card"
                  }`}
                >
                  <div className="aspect-[4/3] overflow-hidden bg-muted">
                    <img
                      src={t.imageUrl}
                      alt={t.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3">
                    <div className="flex items-center gap-1.5">
                      <p className="font-semibold text-sm">{t.name}</p>
                      {selectedTemplate?.id === t.id && (
                        <Check className="w-3.5 h-3.5 text-primary" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{t.description}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {t.category.slice(0, 2).map((c) => (
                        <Badge key={c} variant="secondary" className="text-[10px] px-1.5 py-0">
                          {c}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
