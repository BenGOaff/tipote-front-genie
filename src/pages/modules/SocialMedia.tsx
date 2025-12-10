import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Share2, Sparkles, Instagram, Linkedin, Twitter, Youtube, CheckCircle2, Settings } from "lucide-react";

const SocialMedia = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        
        <main className="flex-1 overflow-auto bg-muted/30">
          <header className="h-16 border-b border-border flex items-center px-6 bg-background sticky top-0 z-10">
            <SidebarTrigger />
            <div className="ml-4 flex-1">
              <h1 className="text-xl font-display font-bold">Module : Réseaux Sociaux</h1>
            </div>
            <Badge className="bg-success text-success-foreground">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              Activé
            </Badge>
          </header>

          <div className="p-6 space-y-6 max-w-5xl mx-auto">
            {/* Module Info */}
            <Card className="p-6 gradient-hero border-border/50">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-background/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                  <Share2 className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-primary-foreground mb-2">
                    Générez du contenu pour vos réseaux sociaux
                  </h2>
                  <p className="text-primary-foreground/90">
                    Configurez vos préférences et laissez l'IA créer des posts engageants adaptés à votre audience.
                    Tous les contenus sont stockés dans le Content Hub.
                  </p>
                </div>
              </div>
            </Card>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Configuration */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Settings className="w-5 h-5 text-muted-foreground" />
                    <h3 className="text-lg font-bold">Configuration du module</h3>
                  </div>

                  <div className="space-y-6">
                    {/* Réseaux ciblés */}
                    <div className="space-y-3">
                      <Label>Réseaux ciblés (info seulement)</Label>
                      <div className="flex flex-wrap gap-3">
                        {[
                          { name: "LinkedIn", icon: Linkedin, checked: true },
                          { name: "Instagram", icon: Instagram, checked: true },
                          { name: "Twitter/X", icon: Twitter, checked: false },
                          { name: "YouTube", icon: Youtube, checked: false },
                        ].map((network) => (
                          <label
                            key={network.name}
                            className="flex items-center gap-2 p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer transition-colors"
                          >
                            <Checkbox defaultChecked={network.checked} />
                            <network.icon className="w-4 h-4" />
                            <span className="text-sm">{network.name}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Fréquence */}
                    <div className="space-y-2">
                      <Label htmlFor="frequency">Fréquence de publication</Label>
                      <Select defaultValue="5">
                        <SelectTrigger id="frequency">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3">3 fois par semaine</SelectItem>
                          <SelectItem value="5">5 fois par semaine</SelectItem>
                          <SelectItem value="7">Tous les jours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Ton */}
                    <div className="space-y-2">
                      <Label htmlFor="tone">Ton et style</Label>
                      <Textarea
                        id="tone"
                        placeholder="Décrivez votre ton de voix ou donnez des exemples d'entrepreneurs dont vous aimez le style..."
                        rows={3}
                        className="resize-none"
                      />
                    </div>

                    {/* Thèmes */}
                    <div className="space-y-3">
                      <Label>Thèmes des posts</Label>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "Éduquer",
                          "Vendre",
                          "Divertir",
                          "Sensibiliser",
                          "Storytelling",
                          "Preuve sociale",
                          "Behind the scene",
                        ].map((theme) => (
                          <label
                            key={theme}
                            className="flex items-center gap-2 px-3 py-2 rounded-full border border-border hover:bg-muted/50 cursor-pointer transition-colors text-sm"
                          >
                            <Checkbox defaultChecked={["Éduquer", "Vendre", "Storytelling"].includes(theme)} />
                            {theme}
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Flux RSS */}
                    <div className="space-y-2">
                      <Label htmlFor="rss">Flux RSS d'inspiration (optionnel)</Label>
                      <Input
                        id="rss"
                        placeholder="https://example.com/feed.xml"
                        type="url"
                      />
                      <p className="text-sm text-muted-foreground">
                        L'IA s'inspirera des actualités de ce flux pour créer du contenu pertinent
                      </p>
                    </div>

                    {/* Provider IA */}
                    <div className="space-y-2">
                      <Label htmlFor="provider">Provider IA</Label>
                      <Select defaultValue="openai">
                        <SelectTrigger id="provider">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="openai">OpenAI GPT-4</SelectItem>
                          <SelectItem value="claude">Claude 3</SelectItem>
                          <SelectItem value="gemini">Google Gemini</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-bold mb-4">Générer des posts</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="topic">Sujet spécifique (optionnel)</Label>
                      <Textarea
                        id="topic"
                        placeholder="Laissez vide pour que l'IA choisisse un thème parmi vos préférences..."
                        rows={2}
                        className="resize-none"
                      />
                    </div>
                    <div className="flex gap-3">
                      <Button variant="hero" className="flex-1">
                        <Sparkles className="w-4 h-4 mr-2" />
                        Générer 1 post
                      </Button>
                      <Button variant="outline">
                        Générer 5 posts
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Sidebar Stats */}
              <div className="space-y-6">
                <Card className="p-6">
                  <h3 className="font-bold mb-4">Statistiques</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Posts générés</span>
                      <span className="font-bold">47</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Posts publiés</span>
                      <span className="font-bold">32</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">En attente</span>
                      <span className="font-bold">15</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="font-bold mb-4">Derniers posts générés</h3>
                  <div className="space-y-3">
                    {[
                      { title: "5 stratégies IA pour...", network: "LinkedIn", date: "Il y a 2h" },
                      { title: "Comment j'ai doublé...", network: "Instagram", date: "Hier" },
                      { title: "Thread: Les erreurs à...", network: "Twitter/X", date: "Il y a 2j" },
                    ].map((post, i) => (
                      <div key={i} className="p-3 rounded-lg bg-muted/50 text-sm">
                        <p className="font-medium truncate">{post.title}</p>
                        <div className="flex justify-between mt-1 text-muted-foreground">
                          <span>{post.network}</span>
                          <span>{post.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="ghost" size="sm" className="w-full mt-3">
                    Voir tout dans Content Hub
                  </Button>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default SocialMedia;
