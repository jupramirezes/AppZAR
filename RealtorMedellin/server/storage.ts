import { users, properties, contactMessages, propertyValuations, type User, type InsertUser, type Property, type InsertProperty, type ContactMessage, type InsertContactMessage, type PropertyValuation, type InsertPropertyValuation } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getProperties(): Promise<Property[]>;
  getProperty(id: number): Promise<Property | undefined>;
  getPropertiesByType(type: string): Promise<Property[]>;
  getPropertiesByZone(zone: string): Promise<Property[]>;
  getFeaturedProperties(): Promise<Property[]>;
  createProperty(property: InsertProperty): Promise<Property>;
  
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
  
  createPropertyValuation(valuation: InsertPropertyValuation): Promise<PropertyValuation>;
  getPropertyValuations(): Promise<PropertyValuation[]>;
  calculatePropertyValue(valuationData: InsertPropertyValuation): Promise<number>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private properties: Map<number, Property>;
  private contactMessages: Map<number, ContactMessage>;
  private propertyValuations: Map<number, PropertyValuation>;
  private currentUserId: number;
  private currentPropertyId: number;
  private currentMessageId: number;
  private currentValuationId: number;

  constructor() {
    this.users = new Map();
    this.properties = new Map();
    this.contactMessages = new Map();
    this.propertyValuations = new Map();
    this.currentUserId = 1;
    this.currentPropertyId = 1;
    this.currentMessageId = 1;
    this.currentValuationId = 1;

    // Initialize with sample properties
    this.initializeProperties();
  }

  private initializeProperties() {
    const sampleProperties: InsertProperty[] = [
      {
        title: "Apartamento Moderno El Poblado",
        description: "Hermoso apartamento de 2 habitaciones con vista panorámica y acabados de lujo",
        price: 2800000,
        type: "arriendo",
        zone: "El Poblado",
        bedrooms: 2,
        bathrooms: 2,
        area: 85,
        imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        featured: true,
      },
      {
        title: "Casa Familiar Laureles",
        description: "Casa de 3 pisos con jardín privado y garaje para 2 carros",
        price: 680000000,
        type: "venta",
        zone: "Laureles",
        bedrooms: 4,
        bathrooms: 3,
        area: 180,
        imageUrl: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        featured: true,
      },
      {
        title: "Estudio Ejecutivo Envigado",
        description: "Perfecto para profesionales, completamente amoblado",
        price: 1600000,
        type: "arriendo",
        zone: "Envigado",
        bedrooms: 1,
        bathrooms: 1,
        area: 45,
        imageUrl: "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        featured: false,
      },
      {
        title: "Penthouse de Lujo",
        description: "Exclusivo penthouse con terraza privada y vista 360°",
        price: 1200000000,
        type: "venta",
        zone: "El Poblado",
        bedrooms: 3,
        bathrooms: 4,
        area: 220,
        imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        featured: true,
      },
      {
        title: "Apartamento Acogedor Sabaneta",
        description: "Ideal para parejas, cerca al metro y centros comerciales",
        price: 1900000,
        type: "arriendo",
        zone: "Sabaneta",
        bedrooms: 2,
        bathrooms: 2,
        area: 65,
        imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        featured: false,
      },
      {
        title: "Casa Moderna Itagüí",
        description: "Casa nueva en conjunto cerrado con piscina y zonas comunes",
        price: 420000000,
        type: "venta",
        zone: "Itagüí",
        bedrooms: 3,
        bathrooms: 2,
        area: 120,
        imageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        featured: false,
      },
    ];

    sampleProperties.forEach(property => {
      this.createProperty(property);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getProperties(): Promise<Property[]> {
    return Array.from(this.properties.values());
  }

  async getProperty(id: number): Promise<Property | undefined> {
    return this.properties.get(id);
  }

  async getPropertiesByType(type: string): Promise<Property[]> {
    return Array.from(this.properties.values()).filter(
      (property) => property.type === type,
    );
  }

  async getPropertiesByZone(zone: string): Promise<Property[]> {
    return Array.from(this.properties.values()).filter(
      (property) => property.zone === zone,
    );
  }

  async getFeaturedProperties(): Promise<Property[]> {
    return Array.from(this.properties.values()).filter(
      (property) => property.featured,
    );
  }

  async createProperty(insertProperty: InsertProperty): Promise<Property> {
    const id = this.currentPropertyId++;
    const property: Property = { 
      ...insertProperty, 
      id,
      featured: insertProperty.featured ?? false
    };
    this.properties.set(id, property);
    return property;
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = this.currentMessageId++;
    const createdAt = new Date().toISOString();
    const message: ContactMessage = { ...insertMessage, id, createdAt };
    this.contactMessages.set(id, message);
    return message;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }

  async createPropertyValuation(insertValuation: InsertPropertyValuation): Promise<PropertyValuation> {
    const id = this.currentValuationId++;
    const estimatedValue = await this.calculatePropertyValue(insertValuation);
    const createdAt = new Date().toISOString();
    const valuation: PropertyValuation = { 
      ...insertValuation, 
      id, 
      estimatedValue, 
      createdAt,
      hasParking: insertValuation.hasParking ?? false,
      hasElevator: insertValuation.hasElevator ?? false,
      hasBalcony: insertValuation.hasBalcony ?? false,
    };
    this.propertyValuations.set(id, valuation);
    return valuation;
  }

  async getPropertyValuations(): Promise<PropertyValuation[]> {
    return Array.from(this.propertyValuations.values());
  }

  async calculatePropertyValue(valuationData: InsertPropertyValuation): Promise<number> {
    // Base price per square meter by zone (in Colombian Pesos)
    const basePriceByZone: Record<string, number> = {
      "El Poblado": 8500000,
      "Laureles": 6800000,
      "Envigado": 7200000,
      "Sabaneta": 5500000,
      "Itagüí": 4800000,
      "Bello": 4200000,
      "La Estrella": 4500000,
    };

    const basePrice = basePriceByZone[valuationData.propertyZone] || 5000000;
    let totalValue = basePrice * valuationData.propertyArea;

    // Adjust for number of bedrooms
    if (valuationData.bedrooms >= 3) {
      totalValue *= 1.15;
    } else if (valuationData.bedrooms >= 2) {
      totalValue *= 1.08;
    }

    // Adjust for number of bathrooms
    if (valuationData.bathrooms >= 3) {
      totalValue *= 1.12;
    } else if (valuationData.bathrooms >= 2) {
      totalValue *= 1.05;
    }

    // Adjust for property age
    if (valuationData.propertyAge <= 5) {
      totalValue *= 1.1;
    } else if (valuationData.propertyAge <= 10) {
      totalValue *= 1.05;
    } else if (valuationData.propertyAge >= 20) {
      totalValue *= 0.9;
    }

    // Adjust for property condition
    const conditionMultipliers = {
      excellent: 1.15,
      good: 1.05,
      fair: 0.95,
      poor: 0.8,
    };
    totalValue *= conditionMultipliers[valuationData.propertyCondition as keyof typeof conditionMultipliers] || 1;

    // Additional features
    if (valuationData.hasParking) totalValue *= 1.08;
    if (valuationData.hasElevator) totalValue *= 1.05;
    if (valuationData.hasBalcony) totalValue *= 1.03;

    return Math.round(totalValue);
  }
}

// Database Storage Implementation
export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getProperties(): Promise<Property[]> {
    return await db.select().from(properties);
  }

  async getProperty(id: number): Promise<Property | undefined> {
    const [property] = await db.select().from(properties).where(eq(properties.id, id));
    return property || undefined;
  }

  async getPropertiesByType(type: string): Promise<Property[]> {
    return await db.select().from(properties).where(eq(properties.type, type));
  }

  async getPropertiesByZone(zone: string): Promise<Property[]> {
    return await db.select().from(properties).where(eq(properties.zone, zone));
  }

  async getFeaturedProperties(): Promise<Property[]> {
    return await db.select().from(properties).where(eq(properties.featured, true));
  }

  async createProperty(insertProperty: InsertProperty): Promise<Property> {
    const [property] = await db
      .insert(properties)
      .values(insertProperty)
      .returning();
    return property;
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const messageData = {
      ...insertMessage,
      createdAt: new Date().toISOString()
    };
    const [message] = await db
      .insert(contactMessages)
      .values(messageData)
      .returning();
    return message;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return await db.select().from(contactMessages);
  }

  async createPropertyValuation(insertValuation: InsertPropertyValuation): Promise<PropertyValuation> {
    const valuationData = {
      ...insertValuation,
      createdAt: new Date().toISOString()
    };
    const [valuation] = await db
      .insert(propertyValuations)
      .values(valuationData)
      .returning();
    return valuation;
  }

  async getPropertyValuations(): Promise<PropertyValuation[]> {
    return await db.select().from(propertyValuations);
  }

  async calculatePropertyValue(valuationData: InsertPropertyValuation): Promise<number> {
    // Advanced property valuation algorithm
    const { propertyArea: area, bedrooms, bathrooms, propertyZone: zone, propertyType, propertyAge: age, propertyCondition: condition, hasParking, hasElevator } = valuationData;
    
    // Base price per square meter by zone (in COP)
    const zoneMultipliers: Record<string, number> = {
      'El Poblado': 8500000,
      'Laureles': 6500000,
      'Envigado': 5800000,
      'Sabaneta': 5200000,
      'Itagüí': 4800000,
      'Bello': 4200000,
      'Centro': 3800000,
      'Robledo': 3500000,
      'Castilla': 3200000,
      'Aranjuez': 3000000,
    };

    const basePricePerSqm = zoneMultipliers[zone] || 4000000;
    let totalValue = area * basePricePerSqm;

    // Property type adjustments
    const typeMultipliers = {
      'apartamento': 1.0,
      'casa': 1.15,
      'oficina': 0.85,
      'local': 0.75,
      'lote': 0.6,
    };
    totalValue *= typeMultipliers[propertyType as keyof typeof typeMultipliers] || 1.0;

    // Room bonuses
    totalValue += bedrooms * 45000000;
    totalValue += bathrooms * 25000000;

    // Age depreciation
    const ageDepreciation = Math.max(0, (20 - (age || 0)) / 20);
    totalValue *= (0.7 + 0.3 * ageDepreciation);

    // Condition adjustment
    const conditionMultipliers = {
      'excelente': 1.15,
      'bueno': 1.0,
      'regular': 0.85,
      'necesita_reparacion': 0.7,
    };
    totalValue *= conditionMultipliers[condition as keyof typeof conditionMultipliers] || 1.0;

    // Additional features
    if (hasParking) totalValue += 35000000;
    if (hasElevator) totalValue += 20000000;

    // Round to nearest million
    return Math.round(totalValue / 1000000) * 1000000;
  }

  async initializeWithSampleData(): Promise<void> {
    // Check if data already exists
    const existingProperties = await this.getProperties();
    if (existingProperties.length > 0) {
      return; // Data already initialized
    }

    // Sample properties for Medellín
    const sampleProperties: InsertProperty[] = [
      {
        title: "Apartamento Moderno El Poblado",
        description: "Hermoso apartamento de 2 habitaciones con vista panorámica y acabados de lujo",
        price: 2800000,
        type: "arriendo",
        zone: "El Poblado",
        bedrooms: 2,
        bathrooms: 2,
        area: 85,
        imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        featured: true,
      },
      {
        title: "Casa Familiar Laureles",
        description: "Casa de 3 pisos con jardín privado y garaje para 2 carros",
        price: 680000000,
        type: "venta",
        zone: "Laureles",
        bedrooms: 4,
        bathrooms: 3,
        area: 180,
        imageUrl: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        featured: true,
      },
      {
        title: "Estudio Ejecutivo Envigado",
        description: "Perfecto para profesionales, completamente amoblado",
        price: 1600000,
        type: "arriendo",
        zone: "Envigado",
        bedrooms: 1,
        bathrooms: 1,
        area: 45,
        imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        featured: false,
      },
      {
        title: "Penthouse de Lujo",
        description: "Exclusivo penthouse con terraza privada y jacuzzi",
        price: 1200000000,
        type: "venta",
        zone: "El Poblado",
        bedrooms: 3,
        bathrooms: 4,
        area: 220,
        imageUrl: "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        featured: true,
      },
      {
        title: "Apartamento Familiar Sabaneta",
        description: "Cómodo apartamento en conjunto cerrado con piscina",
        price: 1900000,
        type: "arriendo",
        zone: "Sabaneta",
        bedrooms: 3,
        bathrooms: 2,
        area: 75,
        imageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        featured: false,
      },
    ];

    // Insert sample properties
    for (const property of sampleProperties) {
      await this.createProperty(property);
    }
  }
}

export const storage = new DatabaseStorage();
