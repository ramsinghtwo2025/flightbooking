import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Search, ChevronDown } from "lucide-react";

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("booking");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const categories = [
    { id: "booking", label: "Booking" },
    { id: "baggage", label: "Baggage" },
    { id: "checkin", label: "Check-in" },
    { id: "travel", label: "Travel" },
  ];

  const faqs = [
    // Booking & Reservations
    {
      category: "booking",
      question: "How do I book a flight on SkyWings?",
      answer: "You can book flights through our website, mobile app, or by calling our customer service team. Simply enter your departure and destination cities, travel dates, and passenger information to search for available flights.",
    },
    {
      category: "booking",
      question: "Can I hold a reservation without paying?",
      answer: "Yes, you can hold most reservations for up to 24 hours without payment. This gives you time to finalize your travel plans. After 24 hours, the reservation will be automatically cancelled if not purchased.",
    },
    {
      category: "booking",
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, Google Pay, and bank transfers for certain bookings. All transactions are secured with SSL encryption.",
    },
    {
      category: "booking",
      question: "How can I change or cancel my booking?",
      answer: "You can manage your booking online by visiting 'Manage My Booking' section with your confirmation code and last name. Changes and cancellations are subject to fare rules and may incur fees. Flexible fares offer more freedom to change without penalties.",
    },

    // Check-in & Airport
    {
      category: "checkin",
      question: "When can I check in for my flight?",
      answer: "Online and mobile check-in opens 24 hours before your scheduled departure time and closes 1 hour before domestic flights and 2 hours before international flights. You can also check in at the airport counter or self-service kiosks.",
    },
    {
      category: "checkin",
      question: "How early should I arrive at the airport?",
      answer: "We recommend arriving 2 hours early for domestic flights and 3 hours early for international flights. During peak travel seasons or at busy airports, consider arriving even earlier to account for longer security lines and check-in processes.",
    },
    {
      category: "checkin",
      question: "Can I select my seat in advance?",
      answer: "Yes, you can select seats during booking or anytime before check-in. Basic economy passengers can select from available standard seats for free, while premium seats (extra legroom, front of cabin) are available for an additional fee.",
    },

    // Baggage & Travel
    {
      category: "baggage",
      question: "What is your baggage allowance policy?",
      answer: "Economy passengers receive one free carry-on bag (22\"x14\"x9\") and one personal item. Checked baggage fees apply: first bag $30, second bag $40. Premium and business class passengers receive additional free checked bags. Weight limit is 50 lbs for standard bags.",
    },
    {
      category: "baggage",
      question: "What items are prohibited in carry-on luggage?",
      answer: "Prohibited items include liquids over 3.4 oz, sharp objects, weapons, flammable materials, and certain electronics. Please check TSA guidelines for a complete list. Liquids must be in containers of 3.4 oz or less and fit in a quart-sized bag.",
    },
    {
      category: "baggage",
      question: "What should I do if my baggage is lost or delayed?",
      answer: "Report lost or delayed baggage immediately at the airport's baggage service office. You'll receive a reference number to track your bag. We'll work to locate and deliver your baggage as quickly as possible, and compensation may be available for essential items.",
    },

    // Travel
    {
      category: "travel",
      question: "What documents do I need for international travel?",
      answer: "For international travel, you need a valid passport that doesn't expire within 6 months of your return date. Some destinations may require a visa or additional documentation. Check with the embassy or consulate of your destination country for specific requirements.",
    },
    {
      category: "travel",
      question: "Do you offer special assistance for passengers with disabilities?",
      answer: "Yes, we provide comprehensive assistance including wheelchair services, priority boarding, assistance with carry-on bags, and special seating arrangements. Please request assistance at least 48 hours before your flight by calling our special assistance helpline.",
    },
    {
      category: "travel",
      question: "What amenities are available on board?",
      answer: "Our aircraft feature personal entertainment systems, complimentary snacks and beverages, Wi-Fi (fee applies), power outlets at every seat, and spacious overhead bins. Premium cabins include enhanced meals, priority service, and premium amenities.",
    },
    {
      category: "travel",
      question: "Can I travel with pets?",
      answer: "Yes, we allow pets in the cabin and as checked baggage. Small pets can travel in the cabin in an approved carrier for a fee. Larger pets must be transported as checked baggage. Service animals fly free. Please contact us at least 48 hours before travel to make arrangements.",
    },
    {
      category: "travel",
      question: "What is your policy for unaccompanied minors?",
      answer: "Children aged 5-14 traveling alone must use our unaccompanied minor service. Children 15-17 can travel alone but may use the service if requested. Additional fees apply, and advance arrangements are required. Our staff will assist and monitor your child throughout their journey.",
    },
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = faq.category === activeCategory;
    const matchesSearch = searchQuery === "" || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryTitle = (categoryId: string) => {
    const categoryMap: Record<string, string> = {
      booking: "Booking & Reservations",
      checkin: "Check-in & Airport",
      baggage: "Baggage & Travel", 
      travel: "Travel Information",
    };
    return categoryMap[categoryId] || categoryId;
  };

  return (
    <div className="pt-8 pb-16">
      {/* Hero Section */}
      <section className="py-16 bg-airline-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Find answers to the most common questions about flying with SkyWings
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Bar */}
          <div className="mb-12">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 text-lg pr-12"
              />
              <Search className="absolute right-4 top-4 h-6 w-6 text-gray-400" />
            </div>
          </div>

          {/* FAQ Categories */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                className={`p-4 ${
                  activeCategory === category.id
                    ? "bg-airline-blue text-white hover:bg-blue-700"
                    : "border-airline-blue text-airline-blue hover:bg-airline-blue hover:text-white"
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.label}
              </Button>
            ))}
          </div>

          {/* FAQ Items */}
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-airline-navy">
                {getCategoryTitle(activeCategory)}
              </h2>
              <Badge variant="secondary" className="text-airline-blue">
                {filteredFaqs.length} questions
              </Badge>
            </div>
            
            {filteredFaqs.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-gray-600">No questions found matching your search.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredFaqs.map((faq, index) => (
                  <Card key={index} className="bg-airline-gray">
                    <CardContent className="p-0">
                      <button
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-100 rounded-lg transition-colors"
                        onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      >
                        <span className="font-semibold text-airline-navy pr-4">{faq.question}</span>
                        <ChevronDown 
                          className={`h-5 w-5 text-airline-blue transition-transform flex-shrink-0 ${
                            expandedFaq === index ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {expandedFaq === index && (
                        <div className="px-6 pb-4">
                          <p className="text-gray-600">{faq.answer}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Contact Support */}
          <div className="mt-16 text-center p-8 bg-airline-gray rounded-xl">
            <h3 className="text-xl font-bold text-airline-navy mb-4">Still have questions?</h3>
            <p className="text-gray-600 mb-6">Our customer support team is available 24/7 to help you with any questions or concerns.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="bg-airline-blue hover:bg-blue-700 text-white font-semibold">
                  Contact Support
                </Button>
              </Link>
              <Button variant="outline" className="border-airline-blue text-airline-blue hover:bg-airline-blue hover:text-white font-semibold">
                Live Chat
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
