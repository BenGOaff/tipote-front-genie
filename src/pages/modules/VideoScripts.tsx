import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Video, Sparkles, Lock, Settings, Youtube, Clock, FileText } from "lucide-react";

const VideoScripts = () => {
  const isActive = false;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        
        <main className="flex-1 overflow-auto bg-muted/30">
          <header className="h-16 border-b border-border flex items-center px-6 bg-background sticky top-0 z-10">
            <SidebarTrigger />
            <div className="ml-4 flex-1">
              <h1 className="text-xl font-display font-bold">Module : Scripts Vidéos</h1>
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
                    Activez le module Scripts Vidéos
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    Créez des scripts complets pour YouTube, TikTok, Reels Instagram. 
                    Incluant hook, contenu structuré, CTA et conseils de tournage.
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
                      <h3 className="text-lg font-bold">Plateforme cible</h3>
                    </div>

                    <RadioGroup defaultValue="youtube-long" className="space-y-3">
                      <label className="flex items-start gap-3 p-4 rounded-lg border border-border">
                        <RadioGroupItem value="youtube-long" id="youtube-long" className="mt-1" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <Youtube className="w-4 h-4 text-red-500" />
                            <p className="font-medium">YouTube format long</p>
                          </div>
                          <p className="text-sm text-muted-foreground">8-15 minutes</p>
                        </div>
                      </label>
                      <label className="flex items-start gap-3 p-4 rounded-lg border border-border">
                        <RadioGroupItem value="youtube-short" id="youtube-short" className="mt-1" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <Youtube className="w-4 h-4 text-red-500" />
                            <p className="font-medium">YouTube Shorts</p>
                          </div>
                          <p className="text-sm text-muted-foreground">30-60 secondes</p>
                        </div>
                      </label>
                      <label className="flex items-start gap-3 p-4 rounded-lg border border-border">
                        <RadioGroupItem value="tiktok" id="tiktok" className="mt-1" />
                        <div className="flex-1">
                          <p className="font-medium">TikTok</p>
                          <p className="text-sm text-muted-foreground">15-60 secondes</p>
                        </div>
                      </label>
                      <label className="flex items-start gap-3 p-4 rounded-lg border border-border">
                        <RadioGroupItem value="reel" id="reel" className="mt-1" />
                        <div className="flex-1">
                          <p className="font-medium">Reel Instagram</p>
                          <p className="text-sm text-muted-foreground">15-90 secondes</p>
                        </div>
                      </label>
                    </RadioGroup>
                  </Card>

                  <Card className="p-6">
                    <h3 className="text-lg font-bold mb-6">Paramètres du script</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Sujet de la vidéo</Label>
                        <Textarea
                          placeholder="Ex: 5 erreurs qui tuent votre engagement sur LinkedIn"
                          rows={2}
                          className="resize-none"
                          disabled
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Cible</Label>
                          <Input placeholder="Entrepreneurs débutants" disabled />
                        </div>
                        <div className="space-y-2">
                          <Label>Longueur</Label>
                          <Select defaultValue="medium" disabled>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="short">Court</SelectItem>
                              <SelectItem value="medium">Moyen</SelectItem>
                              <SelectItem value="long">Long</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6">
                    <Button variant="hero" className="w-full" disabled>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Générer le script complet
                    </Button>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card className="p-6">
                    <h3 className="font-bold mb-4">Ce qui sera généré</h3>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start gap-2">
                        <FileText className="w-4 h-4 text-primary mt-0.5" />
                        <span>Script complet structuré</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FileText className="w-4 h-4 text-primary mt-0.5" />
                        <span>Hook accrocheur</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FileText className="w-4 h-4 text-primary mt-0.5" />
                        <span>Description optimisée SEO</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Clock className="w-4 h-4 text-primary mt-0.5" />
                        <span>Timestamps suggérés</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Video className="w-4 h-4 text-primary mt-0.5" />
                        <span>Conseils de tournage</span>
                      </li>
                    </ul>
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

export default VideoScripts;
