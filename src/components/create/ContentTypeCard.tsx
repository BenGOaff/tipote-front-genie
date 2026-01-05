import { LucideIcon } from "lucide-react";

interface ContentTypeCardProps {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
  color: string;
  onClick: () => void;
}

export function ContentTypeCard({ label, description, icon: Icon, color, onClick }: ContentTypeCardProps) {
  return (
    <button
      onClick={onClick}
      className="p-5 rounded-xl border-2 border-border bg-card hover:border-primary/50 hover:shadow-lg transition-all text-left group"
    >
      <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="font-bold text-foreground mb-1">{label}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </button>
  );
}
