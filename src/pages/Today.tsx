import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  Sparkles,
  Target,
  Calendar,
  FolderOpen,
  BarChart3,
  Loader2
} from "lucide-react";
import { Link } from "react-router-dom";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { GettingStartedCard } from "@/components/dashboard/GettingStartedCard";
import { NextActionCard } from "@/components/dashboard/NextActionCard";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { UpcomingList } from "@/components/dashboard/UpcomingList";

const Today = () => {
  const { stats, upcomingContents, loading } = useDashboardStats();

  if (loading) {
    return (
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar />
          <main className="flex-1 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </main>
        </div>
      </SidebarProvider>
    );
  }

  const isNewUser = !stats?.hasPyramid || stats?.totalContents === 0;
  const taskProgress = stats && stats.totalTasks > 0 
    ? Math.round((stats.completedTasks / stats.totalTasks) * 100) 
    : 0;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        
        <main className="flex-1 overflow-auto">
          <header className="h-16 border-b border-border flex items-center px-6 bg-background/95 backdrop-blur-sm sticky top-0 z-10">
            <SidebarTrigger />
            <div className="ml-4 flex-1">
              <h1 className="text-xl font-display font-bold">Aujourd'hui</h1>
            </div>
            <Link to="/dashboard/analytics">
              <Button variant="outline" size="sm">
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics
              </Button>
            </Link>
          </header>

          <div className="p-6 space-y-6 max-w-6xl mx-auto">
            {/* Getting Started for new users */}
            {isNewUser && (
              <GettingStartedCard 
                hasPyramid={stats?.hasPyramid || false}
                hasContents={stats ? stats.totalContents > 0 : false}
                firstName={stats?.firstName || null}
              />
            )}

            {/* Next Action Card */}
            <NextActionCard 
              upcomingContent={upcomingContents[0] || null}
              hasStrategy={stats?.hasPyramid || false}
            />

            {/* Stats Grid - only show if user has some activity */}
            {stats && (stats.totalContents > 0 || stats.totalTasks > 0) && (
              <StatsGrid 
                totalContents={stats.totalContents}
                publishedContents={stats.publishedContents}
                scheduledContents={stats.scheduledContents}
                completedTasks={stats.completedTasks}
                totalTasks={stats.totalTasks}
              />
            )}

            {/* Progress & Actions */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Weekly Progress - only show if user has tasks */}
              {stats && stats.totalTasks > 0 && (
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold">Progression</h3>
                    <Badge variant="outline">{stats.completedTasks}/{stats.totalTasks} tâches</Badge>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Tâches complétées</span>
                        <span className="text-sm font-medium">{taskProgress}%</span>
                      </div>
                      <Progress value={taskProgress} className="h-2" />
                    </div>
                    
                    {stats.totalContents > 0 && (
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-muted-foreground">Contenus planifiés</span>
                          <span className="text-sm font-medium">{stats.scheduledContents}/{stats.totalContents}</span>
                        </div>
                        <Progress 
                          value={stats.totalContents > 0 ? (stats.scheduledContents / stats.totalContents) * 100 : 0} 
                          className="h-2" 
                        />
                      </div>
                    )}
                  </div>

                  <Link to="/dashboard/strategy" className="block mt-6">
                    <Button variant="outline" className="w-full">
                      Voir ma stratégie complète
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </Card>
              )}

              {/* Quick Actions */}
              <Card className="p-6">
                <h3 className="text-lg font-bold mb-6">Actions rapides</h3>
                
                <div className="space-y-3">
                  <Link to="/dashboard/create" className="block">
                    <div className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer group">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                          <Sparkles className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold group-hover:text-primary transition-colors">
                            Créer du contenu
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Posts, emails, articles, vidéos...
                          </p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </div>
                  </Link>

                  <Link to="/dashboard/content" className="block">
                    <div className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer group">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                          <FolderOpen className="w-5 h-5 text-secondary-foreground" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold group-hover:text-primary transition-colors">
                            Voir mes contenus
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Liste & calendrier éditorial
                          </p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </div>
                  </Link>

                  <Link to="/dashboard/strategy" className="block">
                    <div className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer group">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                          <Target className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold group-hover:text-primary transition-colors">
                            Ma stratégie
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Plan d'action & checklist
                          </p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </div>
                  </Link>
                </div>
              </Card>
            </div>

            {/* Upcoming Contents */}
            <UpcomingList contents={upcomingContents} />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Today;
