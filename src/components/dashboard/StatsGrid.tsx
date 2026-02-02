import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  CheckCircle2, 
  Calendar,
  Clock
} from "lucide-react";

interface StatsGridProps {
  totalContents: number;
  publishedContents: number;
  scheduledContents: number;
  completedTasks: number;
  totalTasks: number;
}

export function StatsGrid({ 
  totalContents, 
  publishedContents, 
  scheduledContents,
  completedTasks,
  totalTasks 
}: StatsGridProps) {
  const taskProgress = totalTasks > 0 
    ? Math.round((completedTasks / totalTasks) * 100) 
    : 0;

  const stats = [
    { 
      label: "Contenus créés", 
      value: totalContents.toString(), 
      subtext: `${publishedContents} publiés`,
      icon: FileText 
    },
    { 
      label: "Planifiés", 
      value: scheduledContents.toString(), 
      subtext: "à venir",
      icon: Calendar 
    },
    { 
      label: "Tâches complétées", 
      value: `${taskProgress}%`, 
      subtext: `${completedTasks}/${totalTasks}`,
      icon: CheckCircle2 
    },
    { 
      label: "En attente", 
      value: (totalTasks - completedTasks).toString(), 
      subtext: "tâches",
      icon: Clock 
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="p-5 hover:shadow-md transition-all">
          <div className="flex items-start justify-between mb-3">
            <div className="p-2.5 rounded-xl bg-muted">
              <stat.icon className="w-5 h-5 text-primary" />
            </div>
            <Badge variant="outline" className="text-xs">
              {stat.subtext}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
          <p className="text-2xl font-bold">{stat.value}</p>
        </Card>
      ))}
    </div>
  );
}
