import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import CoachingOSDemo from "@/pages/CoachingOSDemo";
import NaviGradeDemo from "@/pages/NaviGradeDemo";
import AboutUs from "@/pages/AboutUs";
import NovaPathConsulting from "@/pages/NovaPathConsulting";
import CobuilderPage from "@/pages/CobuilderPage";
import NotFound from "@/pages/not-found";

function ConsultingRedirect() {
  useEffect(() => {
    window.location.replace("/");
  }, []);
  return null;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={NovaPathConsulting} />
      <Route path="/consulting" component={ConsultingRedirect} />
      <Route path="/coachingOSdemo" component={CoachingOSDemo} />
      <Route path="/navigrade" component={NaviGradeDemo} />
      <Route path="/about" component={AboutUs} />
      <Route path="/cobuilder" component={CobuilderPage} />
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
