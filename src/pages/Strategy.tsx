import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, TrendingUp, Users, DollarSign, CheckCircle2, ArrowRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const Strategy = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        
        <main className="flex-1 overflow-auto bg-muted/30">
          <header className="h-16 border-b border-border flex items-center px-6 bg-background sticky top-0 z-10">
            <SidebarTrigger />
            <div className="ml-4">
              <h1 className="text-xl font-display font-bold">Plan Stratégique</h1>
            </div>
          </header>

          <div className="p-6 space-y-6 max-w-7xl mx-auto">
            {/* Strategic Overview */}
            <Card className="p-8 gradient-hero border-border/50">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-display font-bold text-primary-foreground mb-3">
                    Votre Vision Stratégique
                  </h2>
                  <p className="text-primary-foreground/90 text-lg max-w-2xl">
                    Plan personnalisé généré par l'IA pour atteindre vos objectifs business
                  </p>
                </div>
                <Target className="w-16 h-16 text-primary-foreground/80" />
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-background/20 backdrop-blur-sm rounded-xl p-4 border border-primary-foreground/10">
                  <p className="text-sm text-primary-foreground/70 mb-1">Objectif Revenue</p>
                  <p className="text-2xl font-bold text-primary-foreground">50K€/mois</p>
                </div>
                <div className="bg-background/20 backdrop-blur-sm rounded-xl p-4 border border-primary-foreground/10">
                  <p className="text-sm text-primary-foreground/70 mb-1">Horizon</p>
                  <p className="text-2xl font-bold text-primary-foreground">90 jours</p>
                </div>
                <div className="bg-background/20 backdrop-blur-sm rounded-xl p-4 border border-primary-foreground/10">
                  <p className="text-sm text-primary-foreground/70 mb-1">Progression</p>
                  <p className="text-2xl font-bold text-primary-foreground">12%</p>
                </div>
              </div>
            </Card>

            {/* Offer Pyramid */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold">Pyramide d'Offres</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 rounded-lg border-2 border-success bg-success/5">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold text-success">High Ticket</p>
                        <p className="text-2xl font-bold mt-1">1 997€</p>
                      </div>
                      <CheckCircle2 className="w-5 h-5 text-success" />
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Programme de coaching stratégique 3 mois
                    </p>
                  </div>

                  <div className="p-4 rounded-lg border-2 border-primary bg-primary/5">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold text-primary">Middle Ticket</p>
                        <p className="text-2xl font-bold mt-1">497€</p>
                      </div>
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Formation complète stratégie de contenu
                    </p>
                  </div>

                  <div className="p-4 rounded-lg border-2 border-secondary bg-secondary/5">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold text-secondary">Lead Magnet</p>
                        <p className="text-2xl font-bold mt-1">Gratuit</p>
                      </div>
                      <CheckCircle2 className="w-5 h-5 text-secondary" />
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Guide PDF : 10 stratégies de contenu gagnantes
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl gradient-secondary flex items-center justify-center">
                    <Users className="w-5 h-5 text-secondary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold">Persona Cible</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Profil Principal</p>
                    <p className="font-semibold">Entrepreneur digital 30-45 ans</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Problèmes Principaux</p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 flex-shrink-0" />
                        <span className="text-sm">Manque de temps pour créer du contenu</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 flex-shrink-0" />
                        <span className="text-sm">Stratégie marketing incohérente</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 flex-shrink-0" />
                        <span className="text-sm">Difficulté à générer des leads qualifiés</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Objectifs</p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-success mt-2 flex-shrink-0" />
                        <span className="text-sm">Automatiser la création de contenu</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-success mt-2 flex-shrink-0" />
                        <span className="text-sm">Augmenter les revenus de 50%</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-success mt-2 flex-shrink-0" />
                        <span className="text-sm">Développer une audience engagée</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>

            {/* 30/90 Day Plan */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold">Plan d'Action 30/90 Jours</h3>
                </div>
                <Button variant="outline">
                  Personnaliser
                </Button>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-lg">Phase 1 : Fondations (Jours 1-30)</h4>
                    <span className="text-sm text-muted-foreground">75% complété</span>
                  </div>
                  <Progress value={75} className="mb-3" />
                  <div className="grid md:grid-cols-2 gap-3">
                    {[
                      { task: "Créer le lead magnet", done: true },
                      { task: "Configurer l'email marketing", done: true },
                      { task: "Publier 10 posts stratégiques", done: true },
                      { task: "Lancer la campagne pub", done: false },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                        <CheckCircle2 
                          className={`w-5 h-5 flex-shrink-0 ${item.done ? 'text-success' : 'text-muted-foreground'}`} 
                        />
                        <span className={item.done ? 'line-through text-muted-foreground' : ''}>
                          {item.task}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-lg">Phase 2 : Croissance (Jours 31-60)</h4>
                    <span className="text-sm text-muted-foreground">40% complété</span>
                  </div>
                  <Progress value={40} className="mb-3" />
                  <div className="grid md:grid-cols-2 gap-3">
                    {[
                      { task: "Lancer le middle ticket", done: true },
                      { task: "Optimiser le tunnel de vente", done: false },
                      { task: "Créer 20 contenus vidéo", done: false },
                      { task: "Collaborations influenceurs", done: false },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                        <CheckCircle2 
                          className={`w-5 h-5 flex-shrink-0 ${item.done ? 'text-success' : 'text-muted-foreground'}`} 
                        />
                        <span className={item.done ? 'line-through text-muted-foreground' : ''}>
                          {item.task}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-lg">Phase 3 : Scale (Jours 61-90)</h4>
                    <span className="text-sm text-muted-foreground">0% complété</span>
                  </div>
                  <Progress value={0} className="mb-3" />
                  <div className="grid md:grid-cols-2 gap-3">
                    {[
                      { task: "Lancer le high ticket", done: false },
                      { task: "Automatiser le nurturing", done: false },
                      { task: "Webinar de vente", done: false },
                      { task: "Programme d'affiliation", done: false },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                        <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-muted-foreground" />
                        <span>{item.task}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
                <div className="flex items-start gap-3">
                  <Target className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-primary mb-1">Prochaine étape recommandée</p>
                    <p className="text-sm text-muted-foreground">
                      Finaliser et lancer votre campagne publicitaire pour accélérer l'acquisition de leads
                    </p>
                    <Button variant="default" size="sm" className="mt-3">
                      Voir les détails <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Strategy;
