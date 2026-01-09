import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

export type TutorialPhase = 
  | 'welcome'           // Phase 1: Modal d'accueil
  | 'api_settings'      // Phase 2.1: Spotlight Paramètres
  | 'api_tab'           // Phase 2.2: Spotlight onglet IA & API
  | 'api_fields'        // Phase 2.3: Tooltip champs API
  | 'api_validated'     // Phase 2.4: Toast validation
  | 'tour_today'        // Phase 3.1: Spotlight Aujourd'hui
  | 'tour_create'       // Phase 3.2: Spotlight Créer
  | 'tour_strategy'     // Phase 3.3: Spotlight Ma Stratégie
  | 'tour_complete'     // Fin du tour
  | 'completed';        // Didacticiel terminé

export type ContextualTooltip = 
  | 'first_create_click'     // Phase 4.1
  | 'first_content_generated' // Phase 4.2
  | 'first_my_content_visit'  // Phase 4.3
  | 'first_analytics_visit';  // Phase 4.4

interface TutorialContextType {
  phase: TutorialPhase;
  setPhase: (phase: TutorialPhase) => void;
  nextPhase: () => void;
  skipTutorial: () => void;
  showWelcome: boolean;
  setShowWelcome: (show: boolean) => void;
  contextFlags: Record<string, boolean>;
  markContextSeen: (key: ContextualTooltip) => void;
  hasSeenContext: (key: ContextualTooltip) => boolean;
  isLoading: boolean;
  shouldHighlight: (element: string) => boolean;
  currentTooltip: string | null;
}

const TutorialContext = createContext<TutorialContextType | undefined>(undefined);

const PHASE_ORDER: TutorialPhase[] = [
  'welcome',
  'api_settings',
  'api_tab',
  'api_fields',
  'api_validated',
  'tour_today',
  'tour_create',
  'tour_strategy',
  'tour_complete',
  'completed'
];

export function TutorialProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [phase, setPhaseState] = useState<TutorialPhase>('completed');
  const [showWelcome, setShowWelcome] = useState(false);
  const [contextFlags, setContextFlags] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [tutorialCompleted, setTutorialCompleted] = useState(true);

  // Load tutorial state from profile
  useEffect(() => {
    const loadTutorialState = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('tutorial_completed, tutorial_step, tutorial_context_flags, onboarding_completed')
          .eq('user_id', user.id)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Error loading tutorial state:', error);
        }

        if (profile) {
          setTutorialCompleted(profile.tutorial_completed || false);
          setContextFlags((profile.tutorial_context_flags as Record<string, boolean>) || {});
          
          if (!profile.tutorial_completed && profile.onboarding_completed) {
            // L'utilisateur a terminé l'onboarding mais pas le tutoriel
            const savedPhase = profile.tutorial_step as TutorialPhase;
            if (savedPhase && PHASE_ORDER.includes(savedPhase)) {
              setPhaseState(savedPhase);
            } else {
              // Première connexion après création de compte
              setPhaseState('welcome');
              setShowWelcome(true);
            }
          } else if (!profile.onboarding_completed) {
            // L'utilisateur n'a pas terminé l'onboarding, afficher la modale de bienvenue
            setPhaseState('welcome');
            setShowWelcome(true);
          } else {
            setPhaseState('completed');
          }
        } else {
          // Nouveau profil
          setPhaseState('welcome');
          setShowWelcome(true);
          setTutorialCompleted(false);
        }
      } catch (err) {
        console.error('Error loading tutorial:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadTutorialState();
  }, [user]);

  // Save tutorial state to profile
  const saveTutorialState = useCallback(async (newPhase: TutorialPhase, newFlags?: Record<string, boolean>) => {
    if (!user) return;

    try {
      const updates: any = {
        tutorial_step: newPhase,
        tutorial_completed: newPhase === 'completed',
        updated_at: new Date().toISOString(),
      };

      if (newFlags) {
        updates.tutorial_context_flags = newFlags;
      }

      await supabase
        .from('profiles')
        .update(updates)
        .eq('user_id', user.id);
    } catch (err) {
      console.error('Error saving tutorial state:', err);
    }
  }, [user]);

  const setPhase = useCallback((newPhase: TutorialPhase) => {
    setPhaseState(newPhase);
    saveTutorialState(newPhase);
  }, [saveTutorialState]);

  const nextPhase = useCallback(() => {
    const currentIndex = PHASE_ORDER.indexOf(phase);
    if (currentIndex < PHASE_ORDER.length - 1) {
      const newPhase = PHASE_ORDER[currentIndex + 1];
      setPhase(newPhase);
    }
  }, [phase, setPhase]);

  const skipTutorial = useCallback(() => {
    setPhase('completed');
    setShowWelcome(false);
    setTutorialCompleted(true);
  }, [setPhase]);

  const markContextSeen = useCallback((key: ContextualTooltip) => {
    const newFlags = { ...contextFlags, [key]: true };
    setContextFlags(newFlags);
    saveTutorialState(phase, newFlags);
  }, [contextFlags, phase, saveTutorialState]);

  const hasSeenContext = useCallback((key: ContextualTooltip) => {
    return contextFlags[key] === true;
  }, [contextFlags]);

  const shouldHighlight = useCallback((element: string) => {
    if (tutorialCompleted || phase === 'completed') return false;
    
    switch (phase) {
      case 'api_settings':
        return element === 'settings';
      case 'tour_today':
        return element === 'today';
      case 'tour_create':
        return element === 'create';
      case 'tour_strategy':
        return element === 'strategy';
      default:
        return false;
    }
  }, [phase, tutorialCompleted]);

  const currentTooltip = (() => {
    if (tutorialCompleted || phase === 'completed') return null;
    
    switch (phase) {
      case 'api_settings':
        return 'Pour générer du contenu, connecte d\'abord ton IA ici.';
      case 'api_tab':
        return 'C\'est ici que tu configures ta clé.';
      case 'api_fields':
        return 'Choisis ton IA (OpenAI, Claude ou Gemini) et colle ta clé.\n💡 Coût moyen : 2-5€/mois';
      case 'api_validated':
        return 'Parfait ! Ton IA est connectée. Tu peux maintenant générer du contenu.';
      case 'tour_today':
        return 'Ta page d\'accueil. Tu y trouveras toujours ta prochaine action prioritaire.';
      case 'tour_create':
        return 'Le cœur de Tipote : génère posts, emails, articles... en quelques clics.';
      case 'tour_strategy':
        return 'Ton plan personnalisé et ta pyramide d\'offres. Tout s\'adapte à toi.';
      case 'tour_complete':
        return 'C\'est bon ! Tu peux explorer. Je suis là si tu as besoin.';
      default:
        return null;
    }
  })();

  return (
    <TutorialContext.Provider value={{
      phase,
      setPhase,
      nextPhase,
      skipTutorial,
      showWelcome,
      setShowWelcome,
      contextFlags,
      markContextSeen,
      hasSeenContext,
      isLoading,
      shouldHighlight,
      currentTooltip,
    }}>
      {children}
    </TutorialContext.Provider>
  );
}

export function useTutorial() {
  const context = useContext(TutorialContext);
  if (context === undefined) {
    throw new Error('useTutorial must be used within a TutorialProvider');
  }
  return context;
}
