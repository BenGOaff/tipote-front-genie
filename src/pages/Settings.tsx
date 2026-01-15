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
  ExternalLink, Lock, Save, Linkedin, Instagram, Youtube, Link
} from "lucide-react";

const Settings = () => {
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
