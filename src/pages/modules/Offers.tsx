import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Package, Sparkles, Lock, Settings, Gift, BookOpen, CheckCircle2 } from "lucide-react";

const Offers = () => {
  const isActive = false;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        
        <main className="flex-1 overflow-auto bg-muted/30">
          <header className="h-16 border-b border-border flex items-center px-6 bg-background sticky top-0 z-10">
            <SidebarTrigger />
            <div className="ml-4 flex-1">
              <h1 className="text-xl font-display font-bold">Module : Création d'Offres</h1>
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
                    Activez le module Création d'Offres
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    Créez des lead magnets et formations complètes. L'IA propose 3 idées
                    basées sur votre onboarding, vous choisissez et personnalisez.
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
                      <h3 className="text-lg font-bold">Type d'offre à créer</h3>
                    </div>

                    <RadioGroup defaultValue="lead-magnet" className="space-y-3">
                      <label className="flex items-start gap-3 p-4 rounded-lg border border-border">
                        <RadioGroupItem value="lead-magnet" id="lead-magnet" className="mt-1" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <Gift className="w-4 h-4 text-primary" />
                            <p className="font-medium">Lead Magnet</p>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            PDF, checklist, template gratuit pour capturer des emails
                          </p>
                        </div>
                      </label>
                      <label className="flex items-start gap-3 p-4 rounded-lg border border-border">
                        <RadioGroupItem value="formation" id="formation" className="mt-1" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-primary" />
                            <p className="font-medium">Formation</p>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Cours structuré avec modules, leçons et exercices
                          </p>
                        </div>
                      </label>
                    </RadioGroup>
                  </Card>

                  <Card className="p-6">
                    <h3 className="text-lg font-bold mb-4">Données récupérées de l'onboarding</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between p-3 rounded-lg bg-muted/50">
                        <span className="text-sm text-muted-foreground">Niche</span>
                        <span className="font-medium">Marketing digital</span>
                      </div>
                      <div className="flex justify-between p-3 rounded-lg bg-muted/50">
                        <span className="text-sm text-muted-foreground">Persona</span>
                        <span className="font-medium">Entrepreneur 30-45 ans</span>
                      </div>
                      <div className="flex justify-between p-3 rounded-lg bg-muted/50">
                        <span className="text-sm text-muted-foreground">Objectifs</span>
                        <span className="font-medium">Automatisation, croissance</span>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6">
                    <h3 className="text-lg font-bold mb-4">L'IA va vous proposer 3 offres</h3>
                    <p className="text-muted-foreground mb-4">
                      Basées sur votre profil, persona et objectifs. Vous choisirez celle 
                      qui vous convient le mieux et pourrez la personnaliser.
                    </p>
                    <Button variant="hero" className="w-full" disabled>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Générer 3 propositions d'offres
                    </Button>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card className="p-6">
                    <h3 className="font-bold mb-4">Ce qui sera généré</h3>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5" />
                        <span>3 idées d'offres cohérentes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5" />
                        <span>Structure complète</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5" />
                        <span>Titres accrocheurs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5" />
                        <span>Points clés du contenu</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5" />
                        <span>Suggestions de prix</span>
                      </li>
                    </ul>
                  </Card>

                  <Card className="p-6 bg-muted/50">
                    <p className="text-sm text-muted-foreground">
                      <strong>Astuce :</strong> Après avoir créé votre offre, utilisez le module Funnels 
                      pour générer la page de capture associée.
                    </p>
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

export default Offers;
