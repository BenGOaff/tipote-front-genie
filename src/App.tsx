import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { TutorialProvider } from "@/hooks/useTutorial";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { TutorialOverlay } from "@/components/tutorial/TutorialOverlay";
import { HelpButton } from "@/components/tutorial/HelpButton";
import Login from "./pages/Login";
import Onboarding from "./pages/Onboarding";
import Today from "./pages/Today";
import MyStrategy from "./pages/MyStrategy";
import Create from "./pages/Create";
import MyContent from "./pages/MyContent";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TutorialProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <TutorialOverlay />
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
              <Route path="/dashboard" element={<ProtectedRoute><Today /></ProtectedRoute>} />
              <Route path="/dashboard/strategy" element={<ProtectedRoute><MyStrategy /></ProtectedRoute>} />
              <Route path="/dashboard/create" element={<ProtectedRoute><Create /></ProtectedRoute>} />
              <Route path="/dashboard/content" element={<ProtectedRoute><MyContent /></ProtectedRoute>} />
              <Route path="/dashboard/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
              <Route path="/dashboard/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <HelpButton />
          </BrowserRouter>
        </TooltipProvider>
      </TutorialProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
