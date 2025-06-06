import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const properties = pgTable("properties", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(),
  type: text("type").notNull(), // "arriendo" or "venta"
  zone: text("zone").notNull(),
  bedrooms: integer("bedrooms").notNull(),
  bathrooms: integer("bathrooms").notNull(),
  area: integer("area").notNull(), // in square meters
  imageUrl: text("image_url").notNull(),
  featured: boolean("featured").default(false),
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  interest: text("interest").notNull(),
  message: text("message").notNull(),
  createdAt: text("created_at").notNull(),
});

// Property valuation schema for the calculator
export const propertyValuations = pgTable("property_valuations", {
  id: serial("id").primaryKey(),
  contactName: text("contact_name").notNull(),
  contactEmail: text("contact_email").notNull(),
  contactPhone: text("contact_phone").notNull(),
  propertyAddress: text("property_address").notNull(),
  propertyZone: text("property_zone").notNull(),
  propertyArea: integer("property_area").notNull(), // in square meters
  bedrooms: integer("bedrooms").notNull(),
  bathrooms: integer("bathrooms").notNull(),
  propertyAge: integer("property_age").notNull(), // in years
  propertyCondition: text("property_condition").notNull(), // excellent, good, fair, poor
  hasParking: boolean("has_parking").default(false),
  hasElevator: boolean("has_elevator").default(false),
  hasBalcony: boolean("has_balcony").default(false),
  estimatedValue: integer("estimated_value").notNull(),
  createdAt: text("created_at").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertPropertySchema = createInsertSchema(properties).omit({
  id: true,
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  createdAt: true,
});

export const insertPropertyValuationSchema = createInsertSchema(propertyValuations).omit({
  id: true,
  estimatedValue: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Property = typeof properties.$inferSelect;
export type InsertProperty = z.infer<typeof insertPropertySchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type PropertyValuation = typeof propertyValuations.$inferSelect;
export type InsertPropertyValuation = z.infer<typeof insertPropertyValuationSchema>;
