import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { FileText, Mail, Video, Image, MoreVertical, Plus, Filter } from "lucide-react";

const ContentHub = () => {
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
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        
        <main className="flex-1 overflow-auto bg-muted/30">
          <header className="h-16 border-b border-border flex items-center px-6 bg-background sticky top-0 z-10">
            <SidebarTrigger />
            <div className="ml-4 flex-1">
              <h1 className="text-xl font-display font-bold">Content Hub</h1>
            </div>
            <Button variant="hero">
              <Plus className="w-4 h-4 mr-2" />
              Nouveau contenu
            </Button>
          </header>

          <div className="p-6 space-y-6 max-w-7xl mx-auto">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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

            {/* Content Tabs */}
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
                            <Badge variant={item.status === "Publié" ? "default" : item.status === "Planifié" ? "secondary" : "outline"}>
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

            {/* Quick Generate */}
            <Card className="p-6 gradient-hero border-border/50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-primary-foreground mb-2">
                    Générer du contenu rapidement
                  </h3>
                  <p className="text-primary-foreground/90">
                    Utilisez l'IA pour créer des contenus engageants en quelques secondes
                  </p>
                </div>
                <Button variant="secondary" size="lg">
                  Générer maintenant
                </Button>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default ContentHub;
