import express from "express";
import createdApp from "./dist/index.js";

// Vercel detects Express from a root app.js that imports the framework
// and default-exports the app. See https://vercel.com/docs/frameworks/backend/express
// Production logic lives in the esbuild bundle so Node ESM does not have to
// resolve extensionless TypeScript paths under /server.
/** @type {express.Application} */
const app = createdApp;

export default app;
