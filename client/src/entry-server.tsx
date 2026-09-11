import { renderToString } from "react-dom/server";
import { Router } from "wouter";
import App from "./App";

export function renderPage(path = "/") {
  return renderToString(<Router ssrPath={path}><App /></Router>);
}
