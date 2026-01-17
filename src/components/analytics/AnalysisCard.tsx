import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import ReactMarkdown from "react-markdown";

interface AnalysisCardProps {
  analysis: string | null;
  month?: string;
  isLoading?: boolean;
}

export const AnalysisCard = ({ analysis, month, isLoading }: AnalysisCardProps) => {
  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
            <Loader2 className="w-5 h-5 text-primary-foreground animate-spin" />
          </div>
          <div>
            <h3 className="text-lg font-bold">Analyse en cours...</h3>
            <p className="text-sm text-muted-foreground">L'IA examine tes données</p>
          </div>
        </div>
        <div className="space-y-3">
          <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
          <div className="h-4 bg-muted rounded animate-pulse w-full" />
          <div className="h-4 bg-muted rounded animate-pulse w-5/6" />
        </div>
      </Card>
    );
  }

  if (!analysis) {
    return (
      <Card className="p-6 border-dashed">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-bold">Diagnostic IA</h3>
            <p className="text-sm text-muted-foreground">Saisis tes métriques pour obtenir une analyse personnalisée</p>
          </div>
        </div>
        <p className="text-muted-foreground text-sm">
          L'IA analysera tes données et te donnera des recommandations concrètes pour améliorer tes résultats.
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-bold">Diagnostic IA</h3>
            {month && (
              <p className="text-sm text-muted-foreground">
                Analyse de {format(new Date(month), "MMMM yyyy", { locale: fr })}
              </p>
            )}
          </div>
        </div>
        <Badge variant="secondary" className="gap-1">
          <Sparkles className="w-3 h-3" />
          IA
        </Badge>
      </div>
      
      <div className="prose prose-sm dark:prose-invert max-w-none">
        <ReactMarkdown
          components={{
            h2: ({ children }) => (
              <h4 className="text-base font-bold mt-4 mb-2 first:mt-0">{children}</h4>
            ),
            p: ({ children }) => (
              <p className="text-sm text-foreground/90 mb-3 leading-relaxed">{children}</p>
            ),
            ul: ({ children }) => (
              <ul className="text-sm space-y-1 mb-3">{children}</ul>
            ),
            li: ({ children }) => (
              <li className="text-foreground/90">{children}</li>
            ),
          }}
        >
          {analysis}
        </ReactMarkdown>
      </div>
    </Card>
  );
};
