
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Assessment from "./pages/Assessment";
import PillarDetail from "./pages/PillarDetail";
import NotFound from "./pages/NotFound";
import LevelSelection from "./components/LevelSelection";
import MorningSession from "./components/MorningSession";
import MorningSessionPage from "./pages/MorningSessionPage";
import AfternoonSessionPage from "./pages/AfternoonSessionPage";
import EveningSessionPage from "./pages/EveningSessionPage";
import EmergencyPage from "./pages/EmergencyPage";
import DecisionsPage from "./pages/DecisionsPage";
import RecoveryPage from "./pages/RecoveryPage";
import MondayMasteryPage from "./pages/MondayMasteryPage";
import MasterclassLibraryPage from "./pages/MasterclassLibraryPage";
import ExecutiveCirclePage from "./pages/ExecutiveCirclePage";
import StrategicSessionsPage from "./pages/StrategicSessionsPage";
import CommunityPage from "./pages/CommunityPage";
import BookingPage from "./pages/BookingPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/pillar/:id" element={<PillarDetail />} />
          <Route path="/level-selection" element={<LevelSelection onLevelSelect={(level) => console.log(level)} />} />
          <Route path="/morning-session" element={<MorningSessionPage />} />
          <Route path="/afternoon-session" element={<AfternoonSessionPage />} />
          <Route path="/evening-session" element={<EveningSessionPage />} />
          <Route path="/emergency" element={<EmergencyPage />} />
          <Route path="/decisions" element={<DecisionsPage />} />
          <Route path="/recovery" element={<RecoveryPage />} />
          <Route path="/monday-mastery" element={<MondayMasteryPage />} />
          <Route path="/masterclass-library" element={<MasterclassLibraryPage />} />
          <Route path="/executive-circle" element={<ExecutiveCirclePage />} />
          <Route path="/strategic-sessions" element={<StrategicSessionsPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/booking" element={<BookingPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
