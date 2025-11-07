import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const leads = pgTable("leads", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull(),
  role: text("role").notNull(),
  school: text("school"),
  referrer: text("referrer"),
  submittedAt: timestamp("submitted_at").defaultNow(),
});

export const insertLeadSchema = createInsertSchema(leads).omit({
  id: true,
  submittedAt: true,
}).extend({
  email: z.string().email("Please enter a valid email address"),
  role: z.string().min(1, "Please select your role"),
  school: z.string().optional(),
  referrer: z.string().optional(),
});

export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leads.$inferSelect;

export const preorders = pgTable("preorders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull(),
  name: text("name").notNull(),
  quantity: text("quantity").notNull(),
  submittedAt: timestamp("submitted_at").defaultNow(),
});

export const insertPreorderSchema = createInsertSchema(preorders).omit({
  id: true,
  submittedAt: true,
}).extend({
  email: z.string().email("Please enter a valid email address"),
  name: z.string().min(1, "Please enter your name"),
  quantity: z.string().min(1, "Please select a quantity"),
});

export type InsertPreorder = z.infer<typeof insertPreorderSchema>;
export type Preorder = typeof preorders.$inferSelect;

export const pdInquiries = pgTable("pd_inquiries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull(),
  name: text("name").notNull(),
  school: text("school").notNull(),
  role: text("role").notNull(),
  painPoint: text("pain_point").notNull(),
  submittedAt: timestamp("submitted_at").defaultNow(),
});

export const insertPdInquirySchema = createInsertSchema(pdInquiries).omit({
  id: true,
  submittedAt: true,
}).extend({
  email: z.string().email("Please enter a valid email address"),
  name: z.string().min(1, "Please enter your name"),
  school: z.string().min(1, "Please enter your school name"),
  role: z.string().min(1, "Please select your role"),
  painPoint: z.string().min(10, "Please describe your challenge (at least 10 characters)"),
});

export type InsertPdInquiry = z.infer<typeof insertPdInquirySchema>;
export type PdInquiry = typeof pdInquiries.$inferSelect;

export const autograderInquiries = pgTable("autograder_inquiries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull(),
  name: text("name").notNull(),
  school: text("school").notNull(),
  role: text("role").notNull(),
  gradeLevel: text("grade_level").notNull(),
  additionalInfo: text("additional_info"),
  submittedAt: timestamp("submitted_at").defaultNow(),
});

export const insertAutograderInquirySchema = createInsertSchema(autograderInquiries).omit({
  id: true,
  submittedAt: true,
}).extend({
  email: z.string().email("Please enter a valid email address"),
  name: z.string().min(1, "Please enter your name"),
  school: z.string().min(1, "Please enter your school name"),
  role: z.string().min(1, "Please select your role"),
  gradeLevel: z.string().min(1, "Please select grade level"),
  additionalInfo: z.string().optional(),
});

export type InsertAutograderInquiry = z.infer<typeof insertAutograderInquirySchema>;
export type AutograderInquiry = typeof autograderInquiries.$inferSelect;

export const mathMovesInquiries = pgTable("math_moves_inquiries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull(),
  name: text("name").notNull(),
  school: text("school").notNull(),
  role: text("role").notNull(),
  gradeLevel: text("grade_level").notNull(),
  additionalInfo: text("additional_info"),
  submittedAt: timestamp("submitted_at").defaultNow(),
});

export const insertMathMovesInquirySchema = createInsertSchema(mathMovesInquiries).omit({
  id: true,
  submittedAt: true,
}).extend({
  email: z.string().email("Please enter a valid email address"),
  name: z.string().min(1, "Please enter your name"),
  school: z.string().min(1, "Please enter your school/district name"),
  role: z.string().min(1, "Please select your role"),
  gradeLevel: z.string().min(1, "Please select grade level"),
  additionalInfo: z.string().optional(),
});

export type InsertMathMovesInquiry = z.infer<typeof insertMathMovesInquirySchema>;
export type MathMovesInquiry = typeof mathMovesInquiries.$inferSelect;
