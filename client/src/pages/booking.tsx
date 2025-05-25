import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation, useParams } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SeatMap } from "@/components/flight/seat-map";
import { Badge } from "@/components/ui/badge";
import { Plane, Check } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { EnrichedFlight, BookingFormData } from "@/types/flight";

const bookingSchema = z.object({
  passengerFirstName: z.string().min(1, "First name is required"),
  passengerLastName: z.string().min(1, "Last name is required"),
  passengerEmail: z.string().email("Valid email is required"),
  passengerPhone: z.string().min(10, "Valid phone number is required"),
  passengerDateOfBirth: z.string().min(1, "Date of birth is required"),
  passengerGender: z.string().min(1, "Gender is required"),
  passengerPassport: z.string().optional(),
  passengerNationality: z.string().optional(),
});

export default function Booking() {
  const { flightId } = useParams<{ flightId: string }>();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [selectedSeat, setSelectedSeat] = useState<string>();

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      passengerFirstName: "",
      passengerLastName: "",
      passengerEmail: "",
      passengerPhone: "",
      passengerDateOfBirth: "",
      passengerGender: "",
      passengerPassport: "",
      passengerNationality: "",
      classType: "economy",
    },
  });

  const { data: flight, isLoading } = useQuery({
    queryKey: [`/api/flights/${flightId}`],
    enabled: !!flightId,
  }) as { data: EnrichedFlight | undefined; isLoading: boolean };

  const createBookingMutation = useMutation({
    mutationFn: async (data: BookingFormData) => {
      const response = await apiRequest("POST", "/api/bookings", data);
      return response.json();
    },
    onSuccess: (booking) => {
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
      toast({
        title: "Booking Confirmed!",
        description: "Your flight has been successfully booked.",
      });
      setLocation(`/confirmation/${booking.bookingReference}`);
    },
    onError: () => {
      toast({
        title: "Booking Failed",
        description: "There was an error processing your booking. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (data: BookingFormData) => {
    if (!flight) return;
    
    const seatPrice = selectedSeat ? (selectedSeat <= "17F" ? 45 : 25) : 0;
    const totalPrice = parseFloat(flight.basePrice) + seatPrice + 45; // Base + seat + taxes
    
    createBookingMutation.mutate({
      ...data,
      flightId: flight.id,
      seatNumber: selectedSeat,
      totalPrice: totalPrice.toFixed(2),
    });
  };

  const formatTime = (date: Date | string) => {
    const d = new Date(date);
    return d.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
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
            <div className="h-8 bg-gray-300 rounded w-1/2"></div>
            <div className="h-64 bg-gray-300 rounded"></div>
            <div className="h-96 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!flight) {
    return (
      <div className="min-h-screen bg-airline-gray pt-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-airline-navy mb-4">Flight Not Found</h1>
          <p className="text-gray-600 mb-8">The flight you're looking for doesn't exist.</p>
          <Button 
            onClick={() => setLocation("/flights")}
            className="bg-airline-blue hover:bg-blue-700 text-white"
          >
            Back to Flights
          </Button>
        </div>
      </div>
    );
  }

  const seatPrice = selectedSeat ? (selectedSeat <= "17F" ? 45 : 25) : 0;
  const totalPrice = parseFloat(flight.basePrice) + seatPrice + 45;

  return (
    <div className="min-h-screen bg-airline-gray pt-8 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-airline-navy mb-2">Complete Your Booking</h1>
          <p className="text-gray-600">Please fill in your details to complete the reservation</p>
        </div>
        
        {/* Booking Progress */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-airline-blue text-white rounded-full flex items-center justify-center text-sm font-bold">
                  <Check className="h-4 w-4" />
                </div>
                <span className="text-airline-blue font-semibold">Flight Details</span>
              </div>
              <div className="flex-1 h-0.5 bg-gray-300 mx-4"></div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-airline-blue text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                <span className="text-airline-blue font-semibold">Passenger Info</span>
              </div>
              <div className="flex-1 h-0.5 bg-gray-300 mx-4"></div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-bold">3</div>
                <span className="text-gray-600">Payment</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Flight Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-airline-navy">Flight Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={flight.airline?.logo}
                        alt={flight.airline?.name}
                        className="w-10 h-10 rounded"
                      />
                      <div>
                        <h3 className="font-semibold">{flight.airline?.name} {flight.flightNumber}</h3>
                        <p className="text-sm text-gray-600">{flight.aircraft?.model} • Economy</p>
                      </div>
                    </div>
                    <p className="text-lg font-bold text-airline-navy">${flight.basePrice}</p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 items-center text-center">
                    <div>
                      <p className="text-xl font-bold">{formatTime(flight.departureTime)}</p>
                      <p className="text-sm text-gray-600">{flight.departureAirport?.code}, {flight.departureAirport?.city}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">{formatDuration(flight.duration)}</p>
                      <div className="flex items-center justify-center my-2">
                        <div className="w-3 h-3 border-2 border-airline-blue rounded-full"></div>
                        <div className="flex-1 h-0.5 bg-airline-blue mx-2"></div>
                        <Plane className="h-4 w-4 text-airline-blue" />
                        <div className="flex-1 h-0.5 bg-airline-blue mx-2"></div>
                        <div className="w-3 h-3 border-2 border-airline-blue rounded-full"></div>
                      </div>
                      <Badge variant="secondary" className="text-green-600">
                        {flight.stops === 0 ? "Direct" : `${flight.stops} Stop${flight.stops > 1 ? "s" : ""}`}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-xl font-bold">{formatTime(flight.arrivalTime)}</p>
                      <p className="text-sm text-gray-600">{flight.arrivalAirport?.code}, {flight.arrivalAirport?.city}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Passenger Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-airline-navy">Passenger Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-airline-navy">First Name *</Label>
                      <Input
                        id="firstName"
                        {...form.register("passengerFirstName")}
                        placeholder="John"
                      />
                      {form.formState.errors.passengerFirstName && (
                        <p className="text-sm text-red-600 mt-1">
                          {form.formState.errors.passengerFirstName.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-airline-navy">Last Name *</Label>
                      <Input
                        id="lastName"
                        {...form.register("passengerLastName")}
                        placeholder="Doe"
                      />
                      {form.formState.errors.passengerLastName && (
                        <p className="text-sm text-red-600 mt-1">
                          {form.formState.errors.passengerLastName.message}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="dateOfBirth" className="text-airline-navy">Date of Birth *</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        {...form.register("passengerDateOfBirth")}
                      />
                      {form.formState.errors.passengerDateOfBirth && (
                        <p className="text-sm text-red-600 mt-1">
                          {form.formState.errors.passengerDateOfBirth.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="gender" className="text-airline-navy">Gender *</Label>
                      <Select onValueChange={(value) => form.setValue("passengerGender", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      {form.formState.errors.passengerGender && (
                        <p className="text-sm text-red-600 mt-1">
                          {form.formState.errors.passengerGender.message}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-airline-navy">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      {...form.register("passengerEmail")}
                      placeholder="john.doe@email.com"
                    />
                    {form.formState.errors.passengerEmail && (
                      <p className="text-sm text-red-600 mt-1">
                        {form.formState.errors.passengerEmail.message}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="phone" className="text-airline-navy">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      {...form.register("passengerPhone")}
                      placeholder="+1 (555) 123-4567"
                    />
                    {form.formState.errors.passengerPhone && (
                      <p className="text-sm text-red-600 mt-1">
                        {form.formState.errors.passengerPhone.message}
                      </p>
                    )}
                  </div>
                  
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold text-airline-navy mb-4">Passport Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="passport" className="text-airline-navy">Passport Number</Label>
                        <Input
                          id="passport"
                          {...form.register("passengerPassport")}
                          placeholder="AB1234567"
                        />
                      </div>
                      <div>
                        <Label htmlFor="nationality" className="text-airline-navy">Nationality</Label>
                        <Select onValueChange={(value) => form.setValue("passengerNationality", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="us">United States</SelectItem>
                            <SelectItem value="uk">United Kingdom</SelectItem>
                            <SelectItem value="ca">Canada</SelectItem>
                            <SelectItem value="au">Australia</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
            
            {/* Seat Selection */}
            <SeatMap onSeatSelect={setSelectedSeat} selectedSeat={selectedSeat} />
          </div>
          
          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-airline-navy">Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Flight (1 adult)</span>
                    <span className="font-semibold">${flight.basePrice}</span>
                  </div>
                  {selectedSeat && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Seat Selection ({selectedSeat})</span>
                      <span className="font-semibold">${seatPrice}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Taxes & Fees</span>
                    <span className="font-semibold">$45.00</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between">
                      <span className="text-lg font-bold text-airline-navy">Total</span>
                      <span className="text-lg font-bold text-airline-navy">${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <Button 
                  onClick={form.handleSubmit(handleSubmit)}
                  disabled={createBookingMutation.isPending}
                  className="w-full bg-airline-blue hover:bg-blue-700 text-white font-semibold"
                >
                  {createBookingMutation.isPending ? "Processing..." : "Complete Booking"}
                </Button>
                
                <div className="text-center">
                  <p className="text-xs text-gray-500">
                    By continuing, you agree to our{" "}
                    <a href="/terms" className="text-airline-blue hover:underline">
                      Terms & Conditions
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
