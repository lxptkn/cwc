import type { Metadata } from "next"
import SimpleHeader from "@/components/ui/SimpleHeader"
import Footer from "@/components/ui/Footer"

export const metadata: Metadata = {
  title: "FAQ - Cooking with Class",
  description: "Find answers to frequently asked questions about Cooking with Class, booking classes, and more.",
}

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-warm-bg">
      <SimpleHeader />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-n64 text-warm-fg mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-warm-fg-muted">
            Find answers to common questions about Cooking with Class
          </p>
        </div>

        <div className="space-y-6">
          {/* Booking & Classes */}
          <div className="bg-warm-bg-alt rounded-block p-8 border border-warm-border">
            <h2 className="text-2xl font-n64 text-warm-orange mb-6">Booking & Classes</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-n64 text-warm-fg mb-3">How do I book a cooking class?</h3>
                <p className="text-warm-fg leading-relaxed">
                  Browse our available classes, select your preferred date and time, and complete the booking process. 
                  You'll receive a confirmation email with all the details once your payment is processed.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-n64 text-warm-fg mb-3">What should I bring to a cooking class?</h3>
                <p className="text-warm-fg leading-relaxed">
                  Most classes provide all necessary equipment and ingredients. We recommend wearing comfortable, 
                  closed-toe shoes and bringing an apron if you have one. Specific requirements will be listed 
                  in your class confirmation email.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-n64 text-warm-fg mb-3">Are the classes suitable for beginners?</h3>
                <p className="text-warm-fg leading-relaxed">
                  Yes! We offer classes for all skill levels, from complete beginners to advanced cooks. 
                  Each class listing includes a difficulty rating, and our instructors are experienced in 
                  teaching students of all levels.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-n64 text-warm-fg mb-3">How many people are in each class?</h3>
                <p className="text-warm-fg leading-relaxed">
                  Class sizes vary depending on the instructor and venue, typically ranging from 4-12 students. 
                  This ensures personalized attention and a great learning experience for everyone.
                </p>
              </div>
            </div>
          </div>

          {/* Cancellations & Refunds */}
          <div className="bg-warm-bg-alt rounded-block p-8 border border-warm-border">
            <h2 className="text-2xl font-n64 text-warm-orange mb-6">Cancellations & Refunds</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-n64 text-warm-fg mb-3">What is your cancellation policy?</h3>
                <p className="text-warm-fg leading-relaxed">
                  Cancellations must be made at least 24 hours before the scheduled class time. 
                  Cancellations made within 24 hours are non-refundable. We understand emergencies happen, 
                  so please contact us as soon as possible if you need to cancel.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-n64 text-warm-fg mb-3">How do I cancel my booking?</h3>
                <p className="text-warm-fg leading-relaxed">
                  You can cancel your booking through your account dashboard or by contacting our support team. 
                  Please include your booking reference number for faster processing.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-n64 text-warm-fg mb-3">When will I receive my refund?</h3>
                <p className="text-warm-fg leading-relaxed">
                  Refunds are processed within 5-7 business days and will be credited back to your original 
                  payment method. You'll receive an email confirmation once the refund is processed.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-n64 text-warm-fg mb-3">Can I reschedule my class?</h3>
                <p className="text-warm-fg leading-relaxed">
                  Yes, you can request to reschedule your class up to 48 hours before the scheduled time. 
                  Rescheduling is subject to instructor availability and approval.
                </p>
              </div>
            </div>
          </div>

          {/* Dietary Restrictions */}
          <div className="bg-warm-bg-alt rounded-block p-8 border border-warm-border">
            <h2 className="text-2xl font-n64 text-warm-orange mb-6">Dietary Restrictions & Allergies</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-n64 text-warm-fg mb-3">Can you accommodate dietary restrictions?</h3>
                <p className="text-warm-fg leading-relaxed">
                  Many of our instructors can accommodate dietary restrictions and allergies. Please contact 
                  us before booking to discuss your specific needs, and we'll help you find a suitable class.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-n64 text-warm-fg mb-3">What if I have food allergies?</h3>
                <p className="text-warm-fg leading-relaxed">
                  Your safety is our priority. Please inform us of any food allergies when booking, and we'll 
                  work with the instructor to ensure your class is safe and enjoyable. Some classes may not 
                  be suitable for severe allergies.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-n64 text-warm-fg mb-3">Do you offer vegetarian or vegan classes?</h3>
                <p className="text-warm-fg leading-relaxed">
                  Yes! We have many classes specifically designed for vegetarian and vegan cooking. 
                  You can filter classes by dietary preferences when browsing.
                </p>
              </div>
            </div>
          </div>

          {/* Payment & Pricing */}
          <div className="bg-warm-bg-alt rounded-block p-8 border border-warm-border">
            <h2 className="text-2xl font-n64 text-warm-orange mb-6">Payment & Pricing</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-n64 text-warm-fg mb-3">What payment methods do you accept?</h3>
                <p className="text-warm-fg leading-relaxed">
                  We accept all major credit cards (Visa, MasterCard, American Express) and PayPal. 
                  All payments are processed securely through our payment partners.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-n64 text-warm-fg mb-3">Are there any additional fees?</h3>
                <p className="text-warm-fg leading-relaxed">
                  The price shown includes the class fee and our service charge. Some classes may have 
                  additional material fees, which will be clearly stated in the class description.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-n64 text-warm-fg mb-3">Do you offer gift certificates?</h3>
                <p className="text-warm-fg leading-relaxed">
                  Yes! Gift certificates are available and make perfect gifts for food lovers. 
                  You can purchase them in various denominations and they never expire.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-n64 text-warm-fg mb-3">Are there group discounts?</h3>
                <p className="text-warm-fg leading-relaxed">
                  We offer discounts for group bookings of 6 or more people. Contact us for more information 
                  about group rates and private class options.
                </p>
              </div>
            </div>
          </div>

          {/* Technical Support */}
          <div className="bg-warm-bg-alt rounded-block p-8 border border-warm-border">
            <h2 className="text-2xl font-n64 text-warm-orange mb-6">Technical Support</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-n64 text-warm-fg mb-3">I'm having trouble booking a class. What should I do?</h3>
                <p className="text-warm-fg leading-relaxed">
                  If you're experiencing technical issues, try refreshing your browser or clearing your cache. 
                  If the problem persists, contact our support team and we'll help you complete your booking.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-n64 text-warm-fg mb-3">How do I reset my password?</h3>
                <p className="text-warm-fg leading-relaxed">
                  Click the "Forgot Password" link on the login page, enter your email address, and follow 
                  the instructions sent to your email to reset your password.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-n64 text-warm-fg mb-3">Can I change my account information?</h3>
                <p className="text-warm-fg leading-relaxed">
                  Yes, you can update your account information, including email, password, and profile details, 
                  through your account settings page.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-warm-orange rounded-block p-8 text-center">
            <h2 className="text-2xl font-n64 text-warm-bg mb-4">Still Have Questions?</h2>
            <p className="text-warm-bg text-lg mb-6">
              Can't find the answer you're looking for? Our support team is here to help!
            </p>
            <div className="space-y-4">
              <p className="text-warm-bg">
                <strong>Email:</strong> support@cookingwithclass.com<br />
                <strong>Phone:</strong> +1 (555) 123-4567<br />
                <strong>Hours:</strong> Mon-Fri, 9AM-6PM EST
              </p>
              <a 
                href="/contact" 
                className="inline-block bg-warm-bg text-warm-orange font-n64 px-8 py-3 rounded-block hover:bg-warm-bg-alt transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
} 