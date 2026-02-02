import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Target, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Rocket
} from "lucide-react";
import { Link } from "react-router-dom";

interface GettingStartedCardProps {
  hasPyramid: boolean;
  hasContents: boolean;
  firstName: string | null;
}

export function GettingStartedCard({ hasPyramid, hasContents, firstName }: GettingStartedCardProps) {
  const steps = [
    {
      id: 'pyramid',
      title: 'Définir ta stratégie',
      description: 'Choisis ta pyramide d\'offres pour structurer ton business',
      completed: hasPyramid,
      link: '/dashboard/strategy',
      icon: Target,
    },
    {
      id: 'content',
      title: 'Créer ton premier contenu',
      description: 'Lance-toi avec ton premier post ou article',
      completed: hasContents,
      link: '/dashboard/create',
      icon: Sparkles,
    },
  ];

  const completedSteps = steps.filter(s => s.completed).length;
  const progressPercent = (completedSteps / steps.length) * 100;

  if (completedSteps === steps.length) {
    return null; // Ne pas afficher si tout est complété
  }

  return (
    <Card className="p-6 border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Rocket className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold mb-1">
            {firstName ? `Bienvenue ${firstName} !` : 'Bienvenue !'} 🎉
          </h2>
          <p className="text-muted-foreground">
            Suis ces étapes pour lancer ton Tipote et commencer à créer du contenu stratégique.
          </p>
        </div>
        <Badge variant="secondary" className="whitespace-nowrap">
          {completedSteps}/{steps.length} étapes
        </Badge>
      </div>

      <Progress value={progressPercent} className="h-2 mb-6" />

      <div className="space-y-3">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`flex items-center gap-4 p-4 rounded-lg border transition-all ${
              step.completed 
                ? 'bg-muted/30 border-muted' 
                : 'bg-background border-border hover:border-primary/50 hover:shadow-sm'
            }`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              step.completed 
                ? 'bg-green-100 text-green-600' 
                : 'bg-primary/10 text-primary'
            }`}>
              {step.completed ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                <span className="font-bold text-sm">{index + 1}</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`font-semibold ${step.completed ? 'text-muted-foreground line-through' : ''}`}>
                {step.title}
              </p>
              <p className="text-sm text-muted-foreground truncate">
                {step.description}
              </p>
            </div>
            {!step.completed && (
              <Link to={step.link}>
                <Button size="sm" variant="default">
                  Commencer
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}
