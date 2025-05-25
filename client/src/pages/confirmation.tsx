import { useQuery } from "@tanstack/react-query";
import { useParams, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Download, Mail, Home, Plane } from "lucide-react";
import type { EnrichedBooking } from "@/types/flight";

export default function Confirmation() {
  const { bookingRef } = useParams<{ bookingRef: string }>();
  const [, setLocation] = useLocation();

  const { data: booking, isLoading } = useQuery({
    queryKey: [`/api/bookings/${bookingRef}`],
    enabled: !!bookingRef,
  }) as { data: EnrichedBooking | undefined; isLoading: boolean };

  const formatTime = (date: Date | string) => {
    const d = new Date(date);
    return d.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-airline-gray pt-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <div className="h-8 bg-gray-300 rounded w-1/2 mx-auto mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-2/3 mx-auto"></div>
            </div>
            <div className="h-96 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-airline-gray pt-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-airline-navy mb-4">Booking Not Found</h1>
          <p className="text-gray-600 mb-8">The booking reference you're looking for doesn't exist.</p>
          <Button 
            onClick={() => setLocation("/")}
            className="bg-airline-blue hover:bg-blue-700 text-white"
          >
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-airline-gray pt-8 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-airline-navy mb-2">Booking Confirmed!</h1>
          <p className="text-gray-600">Your flight has been successfully booked. Confirmation details have been sent to your email.</p>
        </div>
        
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-airline-navy">Booking Reference</h2>
              <span className="text-2xl font-bold text-airline-blue">{booking.bookingReference}</span>
            </div>
            
            {/* Flight Details */}
            {booking.flight && (
              <div className="border rounded-lg p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={booking.flight.airline?.logo}
                      alt={booking.flight.airline?.name}
                      className="w-10 h-10 rounded"
                    />
                    <div>
                      <h3 className="font-semibold">
                        {booking.flight.airline?.name} {booking.flight.flightNumber}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {booking.flight.aircraft?.model} • {booking.classType} 
                        {booking.seatNumber && ` • Seat ${booking.seatNumber}`}
                      </p>
                    </div>
                  </div>
                  <p className="text-lg font-bold text-airline-navy">${booking.totalPrice}</p>
                </div>
                
                <div className="grid grid-cols-3 gap-4 items-center text-center">
                  <div>
                    <p className="text-xl font-bold">{formatTime(booking.flight.departureTime)}</p>
                    <p className="text-sm text-gray-600">
                      {booking.flight.departureAirport?.code}, {booking.flight.departureAirport?.city}
                    </p>
                    <p className="text-xs text-gray-500">{formatDate(booking.flight.departureTime)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{formatDuration(booking.flight.duration)}</p>
                    <div className="flex items-center justify-center my-2">
                      <div className="w-3 h-3 border-2 border-airline-blue rounded-full"></div>
                      <div className="flex-1 h-0.5 bg-airline-blue mx-2"></div>
                      <Plane className="h-4 w-4 text-airline-blue" />
                      <div className="flex-1 h-0.5 bg-airline-blue mx-2"></div>
                      <div className="w-3 h-3 border-2 border-airline-blue rounded-full"></div>
                    </div>
                    <Badge variant="secondary" className="text-green-600">
                      {booking.flight.stops === 0 ? "Direct" : `${booking.flight.stops} Stop${booking.flight.stops > 1 ? "s" : ""}`}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-xl font-bold">{formatTime(booking.flight.arrivalTime)}</p>
                    <p className="text-sm text-gray-600">
                      {booking.flight.arrivalAirport?.code}, {booking.flight.arrivalAirport?.city}
                    </p>
                    <p className="text-xs text-gray-500">{formatDate(booking.flight.arrivalTime)}</p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Passenger Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-semibold text-airline-navy mb-2">Passenger Information</h3>
                <p className="text-gray-600">{booking.passengerFirstName} {booking.passengerLastName}</p>
                <p className="text-gray-600">{booking.passengerEmail}</p>
                <p className="text-gray-600">{booking.passengerPhone}</p>
              </div>
              <div>
                <h3 className="font-semibold text-airline-navy mb-2">Important Information</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Check-in opens 24 hours before departure</li>
                  <li>• Arrive at airport 2 hours before departure</li>
                  <li>• Bring valid passport or ID</li>
                  <li>• Baggage allowance: 1 carry-on, 1 checked bag</li>
                </ul>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="flex-1 bg-airline-blue hover:bg-blue-700 text-white">
                <Download className="mr-2 h-4 w-4" />
                Download Ticket
              </Button>
              <Button variant="outline" className="flex-1 border-airline-blue text-airline-blue hover:bg-airline-blue hover:text-white">
                <Mail className="mr-2 h-4 w-4" />
                Email Ticket
              </Button>
              <Button 
                variant="outline"
                onClick={() => setLocation("/")}
                className="flex-1"
              >
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
