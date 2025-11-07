import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import ScienceKit from "@/pages/ScienceKit";
import ProfessionalDevelopment from "@/pages/ProfessionalDevelopment";
import AutoGrader from "@/pages/AutoGrader";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/science-kit" component={ScienceKit} />
      <Route path="/professional-development" component={ProfessionalDevelopment} />
      <Route path="/autograder" component={AutoGrader} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
