import { Zap } from "lucide-react";

interface QuickTemplateCardProps {
  id: string;
  label: string;
  description: string;
  onClick: () => void;
}

export function QuickTemplateCard({ label, description, onClick }: QuickTemplateCardProps) {
  return (
    <button
      onClick={onClick}
      className="p-4 rounded-xl border border-border bg-card hover:border-primary hover:bg-primary/5 transition-all text-left group flex items-start gap-3"
    >
      <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
        <Zap className="w-4 h-4 text-primary-foreground" />
      </div>
      <div>
        <h4 className="font-semibold text-foreground text-sm">{label}</h4>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </button>
  );
}
