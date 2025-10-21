import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema } from "@shared/schema";

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
      console.error("Error creating lead:", error);
      
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

  const httpServer = createServer(app);

  return httpServer;
}
