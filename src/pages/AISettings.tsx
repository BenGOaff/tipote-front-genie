import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Key, CheckCircle2, AlertCircle } from "lucide-react";

const AISettings = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        
        <main className="flex-1 overflow-auto bg-muted/30">
          <header className="h-16 border-b border-border flex items-center px-6 bg-background sticky top-0 z-10">
            <SidebarTrigger />
            <div className="ml-4">
              <h1 className="text-xl font-display font-bold">Paramètres IA</h1>
            </div>
          </header>

          <div className="p-6 space-y-6 max-w-4xl mx-auto">
            {/* Info Card */}
            <Card className="p-6 bg-primary/5 border-primary/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                  <Brain className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Configuration des clés API IA</h3>
                  <p className="text-muted-foreground mb-4">
                    Tipote™ utilise deux niveaux d'IA distincts pour optimiser les coûts et performances :
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">IA Niveau 1 - Stratégie</p>
                        <p className="text-sm text-muted-foreground">
                          Gérée par Tipote™ pour l'analyse business et la planification
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Key className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">IA Niveau 2 - Contenu</p>
                        <p className="text-sm text-muted-foreground">
                          Vos clés API pour générer posts, emails, articles (vous gardez le contrôle et la flexibilité)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* API Keys Configuration */}
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-6">Vos clés API de génération</h3>
              
              <Tabs defaultValue="openai" className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="openai">OpenAI</TabsTrigger>
                  <TabsTrigger value="claude">Claude</TabsTrigger>
                  <TabsTrigger value="gemini">Gemini</TabsTrigger>
                </TabsList>

                <TabsContent value="openai" className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/30">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5 text-success" />
                        </div>
                        <div>
                          <p className="font-medium">OpenAI GPT-4</p>
                          <p className="text-sm text-muted-foreground">Clé API configurée</p>
                        </div>
                      </div>
                      <Badge className="bg-success text-success-foreground">Connecté</Badge>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="openai-key">Clé API OpenAI</Label>
                      <div className="flex gap-2">
                        <Input
                          id="openai-key"
                          type="password"
                          placeholder="sk-..."
                          value="sk-••••••••••••••••••••••••"
                          className="flex-1"
                        />
                        <Button variant="outline">Modifier</Button>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Obtenez votre clé sur{" "}
                        <a href="https://platform.openai.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                          platform.openai.com
                        </a>
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-muted/50 border border-border">
                      <h4 className="font-medium mb-3">Utilisation ce mois-ci</h4>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Requêtes</p>
                          <p className="text-2xl font-bold">247</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Tokens</p>
                          <p className="text-2xl font-bold">125K</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Coût estimé</p>
                          <p className="text-2xl font-bold">$4.20</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="claude" className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg border border-dashed border-border bg-muted/20">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                        <AlertCircle className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">Claude AI (Anthropic)</p>
                        <p className="text-sm text-muted-foreground">Non configuré</p>
                      </div>
                    </div>
                    <Badge variant="outline">Non connecté</Badge>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="claude-key">Clé API Claude</Label>
                    <div className="flex gap-2">
                      <Input
                        id="claude-key"
                        type="password"
                        placeholder="sk-ant-..."
                        className="flex-1"
                      />
                      <Button variant="default">Connecter</Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Obtenez votre clé sur{" "}
                      <a href="https://console.anthropic.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        console.anthropic.com
                      </a>
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="gemini" className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg border border-dashed border-border bg-muted/20">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                        <AlertCircle className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">Google Gemini</p>
                        <p className="text-sm text-muted-foreground">Non configuré</p>
                      </div>
                    </div>
                    <Badge variant="outline">Non connecté</Badge>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gemini-key">Clé API Gemini</Label>
                    <div className="flex gap-2">
                      <Input
                        id="gemini-key"
                        type="password"
                        placeholder="AIza..."
                        className="flex-1"
                      />
                      <Button variant="default">Connecter</Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Obtenez votre clé sur{" "}
                      <a href="https://makersuite.google.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        makersuite.google.com
                      </a>
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>

            {/* Preferences */}
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-6">Préférences de génération</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium">Modèle par défaut</p>
                    <p className="text-sm text-muted-foreground">OpenAI GPT-4</p>
                  </div>
                  <Button variant="outline" size="sm">Changer</Button>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium">Ton de voix</p>
                    <p className="text-sm text-muted-foreground">Professionnel et engageant</p>
                  </div>
                  <Button variant="outline" size="sm">Modifier</Button>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium">Langue principale</p>
                    <p className="text-sm text-muted-foreground">Français</p>
                  </div>
                  <Button variant="outline" size="sm">Modifier</Button>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AISettings;
