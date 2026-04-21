import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";

import HomePage from "@/pages/HomePage";
import ApproachPage from "@/pages/ApproachPage";
import SprintsPage from "@/pages/SprintsPage";
import K12Page from "@/pages/K12Page";
import WorkPage from "@/pages/WorkPage";
import FieldNotesPage from "@/pages/FieldNotesPage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";

import CoachingOSDemo from "@/pages/CoachingOSDemo";
import NaviGradeDemo from "@/pages/NaviGradeDemo";
import CobuilderPage from "@/pages/CobuilderPage";
import NotFound from "@/pages/not-found";

function Redirect({ to }: { to: string }) {
  useEffect(() => {
    window.location.replace(to);
  }, [to]);
  return null;
}

function Router() {
  return (
    <Switch>
      {/* Main 8-page site */}
      <Route path="/" component={HomePage} />
      <Route path="/approach" component={ApproachPage} />
      <Route path="/sprints" component={SprintsPage} />
      <Route path="/k12" component={K12Page} />
      <Route path="/work" component={WorkPage} />
      <Route path="/field-notes" component={FieldNotesPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/contact" component={ContactPage} />

      {/* Legacy / compat redirects */}
      <Route path="/consulting" component={() => <Redirect to="/" />} />

      {/* Demo tools — preserved as-is */}
      <Route path="/coachingOSdemo" component={CoachingOSDemo} />
      <Route path="/navigrade" component={NaviGradeDemo} />
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
