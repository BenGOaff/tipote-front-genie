import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, ExternalLink } from "lucide-react";
import { type SystemeTemplate, captureTemplates, salesTemplates } from "@/data/systemeTemplates";

interface FunnelTemplateModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (template: SystemeTemplate) => void;
  filterType?: "capture" | "sales" | "blog";
}

export function FunnelTemplateModal({ open, onClose, onSelect, filterType }: FunnelTemplateModalProps) {
  const [previewTemplate, setPreviewTemplate] = useState<SystemeTemplate | null>(null);
  const [tab, setTab] = useState<string>(filterType || "capture");

  const templates = tab === "capture" ? captureTemplates : salesTemplates;

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Choisir un template</DialogTitle>
        </DialogHeader>

        {!previewTemplate ? (
          <>
            <Tabs value={tab} onValueChange={setTab} className="flex-1 overflow-hidden flex flex-col">
              <TabsList className="grid w-full max-w-xs grid-cols-2">
                <TabsTrigger value="capture">Capture ({captureTemplates.length})</TabsTrigger>
                <TabsTrigger value="sales">Vente ({salesTemplates.length})</TabsTrigger>
              </TabsList>

              <TabsContent value={tab} className="flex-1 overflow-auto mt-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {templates.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setPreviewTemplate(t)}
                      className="group text-left rounded-lg border bg-card overflow-hidden hover:ring-2 hover:ring-primary transition-all"
                    >
                      <div className="aspect-[4/3] overflow-hidden bg-muted">
                        <img
                          src={t.imageUrl}
                          alt={t.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-3">
                        <p className="font-semibold text-sm">{t.name}</p>
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
          </>
        ) : (
          <div className="flex-1 overflow-auto space-y-4">
            <Button variant="ghost" size="sm" onClick={() => setPreviewTemplate(null)}>
              ← Retour aux templates
            </Button>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-lg overflow-hidden border bg-muted">
                <img
                  src={previewTemplate.imageUrl}
                  alt={previewTemplate.name}
                  className="w-full h-auto"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold">{previewTemplate.name}</h3>
                  <Badge variant="outline" className="mt-1">
                    {previewTemplate.type === "capture" ? "Page de capture" : "Page de vente"}
                  </Badge>
                </div>

                <p className="text-sm text-muted-foreground">{previewTemplate.description}</p>

                <div>
                  <p className="text-sm font-medium mb-2">Inclus :</p>
                  <ul className="space-y-1">
                    {previewTemplate.features.map((f) => (
                      <li key={f} className="text-sm flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-primary" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-1">
                  {previewTemplate.category.map((c) => (
                    <Badge key={c} variant="secondary">{c}</Badge>
                  ))}
                </div>

                <div className="flex gap-2 pt-2">
                  <Button onClick={() => { onSelect(previewTemplate); onClose(); }} className="flex-1">
                    Utiliser ce template
                  </Button>
                  {previewTemplate.shareLink && (
                    <Button variant="outline" size="icon" asChild>
                      <a href={previewTemplate.shareLink} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
