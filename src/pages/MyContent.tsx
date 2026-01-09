import { useState, useEffect } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Plus, 
  Search, 
  List, 
  CalendarDays, 
  MoreVertical, 
  Edit, 
  Trash2,
  FileText,
  Mail,
  Video,
  MessageSquare,
  Clock
} from "lucide-react";
import { Link } from "react-router-dom";
import { useContents, Content } from "@/hooks/useContents";
import { ContentCalendar } from "@/components/ContentCalendar";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useTutorial } from "@/hooks/useTutorial";
import { ContextualTooltip } from "@/components/tutorial/ContextualTooltip";

const typeIcons: Record<string, any> = {
  post: MessageSquare,
  email: Mail,
  article: FileText,
  video: Video,
};

const statusColors: Record<string, string> = {
  draft: "bg-muted text-muted-foreground",
  scheduled: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  published: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
};

const statusLabels: Record<string, string> = {
  draft: "Brouillon",
  scheduled: "Planifié",
  published: "Publié",
};

const MyContent = () => {
  const [view, setView] = useState<"list" | "calendar">("list");
  const [search, setSearch] = useState("");
  const [editingContent, setEditingContent] = useState<Content | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<Content | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const { hasSeenContext, markContextSeen } = useTutorial();
  
  const { contents, loading, updateContent, deleteContent } = useContents();

  // Marquer comme vu à la première visite
  useEffect(() => {
    if (!hasSeenContext('first_my_content_visit')) {
      // Le tooltip sera géré par ContextualTooltip
    }
  }, [hasSeenContext]);

  const filteredContents = contents.filter(c => 
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    (c.content && c.content.toLowerCase().includes(search.toLowerCase()))
  );

  const openEdit = (content: Content) => {
    setEditingContent(content);
    setEditTitle(content.title);
    setEditBody(content.content || "");
  };

  const handleSaveEdit = async () => {
    if (!editingContent) return;
    await updateContent(editingContent.id, {
      title: editTitle,
      content: editBody,
    });
    setEditingContent(null);
  };

  const handleDelete = async () => {
    if (!deleteConfirm) return;
    await deleteContent(deleteConfirm.id);
    setDeleteConfirm(null);
  };

  const groupByDate = (items: Content[]) => {
    const groups: Record<string, Content[]> = {};
    items.forEach(item => {
      const date = format(new Date(item.created_at), "yyyy-MM-dd");
      if (!groups[date]) groups[date] = [];
      groups[date].push(item);
    });
    return groups;
  };

  const grouped = groupByDate(filteredContents);

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
            <Link to="/dashboard/create">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Créer
              </Button>
            </Link>
          </header>

          <div className="p-6 max-w-6xl mx-auto space-y-6">
            {/* Filters & Toggle */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <ContextualTooltip
                  contextKey="first_my_content_visit"
                  message="Bascule entre liste et calendrier selon ta préférence."
                  position="bottom"
                >
                  <div className="flex items-center gap-2">
                    <Button
                      variant={view === "list" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setView("list")}
                    >
                      <List className="w-4 h-4 mr-2" />
                      Liste
                    </Button>
                    <Button
                      variant={view === "calendar" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setView("calendar")}
                    >
                      <CalendarDays className="w-4 h-4 mr-2" />
                      Calendrier
                    </Button>
                  </div>
                </ContextualTooltip>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="p-4">
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{contents.length}</p>
              </Card>
              <Card className="p-4">
                <p className="text-sm text-muted-foreground">Brouillons</p>
                <p className="text-2xl font-bold">{contents.filter(c => c.status === "draft").length}</p>
              </Card>
              <Card className="p-4">
                <p className="text-sm text-muted-foreground">Planifiés</p>
                <p className="text-2xl font-bold">{contents.filter(c => c.status === "scheduled").length}</p>
              </Card>
              <Card className="p-4">
                <p className="text-sm text-muted-foreground">Publiés</p>
                <p className="text-2xl font-bold">{contents.filter(c => c.status === "published").length}</p>
              </Card>
            </div>

            {/* Content Display */}
            {loading ? (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">Chargement...</p>
              </Card>
            ) : filteredContents.length === 0 ? (
              <Card className="p-8 text-center">
                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-2">Aucun contenu</h3>
                <p className="text-muted-foreground mb-4">
                  Commencez par créer votre premier contenu
                </p>
                <Link to="/dashboard/create">
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Créer du contenu
                  </Button>
                </Link>
              </Card>
            ) : view === "calendar" ? (
              <ContentCalendar 
                contents={filteredContents} 
                onSelectContent={(content) => openEdit(content)}
              />
            ) : (
              <div className="space-y-6">
                {Object.entries(grouped).sort(([a], [b]) => b.localeCompare(a)).map(([date, items]) => (
                  <div key={date}>
                    <p className="text-sm font-medium text-muted-foreground mb-3 capitalize">
                      {format(new Date(date), "EEEE d MMMM yyyy", { locale: fr })}
                    </p>
                    <div className="space-y-2">
                      {items.map((item) => {
                        const Icon = typeIcons[item.type] || FileText;
                        return (
                          <Card key={item.id} className="p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                                <Icon className="w-5 h-5 text-muted-foreground" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium truncate">{item.title}</p>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  {item.platform && <span className="capitalize">{item.platform}</span>}
                                  {item.scheduled_at && (
                                    <span className="flex items-center gap-1">
                                      <Clock className="w-3 h-3" />
                                      {format(new Date(item.scheduled_at), "HH:mm")}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <Badge className={statusColors[item.status]}>
                                {statusLabels[item.status]}
                              </Badge>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreVertical className="w-4 h-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => openEdit(item)}>
                                    <Edit className="w-4 h-4 mr-2" />
                                    Modifier
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    onClick={() => setDeleteConfirm(item)}
                                    className="text-destructive"
                                  >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Supprimer
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </Card>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!editingContent} onOpenChange={() => setEditingContent(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Modifier le contenu</DialogTitle>
            <DialogDescription>
              Modifiez les informations de votre contenu
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title">Titre</Label>
              <Input
                id="edit-title"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-content">Contenu</Label>
              <Textarea
                id="edit-content"
                value={editBody}
                onChange={(e) => setEditBody(e.target.value)}
                rows={8}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingContent(null)}>
              Annuler
            </Button>
            <Button onClick={handleSaveEdit}>
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Supprimer ce contenu ?</DialogTitle>
            <DialogDescription>
              Cette action est irréversible. Le contenu sera définitivement supprimé.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteConfirm(null)}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  );
};

export default MyContent;
