import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Sparkles, 
  Copy, 
  Download, 
  RefreshCw, 
  Send,
  Share2,
  Mail,
  PenTool,
  Video,
  Package,
  Layers,
  ArrowLeft
} from "lucide-react";
import { useState } from "react";

type ContentType = "social" | "email" | "blog" | "video" | "offer" | "funnel" | null;

const contentTypes = [
  { 
    id: "social" as const, 
    title: "Réseaux sociaux", 
    description: "Posts LinkedIn, Instagram, Twitter...", 
    icon: Share2,
    color: "gradient-primary"
  },
  { 
    id: "email" as const, 
    title: "Email", 
    description: "Newsletters, séquences, campaigns...", 
    icon: Mail,
    color: "gradient-secondary"
  },
  { 
    id: "blog" as const, 
    title: "Blog", 
    description: "Articles, guides, tutoriels...", 
    icon: PenTool,
    color: "gradient-primary"
  },
  { 
    id: "video" as const, 
    title: "Scripts vidéo", 
    description: "YouTube, Reels, TikTok...", 
    icon: Video,
    color: "gradient-secondary"
  },
  { 
    id: "offer" as const, 
    title: "Offres", 
    description: "Pages de vente, descriptions...", 
    icon: Package,
    color: "gradient-primary"
  },
  { 
    id: "funnel" as const, 
    title: "Funnels", 
    description: "Tunnels de vente complets...", 
    icon: Layers,
    color: "gradient-secondary"
  },
];

const Create = () => {
  const [selectedType, setSelectedType] = useState<ContentType>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedContent(
        "🚀 Transformez votre business avec l'IA en 2025\n\n" +
        "L'intelligence artificielle n'est plus une option - c'est une nécessité pour rester compétitif.\n\n" +
        "Voici 3 façons d'intégrer l'IA dans votre stratégie dès aujourd'hui :\n\n" +
        "✅ Automatisez la création de contenu pour gagner 10h/semaine\n" +
        "✅ Personnalisez vos emails pour doubler votre taux d'ouverture\n" +
        "✅ Analysez vos données pour prendre de meilleures décisions\n\n" +
        "Et vous, comment utilisez-vous l'IA dans votre business ?\n\n" +
        "#IA #Business #Automatisation #Productivité"
      );
      setIsGenerating(false);
    }, 2000);
  };

  const handleBack = () => {
    setSelectedType(null);
    setGeneratedContent("");
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        
        <main className="flex-1 overflow-auto bg-muted/30">
          <header className="h-16 border-b border-border flex items-center px-6 bg-background sticky top-0 z-10">
            <SidebarTrigger />
            <div className="ml-4 flex-1 flex items-center gap-4">
              {selectedType && (
                <Button variant="ghost" size="icon" onClick={handleBack}>
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              )}
              <h1 className="text-xl font-display font-bold">Créer</h1>
            </div>
            <Badge className="gradient-primary text-primary-foreground">
              <Sparkles className="w-3 h-3 mr-1" />
              Propulsé par IA
            </Badge>
          </header>

          <div className="p-6 space-y-6 max-w-6xl mx-auto">
            {!selectedType ? (
              <>
                {/* Content Type Selection */}
                <Card className="p-6 gradient-hero border-border/50">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-background/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                      <Brain className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-primary-foreground mb-2">
                        Quel type de contenu souhaitez-vous créer ?
                      </h2>
                      <p className="text-primary-foreground/90">
                        Sélectionnez un type ci-dessous et l'IA utilisera vos paramètres d'onboarding 
                        pour générer du contenu parfaitement aligné avec votre stratégie
                      </p>
                    </div>
                  </div>
                </Card>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {contentTypes.map((type) => (
                    <Card 
                      key={type.id}
                      className="p-6 cursor-pointer hover:shadow-lg transition-all group border-2 border-transparent hover:border-primary/20"
                      onClick={() => setSelectedType(type.id)}
                    >
                      <div className={`w-12 h-12 rounded-xl ${type.color} flex items-center justify-center mb-4`}>
                        <type.icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                        {type.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {type.description}
                      </p>
                    </Card>
                  ))}
                </div>

                {/* Quick Templates */}
                <Card className="p-6">
                  <h3 className="text-lg font-bold mb-6">Templates rapides</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {[
                      { title: "Post Engagement", description: "Question pour engager votre audience", icon: "💬" },
                      { title: "Témoignage Client", description: "Mise en avant d'un succès client", icon: "⭐" },
                      { title: "Conseil Expert", description: "Partage d'expertise et de valeur", icon: "💡" },
                      { title: "Annonce Produit", description: "Lancement ou promotion d'offre", icon: "🚀" },
                      { title: "Behind The Scenes", description: "Coulisses de votre business", icon: "🎬" },
                      { title: "Call To Action", description: "Invitation à l'action claire", icon: "👉" },
                    ].map((template, i) => (
                      <button
                        key={i}
                        className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors text-left group"
                        onClick={() => setSelectedType("social")}
                      >
                        <div className="text-3xl mb-3">{template.icon}</div>
                        <h4 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                          {template.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">{template.description}</p>
                      </button>
                    ))}
                  </div>
                </Card>
              </>
            ) : (
              /* Generator Interface */
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Input Section */}
                <Card className="p-6">
                  <h3 className="text-lg font-bold mb-6">Paramètres de génération</h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="content-type">Type de contenu</Label>
                      <Select defaultValue={selectedType === "social" ? "post-linkedin" : selectedType || ""}>
                        <SelectTrigger id="content-type">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {selectedType === "social" && (
                            <>
                              <SelectItem value="post-linkedin">Post LinkedIn</SelectItem>
                              <SelectItem value="post-instagram">Post Instagram</SelectItem>
                              <SelectItem value="post-twitter">Post Twitter/X</SelectItem>
                            </>
                          )}
                          {selectedType === "email" && (
                            <>
                              <SelectItem value="newsletter">Newsletter</SelectItem>
                              <SelectItem value="sequence">Email de séquence</SelectItem>
                              <SelectItem value="promo">Email promotionnel</SelectItem>
                            </>
                          )}
                          {selectedType === "blog" && (
                            <>
                              <SelectItem value="article">Article complet</SelectItem>
                              <SelectItem value="guide">Guide pratique</SelectItem>
                              <SelectItem value="listicle">Liste / Listicle</SelectItem>
                            </>
                          )}
                          {selectedType === "video" && (
                            <>
                              <SelectItem value="youtube">Script YouTube</SelectItem>
                              <SelectItem value="reel">Script Reel/Short</SelectItem>
                              <SelectItem value="webinar">Script Webinar</SelectItem>
                            </>
                          )}
                          {selectedType === "offer" && (
                            <>
                              <SelectItem value="sales-page">Page de vente</SelectItem>
                              <SelectItem value="product-desc">Description produit</SelectItem>
                              <SelectItem value="landing">Landing page</SelectItem>
                            </>
                          )}
                          {selectedType === "funnel" && (
                            <>
                              <SelectItem value="lead-magnet">Funnel lead magnet</SelectItem>
                              <SelectItem value="webinar-funnel">Funnel webinar</SelectItem>
                              <SelectItem value="sales-funnel">Funnel de vente</SelectItem>
                            </>
                          )}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tone">Ton de voix</Label>
                      <Select defaultValue="professional">
                        <SelectTrigger id="tone">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="professional">Professionnel</SelectItem>
                          <SelectItem value="friendly">Amical</SelectItem>
                          <SelectItem value="inspiring">Inspirant</SelectItem>
                          <SelectItem value="educational">Éducatif</SelectItem>
                          <SelectItem value="casual">Décontracté</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="topic">Sujet / Instructions</Label>
                      <Textarea
                        id="topic"
                        placeholder="Ex: Écris un post sur l'importance de l'IA dans le marketing digital, avec 3 conseils pratiques..."
                        rows={6}
                        className="resize-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="keywords">Mots-clés (optionnel)</Label>
                      <Textarea
                        id="keywords"
                        placeholder="Séparez les mots-clés par des virgules"
                        rows={2}
                        className="resize-none"
                      />
                    </div>

                    <Button 
                      variant="hero" 
                      className="w-full" 
                      size="lg"
                      onClick={handleGenerate}
                      disabled={isGenerating}
                    >
                      {isGenerating ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          Génération en cours...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          Générer le contenu
                        </>
                      )}
                    </Button>
                  </div>
                </Card>

                {/* Output Section */}
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold">Contenu généré</h3>
                    {generatedContent && (
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Copy className="w-4 h-4 mr-2" />
                          Copier
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Export
                        </Button>
                      </div>
                    )}
                  </div>

                  {generatedContent ? (
                    <div className="space-y-4">
                      <Textarea
                        value={generatedContent}
                        onChange={(e) => setGeneratedContent(e.target.value)}
                        rows={16}
                        className="resize-none font-mono text-sm"
                      />
                      
                      <div className="flex gap-2">
                        <Button variant="default" className="flex-1">
                          <Send className="w-4 h-4 mr-2" />
                          Ajouter à mes contenus
                        </Button>
                        <Button variant="outline" onClick={handleGenerate}>
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Régénérer
                        </Button>
                      </div>

                      <div className="p-4 rounded-lg bg-muted/50 border border-border">
                        <p className="text-sm text-muted-foreground mb-2">Statistiques</p>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <p className="text-xs text-muted-foreground">Caractères</p>
                            <p className="text-lg font-bold">{generatedContent.length}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Mots</p>
                            <p className="text-lg font-bold">{generatedContent.split(/\s+/).length}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Hashtags</p>
                            <p className="text-lg font-bold">
                              {(generatedContent.match(/#/g) || []).length}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-[500px] text-center">
                      <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mb-4">
                        <Sparkles className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <h4 className="font-semibold text-lg mb-2">Prêt à créer</h4>
                      <p className="text-muted-foreground max-w-sm">
                        Configurez vos paramètres et cliquez sur "Générer" pour créer du contenu avec l'IA
                      </p>
                    </div>
                  )}
                </Card>
              </div>
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Create;