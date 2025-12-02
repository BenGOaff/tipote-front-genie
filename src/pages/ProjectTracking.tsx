import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { CheckSquare, Plus, MoreVertical, Clock, MessageSquare, Link as LinkIcon } from "lucide-react";

const ProjectTracking = () => {
  const boards = [
    {
      title: "À faire",
      color: "border-muted",
      tasks: [
        {
          title: "Créer le lead magnet PDF",
          priority: "high",
          dueDate: "Dans 2 jours",
          checklist: { done: 2, total: 5 },
          comments: 3,
        },
        {
          title: "Configurer la séquence email",
          priority: "medium",
          dueDate: "Cette semaine",
          checklist: { done: 0, total: 3 },
          comments: 1,
        },
      ],
    },
    {
      title: "En cours",
      color: "border-primary",
      tasks: [
        {
          title: "Rédiger 10 posts LinkedIn",
          priority: "high",
          dueDate: "Aujourd'hui",
          checklist: { done: 6, total: 10 },
          comments: 5,
        },
        {
          title: "Optimiser le tunnel de vente",
          priority: "medium",
          dueDate: "Dans 5 jours",
          checklist: { done: 2, total: 8 },
          comments: 2,
        },
      ],
    },
    {
      title: "Terminé",
      color: "border-success",
      tasks: [
        {
          title: "Analyser la concurrence",
          priority: "low",
          dueDate: "Complété",
          checklist: { done: 5, total: 5 },
          comments: 4,
        },
        {
          title: "Définir le persona cible",
          priority: "high",
          dueDate: "Complété",
          checklist: { done: 7, total: 7 },
          comments: 8,
        },
      ],
    },
  ];

  const priorityColors = {
    high: "bg-destructive text-destructive-foreground",
    medium: "bg-primary text-primary-foreground",
    low: "bg-muted text-muted-foreground",
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        
        <main className="flex-1 overflow-auto bg-muted/30">
          <header className="h-16 border-b border-border flex items-center px-6 bg-background sticky top-0 z-10">
            <SidebarTrigger />
            <div className="ml-4 flex-1">
              <h1 className="text-xl font-display font-bold">Suivi Projet</h1>
            </div>
            <Button variant="hero">
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle tâche
            </Button>
          </header>

          <div className="p-6 space-y-6">
            {/* Progress Overview */}
            <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Progression globale</h3>
                  <Badge variant="outline">67%</Badge>
                </div>
                <Progress value={67} className="mb-2" />
                <p className="text-sm text-muted-foreground">24 sur 36 tâches complétées</p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Cette semaine</h3>
                  <Badge className="gradient-primary text-primary-foreground">8 tâches</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Complétées</span>
                    <span className="font-medium">5</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">En cours</span>
                    <span className="font-medium">3</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Priorités</h3>
                  <Badge variant="destructive">4 urgentes</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Haute</span>
                    <span className="font-medium">4</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Moyenne</span>
                    <span className="font-medium">8</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Kanban Board */}
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-3 gap-6">
                {boards.map((board, boardIndex) => (
                  <Card key={boardIndex} className={`p-6 border-t-4 ${board.color}`}>
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="font-bold text-lg">{board.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {board.tasks.length} tâche{board.tasks.length > 1 ? "s" : ""}
                        </p>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {board.tasks.map((task, taskIndex) => (
                        <Card
                          key={taskIndex}
                          className="p-4 hover:shadow-md transition-all duration-200 cursor-pointer group"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <h4 className="font-semibold group-hover:text-primary transition-colors">
                              {task.title}
                            </h4>
                            <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </div>

                          <div className="flex items-center gap-2 mb-3">
                            <Badge className={priorityColors[task.priority]} variant="secondary">
                              {task.priority === "high" && "Haute"}
                              {task.priority === "medium" && "Moyenne"}
                              {task.priority === "low" && "Basse"}
                            </Badge>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              {task.dueDate}
                            </div>
                          </div>

                          <div className="space-y-3">
                            {/* Checklist Progress */}
                            <div className="flex items-center gap-3">
                              <CheckSquare className="w-4 h-4 text-muted-foreground" />
                              <div className="flex-1">
                                <div className="flex items-center justify-between text-sm mb-1">
                                  <span className="text-muted-foreground">
                                    {task.checklist.done}/{task.checklist.total}
                                  </span>
                                  <span className="text-muted-foreground">
                                    {Math.round((task.checklist.done / task.checklist.total) * 100)}%
                                  </span>
                                </div>
                                <Progress
                                  value={(task.checklist.done / task.checklist.total) * 100}
                                  className="h-1.5"
                                />
                              </div>
                            </div>

                            {/* Comments & Links */}
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <MessageSquare className="w-4 h-4" />
                                <span>{task.comments}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <LinkIcon className="w-4 h-4" />
                                <span>2</span>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}

                      <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground">
                        <Plus className="w-4 h-4 mr-2" />
                        Ajouter une tâche
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Task Details Example */}
            <Card className="p-6 max-w-7xl mx-auto">
              <h3 className="text-lg font-bold mb-6">Détails de la tâche sélectionnée</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">Checklist</h4>
                    <div className="space-y-3">
                      {[
                        { label: "Définir le sujet du lead magnet", checked: true },
                        { label: "Créer le contenu (texte + visuels)", checked: true },
                        { label: "Designer le PDF avec Canva", checked: false },
                        { label: "Créer la landing page de capture", checked: false },
                        { label: "Configurer l'automatisation email", checked: false },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                          <Checkbox checked={item.checked} />
                          <span className={item.checked ? "line-through text-muted-foreground" : ""}>
                            {item.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">Commentaires</h4>
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg bg-muted/30">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-sm text-primary-foreground font-semibold">
                            JD
                          </div>
                          <div>
                            <p className="font-medium text-sm">Vous</p>
                            <p className="text-xs text-muted-foreground">Il y a 2 heures</p>
                          </div>
                        </div>
                        <p className="text-sm">
                          Le sujet est validé : "10 stratégies pour doubler votre audience en 30 jours"
                        </p>
                      </div>

                      <div className="p-4 rounded-lg bg-muted/30">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 rounded-full gradient-secondary flex items-center justify-center text-sm text-secondary-foreground font-semibold">
                            AI
                          </div>
                          <div>
                            <p className="font-medium text-sm">Assistant IA</p>
                            <p className="text-xs text-muted-foreground">Il y a 1 jour</p>
                          </div>
                        </div>
                        <p className="text-sm">
                          Suggestion : Ajouter des études de cas pour renforcer la crédibilité
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Liens importants</h4>
                    <div className="space-y-2">
                      <a href="#" className="flex items-center gap-2 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors text-sm">
                        <LinkIcon className="w-4 h-4 text-primary" />
                        <span>Template Canva - Lead Magnet</span>
                      </a>
                      <a href="#" className="flex items-center gap-2 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors text-sm">
                        <LinkIcon className="w-4 h-4 text-primary" />
                        <span>Landing page draft</span>
                      </a>
                    </div>
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

export default ProjectTracking;
