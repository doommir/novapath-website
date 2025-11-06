import { type User, type InsertUser, type Lead, type InsertLead, type Preorder, type InsertPreorder, type PdInquiry, type InsertPdInquiry, users, leads, preorders, pdInquiries } from "@shared/schema";
import { randomUUID } from "crypto";
import { db } from "./db";
import { eq } from "drizzle-orm";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createLead(lead: InsertLead): Promise<Lead>;
  createPreorder(preorder: InsertPreorder): Promise<Preorder>;
  createPdInquiry(inquiry: InsertPdInquiry): Promise<PdInquiry>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private leads: Map<string, Lead>;
  private preorders: Map<string, Preorder>;
  private pdInquiries: Map<string, PdInquiry>;

  constructor() {
    this.users = new Map();
    this.leads = new Map();
    this.preorders = new Map();
    this.pdInquiries = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createLead(insertLead: InsertLead): Promise<Lead> {
    const id = randomUUID();
    const lead: Lead = { 
      id,
      email: insertLead.email,
      role: insertLead.role,
      school: insertLead.school ?? null,
      referrer: insertLead.referrer ?? null,
      submittedAt: new Date()
    };
    this.leads.set(id, lead);
    return lead;
  }

  async createPreorder(insertPreorder: InsertPreorder): Promise<Preorder> {
    const id = randomUUID();
    const preorder: Preorder = {
      id,
      email: insertPreorder.email,
      name: insertPreorder.name,
      quantity: insertPreorder.quantity,
      submittedAt: new Date()
    };
    this.preorders.set(id, preorder);
    return preorder;
  }

  async createPdInquiry(insertPdInquiry: InsertPdInquiry): Promise<PdInquiry> {
    const id = randomUUID();
    const pdInquiry: PdInquiry = {
      id,
      email: insertPdInquiry.email,
      name: insertPdInquiry.name,
      school: insertPdInquiry.school,
      role: insertPdInquiry.role,
      painPoint: insertPdInquiry.painPoint,
      submittedAt: new Date()
    };
    this.pdInquiries.set(id, pdInquiry);
    return pdInquiry;
  }
}

export class DbStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async createLead(insertLead: InsertLead): Promise<Lead> {
    const [lead] = await db.insert(leads).values({
      email: insertLead.email,
      role: insertLead.role,
      school: insertLead.school ?? null,
      referrer: insertLead.referrer ?? null,
    }).returning();
    return lead;
  }

  async createPreorder(insertPreorder: InsertPreorder): Promise<Preorder> {
    const [preorder] = await db.insert(preorders).values({
      email: insertPreorder.email,
      name: insertPreorder.name,
      quantity: insertPreorder.quantity,
    }).returning();
    return preorder;
  }

  async createPdInquiry(insertPdInquiry: InsertPdInquiry): Promise<PdInquiry> {
    const [pdInquiry] = await db.insert(pdInquiries).values({
      email: insertPdInquiry.email,
      name: insertPdInquiry.name,
      school: insertPdInquiry.school,
      role: insertPdInquiry.role,
      painPoint: insertPdInquiry.painPoint,
    }).returning();
    return pdInquiry;
  }
}

// Use database storage for production
export const storage = new DbStorage();
