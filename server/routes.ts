import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema } from "@shared/schema";
import { generatePeerPrompts, generateEmotionalValidation } from "./lib/openai";

export async function registerRoutes(app: Express): Promise<Server> {
  // POST /api/leads - Create a new lead (waitlist signup)
  app.post("/api/leads", async (req, res) => {
    try {
      // Validate the request body
      const validatedData = insertLeadSchema.parse(req.body);
      
      // Create the lead in storage
      const lead = await storage.createLead(validatedData);
      
      // Return success
      res.json({ success: true, lead });
    } catch (error) {
      console.error("Error creating lead:", error instanceof Error ? error.message : "Unknown error");
      
      // Handle validation errors
      if (error instanceof Error && error.name === "ZodError") {
        return res.status(400).json({ 
          success: false, 
          error: "Invalid form data" 
        });
      }
      
      // Handle other errors
      res.status(500).json({ 
        success: false, 
        error: "Failed to save lead"
      });
    }
  });

  // POST /api/demo/validate-emotion - Generate emotional validation for student check-in
  app.post("/api/demo/validate-emotion", async (req, res) => {
    try {
      const { checkIn, studentName } = req.body;
      
      if (!checkIn || !studentName) {
        return res.status(400).json({ error: "Missing checkIn or studentName" });
      }
      
      const validation = await generateEmotionalValidation(checkIn, studentName);
      res.json({ validation });
    } catch (error) {
      console.error("Error validating emotion:", error);
      res.status(500).json({ error: "Failed to generate validation" });
    }
  });

  // POST /api/demo/peer-prompts - Generate peer prompts for group check-in
  app.post("/api/demo/peer-prompts", async (req, res) => {
    try {
      const { checkIn, peerNames } = req.body;
      
      if (!checkIn || !Array.isArray(peerNames)) {
        return res.status(400).json({ error: "Missing checkIn or peerNames array" });
      }
      
      const prompts = await generatePeerPrompts(checkIn, peerNames);
      res.json({ prompts });
    } catch (error) {
      console.error("Error generating peer prompts:", error);
      res.status(500).json({ error: "Failed to generate prompts" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
