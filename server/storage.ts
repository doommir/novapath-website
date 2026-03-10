import { type User, type InsertUser, type Lead, type InsertLead, type Preorder, type InsertPreorder, type PdInquiry, type InsertPdInquiry, type AutograderInquiry, type InsertAutograderInquiry, type MathMovesInquiry, type InsertMathMovesInquiry, type InvestorInquiry, type InsertInvestorInquiry, type ConsultingInquiry, type InsertConsultingInquiry, type CobuilderInquiry, type InsertCobuilderInquiry, users, leads, preorders, pdInquiries, autograderInquiries, mathMovesInquiries, investorInquiries, consultingInquiries, cobuilderInquiries } from "@shared/schema";
import { randomUUID } from "crypto";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createLead(lead: InsertLead): Promise<Lead>;
  createPreorder(preorder: InsertPreorder): Promise<Preorder>;
  createPdInquiry(inquiry: InsertPdInquiry): Promise<PdInquiry>;
  createAutograderInquiry(inquiry: InsertAutograderInquiry): Promise<AutograderInquiry>;
  createMathMovesInquiry(inquiry: InsertMathMovesInquiry): Promise<MathMovesInquiry>;
  createInvestorInquiry(inquiry: InsertInvestorInquiry): Promise<InvestorInquiry>;
  createConsultingInquiry(inquiry: InsertConsultingInquiry): Promise<ConsultingInquiry>;
  createCobuilderInquiry(inquiry: InsertCobuilderInquiry): Promise<CobuilderInquiry>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private leads: Map<string, Lead>;
  private preorders: Map<string, Preorder>;
  private pdInquiries: Map<string, PdInquiry>;
  private autograderInquiries: Map<string, AutograderInquiry>;
  private mathMovesInquiries: Map<string, MathMovesInquiry>;
  private investorInquiries: Map<string, InvestorInquiry>;
  private consultingInquiries: Map<string, ConsultingInquiry>;
  private cobuilderInquiries: Map<string, CobuilderInquiry>;

  constructor() {
    this.users = new Map();
    this.leads = new Map();
    this.preorders = new Map();
    this.pdInquiries = new Map();
    this.autograderInquiries = new Map();
    this.mathMovesInquiries = new Map();
    this.investorInquiries = new Map();
    this.consultingInquiries = new Map();
    this.cobuilderInquiries = new Map();
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

  async createAutograderInquiry(insertAutograderInquiry: InsertAutograderInquiry): Promise<AutograderInquiry> {
    const id = randomUUID();
    const autograderInquiry: AutograderInquiry = {
      id,
      email: insertAutograderInquiry.email,
      name: insertAutograderInquiry.name,
      school: insertAutograderInquiry.school,
      role: insertAutograderInquiry.role,
      gradeLevel: insertAutograderInquiry.gradeLevel,
      additionalInfo: insertAutograderInquiry.additionalInfo ?? null,
      submittedAt: new Date()
    };
    this.autograderInquiries.set(id, autograderInquiry);
    return autograderInquiry;
  }

  async createMathMovesInquiry(insertMathMovesInquiry: InsertMathMovesInquiry): Promise<MathMovesInquiry> {
    const id = randomUUID();
    const mathMovesInquiry: MathMovesInquiry = {
      id,
      email: insertMathMovesInquiry.email,
      name: insertMathMovesInquiry.name,
      school: insertMathMovesInquiry.school,
      role: insertMathMovesInquiry.role,
      gradeLevel: insertMathMovesInquiry.gradeLevel,
      additionalInfo: insertMathMovesInquiry.additionalInfo ?? null,
      submittedAt: new Date()
    };
    this.mathMovesInquiries.set(id, mathMovesInquiry);
    return mathMovesInquiry;
  }

  async createInvestorInquiry(insertInvestorInquiry: InsertInvestorInquiry): Promise<InvestorInquiry> {
    const id = randomUUID();
    const investorInquiry: InvestorInquiry = {
      id,
      email: insertInvestorInquiry.email,
      name: insertInvestorInquiry.name,
      checkSize: insertInvestorInquiry.checkSize,
      accredited: insertInvestorInquiry.accredited,
      notes: insertInvestorInquiry.notes ?? null,
      submittedAt: new Date()
    };
    this.investorInquiries.set(id, investorInquiry);
    return investorInquiry;
  }

  async createConsultingInquiry(insertConsultingInquiry: InsertConsultingInquiry): Promise<ConsultingInquiry> {
    const id = randomUUID();
    const consultingInquiry: ConsultingInquiry = {
      id,
      name: insertConsultingInquiry.name,
      role: insertConsultingInquiry.role,
      district: insertConsultingInquiry.district,
      email: insertConsultingInquiry.email,
      challenge: insertConsultingInquiry.challenge ?? null,
      submittedAt: new Date()
    };
    this.consultingInquiries.set(id, consultingInquiry);
    return consultingInquiry;
  }

  async createCobuilderInquiry(insertCobuilderInquiry: InsertCobuilderInquiry): Promise<CobuilderInquiry> {
    const id = randomUUID();
    const cobuilderInquiry: CobuilderInquiry = {
      id,
      name: insertCobuilderInquiry.name,
      email: insertCobuilderInquiry.email,
      appDescription: insertCobuilderInquiry.appDescription,
      stuckPoint: insertCobuilderInquiry.stuckPoint,
      budget: insertCobuilderInquiry.budget ?? null,
      submittedAt: new Date()
    };
    this.cobuilderInquiries.set(id, cobuilderInquiry);
    return cobuilderInquiry;
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

  async createAutograderInquiry(insertAutograderInquiry: InsertAutograderInquiry): Promise<AutograderInquiry> {
    const [autograderInquiry] = await db.insert(autograderInquiries).values({
      email: insertAutograderInquiry.email,
      name: insertAutograderInquiry.name,
      school: insertAutograderInquiry.school,
      role: insertAutograderInquiry.role,
      gradeLevel: insertAutograderInquiry.gradeLevel,
      additionalInfo: insertAutograderInquiry.additionalInfo ?? null,
    }).returning();
    return autograderInquiry;
  }

  async createMathMovesInquiry(insertMathMovesInquiry: InsertMathMovesInquiry): Promise<MathMovesInquiry> {
    const [mathMovesInquiry] = await db.insert(mathMovesInquiries).values({
      email: insertMathMovesInquiry.email,
      name: insertMathMovesInquiry.name,
      school: insertMathMovesInquiry.school,
      role: insertMathMovesInquiry.role,
      gradeLevel: insertMathMovesInquiry.gradeLevel,
      additionalInfo: insertMathMovesInquiry.additionalInfo ?? null,
    }).returning();
    return mathMovesInquiry;
  }

  async createInvestorInquiry(insertInvestorInquiry: InsertInvestorInquiry): Promise<InvestorInquiry> {
    const [investorInquiry] = await db.insert(investorInquiries).values({
      email: insertInvestorInquiry.email,
      name: insertInvestorInquiry.name,
      checkSize: insertInvestorInquiry.checkSize,
      accredited: insertInvestorInquiry.accredited,
      notes: insertInvestorInquiry.notes ?? null,
    }).returning();
    return investorInquiry;
  }

  async createConsultingInquiry(insertConsultingInquiry: InsertConsultingInquiry): Promise<ConsultingInquiry> {
    const [consultingInquiry] = await db.insert(consultingInquiries).values({
      name: insertConsultingInquiry.name,
      role: insertConsultingInquiry.role,
      district: insertConsultingInquiry.district,
      email: insertConsultingInquiry.email,
      challenge: insertConsultingInquiry.challenge ?? null,
    }).returning();
    return consultingInquiry;
  }

  async createCobuilderInquiry(insertCobuilderInquiry: InsertCobuilderInquiry): Promise<CobuilderInquiry> {
    const [cobuilderInquiry] = await db.insert(cobuilderInquiries).values({
      name: insertCobuilderInquiry.name,
      email: insertCobuilderInquiry.email,
      appDescription: insertCobuilderInquiry.appDescription,
      stuckPoint: insertCobuilderInquiry.stuckPoint,
      budget: insertCobuilderInquiry.budget ?? null,
    }).returning();
    return cobuilderInquiry;
  }
}

export const storage = new DbStorage();
