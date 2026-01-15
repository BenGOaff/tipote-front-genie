import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, Users, Mail, MousePointer, Eye, ArrowUpRight } from "lucide-react";
import { useTutorial } from "@/hooks/useTutorial";
import { ContextualTooltip } from "@/components/tutorial/ContextualTooltip";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const Analytics = () => {
  const { hasSeenContext, markContextSeen } = useTutorial();
  const { toast } = useToast();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [metricsForm, setMetricsForm] = useState({
    emailOpenRate: "",
    conversionRate: "",
    newSubscribers: "",
    pageViews: "",
  });

  const handleMetricsUpdate = () => {
    // Ici on pourrait sauvegarder vers Supabase
    toast({
      title: "Métriques mises à jour !",
      description: "Tes données ont été enregistrées. L'IA va adapter tes recommandations.",
    });
    setIsUpdateModalOpen(false);
    setMetricsForm({ emailOpenRate: "", conversionRate: "", newSubscribers: "", pageViews: "" });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        
        <main className="flex-1 overflow-auto bg-muted/30">
          <header className="h-16 border-b border-border flex items-center px-6 bg-background sticky top-0 z-10">
            <SidebarTrigger />
            <div className="ml-4 flex-1">
              <h1 className="text-xl font-display font-bold">Analytics</h1>
            </div>
            <Button variant="outline">
              Exporter le rapport
            </Button>
          </header>

          <div className="p-6 space-y-6 max-w-7xl mx-auto">
            {/* Period Selector */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-display font-bold">Tes performances</h2>
                <p className="text-muted-foreground">Suis et optimise tes résultats</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">7 jours</Button>
                <Button variant="outline" size="sm">30 jours</Button>
                <Button variant="default" size="sm">90 jours</Button>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  label: "Taux d'ouverture emails",
                  value: "34.2%",
                  change: "+5.4%",
                  trend: "up",
                  icon: Mail,
                  color: "text-primary",
                },
                {
                  label: "Taux de conversion",
                  value: "8.7%",
                  change: "+2.1%",
                  trend: "up",
                  icon: MousePointer,
                  color: "text-success",
                },
                {
                  label: "Nouveaux abonnés",
                  value: "1,247",
                  change: "+18.3%",
                  trend: "up",
                  icon: Users,
                  color: "text-secondary",
                },
                {
                  label: "Pages vues",
                  value: "12.4K",
                  change: "-3.2%",
                  trend: "down",
                  icon: Eye,
                  color: "text-primary",
                },
              ].map((metric, i) => (
                <Card key={i} className="p-6 hover:shadow-md transition-all duration-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-10 h-10 rounded-xl bg-muted flex items-center justify-center ${metric.color}`}>
                      <metric.icon className="w-5 h-5" />
                    </div>
                    <Badge variant={metric.trend === "up" ? "default" : "destructive"} className="flex items-center gap-1">
                      {metric.trend === "up" ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      {metric.change}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{metric.label}</p>
                  <p className="text-3xl font-bold">{metric.value}</p>
                </Card>
              ))}
            </div>

            {/* Charts Section */}
            <Tabs defaultValue="engagement" className="w-full">
              <TabsList>
                <TabsTrigger value="engagement">Engagement</TabsTrigger>
                <TabsTrigger value="traffic">Trafic</TabsTrigger>
                <TabsTrigger value="conversions">Conversions</TabsTrigger>
                <TabsTrigger value="social">Réseaux sociaux</TabsTrigger>
              </TabsList>

              <TabsContent value="engagement" className="space-y-6 mt-6">
                <Card className="p-6">
                  <h3 className="text-lg font-bold mb-6">Engagement au fil du temps</h3>
                  <div className="h-64 flex items-end justify-between gap-2">
                    {[65, 72, 68, 80, 75, 88, 82, 90, 85, 92, 88, 95, 90, 98].map((height, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-primary to-primary/50 rounded-t-lg hover:opacity-80 transition-opacity cursor-pointer"
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
                    <span>Jan</span>
                    <span>Fév</span>
                    <span>Mar</span>
                    <span>Avr</span>
                  </div>
                </Card>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="p-6">
                    <h3 className="text-lg font-bold mb-6">Top contenus</h3>
                    <div className="space-y-4">
                      {[
                        { title: "5 stratégies IA pour entrepreneurs", views: "2.4K", engagement: "12.3%" },
                        { title: "Témoignage client : +300% ROI", views: "1.8K", engagement: "9.7%" },
                        { title: "Guide complet content marketing", views: "1.5K", engagement: "8.2%" },
                        { title: "Automatisation vs humanité", views: "1.2K", engagement: "7.5%" },
                      ].map((content, i) => (
                        <div key={i} className="flex items-start justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                          <div className="flex-1">
                            <p className="font-medium mb-1">{content.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {content.views} vues • {content.engagement} engagement
                            </p>
                          </div>
                          <ArrowUpRight className="w-4 h-4 text-muted-foreground flex-shrink-0 ml-2" />
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card className="p-6">
                    <h3 className="text-lg font-bold mb-6">Sources de trafic</h3>
                    <div className="space-y-4">
                      {[
                        { source: "LinkedIn", percentage: 45, visitors: "5.6K", color: "bg-primary" },
                        { source: "Google Organic", percentage: 28, visitors: "3.5K", color: "bg-success" },
                        { source: "Direct", percentage: 18, visitors: "2.2K", color: "bg-secondary" },
                        { source: "Email", percentage: 9, visitors: "1.1K", color: "bg-accent" },
                      ].map((source, i) => (
                        <div key={i}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">{source.source}</span>
                            <span className="text-sm text-muted-foreground">
                              {source.percentage}% • {source.visitors}
                            </span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className={`h-full ${source.color} rounded-full transition-all duration-500`}
                              style={{ width: `${source.percentage}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="traffic">
                <Card className="p-12 text-center">
                  <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Données de trafic à venir</p>
                </Card>
              </TabsContent>

              <TabsContent value="conversions">
                <Card className="p-12 text-center">
                  <MousePointer className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Données de conversion à venir</p>
                </Card>
              </TabsContent>

              <TabsContent value="social">
                <Card className="p-12 text-center">
                  <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Analytics réseaux sociaux à venir</p>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Goals Progress */}
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-6">Progression des objectifs</h3>
              <div className="space-y-6">
                {[
                  { label: "Objectif revenus mensuel", current: "32K€", target: "50K€", progress: 64 },
                  { label: "Nombre d'abonnés", current: "8,450", target: "10,000", progress: 84 },
                  { label: "Taux conversion tunnel", current: "6.2%", target: "10%", progress: 62 },
                ].map((goal, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{goal.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground whitespace-nowrap">
                          {goal.current} / {goal.target}
                        </span>
                        <span className="text-xs font-medium text-primary whitespace-nowrap">
                          ({goal.progress}%)
                        </span>
                      </div>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full gradient-primary rounded-full transition-all duration-500"
                        style={{ width: `${goal.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Update Reminder */}
            <ContextualTooltip
              contextKey="first_analytics_visit"
              message="Mets à jour tes métriques chaque semaine pour des recommandations plus précises."
              position="top"
            >
              <Card className="p-6 gradient-hero border-border/50">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-primary-foreground mb-2">
                      Mettre à jour tes données
                    </h3>
                    <p className="text-primary-foreground/90 mb-4">
                      N'oublie pas de mettre à jour tes métriques chaque semaine pour que l'IA puisse 
                      analyser tes résultats et adapter ta stratégie
                    </p>
                    <Button variant="secondary" onClick={() => setIsUpdateModalOpen(true)}>
                      Mettre à jour maintenant
                    </Button>
                  </div>
                </div>
              </Card>
            </ContextualTooltip>
          </div>

          {/* Modal de mise à jour des métriques */}
          <Dialog open={isUpdateModalOpen} onOpenChange={setIsUpdateModalOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Mettre à jour tes métriques</DialogTitle>
                <DialogDescription>
                  Entre tes dernières données pour que l'IA puisse affiner tes recommandations.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="emailOpenRate">Taux d'ouverture emails (%)</Label>
                  <Input
                    id="emailOpenRate"
                    type="number"
                    placeholder="ex: 34.2"
                    value={metricsForm.emailOpenRate}
                    onChange={(e) => setMetricsForm({ ...metricsForm, emailOpenRate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="conversionRate">Taux de conversion (%)</Label>
                  <Input
                    id="conversionRate"
                    type="number"
                    placeholder="ex: 8.7"
                    value={metricsForm.conversionRate}
                    onChange={(e) => setMetricsForm({ ...metricsForm, conversionRate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newSubscribers">Nouveaux abonnés</Label>
                  <Input
                    id="newSubscribers"
                    type="number"
                    placeholder="ex: 1247"
                    value={metricsForm.newSubscribers}
                    onChange={(e) => setMetricsForm({ ...metricsForm, newSubscribers: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pageViews">Pages vues</Label>
                  <Input
                    id="pageViews"
                    type="number"
                    placeholder="ex: 12400"
                    value={metricsForm.pageViews}
                    onChange={(e) => setMetricsForm({ ...metricsForm, pageViews: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsUpdateModalOpen(false)}>
                  Annuler
                </Button>
                <Button onClick={handleMetricsUpdate}>
                  Enregistrer
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Analytics;
