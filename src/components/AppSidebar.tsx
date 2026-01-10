import { 
  Sun, 
  Target, 
  Sparkles,
  FolderOpen,
  Settings, 
  BarChart3
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { TutorialSpotlight } from "@/components/tutorial/TutorialSpotlight";
import { useTutorial } from "@/hooks/useTutorial";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";

const mainItems = [
  { title: "Aujourd'hui", url: "/dashboard", icon: Sun, spotlightId: "today" },
  { title: "Ma Stratégie", url: "/dashboard/strategy", icon: Target, spotlightId: "strategy" },
  { title: "Créer", url: "/dashboard/create", icon: Sparkles, spotlightId: "create" },
  { title: "Mes Contenus", url: "/dashboard/content", icon: FolderOpen, spotlightId: null },
];

export function AppSidebar() {
  const { phase, nextPhase } = useTutorial();

  const handleItemClick = (spotlightId: string | null) => {
    // Si on clique sur l'élément qui est actuellement en spotlight, passer au suivant
    if (spotlightId === 'today' && phase === 'tour_today') {
      nextPhase();
    } else if (spotlightId === 'create' && phase === 'tour_create') {
      nextPhase();
    } else if (spotlightId === 'strategy' && phase === 'tour_strategy') {
      nextPhase();
    }
  };

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-display font-bold">Tipote™</h2>
            <p className="text-xs text-muted-foreground">SaaS Business AI</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="overflow-y-auto px-3 py-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {mainItems.map((item) => {
                const menuItem = (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink 
                        to={item.url} 
                        end={item.url === "/dashboard"}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors hover:bg-sidebar-accent relative z-40"
                        activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                        onClick={() => handleItemClick(item.spotlightId)}
                      >
                        <item.icon className="w-5 h-5" />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );

                if (item.spotlightId) {
                  return (
                    <TutorialSpotlight 
                      key={item.title}
                      elementId={item.spotlightId}
                      tooltipPosition="right"
                      showNextButton
                    >
                      {menuItem}
                    </TutorialSpotlight>
                  );
                }
                
                return menuItem;
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-4 space-y-1">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink 
                to="/dashboard/analytics"
                className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-sidebar-accent"
                activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium"
              >
                <BarChart3 className="w-5 h-5" />
                <span>Analytics</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <TutorialSpotlight 
            elementId="settings"
            tooltipPosition="right"
            showNextButton
          >
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <NavLink 
                  to="/dashboard/settings"
                  className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-sidebar-accent relative z-40"
                  activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                  onClick={() => handleItemClick('settings')}
                >
                  <Settings className="w-5 h-5" />
                  <span>Paramètres</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </TutorialSpotlight>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
