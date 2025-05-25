import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Plane, Search } from "lucide-react";
import type { FlightSearchFormData } from "@/types/flight";

const searchSchema = z.object({
  from: z.string().min(1, "Departure city is required"),
  to: z.string().min(1, "Destination city is required"),
  departureDate: z.string().min(1, "Departure date is required"),
  returnDate: z.string().optional(),
  passengers: z.number().min(1).max(9),
  classType: z.enum(["economy", "premium", "business", "first"]),
  tripType: z.enum(["round-trip", "one-way", "multi-city"]),
});

interface FlightSearchProps {
  onSearch: (data: FlightSearchFormData) => void;
}

export function FlightSearch({ onSearch }: FlightSearchProps) {
  const [tripType, setTripType] = useState<"round-trip" | "one-way" | "multi-city">("round-trip");

  const form = useForm<FlightSearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      from: "",
      to: "",
      departureDate: "",
      returnDate: "",
      passengers: 1,
      classType: "economy",
      tripType: "round-trip",
    },
  });

  const handleSubmit = (data: FlightSearchFormData) => {
    onSearch({ ...data, tripType });
  };

  return (
    <section className="py-16 bg-airline-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-airline-navy mb-4">Search Flights</h2>
          <p className="text-lg text-gray-600">Find the perfect flight for your next adventure</p>
        </div>
        
        <Card className="bg-white rounded-2xl shadow-xl">
          <CardContent className="p-6 md:p-8">
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              <RadioGroup
                value={tripType}
                onValueChange={(value: "round-trip" | "one-way" | "multi-city") => setTripType(value)}
                className="flex flex-col md:flex-row md:items-center md:space-x-6 space-y-2 md:space-y-0"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="round-trip" id="round-trip" />
                  <Label htmlFor="round-trip" className="text-airline-navy font-medium">Round Trip</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="one-way" id="one-way" />
                  <Label htmlFor="one-way" className="text-airline-navy font-medium">One Way</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="multi-city" id="multi-city" />
                  <Label htmlFor="multi-city" className="text-airline-navy font-medium">Multi-City</Label>
                </div>
              </RadioGroup>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="from" className="text-sm font-medium text-airline-navy">From</Label>
                  <div className="relative">
                    <Input
                      id="from"
                      placeholder="Departure city"
                      {...form.register("from")}
                      className="pl-4 pr-10"
                    />
                    <Plane className="absolute right-3 top-3 h-4 w-4 text-gray-400 rotate-45" />
                  </div>
                  {form.formState.errors.from && (
                    <p className="text-sm text-red-600">{form.formState.errors.from.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="to" className="text-sm font-medium text-airline-navy">To</Label>
                  <div className="relative">
                    <Input
                      id="to"
                      placeholder="Destination city"
                      {...form.register("to")}
                      className="pl-4 pr-10"
                    />
                    <Plane className="absolute right-3 top-3 h-4 w-4 text-gray-400 -rotate-45" />
                  </div>
                  {form.formState.errors.to && (
                    <p className="text-sm text-red-600">{form.formState.errors.to.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="departureDate" className="text-sm font-medium text-airline-navy">Departure</Label>
                  <Input
                    id="departureDate"
                    type="date"
                    {...form.register("departureDate")}
                  />
                  {form.formState.errors.departureDate && (
                    <p className="text-sm text-red-600">{form.formState.errors.departureDate.message}</p>
                  )}
                </div>
                
                {tripType === "round-trip" && (
                  <div className="space-y-2">
                    <Label htmlFor="returnDate" className="text-sm font-medium text-airline-navy">Return</Label>
                    <Input
                      id="returnDate"
                      type="date"
                      {...form.register("returnDate")}
                    />
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-airline-navy">Passengers</Label>
                  <Select onValueChange={(value) => form.setValue("passengers", parseInt(value))}>
                    <SelectTrigger>
                      <SelectValue placeholder="1 Adult" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Adult</SelectItem>
                      <SelectItem value="2">2 Adults</SelectItem>
                      <SelectItem value="3">3 Adults</SelectItem>
                      <SelectItem value="4">4 Adults</SelectItem>
                      <SelectItem value="5">5 Adults</SelectItem>
                      <SelectItem value="6">6 Adults</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-airline-navy">Class</Label>
                  <Select onValueChange={(value: "economy" | "premium" | "business" | "first") => form.setValue("classType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Economy" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="economy">Economy</SelectItem>
                      <SelectItem value="premium">Premium Economy</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="first">First Class</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-end">
                  <Button 
                    type="submit" 
                    className="w-full bg-airline-blue hover:bg-blue-700 text-white font-semibold"
                  >
                    <Search className="mr-2 h-4 w-4" />
                    Search Flights
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
