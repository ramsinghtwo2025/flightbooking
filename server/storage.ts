import { 
  airlines, airports, aircraft, flights, bookings, users,
  type Airline, type Airport, type Aircraft, type Flight, type Booking, type User,
  type InsertAirline, type InsertAirport, type InsertAircraft, 
  type InsertFlight, type InsertBooking, type InsertUser,
  type FlightSearch
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Airline methods
  getAirlines(): Promise<Airline[]>;
  getAirline(id: number): Promise<Airline | undefined>;
  createAirline(airline: InsertAirline): Promise<Airline>;
  
  // Airport methods
  getAirports(): Promise<Airport[]>;
  getAirport(id: number): Promise<Airport | undefined>;
  getAirportByCode(code: string): Promise<Airport | undefined>;
  createAirport(airport: InsertAirport): Promise<Airport>;
  
  // Aircraft methods
  getAircraft(): Promise<Aircraft[]>;
  getAircraftById(id: number): Promise<Aircraft | undefined>;
  createAircraft(aircraft: InsertAircraft): Promise<Aircraft>;
  
  // Flight methods
  getFlights(): Promise<Flight[]>;
  getFlight(id: number): Promise<Flight | undefined>;
  searchFlights(search: FlightSearch): Promise<Flight[]>;
  createFlight(flight: InsertFlight): Promise<Flight>;
  
  // Booking methods
  getBookings(): Promise<Booking[]>;
  getBooking(id: number): Promise<Booking | undefined>;
  getBookingByReference(reference: string): Promise<Booking | undefined>;
  createBooking(booking: InsertBooking): Promise<Booking>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private airlines: Map<number, Airline>;
  private airports: Map<number, Airport>;
  private aircraftMap: Map<number, Aircraft>;
  private flights: Map<number, Flight>;
  private bookings: Map<number, Booking>;
  
  private currentUserId: number = 1;
  private currentAirlineId: number = 1;
  private currentAirportId: number = 1;
  private currentAircraftId: number = 1;
  private currentFlightId: number = 1;
  private currentBookingId: number = 1;

  constructor() {
    this.users = new Map();
    this.airlines = new Map();
    this.airports = new Map();
    this.aircraftMap = new Map();
    this.flights = new Map();
    this.bookings = new Map();
    
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Initialize airlines
    const sampleAirlines: InsertAirline[] = [
      { code: "SW", name: "SkyWings", logo: "https://via.placeholder.com/40x40/1e40af/ffffff?text=SW" },
      { code: "AG", name: "AirGlobal", logo: "https://via.placeholder.com/40x40/059669/ffffff?text=AG" },
      { code: "CJ", name: "CloudJet", logo: "https://via.placeholder.com/40x40/d97706/ffffff?text=CJ" },
    ];
    
    sampleAirlines.forEach(airline => this.createAirline(airline));
    
    // Initialize airports
    const sampleAirports: InsertAirport[] = [
      { code: "JFK", name: "John F. Kennedy International Airport", city: "New York", country: "United States" },
      { code: "LAX", name: "Los Angeles International Airport", city: "Los Angeles", country: "United States" },
      { code: "LHR", name: "London Heathrow Airport", city: "London", country: "United Kingdom" },
      { code: "CDG", name: "Charles de Gaulle Airport", city: "Paris", country: "France" },
      { code: "NRT", name: "Narita International Airport", city: "Tokyo", country: "Japan" },
      { code: "DXB", name: "Dubai International Airport", city: "Dubai", country: "United Arab Emirates" },
      { code: "SYD", name: "Sydney Kingsford Smith Airport", city: "Sydney", country: "Australia" },
      { code: "ORD", name: "O'Hare International Airport", city: "Chicago", country: "United States" },
    ];
    
    sampleAirports.forEach(airport => this.createAirport(airport));
    
    // Initialize aircraft
    const sampleAircraft: InsertAircraft[] = [
      { 
        model: "Boeing 737", 
        manufacturer: "Boeing", 
        capacity: 189, 
        seatConfiguration: { economy: 189 } 
      },
      { 
        model: "Airbus A320", 
        manufacturer: "Airbus", 
        capacity: 180, 
        seatConfiguration: { economy: 150, premium: 30 } 
      },
      { 
        model: "Boeing 777", 
        manufacturer: "Boeing", 
        capacity: 396, 
        seatConfiguration: { economy: 296, premium: 60, business: 40 } 
      },
    ];
    
    sampleAircraft.forEach(aircraft => this.createAircraft(aircraft));
    
    // Initialize sample flights
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const sampleFlights: InsertFlight[] = [
      {
        flightNumber: "SW1234",
        airlineId: 1,
        aircraftId: 1,
        departureAirportId: 1, // JFK
        arrivalAirportId: 2, // LAX
        departureTime: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 8, 0),
        arrivalTime: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 11, 15),
        basePrice: "299.00",
        duration: 375, // 6h 15m
        stops: 0,
      },
      {
        flightNumber: "AG5678",
        airlineId: 2,
        aircraftId: 2,
        departureAirportId: 1, // JFK
        arrivalAirportId: 2, // LAX
        departureTime: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 10, 30),
        arrivalTime: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 16, 15),
        basePrice: "349.00",
        duration: 525, // 8h 45m
        stops: 1,
      },
      {
        flightNumber: "CJ9012",
        airlineId: 3,
        aircraftId: 1,
        departureAirportId: 1, // JFK
        arrivalAirportId: 2, // LAX
        departureTime: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 14, 20),
        arrivalTime: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 17, 50),
        basePrice: "279.00",
        duration: 390, // 6h 30m
        stops: 0,
      },
    ];
    
    sampleFlights.forEach(flight => this.createFlight(flight));
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Airline methods
  async getAirlines(): Promise<Airline[]> {
    return Array.from(this.airlines.values());
  }

  async getAirline(id: number): Promise<Airline | undefined> {
    return this.airlines.get(id);
  }

  async createAirline(insertAirline: InsertAirline): Promise<Airline> {
    const id = this.currentAirlineId++;
    const airline: Airline = { ...insertAirline, id };
    this.airlines.set(id, airline);
    return airline;
  }

  // Airport methods
  async getAirports(): Promise<Airport[]> {
    return Array.from(this.airports.values());
  }

  async getAirport(id: number): Promise<Airport | undefined> {
    return this.airports.get(id);
  }

  async getAirportByCode(code: string): Promise<Airport | undefined> {
    return Array.from(this.airports.values()).find(airport => airport.code === code);
  }

  async createAirport(insertAirport: InsertAirport): Promise<Airport> {
    const id = this.currentAirportId++;
    const airport: Airport = { ...insertAirport, id };
    this.airports.set(id, airport);
    return airport;
  }

  // Aircraft methods
  async getAircraft(): Promise<Aircraft[]> {
    return Array.from(this.aircraftMap.values());
  }

  async getAircraftById(id: number): Promise<Aircraft | undefined> {
    return this.aircraftMap.get(id);
  }

  async createAircraft(insertAircraft: InsertAircraft): Promise<Aircraft> {
    const id = this.currentAircraftId++;
    const aircraft: Aircraft = { ...insertAircraft, id };
    this.aircraftMap.set(id, aircraft);
    return aircraft;
  }

  // Flight methods
  async getFlights(): Promise<Flight[]> {
    return Array.from(this.flights.values());
  }

  async getFlight(id: number): Promise<Flight | undefined> {
    return this.flights.get(id);
  }

  async searchFlights(search: FlightSearch): Promise<Flight[]> {
    const allFlights = Array.from(this.flights.values());
    const searchDate = new Date(search.departureDate);
    
    return allFlights.filter(flight => {
      const departureAirport = this.airports.get(flight.departureAirportId);
      const arrivalAirport = this.airports.get(flight.arrivalAirportId);
      const flightDate = new Date(flight.departureTime);
      
      const matchesRoute = departureAirport?.city.toLowerCase().includes(search.from.toLowerCase()) ||
                          departureAirport?.code.toLowerCase().includes(search.from.toLowerCase()) ||
                          arrivalAirport?.city.toLowerCase().includes(search.to.toLowerCase()) ||
                          arrivalAirport?.code.toLowerCase().includes(search.to.toLowerCase());
      
      const matchesDate = flightDate.toDateString() === searchDate.toDateString();
      
      return matchesRoute && matchesDate;
    });
  }

  async createFlight(insertFlight: InsertFlight): Promise<Flight> {
    const id = this.currentFlightId++;
    const flight: Flight = { ...insertFlight, id };
    this.flights.set(id, flight);
    return flight;
  }

  // Booking methods
  async getBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values());
  }

  async getBooking(id: number): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }

  async getBookingByReference(reference: string): Promise<Booking | undefined> {
    return Array.from(this.bookings.values()).find(booking => booking.bookingReference === reference);
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = this.currentBookingId++;
    const bookingReference = this.generateBookingReference();
    const booking: Booking = { 
      ...insertBooking, 
      id, 
      bookingReference,
      createdAt: new Date()
    };
    this.bookings.set(id, booking);
    return booking;
  }

  private generateBookingReference(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
}

export const storage = new MemStorage();
