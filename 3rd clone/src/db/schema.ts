import {
  pgTable,
  serial,
  text,
  timestamp,
  numeric,
  boolean,
  pgEnum,
} from "drizzle-orm/pg-core";

export const orderStatusEnum = pgEnum("order_status", [
  "pending",
  "completed",
  "refunded",
  "cancelled",
]);

export const vehicleTypeEnum = pgEnum("vehicle_type", [
  "car",
  "bike",
  "truck",
  "boat",
  "atv",
  "rv",
]);

export const planTierEnum = pgEnum("plan_tier", ["basic", "standard", "premium"]);

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  subject: text("subject"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  orderNumber: text("order_number").notNull().unique(),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerPhone: text("customer_phone"),
  country: text("country"),
  vin: text("vin").notNull(),
  vehicleType: vehicleTypeEnum("vehicle_type").notNull(),
  planTier: planTierEnum("plan_tier").notNull(),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  currency: text("currency").default("USD").notNull(),
  status: orderStatusEnum("status").default("pending").notNull(),
  paypalOrderId: text("paypal_order_id"),
  paypalCaptureId: text("paypal_capture_id"),
  reportGenerated: boolean("report_generated").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/** VIN lookups captured from the hero form before checkout. */
export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  vin: text("vin").notNull(),
  email: text("email").notNull(),
  country: text("country"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const sampleReportRequests = pgTable("sample_report_requests", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
