import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Calendar, FileText, TrendingUp, Target, Zap, ArrowUpRight } from "lucide-react";

const Dashboard = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        
        <main className="flex-1 overflow-auto">
          <header className="h-16 border-b border-border flex items-center px-6 bg-background/95 backdrop-blur-sm sticky top-0 z-10">
            <SidebarTrigger />
            <div className="ml-4">
              <h1 className="text-xl font-display font-bold">Tableau de bord</h1>
            </div>
          </header>

          <div className="p-6 space-y-6">
            {/* Welcome Card */}
            <Card className="p-6 gradient-hero border-border/50">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-primary-foreground mb-2">
                    Bienvenue sur Tipote™ 👋
                  </h2>
                  <p className="text-primary-foreground/90 mb-4 max-w-2xl">
                    Commencez par compléter votre onboarding pour que l'IA puisse analyser votre business 
                    et créer votre plan stratégique personnalisé.
                  </p>
                  <Button variant="secondary" size="lg">
                    Démarrer l'onboarding
                  </Button>
                </div>
                <Brain className="w-16 h-16 text-primary-foreground/80" />
              </div>
            </Card>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  label: "Contenus générés",
                  value: "0",
                  icon: FileText,
                  trend: "+0%",
                  color: "text-primary",
                },
                {
                  label: "Publications prévues",
                  value: "0",
                  icon: Calendar,
                  trend: "0 cette semaine",
                  color: "text-secondary",
                },
                {
                  label: "Tâches complétées",
                  value: "0%",
                  icon: Target,
                  trend: "0/0 tâches",
                  color: "text-success",
                },
                {
                  label: "Engagement moyen",
                  value: "0%",
                  icon: TrendingUp,
                  trend: "+0%",
                  color: "text-accent",
                },
              ].map((stat, index) => (
                <Card key={index} className="p-6 hover:shadow-md transition-all duration-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-muted ${stat.color}`}>
                      <stat.icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs text-muted-foreground">{stat.trend}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                    <Target className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-lg font-bold mb-2">Plan Stratégique</h3>
                <p className="text-sm text-muted-foreground">
                  Définissez vos objectifs et votre pyramide d'offres
                </p>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl gradient-secondary flex items-center justify-center">
                    <Brain className="w-6 h-6 text-secondary-foreground" />
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-lg font-bold mb-2">Générer du Contenu</h3>
                <p className="text-sm text-muted-foreground">
                  Créez des posts, emails et articles avec l'IA
                </p>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-lg font-bold mb-2">Calendrier Éditorial</h3>
                <p className="text-sm text-muted-foreground">
                  Organisez et planifiez vos publications
                </p>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Activité récente</h3>
                <Button variant="ghost" size="sm">
                  Tout voir
                </Button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                  <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                    <Zap className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Commencez votre parcours</p>
                    <p className="text-sm text-muted-foreground">
                      Complétez l'onboarding pour débloquer toutes les fonctionnalités
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Démarrer
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
