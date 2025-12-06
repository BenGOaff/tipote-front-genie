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
import AISettings from "./pages/AISettings";
import NotFound from "./pages/NotFound";

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
          <Route path="/dashboard/settings" element={<AISettings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
