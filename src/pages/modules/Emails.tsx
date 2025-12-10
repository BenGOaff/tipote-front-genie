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
import { Mail, Sparkles, CheckCircle2, Settings, Send, FileText } from "lucide-react";

const Emails = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        
        <main className="flex-1 overflow-auto bg-muted/30">
          <header className="h-16 border-b border-border flex items-center px-6 bg-background sticky top-0 z-10">
            <SidebarTrigger />
            <div className="ml-4 flex-1">
              <h1 className="text-xl font-display font-bold">Module : Emails</h1>
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
                  <Mail className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-primary-foreground mb-2">
                    Créez des séquences emails performantes
                  </h2>
                  <p className="text-primary-foreground/90">
                    Nurturing, séquences de vente, onboarding... L'IA génère des emails copywrités
                    selon votre offre et votre persona.
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
                    <h3 className="text-lg font-bold">Type d'email</h3>
                  </div>

                  <RadioGroup defaultValue="nurturing" className="space-y-3">
                    <label className="flex items-start gap-3 p-4 rounded-lg border border-border hover:bg-muted/50 cursor-pointer transition-colors">
                      <RadioGroupItem value="nurturing" id="nurturing" className="mt-1" />
                      <div>
                        <p className="font-medium">Nurturing / Newsletter</p>
                        <p className="text-sm text-muted-foreground">
                          Emails récurrents pour maintenir l'engagement et apporter de la valeur
                        </p>
                      </div>
                    </label>
                    <label className="flex items-start gap-3 p-4 rounded-lg border border-border hover:bg-muted/50 cursor-pointer transition-colors">
                      <RadioGroupItem value="sales-short" id="sales-short" className="mt-1" />
                      <div>
                        <p className="font-medium">Séquence de vente courte</p>
                        <p className="text-sm text-muted-foreground">
                          3-5 emails pour convertir rapidement (lancement, promo flash)
                        </p>
                      </div>
                    </label>
                    <label className="flex items-start gap-3 p-4 rounded-lg border border-border hover:bg-muted/50 cursor-pointer transition-colors">
                      <RadioGroupItem value="sales-long" id="sales-long" className="mt-1" />
                      <div>
                        <p className="font-medium">Séquence de vente longue</p>
                        <p className="text-sm text-muted-foreground">
                          7-12 emails pour les offres high-ticket avec storytelling
                        </p>
                      </div>
                    </label>
                    <label className="flex items-start gap-3 p-4 rounded-lg border border-border hover:bg-muted/50 cursor-pointer transition-colors">
                      <RadioGroupItem value="onboarding" id="onboarding" className="mt-1" />
                      <div>
                        <p className="font-medium">Onboarding (Know-Like-Trust)</p>
                        <p className="text-sm text-muted-foreground">
                          Séquence de bienvenue pour créer la confiance avec vos nouveaux leads
                        </p>
                      </div>
                    </label>
                  </RadioGroup>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-bold mb-6">Paramètres de l'email</h3>
                  <div className="space-y-4">
                    {/* Style */}
                    <div className="space-y-2">
                      <Label htmlFor="style">Style et ton</Label>
                      <Select defaultValue="professional">
                        <SelectTrigger id="style">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="professional">Professionnel</SelectItem>
                          <SelectItem value="friendly">Amical</SelectItem>
                          <SelectItem value="educational">Éducatif</SelectItem>
                          <SelectItem value="funny">Humoristique</SelectItem>
                          <SelectItem value="empathetic">Empathique</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Tutoiement */}
                    <div className="space-y-2">
                      <Label htmlFor="formality">Forme d'adresse</Label>
                      <Select defaultValue="tu">
                        <SelectTrigger id="formality">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tu">Tutoiement (Tu)</SelectItem>
                          <SelectItem value="vous">Vouvoiement (Vous)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Offre cible */}
                    <div className="p-4 rounded-lg bg-muted/50 border border-border">
                      <h4 className="font-medium mb-3">Informations sur l'offre (si vente)</h4>
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <Label htmlFor="offer-name">Nom de l'offre</Label>
                          <Input id="offer-name" placeholder="Ex: Formation Content Marketing Pro" />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-2">
                            <Label htmlFor="offer-price">Prix</Label>
                            <Input id="offer-price" placeholder="497€" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="offer-urgency">Urgence</Label>
                            <Select defaultValue="launch">
                              <SelectTrigger id="offer-urgency">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="launch">Lancement</SelectItem>
                                <SelectItem value="promo">Promo limitée</SelectItem>
                                <SelectItem value="evergreen">Evergreen</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="offer-promise">Promesse principale</Label>
                          <Textarea
                            id="offer-promise"
                            placeholder="Décrivez la transformation que votre offre apporte..."
                            rows={2}
                            className="resize-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Sujet */}
                    <div className="space-y-2">
                      <Label htmlFor="subject">Sujet abordé (si nurturing)</Label>
                      <Input id="subject" placeholder="Ex: L'importance de la régularité sur les réseaux" />
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-bold mb-4">Générer</h3>
                  <div className="flex gap-3">
                    <Button variant="hero" className="flex-1">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Générer 1 email
                    </Button>
                    <Button variant="outline">
                      <FileText className="w-4 h-4 mr-2" />
                      Générer la séquence complète
                    </Button>
                  </div>
                </Card>
              </div>

              {/* Sidebar Stats */}
              <div className="space-y-6">
                <Card className="p-6">
                  <h3 className="font-bold mb-4">Statistiques</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Emails générés</span>
                      <span className="font-bold">28</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Séquences créées</span>
                      <span className="font-bold">4</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Taux d'ouverture moyen</span>
                      <span className="font-bold text-success">34.2%</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="font-bold mb-4">Templates populaires</h3>
                  <div className="space-y-2">
                    {[
                      { name: "Email de bienvenue", icon: "👋" },
                      { name: "Email de lancement", icon: "🚀" },
                      { name: "Email de témoignage", icon: "⭐" },
                      { name: "Email de relance", icon: "🔔" },
                    ].map((template, i) => (
                      <button
                        key={i}
                        className="w-full flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-left"
                      >
                        <span className="text-xl">{template.icon}</span>
                        <span className="text-sm font-medium">{template.name}</span>
                      </button>
                    ))}
                  </div>
                </Card>

                <Card className="p-6 bg-primary/5 border-primary/20">
                  <div className="flex items-start gap-3">
                    <Send className="w-5 h-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-medium text-sm mb-1">Conseil</p>
                      <p className="text-xs text-muted-foreground">
                        Les emails générés sont stockés dans le Content Hub. 
                        Copiez-collez vers Systeme.io pour les programmer.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Emails;
