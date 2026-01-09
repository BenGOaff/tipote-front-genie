import { ReactNode } from "react";
import { useTutorial } from "@/hooks/useTutorial";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TutorialSpotlightProps {
  elementId: string;
  children: ReactNode;
  className?: string;
  tooltipPosition?: 'top' | 'bottom' | 'left' | 'right';
  showArrow?: boolean;
  showNextButton?: boolean;
  onNext?: () => void;
}

export function TutorialSpotlight({ 
  elementId, 
  children, 
  className,
  tooltipPosition = 'right',
  showArrow = true,
  showNextButton = false,
  onNext
}: TutorialSpotlightProps) {
  const { shouldHighlight, currentTooltip, nextPhase } = useTutorial();
  
  const isHighlighted = shouldHighlight(elementId);

  const handleNext = () => {
    if (onNext) {
      onNext();
    } else {
      nextPhase();
    }
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
      {/* Spotlight ring effect */}
      {isHighlighted && (
        <div className="absolute inset-0 rounded-lg ring-2 ring-primary ring-offset-2 ring-offset-background animate-pulse pointer-events-none z-40" />
      )}
      
      {children}
      
      {/* Tooltip */}
      {isHighlighted && currentTooltip && (
        <div 
          className={cn(
            "absolute z-50 min-w-[200px] max-w-[280px]",
            positionClasses[tooltipPosition]
          )}
        >
          <div className="bg-primary text-primary-foreground rounded-lg p-3 shadow-xl">
            {/* Arrow */}
            {showArrow && (
              <div 
                className={cn(
                  "absolute w-0 h-0 border-[6px]",
                  arrowClasses[tooltipPosition]
                )}
              />
            )}
            
            <p className="text-sm whitespace-pre-line">{currentTooltip}</p>
            
            {showNextButton && (
              <Button
                size="sm"
                variant="secondary"
                className="mt-2 w-full"
                onClick={handleNext}
              >
                Suivant
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
