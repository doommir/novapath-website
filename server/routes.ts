import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema, insertPreorderSchema } from "@shared/schema";
import { generatePeerPrompts, generateEmotionalValidation, generateResultsIntro, generateReviewMessage } from "./lib/openai";

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

  // POST /api/preorders - Create a new preorder (Science Kit)
  app.post("/api/preorders", async (req, res) => {
    try {
      const validatedData = insertPreorderSchema.parse(req.body);
      const preorder = await storage.createPreorder(validatedData);
      res.json({ success: true, preorder });
    } catch (error) {
      console.error("Error creating preorder:", error instanceof Error ? error.message : "Unknown error");
      
      if (error instanceof Error && error.name === "ZodError") {
        return res.status(400).json({ 
          success: false, 
          error: "Invalid form data" 
        });
      }
      
      res.status(500).json({ 
        success: false, 
        error: "Failed to save preorder"
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
      const { checkIn, studentName, peerNames } = req.body;
      
      if (!checkIn || !studentName || !Array.isArray(peerNames)) {
        return res.status(400).json({ error: "Missing checkIn, studentName, or peerNames array" });
      }
      
      const prompts = await generatePeerPrompts(checkIn, studentName, peerNames);
      res.json({ prompts });
    } catch (error) {
      console.error("Error generating peer prompts:", error);
      res.status(500).json({ error: "Failed to generate prompts" });
    }
  });

  // POST /api/demo/results-intro - Generate natural results introduction
  app.post("/api/demo/results-intro", async (req, res) => {
    try {
      const { checkIn } = req.body;
      
      if (!checkIn) {
        return res.status(400).json({ error: "Missing checkIn" });
      }
      
      const intro = await generateResultsIntro(checkIn);
      res.json({ intro });
    } catch (error) {
      console.error("Error generating results intro:", error);
      res.status(500).json({ error: "Failed to generate intro" });
    }
  });

  // POST /api/demo/review-message - Generate review message
  app.post("/api/demo/review-message", async (req, res) => {
    try {
      const { studentName } = req.body;
      
      if (!studentName) {
        return res.status(400).json({ error: "Missing studentName" });
      }
      
      const message = await generateReviewMessage(studentName);
      res.json({ message });
    } catch (error) {
      console.error("Error generating review message:", error);
      res.status(500).json({ error: "Failed to generate message" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
