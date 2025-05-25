import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { flightSearchSchema, insertBookingSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Airlines
  app.get("/api/airlines", async (req, res) => {
    try {
      const airlines = await storage.getAirlines();
      res.json(airlines);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch airlines" });
    }
  });

  // Airports
  app.get("/api/airports", async (req, res) => {
    try {
      const airports = await storage.getAirports();
      res.json(airports);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch airports" });
    }
  });

  // Flight search
  app.post("/api/flights/search", async (req, res) => {
    try {
      const searchParams = flightSearchSchema.parse(req.body);
      const flights = await storage.searchFlights(searchParams);
      
      // Enrich flight data with airline, airport, and aircraft information
      const enrichedFlights = await Promise.all(
        flights.map(async (flight) => {
          const airline = await storage.getAirline(flight.airlineId);
          const aircraft = await storage.getAircraftById(flight.aircraftId);
          const departureAirport = await storage.getAirport(flight.departureAirportId);
          const arrivalAirport = await storage.getAirport(flight.arrivalAirportId);
          
          return {
            ...flight,
            airline,
            aircraft,
            departureAirport,
            arrivalAirport,
          };
        })
      );
      
      res.json(enrichedFlights);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid search parameters", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to search flights" });
      }
    }
  });

  // Get flight details
  app.get("/api/flights/:id", async (req, res) => {
    try {
      const flightId = parseInt(req.params.id);
      const flight = await storage.getFlight(flightId);
      
      if (!flight) {
        return res.status(404).json({ message: "Flight not found" });
      }
      
      const airline = await storage.getAirline(flight.airlineId);
      const aircraft = await storage.getAircraftById(flight.aircraftId);
      const departureAirport = await storage.getAirport(flight.departureAirportId);
      const arrivalAirport = await storage.getAirport(flight.arrivalAirportId);
      
      const enrichedFlight = {
        ...flight,
        airline,
        aircraft,
        departureAirport,
        arrivalAirport,
      };
      
      res.json(enrichedFlight);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch flight details" });
    }
  });

  // Create booking
  app.post("/api/bookings", async (req, res) => {
    try {
      const bookingData = insertBookingSchema.parse(req.body);
      const booking = await storage.createBooking(bookingData);
      res.status(201).json(booking);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid booking data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create booking" });
      }
    }
  });

  // Get booking by reference
  app.get("/api/bookings/:reference", async (req, res) => {
    try {
      const booking = await storage.getBookingByReference(req.params.reference);
      
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }
      
      const flight = await storage.getFlight(booking.flightId);
      const airline = flight ? await storage.getAirline(flight.airlineId) : null;
      const aircraft = flight ? await storage.getAircraftById(flight.aircraftId) : null;
      const departureAirport = flight ? await storage.getAirport(flight.departureAirportId) : null;
      const arrivalAirport = flight ? await storage.getAirport(flight.arrivalAirportId) : null;
      
      const enrichedBooking = {
        ...booking,
        flight: flight ? {
          ...flight,
          airline,
          aircraft,
          departureAirport,
          arrivalAirport,
        } : null,
      };
      
      res.json(enrichedBooking);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch booking" });
    }
  });

  // Contact form submission (mock endpoint)
  app.post("/api/contact", async (req, res) => {
    try {
      const { firstName, lastName, email, phone, subject, message } = req.body;
      
      // In a real application, this would send an email or save to database
      console.log("Contact form submission:", { firstName, lastName, email, phone, subject, message });
      
      res.json({ message: "Contact form submitted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to submit contact form" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
