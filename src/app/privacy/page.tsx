import type { Metadata } from "next"
import SimpleHeader from "@/components/ui/SimpleHeader"
import Footer from "@/components/ui/Footer"

export const metadata: Metadata = {
  title: "Privacy Policy - Cooking with Class",
  description: "Learn how Cooking with Class collects, uses, and protects your personal information.",
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-warm-bg">
      <SimpleHeader />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-n64 text-warm-fg mb-4">Privacy Policy</h1>
          <p className="text-xl text-warm-fg-muted">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="bg-warm-bg-alt rounded-block p-8 border border-warm-border space-y-8">
          <section>
            <h2 className="text-2xl font-n64 text-warm-orange mb-4">1. Introduction</h2>
            <p className="text-warm-fg leading-relaxed">
              Cooking with Class ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy 
              explains how we collect, use, disclose, and safeguard your information when you visit our website and 
              use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-n64 text-warm-orange mb-4">2. Information We Collect</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-n64 text-warm-fg mb-2">Personal Information</h3>
                <p className="text-warm-fg leading-relaxed mb-2">
                  We may collect personal information that you voluntarily provide to us, including:
                </p>
                <ul className="list-disc list-inside text-warm-fg ml-4 space-y-1">
                  <li>Name and contact information (email, phone number)</li>
                  <li>Account credentials and profile information</li>
                  <li>Payment and billing information</li>
                  <li>Class preferences and dietary restrictions</li>
                  <li>Reviews and feedback</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-n64 text-warm-fg mb-2">Automatically Collected Information</h3>
                <p className="text-warm-fg leading-relaxed mb-2">
                  When you visit our website, we automatically collect certain information, including:
                </p>
                <ul className="list-disc list-inside text-warm-fg ml-4 space-y-1">
                  <li>IP address and device information</li>
                  <li>Browser type and version</li>
                  <li>Pages visited and time spent</li>
                  <li>Referring website information</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-n64 text-warm-orange mb-4">3. How We Use Your Information</h2>
            <p className="text-warm-fg leading-relaxed mb-4">
              We use the information we collect for various purposes, including:
            </p>
            <ul className="list-disc list-inside text-warm-fg ml-4 space-y-1">
              <li>Providing and maintaining our services</li>
              <li>Processing bookings and payments</li>
              <li>Communicating with you about classes and updates</li>
              <li>Improving our website and user experience</li>
              <li>Analyzing usage patterns and trends</li>
              <li>Preventing fraud and ensuring security</li>
              <li>Complying with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-n64 text-warm-orange mb-4">4. Information Sharing and Disclosure</h2>
            <p className="text-warm-fg leading-relaxed mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third parties without 
              your consent, except in the following circumstances:
            </p>
            <ul className="list-disc list-inside text-warm-fg ml-4 space-y-1">
              <li><strong>Service Providers:</strong> We may share information with trusted third-party service providers who assist us in operating our website and providing services</li>
              <li><strong>Instructors:</strong> We share relevant booking information with class instructors to facilitate your class experience</li>
              <li><strong>Legal Requirements:</strong> We may disclose information if required by law or to protect our rights and safety</li>
              <li><strong>Business Transfers:</strong> In the event of a merger or acquisition, your information may be transferred as part of the business assets</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-n64 text-warm-orange mb-4">5. Data Security</h2>
            <p className="text-warm-fg leading-relaxed">
              We implement appropriate technical and organizational security measures to protect your personal 
              information against unauthorized access, alteration, disclosure, or destruction. However, no method 
              of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee 
              absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-n64 text-warm-orange mb-4">6. Cookies and Tracking Technologies</h2>
            <p className="text-warm-fg leading-relaxed mb-4">
              We use cookies and similar tracking technologies to enhance your browsing experience and analyze 
              website traffic. You can control cookie settings through your browser preferences.
            </p>
            <div className="bg-warm-bg rounded-block p-4">
              <h3 className="text-lg font-n64 text-warm-fg mb-2">Types of Cookies We Use:</h3>
              <ul className="list-disc list-inside text-warm-fg ml-4 space-y-1">
                <li><strong>Essential Cookies:</strong> Required for basic website functionality</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our website</li>
                <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                <li><strong>Marketing Cookies:</strong> Used for targeted advertising and marketing</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-n64 text-warm-orange mb-4">7. Your Rights and Choices</h2>
            <p className="text-warm-fg leading-relaxed mb-4">
              You have certain rights regarding your personal information, including:
            </p>
            <ul className="list-disc list-inside text-warm-fg ml-4 space-y-1">
              <li><strong>Access:</strong> Request access to your personal information</li>
              <li><strong>Correction:</strong> Request correction of inaccurate information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information</li>
              <li><strong>Portability:</strong> Request a copy of your data in a portable format</li>
              <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
              <li><strong>Objection:</strong> Object to certain processing activities</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-n64 text-warm-orange mb-4">8. Data Retention</h2>
            <p className="text-warm-fg leading-relaxed">
              We retain your personal information for as long as necessary to fulfill the purposes outlined in 
              this Privacy Policy, unless a longer retention period is required or permitted by law. When we no 
              longer need your information, we will securely delete or anonymize it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-n64 text-warm-orange mb-4">9. International Data Transfers</h2>
            <p className="text-warm-fg leading-relaxed">
              Your information may be transferred to and processed in countries other than your own. We ensure 
              that such transfers comply with applicable data protection laws and implement appropriate safeguards 
              to protect your information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-n64 text-warm-orange mb-4">10. Children's Privacy</h2>
            <p className="text-warm-fg leading-relaxed">
              Our services are not intended for children under the age of 13. We do not knowingly collect 
              personal information from children under 13. If you believe we have collected information from 
              a child under 13, please contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-n64 text-warm-orange mb-4">11. Changes to This Privacy Policy</h2>
            <p className="text-warm-fg leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting 
              the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to 
              review this Privacy Policy periodically.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-n64 text-warm-orange mb-4">12. Contact Us</h2>
            <p className="text-warm-fg leading-relaxed mb-4">
              If you have any questions about this Privacy Policy or our privacy practices, please contact us:
            </p>
            <div className="bg-warm-bg rounded-block p-4">
              <p className="text-warm-fg">
                <strong>Email:</strong> privacy@cookingwithclass.com<br />
                <strong>Address:</strong> 123 Culinary Street, Foodie District, New York, NY 10001<br />
                <strong>Phone:</strong> +1 (555) 123-4567
              </p>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  )
} 