import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { FlightCard } from "@/components/flight/flight-card";
import { Skeleton } from "@/components/ui/skeleton";
import { apiRequest } from "@/lib/queryClient";
import type { EnrichedFlight, FlightSearchFormData } from "@/types/flight";

export default function Flights() {
  const [, setLocation] = useLocation();
  const [searchParams, setSearchParams] = useState<FlightSearchFormData | null>(null);
  const [sortBy, setSortBy] = useState("price");
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [selectedStops, setSelectedStops] = useState<number[]>([]);

  useEffect(() => {
    // Load search parameters from sessionStorage
    const storedSearch = sessionStorage.getItem("flightSearch");
    if (storedSearch) {
      try {
        const parsed = JSON.parse(storedSearch);
        setSearchParams(parsed);
      } catch (error) {
        console.error("Failed to parse flight search data:", error);
      }
    }
  }, []);

  const { data: flights, isLoading, error } = useQuery({
    queryKey: ["/api/flights/search", searchParams],
    enabled: !!searchParams,
    queryFn: async () => {
      if (!searchParams) return [];
      
      const response = await apiRequest("POST", "/api/flights/search", searchParams);
      return response.json() as Promise<EnrichedFlight[]>;
    },
  });

  const handleFlightSelect = (flightId: number) => {
    setLocation(`/booking/${flightId}`);
  };

  const filteredAndSortedFlights = flights
    ?.filter((flight) => {
      const price = parseFloat(flight.basePrice);
      const withinPriceRange = price >= priceRange[0] && price <= priceRange[1];
      const airlineMatch = selectedAirlines.length === 0 || 
        selectedAirlines.includes(flight.airline?.code || "");
      const stopsMatch = selectedStops.length === 0 || 
        selectedStops.includes(flight.stops);
      
      return withinPriceRange && airlineMatch && stopsMatch;
    })
    ?.sort((a, b) => {
      switch (sortBy) {
        case "price":
          return parseFloat(a.basePrice) - parseFloat(b.basePrice);
        case "duration":
          return a.duration - b.duration;
        case "departure":
          return new Date(a.departureTime).getTime() - new Date(b.departureTime).getTime();
        default:
          return 0;
      }
    }) || [];

  if (!searchParams) {
    return (
      <div className="min-h-screen bg-airline-gray pt-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-airline-navy mb-4">No Search Criteria</h1>
          <p className="text-gray-600 mb-8">Please start a new flight search from the homepage.</p>
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
    <div className="min-h-screen bg-airline-gray pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-airline-navy">Filter Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="font-semibold text-airline-navy mb-2">Price Range</Label>
                  <div className="space-y-2">
                    <Input
                      type="range"
                      min="0"
                      max="2000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>$0</span>
                      <span>${priceRange[1]}+</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label className="font-semibold text-airline-navy mb-2">Airlines</Label>
                  <div className="space-y-2">
                    {["SW", "AG", "CJ"].map((code) => (
                      <div key={code} className="flex items-center space-x-2">
                        <Checkbox
                          id={code}
                          checked={selectedAirlines.includes(code)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedAirlines([...selectedAirlines, code]);
                            } else {
                              setSelectedAirlines(selectedAirlines.filter((a) => a !== code));
                            }
                          }}
                        />
                        <Label htmlFor={code} className="text-sm">
                          {code === "SW" ? "SkyWings" : code === "AG" ? "AirGlobal" : "CloudJet"}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label className="font-semibold text-airline-navy mb-2">Stops</Label>
                  <div className="space-y-2">
                    {[
                      { value: 0, label: "Direct" },
                      { value: 1, label: "1 Stop" },
                      { value: 2, label: "2+ Stops" },
                    ].map((stop) => (
                      <div key={stop.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={`stops-${stop.value}`}
                          checked={selectedStops.includes(stop.value)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedStops([...selectedStops, stop.value]);
                            } else {
                              setSelectedStops(selectedStops.filter((s) => s !== stop.value));
                            }
                          }}
                        />
                        <Label htmlFor={`stops-${stop.value}`} className="text-sm">
                          {stop.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Flight Results */}
          <div className="lg:w-3/4">
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-airline-navy">
                      {searchParams.from} to {searchParams.to}
                    </h2>
                    <p className="text-gray-600">
                      {searchParams.departureDate} • {searchParams.passengers} Adult • {searchParams.classType}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4 mt-4 md:mt-0">
                    <Label className="text-sm text-gray-600">Sort by:</Label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="price">Price (Low to High)</SelectItem>
                        <SelectItem value="duration">Duration</SelectItem>
                        <SelectItem value="departure">Departure Time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <p className="text-airline-blue font-semibold">
                  {filteredAndSortedFlights.length} flights found
                </p>
              </CardContent>
            </Card>
            
            {/* Flight Cards */}
            <div className="space-y-4">
              {isLoading ? (
                // Loading skeletons
                Array.from({ length: 3 }).map((_, i) => (
                  <Card key={i}>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                          <Skeleton className="w-10 h-10 rounded" />
                          <div className="space-y-2">
                            <Skeleton className="w-32 h-4" />
                            <Skeleton className="w-24 h-3" />
                          </div>
                          <div className="ml-auto">
                            <Skeleton className="w-16 h-8" />
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <Skeleton className="w-full h-16" />
                          <Skeleton className="w-full h-16" />
                          <Skeleton className="w-full h-16" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : error ? (
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-red-600">Failed to load flights. Please try again.</p>
                  </CardContent>
                </Card>
              ) : filteredAndSortedFlights.length === 0 ? (
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-gray-600">No flights found matching your criteria.</p>
                  </CardContent>
                </Card>
              ) : (
                filteredAndSortedFlights.map((flight) => (
                  <FlightCard 
                    key={flight.id} 
                    flight={flight} 
                    onSelect={handleFlightSelect}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
