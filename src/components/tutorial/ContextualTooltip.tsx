import { ReactNode, useEffect, useState } from "react";
import { useTutorial, ContextualTooltip as ContextualTooltipType } from "@/hooks/useTutorial";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface ContextualTooltipProps {
  contextKey: ContextualTooltipType;
  message: string;
  children: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
  delay?: number;
}

export function ContextualTooltip({ 
  contextKey, 
  message, 
  children, 
  position = 'bottom',
  className,
  delay = 500
}: ContextualTooltipProps) {
  const { hasSeenContext, markContextSeen, phase } = useTutorial();
  const [showTooltip, setShowTooltip] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  
  const hasSeen = hasSeenContext(contextKey);
  const tutorialComplete = phase === 'completed';

  useEffect(() => {
    // Ne montrer les tooltips contextuels qu'après la fin du tutoriel principal
    if (!tutorialComplete || hasSeen || dismissed) {
      setShowTooltip(false);
      return;
    }

    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [tutorialComplete, hasSeen, dismissed, delay]);

  const handleDismiss = () => {
    setDismissed(true);
    setShowTooltip(false);
    markContextSeen(contextKey);
  };

  const positionClasses = {
    top: 'bottom-full mb-2 left-1/2 -translate-x-1/2',
    bottom: 'top-full mt-2 left-1/2 -translate-x-1/2',
    left: 'right-full mr-2 top-1/2 -translate-y-1/2',
    right: 'left-full ml-2 top-1/2 -translate-y-1/2',
  };

  const arrowClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-primary',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-primary',
    left: 'left-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-primary',
    right: 'right-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-primary',
  };

  return (
    <div className={cn("relative", className)}>
      {children}
      
      {showTooltip && (
        <div 
          className={cn(
            "absolute z-50 min-w-[220px] max-w-[300px] animate-in fade-in slide-in-from-bottom-2 duration-300",
            positionClasses[position]
          )}
        >
          <div className="bg-primary text-primary-foreground rounded-lg p-3 shadow-xl relative">
            {/* Arrow */}
            <div 
              className={cn(
                "absolute w-0 h-0 border-[6px]",
                arrowClasses[position]
              )}
            />
            
            <div className="flex items-start gap-2">
              <p className="text-sm flex-1">{message}</p>
              <button
                onClick={handleDismiss}
                className="p-1 hover:bg-white/20 rounded transition-colors flex-shrink-0"
                aria-label="Fermer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
