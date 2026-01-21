import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  User, Key, CreditCard, Globe, Brain, CheckCircle2, AlertCircle, 
  ExternalLink, Lock, Save, Linkedin, Instagram, Youtube, Link, AlertTriangle, RotateCcw
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isResetting, setIsResetting] = useState(false);

  const handleResetAccount = async () => {
    if (!user) return;
    
    setIsResetting(true);
    try {
      // Delete all user contents
      await supabase.from("contents").delete().eq("user_id", user.id);
      
      // Delete all user tasks
      await supabase.from("tasks").delete().eq("user_id", user.id);
      
      // Delete all user metrics
      await supabase.from("metrics").delete().eq("user_id", user.id);
      
      // Reset profile to initial state
      await supabase.from("profiles").update({
        onboarding_completed: false,
        has_offers: false,
        offers: [],
        social_links: [],
        selected_pyramid: null,
        pyramid_selected_at: null,
        tutorial_completed: false,
        tutorial_context_flags: {},
        tutorial_step: null,
        weekly_time: null,
        financial_goal: null,
        psychological_goal: null,
        content_preference: null,
        preferred_tone: null,
        first_name: null,
        age_range: null,
        gender: null,
        country: null,
        business_type: null,
        maturity: null,
        audience_size: null,
        preferred_tones: null,
        offer_price: null,
        offer_sales_count: null,
        mission_statement: null,
        biggest_blocker: null,
        social_audience: null,
        email_list_size: null,
        weekly_hours: null,
        main_goal_90_days: null,
        main_goals: null,
        unique_value: null,
        untapped_strength: null,
        biggest_challenge: null,
        niche: null,
        persona: null,
        success_definition: null,
        client_feedback: null,
        communication_style: null,
        tools_used: null,
      }).eq("user_id", user.id);

      toast({
        title: "Compte réinitialisé",
        description: "Ton Tipote a été remis à zéro. Tu vas être redirigé vers l'onboarding.",
      });

      // Redirect to onboarding
      navigate("/onboarding");
    } catch (error) {
      console.error("Error resetting account:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la réinitialisation.",
        variant: "destructive",
      });
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        
        <main className="flex-1 overflow-auto bg-muted/30">
          <header className="h-16 border-b border-border flex items-center px-6 bg-background sticky top-0 z-10">
            <SidebarTrigger />
            <div className="ml-4">
              <h1 className="text-xl font-display font-bold">Paramètres</h1>
            </div>
          </header>

          <div className="p-6 max-w-5xl mx-auto">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="mb-6 flex-wrap h-auto gap-1">
                <TabsTrigger value="profile" className="gap-2">
                  <User className="w-4 h-4" />
                  Profil
                </TabsTrigger>
                <TabsTrigger value="settings" className="gap-2">
                  <Globe className="w-4 h-4" />
                  Réglages
                </TabsTrigger>
                <TabsTrigger value="ai" className="gap-2">
                  <Brain className="w-4 h-4" />
                  IA & API
                </TabsTrigger>
                <TabsTrigger value="pricing" className="gap-2">
                  <CreditCard className="w-4 h-4" />
                  Abonnement
                </TabsTrigger>
              </TabsList>

              {/* PROFIL */}
              <TabsContent value="profile" className="space-y-6">
                <Card className="p-6">
                  <h3 className="text-lg font-bold mb-6">Informations personnelles</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" value="utilisateur@email.com" disabled />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="name">Prénom</Label>
                      <Input id="name" defaultValue="Marie" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Mot de passe</Label>
                      <div className="flex gap-2">
                        <Input id="password" type="password" value="••••••••" disabled className="flex-1" />
                        <Button variant="outline">Modifier</Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Fuseau horaire</Label>
                      <Select defaultValue="europe-paris">
                        <SelectTrigger id="timezone">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="europe-paris">Europe/Paris (UTC+1)</SelectItem>
                          <SelectItem value="europe-london">Europe/London (UTC)</SelectItem>
                          <SelectItem value="america-new-york">America/New_York (UTC-5)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button className="mt-6">
                    <Save className="w-4 h-4 mr-2" />
                    Enregistrer
                  </Button>
                </Card>

                {/* Zone Danger */}
                <Card className="p-6 border-destructive/50 bg-destructive/5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5 text-destructive" />
                    </div>
                    <h3 className="text-lg font-bold text-destructive">Zone danger</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium mb-2">Réinitialiser mon Tipote</p>
                      <p className="text-sm text-muted-foreground mb-4">
                        Tu as changé de voie ou tu t'es perdu en cours de route ? Tu veux repartir à zéro avec ton Tipote et le lancer dans une autre direction ? Clique sur ce bouton. <strong>Attention :</strong> tous les contenus, toutes les tâches et toutes les personnalisations créés depuis ton arrivée seront effacés, tu repartiras de zéro. C'est définitif, tu ne pourras pas revenir en arrière.
                      </p>
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" className="gap-2">
                            <RotateCcw className="w-4 h-4" />
                            Réinitialiser mon Tipote
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle className="flex items-center gap-2 text-destructive">
                              <AlertTriangle className="w-5 h-5" />
                              Réinitialiser mon Tipote ?
                            </AlertDialogTitle>
                            <AlertDialogDescription className="space-y-2">
                              <p>
                                Cette action est <strong>irréversible</strong>. Tu vas perdre :
                              </p>
                              <ul className="list-disc list-inside space-y-1 text-sm">
                                <li>Tous tes contenus créés</li>
                                <li>Toutes tes tâches</li>
                                <li>Tes métriques et analyses</li>
                                <li>Ta stratégie et ta pyramide d'offres</li>
                                <li>Toutes tes personnalisations</li>
                              </ul>
                              <p className="pt-2">
                                Tu devras refaire l'onboarding pour reconfigurer ton Tipote.
                              </p>
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={handleResetAccount}
                              disabled={isResetting}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              {isResetting ? "Réinitialisation..." : "Oui, réinitialiser"}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* RÉGLAGES */}
              <TabsContent value="settings" className="space-y-6">
                <Card className="p-6">
                  <h3 className="text-lg font-bold mb-6">Langue et contenu</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Langue de l'application</Label>
                      <Select defaultValue="fr">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fr">Français</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Langue du contenu généré</Label>
                      <Select defaultValue="fr">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fr">Français</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Forme d'adresse par défaut</Label>
                      <Select defaultValue="tu">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tu">Tutoiement (Tu)</SelectItem>
                          <SelectItem value="vous">Vouvoiement (Vous)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-bold mb-6">Niche et Persona</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Généré automatiquement après l'onboarding. Tu peux le modifier ici.
                  </p>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Résumé de votre niche</Label>
                      <Textarea
                        defaultValue="Marketing digital pour entrepreneurs et freelances souhaitant automatiser leur présence en ligne."
                        rows={2}
                        className="resize-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Résumé de votre persona</Label>
                      <Textarea
                        defaultValue="Entrepreneur digital 30-45 ans, qui manque de temps pour créer du contenu régulièrement. Veut automatiser sans perdre en authenticité."
                        rows={3}
                        className="resize-none"
                      />
                    </div>
                  </div>
                  <Button variant="outline" className="mt-4">
                    <Save className="w-4 h-4 mr-2" />
                    Mettre à jour
                  </Button>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-bold mb-6">Liens et réseaux</h3>
                  <div className="space-y-4">
                    {[
                      { label: "LinkedIn", icon: Linkedin, placeholder: "https://linkedin.com/in/..." },
                      { label: "Instagram", icon: Instagram, placeholder: "https://instagram.com/..." },
                      { label: "YouTube", icon: Youtube, placeholder: "https://youtube.com/@..." },
                      { label: "Blog", icon: Link, placeholder: "https://monblog.com" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center gap-3">
                        <item.icon className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                        <Input placeholder={item.placeholder} className="flex-1" />
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="mt-4">
                    <Save className="w-4 h-4 mr-2" />
                    Enregistrer les liens
                  </Button>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-bold mb-6">Liste des offres</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Ajoute tes offres pour les utiliser dans les modules de génération.
                  </p>
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <Input placeholder="Nom de l'offre" className="flex-1" />
                      <Input placeholder="Prix" className="w-24" />
                      <Input placeholder="Lien" className="flex-1" />
                      <Button variant="outline" size="icon">+</Button>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* IA & API */}
              <TabsContent value="ai" className="space-y-6">
                <Card className="p-6 bg-primary/5 border-primary/20">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                      <Brain className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">Configuration des clés API IA</h3>
                      <p className="text-muted-foreground text-sm">
                        <strong>IA Niveau 1 (Stratégie) :</strong> Gérée par Tipote™<br />
                        <strong>IA Niveau 2 (Contenu) :</strong> Vos clés API personnelles
                      </p>
                    </div>
                  </div>
                </Card>

                {/* OpenAI */}
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-success" />
                      </div>
                      <div>
                        <p className="font-medium">OpenAI GPT-4</p>
                        <p className="text-sm text-muted-foreground">Clé configurée</p>
                      </div>
                    </div>
                    <Badge className="bg-success text-success-foreground">Connecté</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Input type="password" value="sk-••••••••••••••••••••••••" className="flex-1" />
                    <Button variant="outline">Modifier</Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    <a href="https://platform.openai.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      Obtenir une clé sur platform.openai.com <ExternalLink className="w-3 h-3 inline" />
                    </a>
                  </p>
                </Card>

                {/* Claude */}
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                        <AlertCircle className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">Claude (Anthropic)</p>
                        <p className="text-sm text-muted-foreground">Non configuré</p>
                      </div>
                    </div>
                    <Badge variant="outline">Non connecté</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Input type="password" placeholder="sk-ant-..." className="flex-1" />
                    <Button>Connecter</Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    <a href="https://console.anthropic.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      Obtenir une clé sur console.anthropic.com <ExternalLink className="w-3 h-3 inline" />
                    </a>
                  </p>
                </Card>

                {/* Gemini */}
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
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
                  <div className="flex gap-2">
                    <Input type="password" placeholder="AIza..." className="flex-1" />
                    <Button>Connecter</Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    <a href="https://makersuite.google.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      Obtenir une clé sur makersuite.google.com <ExternalLink className="w-3 h-3 inline" />
                    </a>
                  </p>
                </Card>

                {/* Perplexity */}
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                        <AlertCircle className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">Perplexity</p>
                        <p className="text-sm text-muted-foreground">Pour sourcing et actualités</p>
                      </div>
                    </div>
                    <Badge variant="outline">Non connecté</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Input type="password" placeholder="pplx-..." className="flex-1" />
                    <Button>Connecter</Button>
                  </div>
                </Card>

                {/* Systeme.io API */}
                <Card className="p-6">
                  <h3 className="text-lg font-bold mb-4">API Systeme.io</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Connecte ton compte Systeme.io pour synchroniser tes contacts et ventes.
                  </p>
                  <div className="flex gap-2">
                    <Input type="password" placeholder="Votre clé API Systeme.io" className="flex-1" />
                    <Button>Connecter</Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    <a href="https://systeme.io/dashboard/api" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      Trouver votre clé dans Systeme.io <ExternalLink className="w-3 h-3 inline" />
                    </a>
                  </p>
                </Card>
              </TabsContent>

              {/* ABONNEMENT */}
              <TabsContent value="pricing" className="space-y-6">
                <Card className="p-6 gradient-hero border-border/50">
                  <div className="flex items-start justify-between">
                    <div>
                      <Badge className="mb-2 bg-background/20 text-primary-foreground">Plan actuel</Badge>
                      <h2 className="text-2xl font-bold text-primary-foreground mb-1">Essential</h2>
                      <p className="text-primary-foreground/80">3 modules • Coach IA • Content Hub</p>
                    </div>
                    <p className="text-3xl font-bold text-primary-foreground">49€<span className="text-lg font-normal">/mois</span></p>
                  </div>
                </Card>

                <div className="grid md:grid-cols-3 gap-6">
                  {/* Basic */}
                  <Card className="p-6">
                    <h3 className="font-bold text-lg mb-2">Basic</h3>
                    <p className="text-3xl font-bold mb-4">19€<span className="text-sm font-normal text-muted-foreground">/mois</span></p>
                    <ul className="space-y-2 text-sm mb-6">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-success" />
                        Plan stratégique IA
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-success" />
                        1 module activable
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-success" />
                        Contenus illimités
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-success" />
                        Content Hub + Calendrier
                      </li>
                      <li className="flex items-center gap-2 text-muted-foreground">
                        <Lock className="w-4 h-4" />
                        Pas de coach IA
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full">Downgrader</Button>
                  </Card>

                  {/* Essential */}
                  <Card className="p-6 border-2 border-primary relative">
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">Actuel</Badge>
                    <h3 className="font-bold text-lg mb-2">Essential</h3>
                    <p className="text-3xl font-bold mb-4">49€<span className="text-sm font-normal text-muted-foreground">/mois</span></p>
                    <ul className="space-y-2 text-sm mb-6">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-success" />
                        Plan stratégique IA
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-success" />
                        3 modules activables
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-success" />
                        Contenus illimités
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-success" />
                        Content Hub + Calendrier
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-success" />
                        Coach IA
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full" disabled>Plan actuel</Button>
                  </Card>

                  {/* Elite */}
                  <Card className="p-6">
                    <h3 className="font-bold text-lg mb-2">Elite</h3>
                    <p className="text-3xl font-bold mb-4">99€<span className="text-sm font-normal text-muted-foreground">/mois</span></p>
                    <ul className="space-y-2 text-sm mb-6">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-success" />
                        Tout Essential +
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-success" />
                        Modules illimités
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-success" />
                        Accès nouveautés en avant-première
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-success" />
                        Automatisations n8n (V2)
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-success" />
                        Support prioritaire
                      </li>
                    </ul>
                    <Button variant="hero" className="w-full">Upgrader</Button>
                  </Card>
                </div>

                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Gérer votre abonnement</p>
                      <p className="text-sm text-muted-foreground">
                        Modifier, upgrader ou annuler via Systeme.io
                      </p>
                    </div>
                    <Button variant="outline">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Gérer sur Systeme.io
                    </Button>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Settings;
