import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Mail, 
  Video, 
  Image, 
  MoreVertical, 
  Plus, 
  Filter,
  List,
  CalendarDays,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const MyContent = () => {
  const [view, setView] = useState<"list" | "calendar">("list");
  const days = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
  const currentMonth = "Décembre 2025";

  const contentItems = [
    {
      type: "Post",
      title: "5 stratégies pour doubler votre engagement",
      platform: "LinkedIn",
      status: "Publié",
      date: "Il y a 2 jours",
      engagement: "1.2K",
    },
    {
      type: "Email",
      title: "Newsletter : Nouveautés du mois",
      platform: "Email",
      status: "Planifié",
      date: "Dans 3 jours",
      engagement: "-",
    },
    {
      type: "Article",
      title: "Guide complet du content marketing en 2025",
      platform: "Blog",
      status: "Brouillon",
      date: "Modifié aujourd'hui",
      engagement: "-",
    },
    {
      type: "Post",
      title: "Témoignage client : +300% de ROI",
      platform: "Instagram",
      status: "Publié",
      date: "Il y a 1 semaine",
      engagement: "856",
    },
    {
      type: "Video",
      title: "Script YouTube : Introduction IA",
      platform: "YouTube",
      status: "En cours",
      date: "Modifié hier",
      engagement: "-",
    },
  ];

  // Mock calendar data
  const calendarData = Array.from({ length: 35 }, (_, i) => {
    const day = i - 2;
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
              <h1 className="text-xl font-display font-bold">Mes Contenus</h1>
            </div>
            <div className="flex items-center gap-3">
              {/* View Toggle */}
              <div className="flex items-center border border-border rounded-lg p-1">
                <Button 
                  variant={view === "list" ? "secondary" : "ghost"} 
                  size="sm"
                  onClick={() => setView("list")}
                  className="h-8"
                >
                  <List className="w-4 h-4 mr-2" />
                  Liste
                </Button>
                <Button 
                  variant={view === "calendar" ? "secondary" : "ghost"} 
                  size="sm"
                  onClick={() => setView("calendar")}
                  className="h-8"
                >
                  <CalendarDays className="w-4 h-4 mr-2" />
                  Calendrier
                </Button>
              </div>
              <Link to="/dashboard/create">
                <Button variant="hero">
                  <Plus className="w-4 h-4 mr-2" />
                  Créer
                </Button>
              </Link>
            </div>
          </header>

          <div className="p-6 space-y-6 max-w-7xl mx-auto">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Total", value: "127", icon: FileText, color: "gradient-primary" },
                { label: "Publiés", value: "89", icon: Image, color: "gradient-secondary" },
                { label: "Planifiés", value: "24", icon: Video, color: "gradient-primary" },
                { label: "Brouillons", value: "14", icon: Mail, color: "gradient-secondary" },
              ].map((stat, i) => (
                <Card key={i} className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                      <p className="text-3xl font-bold">{stat.value}</p>
                    </div>
                    <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                      <stat.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {view === "list" ? (
              /* List View */
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Tous vos contenus</h2>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filtrer
                  </Button>
                </div>

                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="mb-6">
                    <TabsTrigger value="all">Tous</TabsTrigger>
                    <TabsTrigger value="posts">Posts</TabsTrigger>
                    <TabsTrigger value="emails">Emails</TabsTrigger>
                    <TabsTrigger value="articles">Articles</TabsTrigger>
                    <TabsTrigger value="videos">Vidéos</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="space-y-4">
                    {contentItems.map((item, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <Badge variant={
                                item.status === "Publié" ? "default" : 
                                item.status === "Planifié" ? "secondary" : 
                                item.status === "En cours" ? "outline" : "outline"
                              }>
                                {item.status}
                              </Badge>
                              <span className="text-sm text-muted-foreground">{item.type}</span>
                              <span className="text-sm text-muted-foreground">•</span>
                              <span className="text-sm text-muted-foreground">{item.platform}</span>
                            </div>
                            <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>{item.date}</span>
                              {item.engagement !== "-" && (
                                <>
                                  <span>•</span>
                                  <span>{item.engagement} engagements</span>
                                </>
                              )}
                            </div>
                          </div>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="posts">
                    <p className="text-center text-muted-foreground py-12">
                      Filtrez vos posts réseaux sociaux
                    </p>
                  </TabsContent>

                  <TabsContent value="emails">
                    <p className="text-center text-muted-foreground py-12">
                      Filtrez vos campagnes emails
                    </p>
                  </TabsContent>

                  <TabsContent value="articles">
                    <p className="text-center text-muted-foreground py-12">
                      Filtrez vos articles de blog
                    </p>
                  </TabsContent>

                  <TabsContent value="videos">
                    <p className="text-center text-muted-foreground py-12">
                      Filtrez vos scripts vidéo
                    </p>
                  </TabsContent>
                </Tabs>
              </Card>
            ) : (
              /* Calendar View */
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
                    <Button variant="outline" size="sm">Aujourd'hui</Button>
                    <Button variant="outline" size="sm">Semaine</Button>
                    <Button variant="default" size="sm">Mois</Button>
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
                        className={`min-h-[100px] p-2 border-r border-b border-border hover:bg-muted/30 transition-colors ${
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
            )}

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

export default MyContent;