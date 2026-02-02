import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Target, 
  Play,
  Brain,
  Calendar,
  FileText,
  Mail,
  Video,
  Megaphone
} from "lucide-react";
import { Link } from "react-router-dom";
import { format, isToday, isTomorrow, formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

interface UpcomingContent {
  id: string;
  title: string;
  type: string;
  platform: string | null;
  scheduled_at: string | null;
  status: string;
}

interface NextActionCardProps {
  upcomingContent: UpcomingContent | null;
  hasStrategy: boolean;
}

const typeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  post: Megaphone,
  article: FileText,
  email: Mail,
  video: Video,
};

function formatScheduledDate(dateStr: string): string {
  const date = new Date(dateStr);
  if (isToday(date)) {
    return `Aujourd'hui à ${format(date, 'HH:mm')}`;
  }
  if (isTomorrow(date)) {
    return `Demain à ${format(date, 'HH:mm')}`;
  }
  return format(date, "EEEE d MMMM 'à' HH:mm", { locale: fr });
}

export function NextActionCard({ upcomingContent, hasStrategy }: NextActionCardProps) {
  // Si pas de stratégie, encourager à la définir
  if (!hasStrategy) {
    return (
      <Card className="p-8 gradient-hero border-border/50">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-background/20 backdrop-blur-sm flex items-center justify-center">
                <Target className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <p className="text-primary-foreground/80 text-sm">Pour commencer</p>
                <h2 className="text-2xl font-bold text-primary-foreground">
                  Définis ta stratégie
                </h2>
              </div>
            </div>
            
            <p className="text-primary-foreground/80 mb-6 max-w-lg">
              Ta pyramide d'offres n'est pas encore définie. C'est la première étape pour créer du contenu aligné avec tes objectifs business.
            </p>

            <Link to="/dashboard/strategy">
              <Button variant="secondary" size="lg">
                <Target className="w-4 h-4 mr-2" />
                Définir ma stratégie
              </Button>
            </Link>
          </div>
          <Brain className="w-20 h-20 text-primary-foreground/30 hidden lg:block" />
        </div>
      </Card>
    );
  }

  // Si pas de contenu à venir, encourager à créer
  if (!upcomingContent) {
    return (
      <Card className="p-8 gradient-hero border-border/50">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-background/20 backdrop-blur-sm flex items-center justify-center">
                <Play className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <p className="text-primary-foreground/80 text-sm">C'est calme...</p>
                <h2 className="text-2xl font-bold text-primary-foreground">
                  Aucun contenu planifié
                </h2>
              </div>
            </div>
            
            <p className="text-primary-foreground/80 mb-6 max-w-lg">
              Tu n'as pas de contenu prévu pour les prochains jours. C'est le moment idéal pour créer et planifier du nouveau contenu !
            </p>

            <Link to="/dashboard/create">
              <Button variant="secondary" size="lg">
                <Play className="w-4 h-4 mr-2" />
                Créer du contenu
              </Button>
            </Link>
          </div>
          <Brain className="w-20 h-20 text-primary-foreground/30 hidden lg:block" />
        </div>
      </Card>
    );
  }

  // Contenu à venir
  const Icon = typeIcons[upcomingContent.type] || FileText;

  return (
    <Card className="p-8 gradient-hero border-border/50">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-background/20 backdrop-blur-sm flex items-center justify-center">
              <Icon className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <p className="text-primary-foreground/80 text-sm">Ta prochaine action</p>
              <h2 className="text-2xl font-bold text-primary-foreground">
                {upcomingContent.title}
              </h2>
            </div>
          </div>
          
          <div className="flex items-center gap-3 mb-6">
            <Badge className="bg-background/20 text-primary-foreground border-none capitalize">
              {upcomingContent.type}
            </Badge>
            {upcomingContent.platform && (
              <Badge className="bg-background/20 text-primary-foreground border-none capitalize">
                {upcomingContent.platform}
              </Badge>
            )}
            {upcomingContent.scheduled_at && (
              <span className="text-primary-foreground/80 text-sm flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatScheduledDate(upcomingContent.scheduled_at)}
              </span>
            )}
          </div>

          <div className="flex gap-3">
            <Link to="/dashboard/create">
              <Button variant="secondary" size="lg">
                <Play className="w-4 h-4 mr-2" />
                Créer en 1 clic
              </Button>
            </Link>
            <Link to="/dashboard/content">
              <Button variant="ghost" className="text-primary-foreground hover:bg-background/10">
                Voir mes contenus
              </Button>
            </Link>
          </div>
        </div>
        <Brain className="w-20 h-20 text-primary-foreground/30 hidden lg:block" />
      </div>
    </Card>
  );
}
