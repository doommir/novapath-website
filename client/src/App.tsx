import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import Home from "@/pages/Home";
import ScienceKit from "@/pages/ScienceKit";
import ProfessionalDevelopment from "@/pages/ProfessionalDevelopment";
import AutoGrader from "@/pages/AutoGrader";
import MathMoves from "@/pages/MathMoves";
import Blog from "@/pages/Blog";
import AboutUs from "@/pages/AboutUs";
import InvestorPortal from "@/pages/InvestorPortal";
import InvestorPortalEmbed from "@/pages/InvestorPortalEmbed";
import PreventativeControl from "@/pages/PreventativeControl";
import CoachingOSDemo from "@/pages/CoachingOSDemo";
import NotFound from "@/pages/not-found";

function ScrollToTop() {
  const [location] = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  
  return null;
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={ProfessionalDevelopment} />
        <Route path="/investorportal" component={InvestorPortalEmbed} />
        <Route path="/novapath" component={Home} />
        <Route path="/science-kit" component={ScienceKit} />
        <Route path="/professional-development" component={ProfessionalDevelopment} />
        <Route path="/autograder" component={AutoGrader} />
        <Route path="/math-moves" component={MathMoves} />
        <Route path="/blog" component={Blog} />
        <Route path="/about" component={AboutUs} />
        <Route path="/invest" component={InvestorPortal} />
        <Route path="/preventative-control" component={PreventativeControl} />
        <Route path="/coachingOSdemo" component={CoachingOSDemo} />
        <Route component={NotFound} />
      </Switch>
    </>
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
