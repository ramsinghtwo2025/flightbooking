import type { Flight, Airline, Airport, Aircraft, Booking } from "@shared/schema";

export interface EnrichedFlight extends Flight {
  airline?: Airline;
  aircraft?: Aircraft;
  departureAirport?: Airport;
  arrivalAirport?: Airport;
}

export interface EnrichedBooking extends Booking {
  flight?: EnrichedFlight;
}

export interface FlightSearchFormData {
  from: string;
  to: string;
  departureDate: string;
  returnDate?: string;
  passengers: number;
  classType: "economy" | "premium" | "business" | "first";
  tripType: "round-trip" | "one-way" | "multi-city";
}

export interface BookingFormData {
  flightId: number;
  passengerFirstName: string;
  passengerLastName: string;
  passengerEmail: string;
  passengerPhone: string;
  passengerDateOfBirth: string;
  passengerGender: string;
  passengerPassport?: string;
  passengerNationality?: string;
  seatNumber?: string;
  classType: string;
  totalPrice: string;
}
