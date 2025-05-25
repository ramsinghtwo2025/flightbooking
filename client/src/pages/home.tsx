import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { FlightSearch } from "@/components/flight/flight-search";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Clock, DollarSign } from "lucide-react";
import type { FlightSearchFormData } from "@/types/flight";

export default function Home() {
  const handleSearch = (data: FlightSearchFormData) => {
    // Store search data in sessionStorage for the flights page
    sessionStorage.setItem("flightSearch", JSON.stringify(data));
    // Navigate to flights page
    window.location.href = "/flights";
  };

  const scrollToSearch = () => {
    const searchSection = document.getElementById("flight-search");
    searchSection?.scrollIntoView({ behavior: "smooth" });
  };

  const destinations = [
    {
      city: "Paris",
      country: "France",
      price: "$599",
      image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    },
    {
      city: "Tokyo",
      country: "Japan", 
      price: "$899",
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    },
    {
      city: "New York",
      country: "USA",
      price: "$399",
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    },
    {
      city: "London",
      country: "UK",
      price: "$549",
      image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')"
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Your Journey Begins Here
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto">
            Discover the world with SkyWings. Book flights to over 200 destinations worldwide with our premium service and competitive prices.
          </p>
          <Button 
            onClick={scrollToSearch}
            size="lg"
            className="bg-airline-blue hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold"
          >
            Find Your Flight
          </Button>
        </div>
      </section>

      {/* Flight Search Section */}
      <div id="flight-search">
        <FlightSearch onSearch={handleSearch} />
      </div>

      {/* Featured Destinations */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-airline-navy mb-4">Popular Destinations</h2>
            <p className="text-lg text-gray-600">Explore amazing places around the world</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((destination) => (
              <div key={destination.city} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-xl">
                  <img 
                    src={destination.image}
                    alt={`${destination.city}, ${destination.country}`}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{destination.city}</h3>
                    <p className="text-sm">From {destination.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-airline-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-airline-navy mb-4">Why Choose SkyWings?</h2>
            <p className="text-lg text-gray-600">Experience the difference with our premium services</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-airline-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-airline-navy mb-2">Safe & Secure</h3>
                <p className="text-gray-600">Your safety is our priority with comprehensive security measures and trusted partnerships.</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-airline-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-airline-navy mb-2">24/7 Support</h3>
                <p className="text-gray-600">Round-the-clock customer support to assist you whenever you need help.</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-airline-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-airline-navy mb-2">Best Prices</h3>
                <p className="text-gray-600">Competitive pricing with no hidden fees and flexible booking options.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
