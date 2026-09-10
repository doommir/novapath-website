import express from "express";
import createdApp from "./server/index";

// Vercel detects Express from a root server.ts that imports the framework
// and default-exports the app. See https://vercel.com/docs/frameworks/backend/express
const app: express.Express = createdApp;

export default app;
