import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

const CalendarView = () => {
  const days = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
  const currentMonth = "Décembre 2025";
  
  // Mock calendar data
  const calendarData = Array.from({ length: 35 }, (_, i) => {
    const day = i - 2; // Start from day -2 to show previous month days
    const hasContent = day > 0 && day <= 31 && Math.random() > 0.7;
    return {
      day: day > 0 && day <= 31 ? day : null,
      isToday: day === 15,
      contents: hasContent ? [
        { type: "Post", platform: "LinkedIn", time: "09:00" },
        ...(Math.random() > 0.5 ? [{ type: "Email", platform: "Newsletter", time: "14:00" }] : []),
      ] : [],
    };
  });

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        
        <main className="flex-1 overflow-auto bg-muted/30">
          <header className="h-16 border-b border-border flex items-center px-6 bg-background sticky top-0 z-10">
            <SidebarTrigger />
            <div className="ml-4 flex-1">
              <h1 className="text-xl font-display font-bold">Calendrier Éditorial</h1>
            </div>
            <Button variant="hero">
              <Plus className="w-4 h-4 mr-2" />
              Ajouter un contenu
            </Button>
          </header>

          <div className="p-6 space-y-6 max-w-7xl mx-auto">
            {/* Calendar Header */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <Button variant="outline" size="icon">
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <h2 className="text-2xl font-bold">{currentMonth}</h2>
                  <Button variant="outline" size="icon">
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="sm">
                    Aujourd'hui
                  </Button>
                  <Button variant="outline" size="sm">
                    Semaine
                  </Button>
                  <Button variant="default" size="sm">
                    Mois
                  </Button>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="border border-border rounded-lg overflow-hidden">
                {/* Days header */}
                <div className="grid grid-cols-7 border-b border-border bg-muted/50">
                  {days.map((day) => (
                    <div key={day} className="p-3 text-center text-sm font-semibold text-muted-foreground">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar days */}
                <div className="grid grid-cols-7">
                  {calendarData.map((cell, i) => (
                    <div
                      key={i}
                      className={`min-h-[120px] p-2 border-r border-b border-border hover:bg-muted/30 transition-colors ${
                        cell.isToday ? "bg-primary/5 border-primary/30" : ""
                      } ${cell.day === null ? "bg-muted/20" : ""}`}
                    >
                      {cell.day && (
                        <>
                          <div className="flex items-center justify-between mb-2">
                            <span
                              className={`text-sm font-medium ${
                                cell.isToday
                                  ? "w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center"
                                  : ""
                              }`}
                            >
                              {cell.day}
                            </span>
                          </div>
                          <div className="space-y-1">
                            {cell.contents.map((content, j) => (
                              <div
                                key={j}
                                className="text-xs p-1.5 rounded bg-primary/10 hover:bg-primary/20 cursor-pointer transition-colors border border-primary/20"
                              >
                                <div className="font-medium text-primary truncate">
                                  {content.time} - {content.type}
                                </div>
                                <div className="text-muted-foreground truncate">{content.platform}</div>
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Upcoming Content */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4">À venir cette semaine</h3>
                <div className="space-y-3">
                  {[
                    { day: "Aujourd'hui", title: "Post LinkedIn : Stratégie 2025", time: "09:00" },
                    { day: "Demain", title: "Newsletter hebdomadaire", time: "14:00" },
                    { day: "Mercredi", title: "Article blog : Guide IA", time: "10:00" },
                    { day: "Vendredi", title: "Post Instagram : Témoignage", time: "16:00" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 p-3 rounded-lg bg-muted/50">
                      <div className="flex-shrink-0">
                        <Badge variant="outline">{item.time}</Badge>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.day}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4">Statistiques du mois</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Contenus publiés</p>
                      <p className="text-2xl font-bold">24</p>
                    </div>
                    <Badge className="gradient-primary text-primary-foreground">+12%</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Contenus planifiés</p>
                      <p className="text-2xl font-bold">18</p>
                    </div>
                    <Badge className="gradient-secondary text-secondary-foreground">Actif</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Taux de complétion</p>
                      <p className="text-2xl font-bold">92%</p>
                    </div>
                    <Badge variant="outline">Excellent</Badge>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default CalendarView;
