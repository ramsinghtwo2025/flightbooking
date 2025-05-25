import { pgTable, text, serial, integer, boolean, timestamp, numeric, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const airlines = pgTable("airlines", {
  id: serial("id").primaryKey(),
  code: text("code").notNull().unique(),
  name: text("name").notNull(),
  logo: text("logo"),
});

export const airports = pgTable("airports", {
  id: serial("id").primaryKey(),
  code: text("code").notNull().unique(),
  name: text("name").notNull(),
  city: text("city").notNull(),
  country: text("country").notNull(),
});

export const aircraft = pgTable("aircraft", {
  id: serial("id").primaryKey(),
  model: text("model").notNull(),
  manufacturer: text("manufacturer").notNull(),
  capacity: integer("capacity").notNull(),
  seatConfiguration: json("seat_configuration").$type<{
    economy: number;
    premium?: number;
    business?: number;
    first?: number;
  }>().notNull(),
});

export const flights = pgTable("flights", {
  id: serial("id").primaryKey(),
  flightNumber: text("flight_number").notNull(),
  airlineId: integer("airline_id").references(() => airlines.id).notNull(),
  aircraftId: integer("aircraft_id").references(() => aircraft.id).notNull(),
  departureAirportId: integer("departure_airport_id").references(() => airports.id).notNull(),
  arrivalAirportId: integer("arrival_airport_id").references(() => airports.id).notNull(),
  departureTime: timestamp("departure_time").notNull(),
  arrivalTime: timestamp("arrival_time").notNull(),
  basePrice: numeric("base_price", { precision: 10, scale: 2 }).notNull(),
  status: text("status").notNull().default("scheduled"),
  duration: integer("duration").notNull(), // in minutes
  stops: integer("stops").notNull().default(0),
});

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  bookingReference: text("booking_reference").notNull().unique(),
  flightId: integer("flight_id").references(() => flights.id).notNull(),
  passengerFirstName: text("passenger_first_name").notNull(),
  passengerLastName: text("passenger_last_name").notNull(),
  passengerEmail: text("passenger_email").notNull(),
  passengerPhone: text("passenger_phone").notNull(),
  passengerDateOfBirth: text("passenger_date_of_birth").notNull(),
  passengerGender: text("passenger_gender").notNull(),
  passengerPassport: text("passenger_passport"),
  passengerNationality: text("passenger_nationality"),
  seatNumber: text("seat_number"),
  classType: text("class_type").notNull().default("economy"),
  totalPrice: numeric("total_price", { precision: 10, scale: 2 }).notNull(),
  bookingStatus: text("booking_status").notNull().default("confirmed"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// Insert schemas
export const insertAirlineSchema = createInsertSchema(airlines).omit({ id: true });
export const insertAirportSchema = createInsertSchema(airports).omit({ id: true });
export const insertAircraftSchema = createInsertSchema(aircraft).omit({ id: true });
export const insertFlightSchema = createInsertSchema(flights).omit({ id: true });
export const insertBookingSchema = createInsertSchema(bookings).omit({ 
  id: true, 
  bookingReference: true, 
  createdAt: true 
});
export const insertUserSchema = createInsertSchema(users).omit({ id: true });

// Types
export type Airline = typeof airlines.$inferSelect;
export type Airport = typeof airports.$inferSelect;
export type Aircraft = typeof aircraft.$inferSelect;
export type Flight = typeof flights.$inferSelect;
export type Booking = typeof bookings.$inferSelect;
export type User = typeof users.$inferSelect;

export type InsertAirline = z.infer<typeof insertAirlineSchema>;
export type InsertAirport = z.infer<typeof insertAirportSchema>;
export type InsertAircraft = z.infer<typeof insertAircraftSchema>;
export type InsertFlight = z.infer<typeof insertFlightSchema>;
export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type InsertUser = z.infer<typeof insertUserSchema>;

// Flight search types
export const flightSearchSchema = z.object({
  from: z.string().min(1),
  to: z.string().min(1),
  departureDate: z.string(),
  returnDate: z.string().optional(),
  passengers: z.number().min(1).max(9),
  classType: z.enum(["economy", "premium", "business", "first"]),
  tripType: z.enum(["round-trip", "one-way", "multi-city"]),
});

export type FlightSearch = z.infer<typeof flightSearchSchema>;
