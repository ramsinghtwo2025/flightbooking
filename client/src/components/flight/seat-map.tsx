import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SeatMapProps {
  onSeatSelect: (seatNumber: string) => void;
  selectedSeat?: string;
}

export function SeatMap({ onSeatSelect, selectedSeat }: SeatMapProps) {
  const [seats] = useState(() => {
    // Generate seat map data
    const seatMap = new Map<string, { available: boolean; premium?: boolean }>();
    
    // Generate rows 15-20 for demo
    for (let row = 15; row <= 20; row++) {
      for (const letter of ["A", "B", "C", "D", "E", "F"]) {
        const seatNumber = `${row}${letter}`;
        // Randomly make some seats unavailable
        const available = Math.random() > 0.3;
        const premium = row <= 17; // First few rows are premium
        seatMap.set(seatNumber, { available, premium });
      }
    }
    
    return seatMap;
  });

  const getSeatClass = (seatNumber: string) => {
    const seat = seats.get(seatNumber);
    if (!seat) return "bg-gray-300";
    
    if (selectedSeat === seatNumber) {
      return "bg-airline-blue text-white";
    }
    
    if (!seat.available) {
      return "bg-gray-300 cursor-not-allowed";
    }
    
    if (seat.premium) {
      return "bg-blue-100 hover:bg-blue-200 border-blue-300";
    }
    
    return "bg-green-100 hover:bg-green-200 border-green-300";
  };

  const getSeatPrice = (seatNumber: string) => {
    const seat = seats.get(seatNumber);
    if (!seat?.available) return 0;
    if (seat.premium) return 45;
    return 25;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-airline-navy">Select Your Seat</CardTitle>
        <p className="text-sm text-gray-600">
          Choose your preferred seat. Green seats are standard, blue seats are premium with extra legroom.
        </p>
      </CardHeader>
      <CardContent>
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="text-center mb-4">
            <p className="text-sm font-semibold text-airline-navy">Boeing 737 - Economy Class</p>
          </div>
          
          {/* Seat Labels */}
          <div className="grid grid-cols-6 gap-2 max-w-md mx-auto mb-2">
            {["A", "B", "C", "D", "E", "F"].map((letter) => (
              <div key={letter} className="text-xs text-center font-semibold text-gray-600">
                {letter}
              </div>
            ))}
          </div>
          
          {/* Seat Rows */}
          <div className="space-y-2 max-w-md mx-auto">
            {[15, 16, 17, 18, 19, 20].map((row) => (
              <div key={row} className="grid grid-cols-6 gap-2">
                {["A", "B", "C", "D", "E", "F"].map((letter) => {
                  const seatNumber = `${row}${letter}`;
                  const seat = seats.get(seatNumber);
                  const price = getSeatPrice(seatNumber);
                  
                  return (
                    <Button
                      key={seatNumber}
                      variant="outline"
                      size="sm"
                      className={`w-8 h-8 text-xs p-0 ${getSeatClass(seatNumber)}`}
                      disabled={!seat?.available}
                      onClick={() => seat?.available && onSeatSelect(seatNumber)}
                      title={seat?.available ? `${seatNumber} - $${price}` : "Unavailable"}
                    >
                      {seatNumber}
                    </Button>
                  );
                })}
              </div>
            ))}
          </div>
          
          {/* Legend */}
          <div className="flex justify-center space-x-6 mt-6 text-xs">
            <div className="flex items-center space-x-1">
              <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
              <span>Standard ($25)</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-4 h-4 bg-blue-100 border border-blue-300 rounded"></div>
              <span>Premium ($45)</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-4 h-4 bg-gray-300 rounded"></div>
              <span>Occupied</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-4 h-4 bg-airline-blue rounded"></div>
              <span>Selected</span>
            </div>
          </div>
        </div>
        
        {selectedSeat && (
          <div className="mt-4 p-4 bg-airline-gray rounded-lg">
            <p className="text-sm font-medium text-airline-navy">
              Selected: Seat {selectedSeat} - ${getSeatPrice(selectedSeat)}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
