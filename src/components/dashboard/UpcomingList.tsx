import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { format, isToday, isTomorrow } from "date-fns";
import { fr } from "date-fns/locale";

interface UpcomingContent {
  id: string;
  title: string;
  type: string;
  platform: string | null;
  scheduled_at: string | null;
  status: string;
}

interface UpcomingListProps {
  contents: UpcomingContent[];
}

function formatDay(dateStr: string): string {
  const date = new Date(dateStr);
  if (isToday(date)) return "Aujourd'hui";
  if (isTomorrow(date)) return "Demain";
  return format(date, "EEEE", { locale: fr });
}

function formatTime(dateStr: string): string {
  return format(new Date(dateStr), "HH:mm");
}

const statusLabels: Record<string, string> = {
  draft: "Brouillon",
  scheduled: "Planifié",
  published: "Publié",
};

const statusVariants: Record<string, "default" | "secondary" | "outline"> = {
  draft: "outline",
  scheduled: "secondary",
  published: "default",
};

export function UpcomingList({ contents }: UpcomingListProps) {
  if (contents.length === 0) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold">À venir cette semaine</h3>
        </div>
        <div className="text-center py-8 text-muted-foreground">
          <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>Aucun contenu planifié</p>
          <Link to="/dashboard/create">
            <Button variant="link" className="mt-2">
              Créer du contenu →
            </Button>
          </Link>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold">À venir cette semaine</h3>
        <Link to="/dashboard/content">
          <Button variant="ghost" size="sm">
            Tout voir
          </Button>
        </Link>
      </div>
      
      <div className="space-y-3">
        {contents.map((item) => (
          <div 
            key={item.id} 
            className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
          >
            <div className="flex-shrink-0">
              <Badge variant={statusVariants[item.status] || "outline"} className="capitalize">
                {item.type}
              </Badge>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{item.title}</p>
              <p className="text-sm text-muted-foreground">
                {item.scheduled_at && (
                  <>
                    {formatDay(item.scheduled_at)} • {formatTime(item.scheduled_at)}
                  </>
                )}
                {item.platform && ` • ${item.platform}`}
              </p>
            </div>
            <Badge variant="outline" className="text-xs">
              {statusLabels[item.status] || item.status}
            </Badge>
          </div>
        ))}
      </div>
    </Card>
  );
}
