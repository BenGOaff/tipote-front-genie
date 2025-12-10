import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Strategy from "./pages/Strategy";
import ContentHub from "./pages/ContentHub";
import CalendarView from "./pages/CalendarView";
import AIGenerator from "./pages/AIGenerator";
import ProjectTracking from "./pages/ProjectTracking";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

// Modules
import SocialMedia from "./pages/modules/SocialMedia";
import Emails from "./pages/modules/Emails";
import Blog from "./pages/modules/Blog";
import VideoScripts from "./pages/modules/VideoScripts";
import Offers from "./pages/modules/Offers";
import Funnels from "./pages/modules/Funnels";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/strategy" element={<Strategy />} />
          <Route path="/dashboard/content" element={<ContentHub />} />
          <Route path="/dashboard/calendar" element={<CalendarView />} />
          <Route path="/dashboard/ai-generator" element={<AIGenerator />} />
          <Route path="/dashboard/tracking" element={<ProjectTracking />} />
          <Route path="/dashboard/analytics" element={<Analytics />} />
          <Route path="/dashboard/settings" element={<Settings />} />
          
          {/* Modules */}
          <Route path="/dashboard/modules/social" element={<SocialMedia />} />
          <Route path="/dashboard/modules/emails" element={<Emails />} />
          <Route path="/dashboard/modules/blog" element={<Blog />} />
          <Route path="/dashboard/modules/video-scripts" element={<VideoScripts />} />
          <Route path="/dashboard/modules/offers" element={<Offers />} />
          <Route path="/dashboard/modules/funnels" element={<Funnels />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
