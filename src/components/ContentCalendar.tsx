import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Content } from "@/hooks/useContents";
import { format, isSameDay } from "date-fns";
import { fr } from "date-fns/locale";
import { FileText, Mail, Video, MessageSquare, Clock } from "lucide-react";

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

interface ContentCalendarProps {
  contents: Content[];
  onSelectContent?: (content: Content) => void;
}

export function ContentCalendar({ contents, onSelectContent }: ContentCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const getContentsForDate = (date: Date) => {
    return contents.filter((content) => {
      const contentDate = content.scheduled_at 
        ? new Date(content.scheduled_at) 
        : new Date(content.created_at);
      return isSameDay(contentDate, date);
    });
  };

  const selectedContents = selectedDate ? getContentsForDate(selectedDate) : [];

  // Create modifiers for dates with content
  const datesWithContent = contents.reduce((acc, content) => {
    const date = content.scheduled_at 
      ? new Date(content.scheduled_at) 
      : new Date(content.created_at);
    const dateStr = format(date, "yyyy-MM-dd");
    if (!acc[dateStr]) {
      acc[dateStr] = { date, count: 0, hasScheduled: false, hasPublished: false };
    }
    acc[dateStr].count++;
    if (content.status === "scheduled") acc[dateStr].hasScheduled = true;
    if (content.status === "published") acc[dateStr].hasPublished = true;
    return acc;
  }, {} as Record<string, { date: Date; count: number; hasScheduled: boolean; hasPublished: boolean }>);

  const scheduledDays = Object.values(datesWithContent)
    .filter(d => d.hasScheduled)
    .map(d => d.date);

  const publishedDays = Object.values(datesWithContent)
    .filter(d => d.hasPublished && !d.hasScheduled)
    .map(d => d.date);

  return (
    <div className="grid md:grid-cols-[350px_1fr] gap-6">
      <Card className="p-4">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          locale={fr}
          modifiers={{
            scheduled: scheduledDays,
            published: publishedDays,
          }}
          modifiersClassNames={{
            scheduled: "bg-blue-100 dark:bg-blue-900/50 font-bold",
            published: "bg-green-100 dark:bg-green-900/50",
          }}
          className="rounded-md"
        />
        <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-blue-100 dark:bg-blue-900/50" />
            <span>Planifié</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-green-100 dark:bg-green-900/50" />
            <span>Publié</span>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        {selectedDate && (
          <>
            <h3 className="text-lg font-bold mb-4 capitalize">
              {format(selectedDate, "EEEE d MMMM yyyy", { locale: fr })}
            </h3>
            
            {selectedContents.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                Aucun contenu pour cette date
              </p>
            ) : (
              <div className="space-y-3">
                {selectedContents.map((content) => {
                  const Icon = typeIcons[content.type] || FileText;
                  return (
                    <div 
                      key={content.id}
                      className="flex items-center gap-4 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors"
                      onClick={() => onSelectContent?.(content)}
                    >
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{content.title}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          {content.platform && <span className="capitalize">{content.platform}</span>}
                          {content.scheduled_at && (
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {format(new Date(content.scheduled_at), "HH:mm")}
                            </span>
                          )}
                        </div>
                      </div>
                      <Badge className={statusColors[content.status]}>
                        {statusLabels[content.status]}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </Card>
    </div>
  );
}
