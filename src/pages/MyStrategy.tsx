import { useState, useCallback } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { SortableTask } from "@/components/strategy/SortableTask";
import { AddTaskDialog } from "@/components/strategy/AddTaskDialog";
import { 
  Target, 
  TrendingUp, 
  Users, 
  DollarSign, 
  CheckCircle2, 
  ArrowRight,
  Layers,
  Clock,
  Plus,
  Pencil,
  X,
  Save
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
    ],
  },
];

const MyStrategy = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [phases, setPhases] = useState<Phase[]>(initialPhases);
  const [savedPhases, setSavedPhases] = useState<Phase[]>(initialPhases);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = useCallback((event: DragEndEvent, phaseIndex: number) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      setPhases((prevPhases) => {
        const newPhases = [...prevPhases];
        const phase = newPhases[phaseIndex];
        const oldIndex = phase.tasks.findIndex((t) => t.id === active.id);
        const newIndex = phase.tasks.findIndex((t) => t.id === over.id);
        
        newPhases[phaseIndex] = {
          ...phase,
          tasks: arrayMove(phase.tasks, oldIndex, newIndex),
        };
        
        return newPhases;
      });
    }
  }, []);

  const toggleTask = useCallback((taskId: string) => {
    setPhases((prevPhases) => {
      return prevPhases.map((phase) => ({
        ...phase,
        tasks: phase.tasks.map((task) =>
          task.id === taskId ? { ...task, done: !task.done } : task
        ),
      }));
    });
  }, []);

  const deleteTask = useCallback((taskId: string) => {
    setPhases((prevPhases) => {
      return prevPhases.map((phase) => ({
        ...phase,
        tasks: phase.tasks.filter((task) => task.id !== taskId),
      }));
    });
  }, []);

  const addTask = useCallback((taskName: string, phaseIndex: number) => {
    setPhases((prevPhases) => {
      const newPhases = [...prevPhases];
      newPhases[phaseIndex] = {
        ...newPhases[phaseIndex],
        tasks: [
          ...newPhases[phaseIndex].tasks,
          { id: generateId(), task: taskName, done: false },
        ],
      };
      return newPhases;
    });
  }, []);

  const updateProgress = useCallback((phases: Phase[]): Phase[] => {
    return phases.map((phase) => {
      const totalTasks = phase.tasks.length;
      const completedTasks = phase.tasks.filter((t) => t.done).length;
      const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
      return { ...phase, progress };
    });
  }, []);

  const handleStartEditing = () => {
    setSavedPhases(phases);
    setIsEditing(true);
  };

  const handleCancelEditing = () => {
    setPhases(savedPhases);
    setIsEditing(false);
  };

  const handleSaveChanges = () => {
    const updatedPhases = updateProgress(phases);
    setPhases(updatedPhases);
    setSavedPhases(updatedPhases);
    setIsEditing(false);
    toast({
      title: "Modifications enregistrées",
      description: "Ta stratégie a été mise à jour avec succès",
    });
  };

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
            
            {isEditing ? (
              <div className="flex items-center gap-2">
                <Button variant="ghost" onClick={handleCancelEditing}>
                  <X className="w-4 h-4 mr-2" />
                  Annuler
                </Button>
                <Button onClick={handleSaveChanges}>
                  <Save className="w-4 h-4 mr-2" />
                  Enregistrer
                </Button>
              </div>
            ) : (
              <Button variant="outline" onClick={handleStartEditing}>
                <Pencil className="w-4 h-4 mr-2" />
                Personnaliser
              </Button>
            )}
          </header>

          <div className="p-6 space-y-6 max-w-7xl mx-auto">
            {/* Edit Mode Banner */}
            {isEditing && (
              <Card className="p-4 bg-primary/5 border-primary/20">
                <div className="flex items-center gap-3">
                  <Pencil className="w-5 h-5 text-primary" />
                  <div className="flex-1">
                    <p className="font-medium text-primary">Mode personnalisation</p>
                    <p className="text-sm text-muted-foreground">
                      Glisse les tâches pour les réorganiser, supprime celles qui ne te conviennent pas, ou ajoute-en de nouvelles
                    </p>
                  </div>
                  <Button onClick={() => setIsAddTaskOpen(true)} size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter une tâche
                  </Button>
                </div>
              </Card>
            )}

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
                  {phases.map((phase, phaseIndex) => (
                    <Card key={phaseIndex} className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-bold">{phase.title}</h3>
                          <p className="text-sm text-muted-foreground">{phase.period}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {isEditing && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setIsAddTaskOpen(true)}
                              className="text-primary hover:text-primary"
                            >
                              <Plus className="w-4 h-4 mr-1" />
                              Ajouter
                            </Button>
                          )}
                          <Badge variant={phase.progress === 100 ? "default" : phase.progress > 0 ? "secondary" : "outline"}>
                            {phase.progress}%
                          </Badge>
                        </div>
                      </div>
                      <Progress value={phase.progress} className="mb-4" />
                      
                      <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={(event) => handleDragEnd(event, phaseIndex)}
                      >
                        <SortableContext
                          items={phase.tasks.map((t) => t.id)}
                          strategy={verticalListSortingStrategy}
                        >
                          <div className="grid md:grid-cols-2 gap-3">
                            {phase.tasks.map((task) => (
                              <SortableTask
                                key={task.id}
                                task={task}
                                isEditing={isEditing}
                                onToggle={toggleTask}
                                onDelete={deleteTask}
                              />
                            ))}
                          </div>
                        </SortableContext>
                      </DndContext>
                      
                      {phase.tasks.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                          <p>Aucune tâche dans cette phase</p>
                          {isEditing && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="mt-2"
                              onClick={() => setIsAddTaskOpen(true)}
                            >
                              <Plus className="w-4 h-4 mr-2" />
                              Ajouter une tâche
                            </Button>
                          )}
                        </div>
                      )}
                    </Card>
                  ))}
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
                    <h3 className="text-xl font-bold">Pyramide d'Offres</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-5 rounded-lg border-2 border-success bg-success/5">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold text-success">High Ticket</p>
                          <p className="text-3xl font-bold mt-1">1 997€</p>
                        </div>
                        <CheckCircle2 className="w-5 h-5 text-success" />
                      </div>
                      <p className="text-muted-foreground mt-2">
                        Programme de coaching stratégique 3 mois
                      </p>
                    </div>

                    <div className="p-5 rounded-lg border-2 border-primary bg-primary/5">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold text-primary">Middle Ticket</p>
                          <p className="text-3xl font-bold mt-1">497€</p>
                        </div>
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                      </div>
                      <p className="text-muted-foreground mt-2">
                        Formation complète stratégie de contenu
                      </p>
                    </div>

                    <div className="p-5 rounded-lg border-2 border-secondary bg-secondary/5">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold text-secondary">Lead Magnet</p>
                          <p className="text-3xl font-bold mt-1">Gratuit</p>
                        </div>
                        <CheckCircle2 className="w-5 h-5 text-secondary" />
                      </div>
                      <p className="text-muted-foreground mt-2">
                        Guide PDF : 10 stratégies de contenu gagnantes
                      </p>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full mt-6">
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter une offre
                  </Button>
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
                            <span className="w-2 h-2 rounded-full bg-success mt-2 flex-shrink-0" />
                            <span>Automatiser la création de contenu</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="w-2 h-2 rounded-full bg-success mt-2 flex-shrink-0" />
                            <span>Augmenter les revenus de 50%</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="w-2 h-2 rounded-full bg-success mt-2 flex-shrink-0" />
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
                    Modifier le persona
                  </Button>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>

      <AddTaskDialog
        isOpen={isAddTaskOpen}
        onClose={() => setIsAddTaskOpen(false)}
        onAdd={addTask}
        phases={phases}
      />
    </SidebarProvider>
  );
};

export default MyStrategy;
