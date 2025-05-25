import { Card, CardContent } from "@/components/ui/card";
import { Plane, Shield, Clock, DollarSign, Trophy, Leaf, Users } from "lucide-react";

export default function About() {
  const fleetData = [
    {
      model: "Boeing 737 MAX",
      description: "Our workhorse for domestic and short-haul international routes, featuring the latest in fuel efficiency and passenger comfort.",
      specs: ["189 passengers", "3,500 mile range", "Latest entertainment systems"],
    },
    {
      model: "Airbus A350",
      description: "Long-haul flagship featuring premium cabins, advanced climate control, and industry-leading fuel efficiency.",
      specs: ["315 passengers", "8,000 mile range", "Premium & business class"],
    },
    {
      model: "Boeing 777-300ER",
      description: "Ultra-long-range aircraft for our most distant destinations, with first-class suites and exceptional range.",
      specs: ["396 passengers", "7,370 mile range", "First class suites"],
    },
  ];

  const leadership = [
    {
      name: "John Williams",
      title: "Chief Executive Officer",
      description: "Leading SkyWings with over 20 years of aviation industry experience.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    },
    {
      name: "Sarah Chen",
      title: "Chief Operating Officer", 
      description: "Ensuring operational excellence across our global network.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    },
    {
      name: "Michael Rodriguez",
      title: "Chief Technology Officer",
      description: "Driving innovation and digital transformation initiatives.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    },
  ];

  const awards = [
    { icon: Trophy, title: "Best Airline 2023", subtitle: "World Aviation Awards", color: "text-yellow-600 bg-yellow-100" },
    { icon: Leaf, title: "Green Airline", subtitle: "Environmental Excellence", color: "text-green-600 bg-green-100" },
    { icon: Users, title: "Best Customer Service", subtitle: "Passenger Choice Awards", color: "text-blue-600 bg-blue-100" },
    { icon: Shield, title: "Safety Excellence", subtitle: "Aviation Safety Council", color: "text-red-600 bg-red-100" },
  ];

  return (
    <div className="pt-8">
      {/* Hero Section */}
      <section className="relative py-20 bg-airline-navy">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')"
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">About SkyWings</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Connecting the world through exceptional aviation services since 1995. We're committed to making every journey memorable, safe, and comfortable.
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-airline-navy mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded in 1995, SkyWings began as a small regional airline with a big dream: to make air travel accessible, comfortable, and enjoyable for everyone. From our humble beginnings with just three aircraft, we've grown into a global airline serving over 200 destinations worldwide.
              </p>
              <p className="text-gray-600 mb-4">
                Our commitment to safety, innovation, and exceptional customer service has earned us numerous awards and the trust of millions of passengers. We believe that every journey should be an experience worth remembering.
              </p>
              <p className="text-gray-600">
                Today, SkyWings operates a modern fleet of over 150 aircraft, employs more than 25,000 dedicated professionals, and continues to push the boundaries of what's possible in aviation.
              </p>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Business travelers in airport"
                className="rounded-xl shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Fleet */}
      <section className="py-16 bg-airline-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-airline-navy mb-4">Our Fleet</h2>
            <p className="text-lg text-gray-600">Modern, efficient, and environmentally conscious aircraft</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {fleetData.map((aircraft, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-airline-blue rounded-full flex items-center justify-center mx-auto mb-4">
                    <Plane className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-airline-navy mb-2">{aircraft.model}</h3>
                  <p className="text-gray-600 mb-4">{aircraft.description}</p>
                  <div className="text-sm text-gray-500">
                    {aircraft.specs.map((spec, specIndex) => (
                      <p key={specIndex}>• {spec}</p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-airline-navy mb-4">Leadership Team</h2>
            <p className="text-lg text-gray-600">Experienced professionals leading our journey forward</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadership.map((leader, index) => (
              <div key={index} className="text-center">
                <img 
                  src={leader.image}
                  alt={leader.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-bold text-airline-navy">{leader.name}</h3>
                <p className="text-airline-blue font-semibold mb-2">{leader.title}</p>
                <p className="text-gray-600 text-sm">{leader.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-16 bg-airline-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-airline-navy mb-4">Awards & Recognition</h2>
            <p className="text-lg text-gray-600">Recognition for our commitment to excellence</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {awards.map((award, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className={`w-12 h-12 ${award.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                    <award.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-airline-navy mb-1">{award.title}</h3>
                  <p className="text-sm text-gray-600">{award.subtitle}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
