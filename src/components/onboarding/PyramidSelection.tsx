import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Sparkles, Gift, Zap, Crown, Check, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface PyramidOffer {
  title: string;
  composition: string;
  purpose: string;
  format: string;
  price_range?: string;
}

interface Pyramid {
  id: string;
  name: string;
  strategy_summary: string;
  lead_magnet: PyramidOffer;
  low_ticket: PyramidOffer;
  high_ticket: PyramidOffer;
}

interface PyramidSelectionProps {
  profileData: Record<string, unknown>;
  onComplete?: () => void;
}

export const PyramidSelection = ({ profileData, onComplete }: PyramidSelectionProps) => {
  const [pyramids, setPyramids] = useState<Pyramid[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPyramid, setSelectedPyramid] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    generatePyramids();
  }, []);

  const generatePyramids = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.functions.invoke('generate-pyramids', {
        body: { profileData }
      });

      if (error) throw error;

      if (data.pyramids) {
        setPyramids(data.pyramids);
      }
    } catch (error) {
      console.error("Error generating pyramids:", error);
      toast({
        title: "Erreur",
        description: "Impossible de générer les pyramides. Réessayez.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPyramid = async () => {
    if (!selectedPyramid || !user) return;

    const pyramid = pyramids.find(p => p.id === selectedPyramid);
    if (!pyramid) return;

    setSubmitting(true);
    try {
      // Save selected pyramid to profile
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          selected_pyramid: JSON.parse(JSON.stringify(pyramid)),
          pyramid_selected_at: new Date().toISOString(),
        })
        .eq("user_id", user.id);

      if (profileError) throw profileError;

      // Generate tasks based on pyramid
      const tasks = [
        {
          user_id: user.id,
          title: `Créer le Lead Magnet : ${pyramid.lead_magnet.title}`,
          description: `Format: ${pyramid.lead_magnet.format}\n\nComposition: ${pyramid.lead_magnet.composition}\n\nObjectif: ${pyramid.lead_magnet.purpose}`,
          category: "lead_magnet",
          priority: 1,
        },
        {
          user_id: user.id,
          title: `Créer la page de capture pour le Lead Magnet`,
          description: `Créer une page de capture optimisée pour collecter des emails en échange du lead magnet "${pyramid.lead_magnet.title}"`,
          category: "funnel",
          priority: 2,
        },
        {
          user_id: user.id,
          title: `Développer l'offre Low Ticket : ${pyramid.low_ticket.title}`,
          description: `Prix suggéré: ${pyramid.low_ticket.price_range}\n\nFormat: ${pyramid.low_ticket.format}\n\nComposition: ${pyramid.low_ticket.composition}\n\nObjectif: ${pyramid.low_ticket.purpose}`,
          category: "offer",
          priority: 3,
        },
        {
          user_id: user.id,
          title: `Créer la page de vente Low Ticket`,
          description: `Créer une page de vente pour l'offre "${pyramid.low_ticket.title}"`,
          category: "funnel",
          priority: 4,
        },
        {
          user_id: user.id,
          title: `Développer l'offre High Ticket : ${pyramid.high_ticket.title}`,
          description: `Prix suggéré: ${pyramid.high_ticket.price_range}\n\nFormat: ${pyramid.high_ticket.format}\n\nComposition: ${pyramid.high_ticket.composition}\n\nObjectif: ${pyramid.high_ticket.purpose}`,
          category: "offer",
          priority: 5,
        },
        {
          user_id: user.id,
          title: `Créer la page de vente High Ticket`,
          description: `Créer une page de vente pour l'offre "${pyramid.high_ticket.title}"`,
          category: "funnel",
          priority: 6,
        },
        {
          user_id: user.id,
          title: `Mettre en place la séquence email de nurturing`,
          description: `Créer une séquence email pour convertir les leads du lead magnet vers l'offre low ticket`,
          category: "email",
          priority: 7,
        },
      ];

      const { error: tasksError } = await supabase
        .from("tasks")
        .insert(tasks);

      if (tasksError) throw tasksError;

      toast({
        title: "Pyramide sélectionnée !",
        description: "Vos tâches ont été générées. Bienvenue dans Tipote™ !",
      });

      if (onComplete) {
        onComplete();
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error saving pyramid:", error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder votre choix.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex flex-col items-center justify-center p-6">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto animate-pulse">
            <Sparkles className="w-8 h-8 text-primary-foreground" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-display font-bold">Génération de vos stratégies...</h2>
            <p className="text-muted-foreground">
              L'IA analyse votre profil pour créer 3 pyramides d'offres personnalisées
            </p>
          </div>
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex flex-col">
      {/* Header */}
      <header className="p-6 border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl">Tipote™</span>
          </div>
          <Badge variant="secondary">Dernière étape</Badge>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <h1 className="text-3xl font-display font-bold">
              Choisissez votre stratégie
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Basé sur votre profil, l'IA a créé 3 pyramides d'offres adaptées à votre situation. 
              Choisissez celle qui correspond le mieux à votre vision.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {pyramids.map((pyramid) => (
              <Card 
                key={pyramid.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  selectedPyramid === pyramid.id 
                    ? 'ring-2 ring-primary shadow-lg scale-[1.02]' 
                    : 'hover:scale-[1.01]'
                }`}
                onClick={() => setSelectedPyramid(pyramid.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{pyramid.name}</CardTitle>
                    {selectedPyramid === pyramid.id && (
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <Check className="w-4 h-4 text-primary-foreground" />
                      </div>
                    )}
                  </div>
                  <CardDescription className="text-sm italic">
                    "{pyramid.strategy_summary}"
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Lead Magnet */}
                  <div className="p-3 rounded-lg bg-muted/50 space-y-2">
                    <div className="flex items-center gap-2">
                      <Gift className="w-4 h-4 text-green-500" />
                      <span className="text-xs font-medium uppercase text-muted-foreground">Lead Magnet</span>
                      <Badge variant="outline" className="text-xs ml-auto">Gratuit</Badge>
                    </div>
                    <p className="font-medium text-sm">{pyramid.lead_magnet.title}</p>
                    <p className="text-xs text-muted-foreground">{pyramid.lead_magnet.format}</p>
                    <p className="text-xs">{pyramid.lead_magnet.purpose}</p>
                  </div>

                  {/* Low Ticket */}
                  <div className="p-3 rounded-lg bg-muted/50 space-y-2">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-blue-500" />
                      <span className="text-xs font-medium uppercase text-muted-foreground">Low Ticket</span>
                      <Badge variant="outline" className="text-xs ml-auto">{pyramid.low_ticket.price_range}</Badge>
                    </div>
                    <p className="font-medium text-sm">{pyramid.low_ticket.title}</p>
                    <p className="text-xs text-muted-foreground">{pyramid.low_ticket.format}</p>
                    <p className="text-xs">{pyramid.low_ticket.purpose}</p>
                  </div>

                  {/* High Ticket */}
                  <div className="p-3 rounded-lg bg-muted/50 space-y-2">
                    <div className="flex items-center gap-2">
                      <Crown className="w-4 h-4 text-amber-500" />
                      <span className="text-xs font-medium uppercase text-muted-foreground">High Ticket</span>
                      <Badge variant="outline" className="text-xs ml-auto">{pyramid.high_ticket.price_range}</Badge>
                    </div>
                    <p className="font-medium text-sm">{pyramid.high_ticket.title}</p>
                    <p className="text-xs text-muted-foreground">{pyramid.high_ticket.format}</p>
                    <p className="text-xs">{pyramid.high_ticket.purpose}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Action Button */}
          <div className="flex justify-center pt-4">
            <Button
              size="lg"
              disabled={!selectedPyramid || submitting}
              onClick={handleSelectPyramid}
              className="min-w-[250px]"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Création des tâches...
                </>
              ) : (
                <>
                  Choisir cette stratégie
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>

          <p className="text-center text-xs text-muted-foreground">
            Vous pourrez modifier vos offres à tout moment dans les paramètres.
          </p>
        </div>
      </main>
    </div>
  );
};
