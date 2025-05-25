import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function Terms() {
  return (
    <div className="pt-8 pb-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-airline-navy mb-4">Terms and Conditions</h1>
          <p className="text-gray-600">Last updated: March 1, 2024</p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-airline-navy mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-600 mb-4">
                By accessing and using SkyWings' services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-airline-navy mb-4">2. Booking and Reservations</h2>
              <p className="text-gray-600 mb-4">
                All bookings are subject to availability and confirmation by SkyWings. Prices displayed are subject to change until payment is received and confirmed. A booking is confirmed only when you receive a confirmation email with your booking reference.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Bookings must be made by passengers 18 years or older</li>
                <li>Accurate passenger information must be provided</li>
                <li>Payment must be made with valid payment methods</li>
                <li>Special requests are not guaranteed</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-airline-navy mb-4">3. Payment Terms</h2>
              <p className="text-gray-600 mb-4">
                Full payment is required at the time of booking unless otherwise specified. We accept major credit cards, PayPal, and other specified payment methods. All prices are quoted in USD unless otherwise stated.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-airline-navy mb-4">4. Changes and Cancellations</h2>
              <p className="text-gray-600 mb-4">
                Changes and cancellations are subject to the fare rules of your ticket type:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li><strong>Basic Economy:</strong> Non-refundable, changes not permitted</li>
                <li><strong>Economy:</strong> Changes permitted with fees, refundable with penalties</li>
                <li><strong>Premium:</strong> Changes permitted with reduced fees</li>
                <li><strong>Business:</strong> Flexible changes and refunds</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-airline-navy mb-4">5. Check-in Requirements</h2>
              <p className="text-gray-600 mb-4">
                Passengers must check in within the specified time limits:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Online check-in: 24 hours to 1 hour before departure</li>
                <li>Airport check-in: 2 hours before domestic, 3 hours before international</li>
                <li>Check-in cutoff: 45 minutes before domestic, 60 minutes before international</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-airline-navy mb-4">6. Baggage Policy</h2>
              <p className="text-gray-600 mb-4">
                Baggage allowances vary by ticket type and destination. Additional fees apply for excess baggage. SkyWings is not liable for fragile, valuable, or perishable items in checked baggage.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-airline-navy mb-4">7. Denied Boarding and Delays</h2>
              <p className="text-gray-600 mb-4">
                In case of overbooking, SkyWings will first seek volunteers before denying boarding. Compensation will be provided according to applicable regulations. We are not liable for delays caused by weather, air traffic control, or other circumstances beyond our control.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-airline-navy mb-4">8. Limitation of Liability</h2>
              <p className="text-gray-600 mb-4">
                SkyWings' liability is limited as follows:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Death or injury: According to international conventions</li>
                <li>Baggage damage: Maximum compensation as per regulations</li>
                <li>Flight delays: Limited to specific circumstances outlined in our policies</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-airline-navy mb-4">9. Privacy Policy</h2>
              <p className="text-gray-600 mb-4">
                Your privacy is important to us. We collect and use personal information in accordance with our Privacy Policy, which forms part of these terms. We may share information with government agencies as required by law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-airline-navy mb-4">10. Passenger Conduct</h2>
              <p className="text-gray-600 mb-4">
                Passengers are expected to follow all crew instructions and airline policies. Disruptive behavior, including but not limited to intoxication, harassment, or failure to comply with safety instructions, may result in removal from the aircraft and legal action.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-airline-navy mb-4">11. Force Majeure</h2>
              <p className="text-gray-600 mb-4">
                SkyWings is not liable for delays, cancellations, or other failures to perform due to circumstances beyond our control, including but not limited to weather, natural disasters, government actions, strikes, or security threats.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-airline-navy mb-4">12. Governing Law</h2>
              <p className="text-gray-600 mb-4">
                These terms are governed by the laws of the United States and the state of New York. Any disputes will be resolved through arbitration in New York, NY.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-airline-navy mb-4">13. Changes to Terms</h2>
              <p className="text-gray-600 mb-4">
                SkyWings reserves the right to modify these terms at any time. Changes will be posted on our website and will take effect immediately upon posting. Your continued use of our services constitutes acceptance of any changes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-airline-navy mb-4">14. Contact Information</h2>
              <p className="text-gray-600 mb-4">
                For questions about these terms and conditions, please contact us:
              </p>
              <div className="bg-airline-gray p-6 rounded-lg">
                <p className="text-airline-navy font-semibold">SkyWings Airlines</p>
                <p className="text-gray-600">123 Aviation Boulevard</p>
                <p className="text-gray-600">Sky Harbor, NY 10001</p>
                <p className="text-gray-600">Phone: +1 (800) SKYWINGS</p>
                <p className="text-gray-600">Email: legal@skywings.com</p>
              </div>
            </section>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link href="/">
            <Button className="bg-airline-blue hover:bg-blue-700 text-white font-semibold">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
