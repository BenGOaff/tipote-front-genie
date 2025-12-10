import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Layers, Sparkles, Lock, Settings, FileText, Download, ExternalLink } from "lucide-react";

const Funnels = () => {
  const isActive = false;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        
        <main className="flex-1 overflow-auto bg-muted/30">
          <header className="h-16 border-b border-border flex items-center px-6 bg-background sticky top-0 z-10">
            <SidebarTrigger />
            <div className="ml-4 flex-1">
              <h1 className="text-xl font-display font-bold">Module : Funnels</h1>
            </div>
            <Badge variant="outline" className="text-muted-foreground">
              <Lock className="w-3 h-3 mr-1" />
              Non activé
            </Badge>
          </header>

          <div className="p-6 space-y-6 max-w-5xl mx-auto">
            {/* Activation Banner */}
            <Card className="p-6 border-2 border-dashed border-primary/30 bg-primary/5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Lock className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold mb-2">
                    Activez le module Funnels
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    Générez le copywriting complet de vos pages de capture et de vente.
                    Récupère automatiquement les données de votre onboarding et offres créées.
                  </p>
                  <div className="flex gap-3">
                    <Button variant="hero">
                      Activer ce module
                    </Button>
                    <Button variant="outline">
                      En savoir plus
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Preview */}
            <div className="opacity-50 pointer-events-none">
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <Card className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <Settings className="w-5 h-5 text-muted-foreground" />
                      <h3 className="text-lg font-bold">Type de page</h3>
                    </div>

                    <RadioGroup defaultValue="capture" className="space-y-3">
                      <label className="flex items-start gap-3 p-4 rounded-lg border border-border">
                        <RadioGroupItem value="capture" id="capture" className="mt-1" />
                        <div className="flex-1">
                          <p className="font-medium">Page de capture</p>
                          <p className="text-sm text-muted-foreground">
                            Pour collecter des emails en échange d'un lead magnet
                          </p>
                        </div>
                      </label>
                      <label className="flex items-start gap-3 p-4 rounded-lg border border-border">
                        <RadioGroupItem value="sales" id="sales" className="mt-1" />
                        <div className="flex-1">
                          <p className="font-medium">Page de vente</p>
                          <p className="text-sm text-muted-foreground">
                            Pour vendre une offre low/middle/high ticket
                          </p>
                        </div>
                      </label>
                    </RadioGroup>
                  </Card>

                  <Card className="p-6">
                    <h3 className="text-lg font-bold mb-6">Informations de l'offre</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Auto-rempli si vous avez créé une offre dans le module Création d'offres
                    </p>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Pitch clair de l'offre</Label>
                        <Textarea
                          placeholder="Décrivez votre offre en 1-2 phrases..."
                          rows={2}
                          className="resize-none"
                          disabled
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Bénéfices clés (3-5)</Label>
                        <Textarea
                          placeholder="Liste des principaux bénéfices..."
                          rows={3}
                          className="resize-none"
                          disabled
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Prix</Label>
                          <Input placeholder="497€" disabled />
                        </div>
                        <div className="space-y-2">
                          <Label>Urgence</Label>
                          <Input placeholder="Offre de lancement -50%" disabled />
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6">
                    <Button variant="hero" className="w-full" disabled>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Générer le copywriting complet
                    </Button>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card className="p-6">
                    <h3 className="font-bold mb-4">Ce qui sera généré</h3>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start gap-2">
                        <FileText className="w-4 h-4 text-primary mt-0.5" />
                        <span>Headline accrocheur</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FileText className="w-4 h-4 text-primary mt-0.5" />
                        <span>Sous-titres persuasifs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FileText className="w-4 h-4 text-primary mt-0.5" />
                        <span>Sections copywritées</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FileText className="w-4 h-4 text-primary mt-0.5" />
                        <span>Bullet points bénéfices</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FileText className="w-4 h-4 text-primary mt-0.5" />
                        <span>CTA optimisés</span>
                      </li>
                    </ul>
                  </Card>

                  <Card className="p-6">
                    <h3 className="font-bold mb-4">Templates Systeme.io</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Téléchargez nos templates prêts à l'emploi
                    </p>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full justify-start" disabled>
                        <Download className="w-4 h-4 mr-2" />
                        Template capture page
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start" disabled>
                        <Download className="w-4 h-4 mr-2" />
                        Template sales page
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start" disabled>
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Voir tous les templates
                      </Button>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Funnels;
