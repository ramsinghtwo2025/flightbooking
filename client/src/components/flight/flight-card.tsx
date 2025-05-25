import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plane } from "lucide-react";
import type { EnrichedFlight } from "@/types/flight";

interface FlightCardProps {
  flight: EnrichedFlight;
  onSelect: (flightId: number) => void;
}

export function FlightCard({ flight, onSelect }: FlightCardProps) {
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

  const getStopsText = (stops: number) => {
    if (stops === 0) return "Direct";
    if (stops === 1) return "1 Stop";
    return `${stops} Stops`;
  };

  const getStopsColor = (stops: number) => {
    if (stops === 0) return "text-green-600";
    if (stops === 1) return "text-orange-600";
    return "text-red-600";
  };

  return (
    <Card className="hover:shadow-xl transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <img 
                  src={flight.airline?.logo || "https://via.placeholder.com/40x40/1e40af/ffffff?text=?"}
                  alt={flight.airline?.name}
                  className="w-10 h-10 rounded"
                />
                <div>
                  <h3 className="font-semibold text-airline-navy">{flight.airline?.name}</h3>
                  <p className="text-sm text-gray-600">
                    {flight.flightNumber} • {flight.aircraft?.model}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-airline-navy">${flight.basePrice}</p>
                <p className="text-sm text-gray-600">per person</p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 items-center">
              <div className="text-center">
                <p className="text-2xl font-bold text-airline-navy">
                  {formatTime(flight.departureTime)}
                </p>
                <p className="text-sm text-gray-600">{flight.departureAirport?.code}</p>
                <p className="text-xs text-gray-500">{flight.departureAirport?.city}</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-3 h-3 border-2 border-airline-blue rounded-full"></div>
                  <div className="flex-1 h-0.5 bg-airline-blue"></div>
                  <Plane className="h-4 w-4 text-airline-blue" />
                  <div className="flex-1 h-0.5 bg-airline-blue"></div>
                  <div className="w-3 h-3 border-2 border-airline-blue rounded-full"></div>
                </div>
                <p className="text-sm text-gray-600 mt-2">{formatDuration(flight.duration)}</p>
                <Badge variant="secondary" className={getStopsColor(flight.stops)}>
                  {getStopsText(flight.stops)}
                </Badge>
              </div>
              
              <div className="text-center">
                <p className="text-2xl font-bold text-airline-navy">
                  {formatTime(flight.arrivalTime)}
                </p>
                <p className="text-sm text-gray-600">{flight.arrivalAirport?.code}</p>
                <p className="text-xs text-gray-500">{flight.arrivalAirport?.city}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 lg:mt-0 lg:ml-6">
            <Button 
              onClick={() => onSelect(flight.id)}
              className="w-full bg-airline-blue hover:bg-blue-700 text-white font-semibold"
            >
              Select Flight
            </Button>
            <Button variant="ghost" className="w-full mt-2 text-airline-blue hover:text-blue-700">
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
