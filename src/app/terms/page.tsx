import type { Metadata } from "next"
import SimpleHeader from "@/components/ui/SimpleHeader"
import Footer from "@/components/ui/Footer"

export const metadata: Metadata = {
  title: "Terms of Service - Cooking with Class",
  description: "Read our terms of service to understand the rules and guidelines for using Cooking with Class.",
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-warm-bg">
      <SimpleHeader />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-n64 text-warm-fg mb-4">Terms of Service</h1>
          <p className="text-xl text-warm-fg-muted">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="bg-warm-bg-alt rounded-block p-8 border border-warm-border space-y-8">
          <section>
            <h2 className="text-2xl font-n64 text-warm-orange mb-4">1. Acceptance of Terms</h2>
            <p className="text-warm-fg leading-relaxed">
              By accessing and using Cooking with Class ("the Service"), you accept and agree to be bound by the terms 
              and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-n64 text-warm-orange mb-4">2. Description of Service</h2>
            <p className="text-warm-fg leading-relaxed mb-4">
              Cooking with Class is an online platform that connects cooking class instructors with students. 
              We provide a marketplace for booking and managing cooking classes, workshops, and culinary experiences.
            </p>
            <p className="text-warm-fg leading-relaxed">
              Our services include but are not limited to:
            </p>
            <ul className="list-disc list-inside text-warm-fg ml-4 mt-2 space-y-1">
              <li>Class listings and discovery</li>
              <li>Booking and payment processing</li>
              <li>Instructor profiles and reviews</li>
              <li>Customer support and communication tools</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-n64 text-warm-orange mb-4">3. User Accounts</h2>
            <p className="text-warm-fg leading-relaxed mb-4">
              To access certain features of the Service, you must create an account. You are responsible for:
            </p>
            <ul className="list-disc list-inside text-warm-fg ml-4 space-y-1">
              <li>Maintaining the confidentiality of your account credentials</li>
              <li>All activities that occur under your account</li>
              <li>Providing accurate and complete information</li>
              <li>Notifying us immediately of any unauthorized use</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-n64 text-warm-orange mb-4">4. Booking and Cancellation Policy</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-n64 text-warm-fg mb-2">Booking</h3>
                <p className="text-warm-fg leading-relaxed">
                  All bookings are subject to availability. Payment is required at the time of booking. 
                  Confirmation will be sent via email once payment is processed.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-n64 text-warm-fg mb-2">Cancellation</h3>
                <p className="text-warm-fg leading-relaxed">
                  Cancellations must be made at least 24 hours before the scheduled class time. 
                  Refunds will be processed within 5-7 business days. No refunds for no-shows.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-n64 text-warm-fg mb-2">Rescheduling</h3>
                <p className="text-warm-fg leading-relaxed">
                  Rescheduling requests must be made at least 48 hours before the class. 
                  Subject to instructor availability and approval.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-n64 text-warm-orange mb-4">5. Instructor Responsibilities</h2>
            <p className="text-warm-fg leading-relaxed mb-4">
              Instructors using our platform agree to:
            </p>
            <ul className="list-disc list-inside text-warm-fg ml-4 space-y-1">
              <li>Provide accurate class descriptions and pricing</li>
              <li>Maintain professional standards and safety protocols</li>
              <li>Honor all confirmed bookings</li>
              <li>Respond to student inquiries promptly</li>
              <li>Maintain appropriate insurance coverage</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-n64 text-warm-orange mb-4">6. Student Responsibilities</h2>
            <p className="text-warm-fg leading-relaxed mb-4">
              Students using our platform agree to:
            </p>
            <ul className="list-disc list-inside text-warm-fg ml-4 space-y-1">
              <li>Arrive on time for scheduled classes</li>
              <li>Follow instructor directions and safety guidelines</li>
              <li>Respect the learning environment and other participants</li>
              <li>Provide honest feedback and reviews</li>
              <li>Notify instructors of any dietary restrictions or allergies</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-n64 text-warm-orange mb-4">7. Payment and Fees</h2>
            <p className="text-warm-fg leading-relaxed mb-4">
              All payments are processed securely through our payment partners. We charge a service fee 
              on all transactions, which is clearly displayed during the booking process.
            </p>
            <p className="text-warm-fg leading-relaxed">
              Prices are listed in local currency and may be subject to applicable taxes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-n64 text-warm-orange mb-4">8. Privacy and Data Protection</h2>
            <p className="text-warm-fg leading-relaxed">
              Your privacy is important to us. Please review our Privacy Policy, which also governs your 
              use of the Service, to understand our practices regarding the collection and use of your information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-n64 text-warm-orange mb-4">9. Intellectual Property</h2>
            <p className="text-warm-fg leading-relaxed">
              The Service and its original content, features, and functionality are and will remain the 
              exclusive property of Cooking with Class and its licensors. The Service is protected by copyright, 
              trademark, and other laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-n64 text-warm-orange mb-4">10. Limitation of Liability</h2>
            <p className="text-warm-fg leading-relaxed">
              In no event shall Cooking with Class, nor its directors, employees, partners, agents, suppliers, 
              or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, 
              including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-n64 text-warm-orange mb-4">11. Changes to Terms</h2>
            <p className="text-warm-fg leading-relaxed">
              We reserve the right to modify or replace these Terms at any time. If a revision is material, 
              we will try to provide at least 30 days notice prior to any new terms taking effect.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-n64 text-warm-orange mb-4">12. Contact Information</h2>
            <p className="text-warm-fg leading-relaxed">
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <div className="mt-4 p-4 bg-warm-bg rounded-block">
              <p className="text-warm-fg">
                <strong>Email:</strong> legal@cookingwithclass.com<br />
                <strong>Address:</strong> 123 Culinary Street, Foodie District, New York, NY 10001
              </p>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  )
} 