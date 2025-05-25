import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Mail, MapPin, MessageCircle, ChevronDown } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const { toast } = useToast();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you within 24 hours.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Failed to Send",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  const quickFaqs = [
    {
      question: "How can I check in for my flight?",
      answer: "You can check in online starting 24 hours before departure through our website or mobile app, or visit the check-in counters at the airport.",
    },
    {
      question: "What is your baggage allowance policy?",
      answer: "Economy passengers receive one free carry-on bag (22\"x14\"x9\") and one personal item. Checked baggage fees apply: first bag $30, second bag $40.",
    },
    {
      question: "Can I change or cancel my booking?",
      answer: "Changes and cancellations are subject to fare rules. Basic Economy tickets are non-refundable, while higher fare classes offer more flexibility.",
    },
    {
      question: "What documents do I need for international travel?",
      answer: "For international travel, you need a valid passport that doesn't expire within 6 months of your return date. Some destinations may require a visa.",
    },
  ];

  return (
    <div className="pt-8">
      {/* Hero Section */}
      <section className="py-16 bg-airline-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Contact Us</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We're here to help 24/7. Reach out to us through any of the channels below.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-airline-navy mb-6">Send us a Message</h2>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-airline-navy">First Name *</Label>
                    <Input
                      id="firstName"
                      {...form.register("firstName")}
                      placeholder="John"
                    />
                    {form.formState.errors.firstName && (
                      <p className="text-sm text-red-600 mt-1">
                        {form.formState.errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-airline-navy">Last Name *</Label>
                    <Input
                      id="lastName"
                      {...form.register("lastName")}
                      placeholder="Doe"
                    />
                    {form.formState.errors.lastName && (
                      <p className="text-sm text-red-600 mt-1">
                        {form.formState.errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email" className="text-airline-navy">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    {...form.register("email")}
                    placeholder="john.doe@email.com"
                  />
                  {form.formState.errors.email && (
                    <p className="text-sm text-red-600 mt-1">
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="phone" className="text-airline-navy">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    {...form.register("phone")}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                
                <div>
                  <Label htmlFor="subject" className="text-airline-navy">Subject *</Label>
                  <Select onValueChange={(value) => form.setValue("subject", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="booking">Booking Inquiry</SelectItem>
                      <SelectItem value="flight-info">Flight Information</SelectItem>
                      <SelectItem value="baggage">Baggage Issue</SelectItem>
                      <SelectItem value="refund">Refund Request</SelectItem>
                      <SelectItem value="assistance">Special Assistance</SelectItem>
                      <SelectItem value="feedback">General Feedback</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {form.formState.errors.subject && (
                    <p className="text-sm text-red-600 mt-1">
                      {form.formState.errors.subject.message}
                    </p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="message" className="text-airline-navy">Message *</Label>
                  <Textarea
                    id="message"
                    rows={6}
                    {...form.register("message")}
                    placeholder="Please describe your inquiry or feedback..."
                  />
                  {form.formState.errors.message && (
                    <p className="text-sm text-red-600 mt-1">
                      {form.formState.errors.message.message}
                    </p>
                  )}
                </div>
                
                <Button
                  type="submit"
                  disabled={contactMutation.isPending}
                  className="w-full bg-airline-blue hover:bg-blue-700 text-white font-semibold"
                >
                  {contactMutation.isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
            
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-airline-navy mb-6">Get in Touch</h2>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-airline-blue rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-airline-navy mb-1">Phone Support</h3>
                    <p className="text-gray-600 mb-2">Available 24/7 for your convenience</p>
                    <p className="text-airline-blue font-semibold">+1 (800) SKYWINGS</p>
                    <p className="text-airline-blue font-semibold">+1 (800) 759-9464</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-airline-blue rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-airline-navy mb-1">Email Support</h3>
                    <p className="text-gray-600 mb-2">We'll respond within 24 hours</p>
                    <p className="text-airline-blue font-semibold">support@skywings.com</p>
                    <p className="text-airline-blue font-semibold">bookings@skywings.com</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-airline-blue rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-airline-navy mb-1">Headquarters</h3>
                    <p className="text-gray-600 mb-2">Visit us at our main office</p>
                    <div className="text-airline-blue font-semibold">
                      <p>123 Aviation Boulevard</p>
                      <p>Sky Harbor, NY 10001</p>
                      <p>United States</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-airline-blue rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-airline-navy mb-1">Live Chat</h3>
                    <p className="text-gray-600 mb-2">Instant help when you need it</p>
                    <Button className="bg-airline-blue hover:bg-blue-700 text-white font-semibold">
                      Start Chat
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <img 
                  src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
                  alt="Airport customer service desk"
                  className="rounded-xl shadow-lg w-full h-48 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-airline-gray">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-airline-navy mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">Quick answers to common questions</p>
          </div>
          
          <div className="space-y-4">
            {quickFaqs.map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-0">
                  <button
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 rounded-lg transition-colors"
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  >
                    <span className="font-semibold text-airline-navy">{faq.question}</span>
                    <ChevronDown 
                      className={`h-5 w-5 text-airline-blue transition-transform ${
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
          
          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">Can't find what you're looking for?</p>
            <Link href="/faq">
              <Button className="bg-airline-blue hover:bg-blue-700 text-white font-semibold">
                View All FAQs
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
