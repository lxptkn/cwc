import type { Metadata } from "next"
import SimpleHeader from "@/components/ui/SimpleHeader"
import Footer from "@/components/ui/Footer"

export const metadata: Metadata = {
  title: "Contact Us - Cooking with Class",
  description: "Get in touch with the Cooking with Class team. We're here to help with any questions or support you need.",
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-warm-bg">
      <SimpleHeader />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-n64 text-warm-fg mb-4">Contact Us</h1>
          <p className="text-xl text-warm-fg-muted">
            We'd love to hear from you. Get in touch with our team.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-warm-bg-alt rounded-block p-8 border border-warm-border">
            <h2 className="text-2xl font-n64 text-warm-orange mb-6">Send us a Message</h2>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-warm-fg text-sm font-medium mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 bg-warm-bg border border-warm-border rounded-block text-warm-fg focus:outline-none focus:border-warm-orange"
                    placeholder="Your first name"
                  />
                </div>
                <div>
                  <label className="block text-warm-fg text-sm font-medium mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 bg-warm-bg border border-warm-border rounded-block text-warm-fg focus:outline-none focus:border-warm-orange"
                    placeholder="Your last name"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-warm-fg text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 bg-warm-bg border border-warm-border rounded-block text-warm-fg focus:outline-none focus:border-warm-orange"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-warm-fg text-sm font-medium mb-2">
                  Subject
                </label>
                <select className="w-full px-3 py-2 bg-warm-bg border border-warm-border rounded-block text-warm-fg focus:outline-none focus:border-warm-orange">
                  <option>General Inquiry</option>
                  <option>Class Booking</option>
                  <option>Technical Support</option>
                  <option>Partnership</option>
                  <option>Feedback</option>
                </select>
              </div>

              <div>
                <label className="block text-warm-fg text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  rows={5}
                  className="w-full px-3 py-2 bg-warm-bg border border-warm-border rounded-block text-warm-fg focus:outline-none focus:border-warm-orange resize-none"
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-warm-orange hover:bg-warm-orange-dark text-black font-n64 py-3 rounded-block transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-warm-bg-alt rounded-block p-8 border border-warm-border">
              <h2 className="text-2xl font-n64 text-warm-orange mb-6">Get in Touch</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="text-2xl">📧</div>
                  <div>
                    <h3 className="font-n64 text-warm-fg">Email</h3>
                    <p className="text-warm-fg-muted">hello@cookingwithclass.com</p>
                    <p className="text-warm-fg-muted">support@cookingwithclass.com</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="text-2xl">📞</div>
                  <div>
                    <h3 className="font-n64 text-warm-fg">Phone</h3>
                    <p className="text-warm-fg-muted">+1 (555) 123-4567</p>
                    <p className="text-warm-fg-muted">Mon-Fri, 9AM-6PM EST</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="text-2xl">📍</div>
                  <div>
                    <h3 className="font-n64 text-warm-fg">Address</h3>
                    <p className="text-warm-fg-muted">
                      123 Culinary Street<br />
                      Foodie District<br />
                      New York, NY 10001<br />
                      United States
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-warm-bg-alt rounded-block p-8 border border-warm-border">
              <h2 className="text-2xl font-n64 text-warm-orange mb-6">Follow Us</h2>
              <div className="grid grid-cols-2 gap-4">
                <a href="#" className="flex items-center space-x-3 p-3 bg-warm-bg rounded-block hover:bg-warm-border transition-colors">
                  <span className="text-2xl">📘</span>
                  <span className="text-warm-fg">Facebook</span>
                </a>
                <a href="#" className="flex items-center space-x-3 p-3 bg-warm-bg rounded-block hover:bg-warm-border transition-colors">
                  <span className="text-2xl">📷</span>
                  <span className="text-warm-fg">Instagram</span>
                </a>
                <a href="#" className="flex items-center space-x-3 p-3 bg-warm-bg rounded-block hover:bg-warm-border transition-colors">
                  <span className="text-2xl">🐦</span>
                  <span className="text-warm-fg">Twitter</span>
                </a>
                <a href="#" className="flex items-center space-x-3 p-3 bg-warm-bg rounded-block hover:bg-warm-border transition-colors">
                  <span className="text-2xl">📺</span>
                  <span className="text-warm-fg">YouTube</span>
                </a>
              </div>
            </div>

            <div className="bg-warm-bg-alt rounded-block p-8 border border-warm-border">
              <h2 className="text-2xl font-n64 text-warm-orange mb-6">FAQ</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-n64 text-warm-fg mb-2">How do I book a class?</h3>
                  <p className="text-warm-fg-muted text-sm">
                    Browse our classes, select your preferred date and time, and complete the booking process.
                  </p>
                </div>
                <div>
                  <h3 className="font-n64 text-warm-fg mb-2">What if I need to cancel?</h3>
                  <p className="text-warm-fg-muted text-sm">
                    Cancellations are accepted up to 24 hours before the class start time.
                  </p>
                </div>
                <div>
                  <h3 className="font-n64 text-warm-fg mb-2">Do you offer refunds?</h3>
                  <p className="text-warm-fg-muted text-sm">
                    Yes, we offer full refunds for cancellations made within our policy timeframe.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
} 