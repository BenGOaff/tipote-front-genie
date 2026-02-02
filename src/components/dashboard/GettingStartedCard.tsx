import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Target, 
  ArrowRight,
  Rocket,
  MessageCircle,
  ShoppingBag,
  Megaphone,
  Mail,
  Filter
} from "lucide-react";
import { Link } from "react-router-dom";

interface GettingStartedCardProps {
  firstName: string | null;
  hasPyramid: boolean;
  hasOffers: boolean;
  hasPosts: boolean;
  hasEmails: boolean;
  hasFunnels: boolean;
  totalContents: number;
}

interface SuggestedAction {
  id: string;
  title: string;
  description: string;
  link: string;
  icon: React.ComponentType<{ className?: string }>;
  priority: number;
}

export function GettingStartedCard({ 
  firstName, 
  hasPyramid,
  hasOffers,
  hasPosts,
  hasEmails,
  hasFunnels,
  totalContents
}: GettingStartedCardProps) {
  
  // Build contextual suggestions based on user's current situation
  const getSuggestedActions = (): SuggestedAction[] => {
    const actions: SuggestedAction[] = [];

    // Priority 1: If no pyramid yet (shouldn't happen after onboarding, but safety)
    if (!hasPyramid) {
      actions.push({
        id: 'strategy',
        title: 'Définir ta stratégie',
        description: 'Choisis ta pyramide d\'offres pour structurer ton business',
        link: '/dashboard/strategy',
        icon: Target,
        priority: 1,
      });
    }

    // Priority 2: Review/refine strategy if pyramid exists
    if (hasPyramid && totalContents === 0) {
      actions.push({
        id: 'review-strategy',
        title: 'Affiner ta stratégie',
        description: 'Vérifie et personnalise les offres de ta pyramide',
        link: '/dashboard/strategy',
        icon: Target,
        priority: 2,
      });
    }

    // Priority 3: Create offer content if no offers created yet
    if (!hasOffers && hasPyramid) {
      actions.push({
        id: 'create-offer',
        title: 'Créer ton offre',
        description: 'Rédige la page de vente de ton premier produit',
        link: '/dashboard/create',
        icon: ShoppingBag,
        priority: 3,
      });
    }

    // Priority 4: Create funnel if no funnel yet
    if (!hasFunnels && hasPyramid) {
      actions.push({
        id: 'create-funnel',
        title: 'Créer ton tunnel',
        description: 'Construis ton parcours de conversion',
        link: '/dashboard/create',
        icon: Filter,
        priority: 4,
      });
    }

    // Priority 5: Create first post if none
    if (!hasPosts) {
      actions.push({
        id: 'create-post',
        title: 'Créer ton premier post',
        description: 'Lance-toi avec du contenu sur les réseaux sociaux',
        link: '/dashboard/create',
        icon: Megaphone,
        priority: 5,
      });
    }

    // Priority 6: Create email sequence if no emails
    if (!hasEmails && hasPosts) {
      actions.push({
        id: 'create-email',
        title: 'Créer tes emails',
        description: 'Prépare ta séquence email pour convertir',
        link: '/dashboard/create',
        icon: Mail,
        priority: 6,
      });
    }

    // Always available: Chat with AI coach
    actions.push({
      id: 'coach',
      title: 'Discuter avec le coach IA',
      description: 'Besoin d\'aide ? Pose tes questions au coach',
      link: '/dashboard/create', // TODO: link to coach when available
      icon: MessageCircle,
      priority: 10,
    });

    // Sort by priority and take top 3
    return actions.sort((a, b) => a.priority - b.priority).slice(0, 3);
  };

  const suggestedActions = getSuggestedActions();

  // Don't show if user is fully set up (has content of multiple types)
  if (hasPyramid && hasPosts && hasEmails && hasFunnels && totalContents > 5) {
    return null;
  }

  return (
    <Card className="p-6 border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Rocket className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold mb-1">
            {firstName ? `Salut ${firstName} !` : 'Salut !'} 👋
          </h2>
          <p className="text-muted-foreground">
            Voici ce que je te suggère de faire aujourd'hui pour avancer sur ton Tipote.
          </p>
        </div>
        <Badge variant="secondary" className="whitespace-nowrap">
          {suggestedActions.length} actions
        </Badge>
      </div>

      <div className="space-y-3">
        {suggestedActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.id}
              to={action.link}
              className="block"
            >
              <div className={`flex items-center gap-4 p-4 rounded-lg border transition-all bg-background border-border hover:border-primary/50 hover:shadow-sm cursor-pointer group`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  index === 0 
                    ? 'gradient-primary' 
                    : 'bg-secondary'
                }`}>
                  <Icon className={`w-5 h-5 ${index === 0 ? 'text-primary-foreground' : 'text-secondary-foreground'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold group-hover:text-primary transition-colors">
                    {action.title}
                  </p>
                  <p className="text-sm text-muted-foreground truncate">
                    {action.description}
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </Link>
          );
        })}
      </div>
    </Card>
  );
}
