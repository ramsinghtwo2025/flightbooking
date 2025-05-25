import type { EnrichedFlight } from "@/types/flight";

export const formatTime = (date: Date | string) => {
  const d = new Date(date);
  return d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

export const formatDate = (date: Date | string) => {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatShortDate = (date: Date | string) => {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

export const formatDuration = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

export const getStopsText = (stops: number) => {
  if (stops === 0) return "Direct";
  if (stops === 1) return "1 Stop";
  return `${stops} Stops`;
};

export const getStopsColor = (stops: number) => {
  if (stops === 0) return "text-green-600";
  if (stops === 1) return "text-orange-600";
  return "text-red-600";
};

export const calculateFlightPrice = (basePrice: string, classType: string = "economy"): number => {
  const base = parseFloat(basePrice);
  const multipliers = {
    economy: 1,
    premium: 1.5,
    business: 2.5,
    first: 4,
  };
  
  return base * (multipliers[classType as keyof typeof multipliers] || 1);
};

export const calculateTotalPrice = (
  flight: EnrichedFlight,
  seatPrice: number = 0,
  taxes: number = 45,
  classType: string = "economy"
): number => {
  const flightPrice = calculateFlightPrice(flight.basePrice, classType);
  return flightPrice + seatPrice + taxes;
};

export const getAirlineColor = (airlineCode: string): string => {
  const colors = {
    SW: "#1e40af", // SkyWings blue
    AG: "#059669", // AirGlobal green
    CJ: "#d97706", // CloudJet orange
  };
  
  return colors[airlineCode as keyof typeof colors] || "#6b7280";
};

export const formatCurrency = (amount: number | string): string => {
  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(num);
};

export const generateBookingReference = (): string => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export const getFlightStatus = (departureTime: Date | string): string => {
  const now = new Date();
  const departure = new Date(departureTime);
  const diffInHours = (departure.getTime() - now.getTime()) / (1000 * 60 * 60);
  
  if (diffInHours < -2) return "Departed";
  if (diffInHours < 0) return "Boarding";
  if (diffInHours < 2) return "On Time";
  return "Scheduled";
};

export const getFlightStatusColor = (status: string): string => {
  const colors = {
    Scheduled: "text-blue-600",
    "On Time": "text-green-600",
    Boarding: "text-yellow-600",
    Departed: "text-gray-600",
    Delayed: "text-red-600",
    Cancelled: "text-red-600",
  };
  
  return colors[status as keyof typeof colors] || "text-gray-600";
};

export const isValidPassportNumber = (passport: string): boolean => {
  // Basic passport validation - alphanumeric, 6-9 characters
  const passportRegex = /^[A-Z0-9]{6,9}$/;
  return passportRegex.test(passport.toUpperCase());
};

export const isValidPhoneNumber = (phone: string): boolean => {
  // Basic phone validation - allows various formats
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, "");
  return phoneRegex.test(cleanPhone) && cleanPhone.length >= 10;
};

export const formatPhoneNumber = (phone: string): string => {
  const cleanPhone = phone.replace(/\D/g, "");
  if (cleanPhone.length === 10) {
    return `(${cleanPhone.slice(0, 3)}) ${cleanPhone.slice(3, 6)}-${cleanPhone.slice(6)}`;
  }
  if (cleanPhone.length === 11 && cleanPhone.startsWith("1")) {
    return `+1 (${cleanPhone.slice(1, 4)}) ${cleanPhone.slice(4, 7)}-${cleanPhone.slice(7)}`;
  }
  return phone;
};

export const getAgeFromBirthDate = (birthDate: string): number => {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
};

export const isMinor = (birthDate: string): boolean => {
  return getAgeFromBirthDate(birthDate) < 18;
};

export const getSeatPrice = (seatNumber: string): number => {
  // Extract row number from seat (e.g., "17A" -> 17)
  const row = parseInt(seatNumber.match(/\d+/)?.[0] || "0");
  
  // Premium seats (first few rows) cost more
  if (row <= 17) return 45;
  return 25;
};

export const formatSeatNumber = (seatNumber: string): string => {
  // Ensure proper formatting: "17A" not "17a"
  return seatNumber.toUpperCase();
};
