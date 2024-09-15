import { integer, text, boolean, pgTable, serial, timestamp } from "drizzle-orm/pg-core";


export const users = pgTable("users", {
  id: serial("id").primaryKey(), 
  username: text("username").notNull(), 
  password: text("password").notNull(), 
  pic: text("pic"), 
  paymentDate: timestamp("payment_date"), 
  SubscriptionID: text("subscription_id"),
  planName: text("planName"),
});


export const images = pgTable("images", {
  id: serial("id").primaryKey(), 
  userId: integer("user_id").references(() => users.id).notNull(), 
  afterBgRemoval: text("after_bg_removal").notNull(), 
  processedAt: timestamp("processed_at") 
});
export const Subscribers = pgTable("Subscribers", {
  id: serial("id").primaryKey(), 
  username: text("username").notNull(), 
});
