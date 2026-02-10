import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useQuizzes, Quiz, QuizLead } from "@/hooks/useQuizzes";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  Copy,
  Download,
  Eye,
  Trash2,
  Link2,
  Code,
  Search,
  ExternalLink,
  Loader2,
} from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const QuizDetail = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { fetchQuizWithDetails, fetchLeads, exportLeadsCSV, updateQuiz, deleteQuiz } = useQuizzes();

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [leads, setLeads] = useState<QuizLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchLeads, setSearchLeads] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  useEffect(() => {
    if (quizId) loadData();
  }, [quizId]);

  const loadData = async () => {
    setLoading(true);
    const [q, l] = await Promise.all([
      fetchQuizWithDetails(quizId!),
      fetchLeads(quizId!),
    ]);
    setQuiz(q);
    setLeads(l);
    setLoading(false);
  };

  const quizUrl = `${window.location.origin}/quiz/${quizId}`;
  const iframeCode = `<iframe src="${quizUrl}" width="100%" height="700" frameborder="0"></iframe>`;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copié !", description: `${label} copié dans le presse-papiers.` });
  };

  const handleToggleStatus = async () => {
    if (!quiz) return;
    const newStatus = quiz.status === "active" ? "draft" : "active";
    await updateQuiz(quiz.id, { status: newStatus } as any);
    setQuiz(prev => prev ? { ...prev, status: newStatus } : prev);
  };

  const handleDelete = async () => {
    if (!quiz) return;
    await deleteQuiz(quiz.id);
    navigate("/dashboard/content");
  };

  const filteredLeads = leads.filter(l =>
    l.email.toLowerCase().includes(searchLeads.toLowerCase()) ||
    (l.result_title || "").toLowerCase().includes(searchLeads.toLowerCase())
  );

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

  if (!quiz) {
    return (
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar />
          <main className="flex-1 flex items-center justify-center">
            <p className="text-muted-foreground">Quiz introuvable.</p>
          </main>
        </div>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 overflow-auto bg-muted/30">
          <header className="h-16 border-b border-border flex items-center px-6 bg-background sticky top-0 z-10">
            <SidebarTrigger />
            <Button variant="ghost" size="icon" className="ml-2" onClick={() => navigate("/dashboard/content")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="ml-3 flex-1">
              <h1 className="text-xl font-display font-bold truncate">{quiz.title}</h1>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={quiz.status === "active" ? "default" : "secondary"}>
                {quiz.status === "active" ? "Actif" : "Brouillon"}
              </Badge>
              <Button variant="outline" size="sm" onClick={handleToggleStatus}>
                {quiz.status === "active" ? "Désactiver" : "Activer"}
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setDeleteConfirm(true)} className="text-destructive">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </header>

          <div className="p-6 max-w-5xl mx-auto space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="p-4 text-center">
                <p className="text-sm text-muted-foreground">👀 Vues</p>
                <p className="text-2xl font-bold">{quiz.views_count}</p>
              </Card>
              <Card className="p-4 text-center">
                <p className="text-sm text-muted-foreground">✉️ Emails</p>
                <p className="text-2xl font-bold">{leads.length}</p>
              </Card>
              <Card className="p-4 text-center">
                <p className="text-sm text-muted-foreground">🔁 Partages</p>
                <p className="text-2xl font-bold">{quiz.shares_count}</p>
              </Card>
            </div>

            <Tabs defaultValue="quiz">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="quiz">🧩 Quiz</TabsTrigger>
                <TabsTrigger value="share">📤 Partager</TabsTrigger>
                <TabsTrigger value="leads">📊 Résultats ({leads.length})</TabsTrigger>
              </TabsList>

              {/* Tab 1: Quiz content */}
              <TabsContent value="quiz" className="mt-4 space-y-4">
                <Card className="p-4">
                  <h3 className="font-bold mb-2">Introduction</h3>
                  <p className="text-muted-foreground">{quiz.introduction || "Aucune introduction"}</p>
                </Card>
                <Card className="p-4 space-y-3">
                  <h3 className="font-bold">{quiz.questions?.length || 0} Questions</h3>
                  {quiz.questions?.map((q, i) => (
                    <div key={q.id || i} className="p-3 rounded-lg bg-muted/50">
                      <p className="font-medium">Q{i + 1}. {q.question_text}</p>
                      <div className="mt-2 space-y-1 pl-4">
                        {q.options.map((o, oi) => (
                          <p key={oi} className="text-sm text-muted-foreground">
                            {String.fromCharCode(65 + oi)}. {o.text}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </Card>
                <Card className="p-4 space-y-3">
                  <h3 className="font-bold">{quiz.results?.length || 0} Profils résultat</h3>
                  {quiz.results?.map((r, i) => (
                    <div key={r.id || i} className="p-3 rounded-lg bg-muted/50">
                      <p className="font-bold">{r.title}</p>
                      {r.description && <p className="text-sm text-muted-foreground mt-1">{r.description}</p>}
                    </div>
                  ))}
                </Card>
                <Button variant="outline" onClick={() => window.open(quizUrl, "_blank")}>
                  <Eye className="w-4 h-4 mr-2" /> Prévisualiser le quiz
                </Button>
              </TabsContent>

              {/* Tab 2: Share */}
              <TabsContent value="share" className="mt-4 space-y-4">
                <Card className="p-4 space-y-3">
                  <h3 className="font-bold flex items-center gap-2"><Link2 className="w-4 h-4" /> Lien public</h3>
                  <div className="flex gap-2">
                    <Input value={quizUrl} readOnly className="flex-1 text-sm" />
                    <Button variant="outline" onClick={() => copyToClipboard(quizUrl, "Lien")}>
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" onClick={() => window.open(quizUrl, "_blank")}>
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
                <Card className="p-4 space-y-3">
                  <h3 className="font-bold flex items-center gap-2"><Code className="w-4 h-4" /> Code iframe (embed)</h3>
                  <div className="flex gap-2">
                    <Input value={iframeCode} readOnly className="flex-1 text-xs font-mono" />
                    <Button variant="outline" onClick={() => copyToClipboard(iframeCode, "Code iframe")}>
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              </TabsContent>

              {/* Tab 3: Leads */}
              <TabsContent value="leads" className="mt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Rechercher..."
                      value={searchLeads}
                      onChange={(e) => setSearchLeads(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline" onClick={() => exportLeadsCSV(leads, quiz.title)}>
                    <Download className="w-4 h-4 mr-2" /> Export CSV
                  </Button>
                </div>

                {filteredLeads.length === 0 ? (
                  <Card className="p-8 text-center">
                    <p className="text-muted-foreground">Aucun lead pour le moment.</p>
                  </Card>
                ) : (
                  <Card>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Email</TableHead>
                          <TableHead>Résultat</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Bonus</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredLeads.map((lead) => (
                          <TableRow key={lead.id}>
                            <TableCell className="font-medium">{lead.email}</TableCell>
                            <TableCell>
                              <Badge variant="secondary">{lead.result_title || "—"}</Badge>
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {format(new Date(lead.created_at), "dd/MM/yyyy", { locale: fr })}
                            </TableCell>
                            <TableCell>
                              {lead.bonus_unlocked ? (
                                <Badge className="bg-green-100 text-green-700">Oui</Badge>
                              ) : (
                                <span className="text-muted-foreground text-sm">Non</span>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>

      {/* Delete confirm */}
      <Dialog open={deleteConfirm} onOpenChange={setDeleteConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Supprimer ce quiz ?</DialogTitle>
            <DialogDescription>
              Cette action est irréversible. Toutes les questions, résultats et leads seront supprimés.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteConfirm(false)}>Annuler</Button>
            <Button variant="destructive" onClick={handleDelete}>Supprimer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  );
};

export default QuizDetail;
