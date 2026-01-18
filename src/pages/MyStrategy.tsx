import { useState, useCallback } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { PhaseDetailModal } from "@/components/strategy/PhaseDetailModal";
import { OfferDetailModal } from "@/components/strategy/OfferDetailModal";
import { 
  Target, 
  Users, 
  CheckCircle2, 
  ArrowRight,
  Layers,
  Clock,
  Pencil,
  X,
  Save,
  ChevronRight,
  Gift,
  Zap,
  Crown
} from "lucide-react";

interface Task {
  id: string;
  task: string;
  done: boolean;
}

interface Phase {
  title: string;
  period: string;
  progress: number;
  tasks: Task[];
}

interface Offer {
  title: string;
  price: string;
  description: string;
  why?: string;
  whyPrice?: string;
  whatToCreate?: string[];
  howToCreate?: string;
  howToPromote?: string[];
}

const generateId = () => Math.random().toString(36).substr(2, 9);

const initialPhases: Phase[] = [
  {
    title: "Phase 1 : Fondations",
    period: "Jours 1-30",
    progress: 75,
    tasks: [
      { id: generateId(), task: "Créer le lead magnet", done: true },
      { id: generateId(), task: "Configurer l'email marketing", done: true },
      { id: generateId(), task: "Publier 10 posts stratégiques", done: true },
      { id: generateId(), task: "Lancer la campagne pub", done: false },
      { id: generateId(), task: "Créer la page de capture", done: false },
      { id: generateId(), task: "Définir le calendrier éditorial", done: false },
    ],
  },
  {
    title: "Phase 2 : Croissance",
    period: "Jours 31-60",
    progress: 40,
    tasks: [
      { id: generateId(), task: "Lancer le middle ticket", done: true },
      { id: generateId(), task: "Optimiser le tunnel de vente", done: false },
      { id: generateId(), task: "Créer 20 contenus vidéo", done: false },
      { id: generateId(), task: "Collaborations influenceurs", done: false },
      { id: generateId(), task: "A/B test pages de vente", done: false },
    ],
  },
  {
    title: "Phase 3 : Scale",
    period: "Jours 61-90",
    progress: 0,
    tasks: [
      { id: generateId(), task: "Lancer le high ticket", done: false },
      { id: generateId(), task: "Automatiser le nurturing", done: false },
      { id: generateId(), task: "Webinar de vente", done: false },
      { id: generateId(), task: "Programme d'affiliation", done: false },
      { id: generateId(), task: "Scaling pub payante", done: false },
    ],
  },
];

const initialOffers: Record<"lead_magnet" | "low_ticket" | "high_ticket", Offer> = {
  lead_magnet: {
    title: "Guide PDF : 10 stratégies de contenu gagnantes",
    price: "Gratuit",
    description: "Un guide actionnable pour créer du contenu qui convertit",
  },
  low_ticket: {
    title: "Formation complète stratégie de contenu",
    price: "497€",
    description: "Maîtrise tous les aspects de la création de contenu rentable",
  },
  high_ticket: {
    title: "Programme de coaching stratégique 3 mois",
    price: "1 997€",
    description: "Accompagnement personnalisé pour transformer ton business",
  },
};

const TASKS_DISPLAY_LIMIT = 4;

const MyStrategy = () => {
  const { toast } = useToast();
  const [phases, setPhases] = useState<Phase[]>(initialPhases);
  const [offers, setOffers] = useState(initialOffers);
  const [selectedPhaseIndex, setSelectedPhaseIndex] = useState<number | null>(null);
  const [selectedOfferType, setSelectedOfferType] = useState<"lead_magnet" | "low_ticket" | "high_ticket" | null>(null);

  const toggleTask = useCallback((taskId: string) => {
    setPhases((prevPhases) => {
      return prevPhases.map((phase) => {
        const taskIndex = phase.tasks.findIndex((t) => t.id === taskId);
        if (taskIndex === -1) return phase;
        
        const newTasks = phase.tasks.map((task) =>
          task.id === taskId ? { ...task, done: !task.done } : task
        );
        const completedTasks = newTasks.filter((t) => t.done).length;
        const progress = newTasks.length > 0 ? Math.round((completedTasks / newTasks.length) * 100) : 0;
        
        return { ...phase, tasks: newTasks, progress };
      });
    });
  }, []);

  const handleUpdatePhase = useCallback((phaseIndex: number, updatedPhase: Phase) => {
    setPhases((prevPhases) => {
      const newPhases = [...prevPhases];
      newPhases[phaseIndex] = updatedPhase;
      return newPhases;
    });
    toast({
      title: "Phase mise à jour",
      description: "Les modifications ont été enregistrées",
    });
  }, [toast]);

  const handleUpdateOffer = useCallback((offerType: "lead_magnet" | "low_ticket" | "high_ticket", updatedOffer: Offer) => {
    setOffers((prev) => ({
      ...prev,
      [offerType]: updatedOffer,
    }));
    toast({
      title: "Offre mise à jour",
      description: "Les modifications ont été enregistrées",
    });
  }, [toast]);

  const totalTasks = phases.reduce((acc, phase) => acc + phase.tasks.length, 0);
  const completedTasks = phases.reduce(
    (acc, phase) => acc + phase.tasks.filter((t) => t.done).length,
    0
  );
  const overallProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        
        <main className="flex-1 overflow-auto bg-muted/30">
          <header className="h-16 border-b border-border flex items-center px-6 bg-background sticky top-0 z-10">
            <SidebarTrigger />
            <div className="ml-4 flex-1">
              <h1 className="text-xl font-display font-bold">Ma Stratégie</h1>
            </div>
          </header>

          <div className="p-6 space-y-6 max-w-7xl mx-auto">
            {/* Strategic Overview */}
            <Card className="p-8 gradient-hero border-border/50">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-display font-bold text-primary-foreground mb-3">
                    Ta Vision Stratégique
                  </h2>
                  <p className="text-primary-foreground/90 text-lg max-w-2xl">
                    Plan personnalisé généré par l'IA pour atteindre tes objectifs business
                  </p>
                </div>
                <Target className="w-16 h-16 text-primary-foreground/80 hidden lg:block" />
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
                  <p className="text-2xl font-bold text-primary-foreground">{overallProgress}%</p>
                </div>
              </div>
            </Card>

            {/* Tabs for different views */}
            <Tabs defaultValue="plan" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="plan">Plan d'action</TabsTrigger>
                <TabsTrigger value="pyramid">Pyramide d'offres</TabsTrigger>
                <TabsTrigger value="persona">Persona cible</TabsTrigger>
              </TabsList>

              {/* Plan d'action Tab */}
              <TabsContent value="plan" className="space-y-6">
                {/* Progress Overview */}
                <div className="grid md:grid-cols-3 gap-4">
                  <Card className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                      </div>
                      <span className="font-semibold">Tâches complétées</span>
                    </div>
                    <p className="text-3xl font-bold">{completedTasks}/{totalTasks}</p>
                    <Progress value={overallProgress} className="mt-3" />
                  </Card>
                  
                  <Card className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Clock className="w-5 h-5 text-primary" />
                      </div>
                      <span className="font-semibold">Jours restants</span>
                    </div>
                    <p className="text-3xl font-bold">56</p>
                    <p className="text-sm text-muted-foreground mt-1">Sur 90 jours</p>
                  </Card>
                  
                  <Card className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Target className="w-5 h-5 text-primary" />
                      </div>
                      <span className="font-semibold">Phase actuelle</span>
                    </div>
                    <p className="text-3xl font-bold">1</p>
                    <p className="text-sm text-muted-foreground mt-1">Fondations</p>
                  </Card>
                </div>

                {/* Phases */}
                <div className="space-y-6">
                  {phases.map((phase, phaseIndex) => {
                    const displayedTasks = phase.tasks.slice(0, TASKS_DISPLAY_LIMIT);
                    const hasMoreTasks = phase.tasks.length > TASKS_DISPLAY_LIMIT;
                    
                    return (
                      <Card 
                        key={phaseIndex} 
                        className="p-6 cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => setSelectedPhaseIndex(phaseIndex)}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-bold">{phase.title}</h3>
                            <p className="text-sm text-muted-foreground">{phase.period}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={phase.progress === 100 ? "default" : phase.progress > 0 ? "secondary" : "outline"}>
                              {phase.progress}%
                            </Badge>
                            <ChevronRight className="w-5 h-5 text-muted-foreground" />
                          </div>
                        </div>
                        <Progress value={phase.progress} className="mb-4" />
                        
                        <div className="grid md:grid-cols-2 gap-3" onClick={(e) => e.stopPropagation()}>
                          {displayedTasks.map((task) => (
                            <div
                              key={task.id}
                              className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                            >
                              <Checkbox 
                                checked={task.done} 
                                onCheckedChange={() => toggleTask(task.id)}
                              />
                              <span className={`flex-1 ${task.done ? "line-through text-muted-foreground" : ""}`}>
                                {task.task}
                              </span>
                            </div>
                          ))}
                        </div>
                        
                        {hasMoreTasks && (
                          <div className="mt-4 text-center">
                            <Button variant="ghost" size="sm" className="text-primary">
                              Voir les {phase.tasks.length - TASKS_DISPLAY_LIMIT} autres tâches
                              <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                          </div>
                        )}
                        
                        {phase.tasks.length === 0 && (
                          <div className="text-center py-8 text-muted-foreground">
                            <p>Aucune tâche dans cette phase</p>
                          </div>
                        )}
                      </Card>
                    );
                  })}
                </div>

                {/* Next Step */}
                <Card className="p-5 bg-primary/5 border-primary/20">
                  <div className="flex items-start gap-4">
                    <Target className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-semibold text-primary mb-1">Prochaine étape recommandée</p>
                      <p className="text-sm text-muted-foreground mb-3">
                        Finaliser et lancer ta campagne publicitaire pour accélérer l'acquisition de leads
                      </p>
                      <Button variant="default" size="sm">
                        Commencer <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* Pyramide d'offres Tab */}
              <TabsContent value="pyramid" className="space-y-6">
                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                      <Layers className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Pyramide d'Offres</h3>
                      <p className="text-sm text-muted-foreground">Clique sur une offre pour voir les détails</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {/* High Ticket */}
                    <div 
                      className="p-5 rounded-lg border-2 border-amber-500/30 bg-amber-500/5 cursor-pointer hover:bg-amber-500/10 transition-colors group"
                      onClick={() => setSelectedOfferType("high_ticket")}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <Crown className="w-5 h-5 text-amber-500" />
                          <div>
                            <p className="font-semibold text-amber-500">High Ticket</p>
                            <p className="text-lg font-bold mt-1">{offers.high_ticket.title}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold">{offers.high_ticket.price}</span>
                          <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm ml-8">
                        {offers.high_ticket.description}
                      </p>
                    </div>

                    {/* Low Ticket */}
                    <div 
                      className="p-5 rounded-lg border-2 border-primary/30 bg-primary/5 cursor-pointer hover:bg-primary/10 transition-colors group"
                      onClick={() => setSelectedOfferType("low_ticket")}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <Zap className="w-5 h-5 text-primary" />
                          <div>
                            <p className="font-semibold text-primary">Low Ticket</p>
                            <p className="text-lg font-bold mt-1">{offers.low_ticket.title}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold">{offers.low_ticket.price}</span>
                          <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm ml-8">
                        {offers.low_ticket.description}
                      </p>
                    </div>

                    {/* Lead Magnet */}
                    <div 
                      className="p-5 rounded-lg border-2 border-green-500/30 bg-green-500/5 cursor-pointer hover:bg-green-500/10 transition-colors group"
                      onClick={() => setSelectedOfferType("lead_magnet")}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <Gift className="w-5 h-5 text-green-500" />
                          <div>
                            <p className="font-semibold text-green-500">Lead Magnet</p>
                            <p className="text-lg font-bold mt-1">{offers.lead_magnet.title}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold">{offers.lead_magnet.price}</span>
                          <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm ml-8">
                        {offers.lead_magnet.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* Persona Tab */}
              <TabsContent value="persona" className="space-y-6">
                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl gradient-secondary flex items-center justify-center">
                      <Users className="w-5 h-5 text-secondary-foreground" />
                    </div>
                    <h3 className="text-xl font-bold">Persona Cible</h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Profil Principal</p>
                        <p className="font-semibold text-lg">Entrepreneur digital 30-45 ans</p>
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground mb-3">Problèmes Principaux</p>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <span className="w-2 h-2 rounded-full bg-destructive mt-2 flex-shrink-0" />
                            <span>Manque de temps pour créer du contenu</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="w-2 h-2 rounded-full bg-destructive mt-2 flex-shrink-0" />
                            <span>Stratégie marketing incohérente</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="w-2 h-2 rounded-full bg-destructive mt-2 flex-shrink-0" />
                            <span>Difficulté à générer des leads qualifiés</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-3">Objectifs</p>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                            <span>Automatiser la création de contenu</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                            <span>Augmenter les revenus de 50%</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                            <span>Développer une audience engagée</span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Canaux préférés</p>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline">LinkedIn</Badge>
                          <Badge variant="outline">Email</Badge>
                          <Badge variant="outline">YouTube</Badge>
                          <Badge variant="outline">Blog</Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full mt-6">
                    <Pencil className="w-4 h-4 mr-2" />
                    Modifier le persona
                  </Button>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>

      {/* Phase Detail Modal */}
      {selectedPhaseIndex !== null && (
        <PhaseDetailModal
          isOpen={selectedPhaseIndex !== null}
          onClose={() => setSelectedPhaseIndex(null)}
          phase={phases[selectedPhaseIndex]}
          phaseIndex={selectedPhaseIndex}
          onUpdatePhase={handleUpdatePhase}
        />
      )}

      {/* Offer Detail Modal */}
      {selectedOfferType && (
        <OfferDetailModal
          isOpen={selectedOfferType !== null}
          onClose={() => setSelectedOfferType(null)}
          offer={offers[selectedOfferType]}
          offerType={selectedOfferType}
          onUpdateOffer={(updatedOffer) => handleUpdateOffer(selectedOfferType, updatedOffer)}
        />
      )}
    </SidebarProvider>
  );
};

export default MyStrategy;
