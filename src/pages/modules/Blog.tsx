import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { PenTool, Sparkles, Lock, Settings, Search, Link } from "lucide-react";

const Blog = () => {
  const isActive = false; // Module non activé

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        
        <main className="flex-1 overflow-auto bg-muted/30">
          <header className="h-16 border-b border-border flex items-center px-6 bg-background sticky top-0 z-10">
            <SidebarTrigger />
            <div className="ml-4 flex-1">
              <h1 className="text-xl font-display font-bold">Module : Blog</h1>
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
                    Activez le module Blog
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    Créez des articles de blog optimisés SEO, avec titres, méta descriptions, 
                    et mots-clés longue traîne. Parfait pour améliorer votre visibilité.
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

            {/* Preview of module features */}
            <div className="opacity-50 pointer-events-none">
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <Card className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <Settings className="w-5 h-5 text-muted-foreground" />
                      <h3 className="text-lg font-bold">Configuration</h3>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Fréquence de publication</Label>
                        <Select defaultValue="weekly" disabled>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="weekly">1 article par semaine</SelectItem>
                            <SelectItem value="biweekly">2 articles par semaine</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Thèmes SEO et mots-clés</Label>
                        <Textarea
                          placeholder="Ex: marketing digital, stratégie de contenu, automatisation..."
                          rows={3}
                          className="resize-none"
                          disabled
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Liens à placer (optionnel)</Label>
                        <div className="flex gap-2">
                          <Input placeholder="URL de votre offre, lead magnet..." disabled />
                          <Button variant="outline" disabled>
                            <Link className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>CMS cible (info seulement)</Label>
                        <Select defaultValue="wordpress" disabled>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="wordpress">WordPress</SelectItem>
                            <SelectItem value="systeme">Systeme.io</SelectItem>
                            <SelectItem value="other">Autre</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6">
                    <h3 className="text-lg font-bold mb-4">Générer un article</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Sujet de l'article</Label>
                        <Input placeholder="Ex: Comment créer une stratégie de contenu efficace en 2025" disabled />
                      </div>
                      <Button variant="hero" className="w-full" disabled>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Générer l'article complet
                      </Button>
                    </div>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card className="p-6">
                    <h3 className="font-bold mb-4">Ce qui sera généré</h3>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start gap-2">
                        <Search className="w-4 h-4 text-primary mt-0.5" />
                        <span>Titre optimisé SEO</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Search className="w-4 h-4 text-primary mt-0.5" />
                        <span>Méta description</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Search className="w-4 h-4 text-primary mt-0.5" />
                        <span>10 mots-clés + longue traîne</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <PenTool className="w-4 h-4 text-primary mt-0.5" />
                        <span>Article avec balises H1, H2...</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <PenTool className="w-4 h-4 text-primary mt-0.5" />
                        <span>Mots-clés en gras</span>
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

export default Blog;
