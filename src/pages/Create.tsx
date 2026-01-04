import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  Sparkles, 
  FileText, 
  Mail, 
  Video, 
  MessageSquare,
  Save,
  Send,
  Calendar,
  ArrowLeft,
  Loader2,
  Wand2
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useContents } from "@/hooks/useContents";
import { supabase } from "@/integrations/supabase/client";

const contentTypes = [
  { id: "post", label: "Post Réseaux", icon: MessageSquare, color: "bg-blue-500" },
  { id: "email", label: "Email", icon: Mail, color: "bg-green-500" },
  { id: "article", label: "Article Blog", icon: FileText, color: "bg-purple-500" },
  { id: "video", label: "Script Vidéo", icon: Video, color: "bg-red-500" },
];

const platforms = [
  { id: "linkedin", label: "LinkedIn" },
  { id: "instagram", label: "Instagram" },
  { id: "facebook", label: "Facebook" },
  { id: "twitter", label: "X (Twitter)" },
  { id: "tiktok", label: "TikTok" },
  { id: "youtube", label: "YouTube" },
  { id: "newsletter", label: "Newsletter" },
  { id: "blog", label: "Blog" },
];

const tones = [
  { id: "professional", label: "Professionnel" },
  { id: "casual", label: "Décontracté" },
  { id: "inspirational", label: "Inspirant" },
  { id: "educational", label: "Éducatif" },
  { id: "humorous", label: "Humoristique" },
];

const Create = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { createContent } = useContents();
  
  const [selectedType, setSelectedType] = useState<string>("post");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [platform, setPlatform] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // AI Generation
  const [aiTopic, setAiTopic] = useState("");
  const [aiTone, setAiTone] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!aiTopic.trim()) {
      toast({
        title: "Sujet requis",
        description: "Entrez un sujet pour générer du contenu",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-content", {
        body: {
          type: selectedType,
          platform: platform || undefined,
          topic: aiTopic,
          tone: aiTone || undefined,
        },
      });

      if (error) throw error;

      if (data?.content) {
        setContent(data.content);
        if (!title) {
          setTitle(aiTopic.slice(0, 60));
        }
        toast({
          title: "Contenu généré !",
          description: "Vous pouvez maintenant le modifier avant de le sauvegarder",
        });
      }
    } catch (error: any) {
      console.error("Generation error:", error);
      toast({
        title: "Erreur de génération",
        description: error.message || "Impossible de générer le contenu",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async (status: "draft" | "scheduled" | "published") => {
    if (!title.trim()) return;
    
    setIsSubmitting(true);
    const result = await createContent({
      title,
      content,
      type: selectedType,
      platform: platform || undefined,
      status,
      scheduled_at: scheduledAt || undefined,
    });
    
    setIsSubmitting(false);
    
    if (result) {
      navigate("/dashboard/content");
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        
        <main className="flex-1 overflow-auto bg-muted/30">
          <header className="h-16 border-b border-border flex items-center px-6 bg-background sticky top-0 z-10">
            <SidebarTrigger />
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="ml-2">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="ml-4 flex-1">
              <h1 className="text-xl font-display font-bold">Créer du contenu</h1>
            </div>
          </header>

          <div className="p-6 max-w-4xl mx-auto space-y-6">
            {/* Type Selection */}
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-4">Type de contenu</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {contentTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      selectedType === type.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg ${type.color} flex items-center justify-center mb-3`}>
                      <type.icon className="w-5 h-5 text-white" />
                    </div>
                    <p className="font-medium">{type.label}</p>
                  </button>
                ))}
              </div>
            </Card>

            {/* AI Generation */}
            <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Génération IA</h3>
                  <p className="text-sm text-muted-foreground">
                    Décrivez votre sujet et laissez l'IA créer le contenu
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ai-topic">Sujet / Idée principale *</Label>
                  <Input
                    id="ai-topic"
                    placeholder="Ex: Les 5 erreurs à éviter en marketing digital"
                    value={aiTopic}
                    onChange={(e) => setAiTopic(e.target.value)}
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Plateforme cible</Label>
                    <Select value={platform} onValueChange={setPlatform}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner..." />
                      </SelectTrigger>
                      <SelectContent>
                        {platforms.map((p) => (
                          <SelectItem key={p.id} value={p.id}>
                            {p.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Ton</Label>
                    <Select value={aiTone} onValueChange={setAiTone}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir un ton..." />
                      </SelectTrigger>
                      <SelectContent>
                        {tones.map((t) => (
                          <SelectItem key={t.id} value={t.id}>
                            {t.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating || !aiTopic.trim()}
                  className="w-full"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Génération en cours...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-4 h-4 mr-2" />
                      Générer le contenu
                    </>
                  )}
                </Button>
              </div>
            </Card>

            {/* Content Form */}
            <Card className="p-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Titre *</Label>
                <Input
                  id="title"
                  placeholder="Ex: Post LinkedIn sur la productivité"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="scheduled">Planifier pour</Label>
                <Input
                  id="scheduled"
                  type="datetime-local"
                  value={scheduledAt}
                  onChange={(e) => setScheduledAt(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Contenu</Label>
                <Textarea
                  id="content"
                  placeholder="Rédigez votre contenu ici ou utilisez la génération IA..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={12}
                  className="resize-none"
                />
              </div>
            </Card>

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => handleSave("draft")}
                disabled={!title.trim() || isSubmitting}
              >
                <Save className="w-4 h-4 mr-2" />
                Brouillon
              </Button>
              
              {scheduledAt && (
                <Button
                  variant="secondary"
                  onClick={() => handleSave("scheduled")}
                  disabled={!title.trim() || isSubmitting}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Planifier
                </Button>
              )}
              
              <Button
                onClick={() => handleSave("published")}
                disabled={!title.trim() || isSubmitting}
              >
                <Send className="w-4 h-4 mr-2" />
                Publier
              </Button>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Create;
