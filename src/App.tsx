
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
import MondayMastery from "./components/MondayMastery";
import MasterclassLibrary from "./components/MasterclassLibrary";
import ExecutiveCircle from "./components/ExecutiveCircle";
import StrategicSessions from "./components/StrategicSessions";

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
          <Route path="/morning-session" element={<MorningSession level={1} onComplete={() => console.log('completed')} />} />
          <Route path="/monday-mastery" element={<MondayMastery />} />
          <Route path="/masterclass-library" element={<MasterclassLibrary />} />
          <Route path="/executive-circle" element={<ExecutiveCircle />} />
          <Route path="/strategic-sessions" element={<StrategicSessions />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
