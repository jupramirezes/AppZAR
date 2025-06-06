import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

// Initialize database with sample data on startup
async function initializeDatabase() {
  try {
    if ('initializeWithSampleData' in storage) {
      await (storage as any).initializeWithSampleData();
      console.log('Database initialized with sample data');
    }
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}
import { insertContactMessageSchema, insertPropertyValuationSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize database on startup
  await initializeDatabase();
  // Get all properties
  app.get("/api/properties", async (req, res) => {
    try {
      const { type, zone } = req.query;
      let properties;

      if (type && typeof type === "string") {
        properties = await storage.getPropertiesByType(type);
      } else if (zone && typeof zone === "string") {
        properties = await storage.getPropertiesByZone(zone);
      } else {
        properties = await storage.getProperties();
      }

      res.json(properties);
    } catch (error) {
      res.status(500).json({ message: "Error fetching properties" });
    }
  });

  // Get featured properties
  app.get("/api/properties/featured", async (req, res) => {
    try {
      const properties = await storage.getFeaturedProperties();
      res.json(properties);
    } catch (error) {
      res.status(500).json({ message: "Error fetching featured properties" });
    }
  });

  // Get property by ID
  app.get("/api/properties/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid property ID" });
      }

      const property = await storage.getProperty(id);
      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }

      res.json(property);
    } catch (error) {
      res.status(500).json({ message: "Error fetching property" });
    }
  });

  // Submit contact form
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      res.status(201).json({ message: "Message sent successfully", id: message.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid form data", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Error sending message" });
    }
  });

  // Calculate property value
  app.post("/api/property-valuation", async (req, res) => {
    try {
      const validatedData = insertPropertyValuationSchema.parse(req.body);
      const valuation = await storage.createPropertyValuation(validatedData);
      res.status(201).json({ 
        message: "Property valuation completed", 
        valuation: valuation,
        estimatedValue: valuation.estimatedValue
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid property data", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Error calculating property value" });
    }
  });

  // Get property value estimate (without saving)
  app.post("/api/property-estimate", async (req, res) => {
    try {
      const validatedData = insertPropertyValuationSchema.parse(req.body);
      const estimatedValue = await storage.calculatePropertyValue(validatedData);
      res.json({ estimatedValue });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid property data", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Error calculating property value" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
