import type { Metadata } from "next"
import SimpleHeader from "@/components/ui/SimpleHeader"
import Footer from "@/components/ui/Footer"

export const metadata: Metadata = {
  title: "About Us - Cooking with Class",
  description: "Learn about Cooking with Class, our mission to connect food lovers with expert instructors worldwide.",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-warm-bg">
      <SimpleHeader />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-n64 text-warm-fg mb-4">About Cooking with Class</h1>
          <p className="text-xl text-warm-fg-muted">
            Connecting food lovers with expert instructors worldwide
          </p>
        </div>

        <div className="space-y-12">
          {/* Mission Section */}
          <section className="bg-warm-bg-alt rounded-block p-8 border border-warm-border">
            <h2 className="text-3xl font-n64 text-warm-orange mb-6">Our Mission</h2>
            <p className="text-warm-fg text-lg leading-relaxed">
              At Cooking with Class, we believe that cooking is more than just preparing food—it's an art form, 
              a cultural experience, and a way to bring people together. Our mission is to connect passionate 
              food lovers with expert instructors who share their knowledge, techniques, and love for culinary arts.
            </p>
          </section>

          {/* Story Section */}
          <section className="bg-warm-bg-alt rounded-block p-8 border border-warm-border">
            <h2 className="text-3xl font-n64 text-warm-orange mb-6">Our Story</h2>
            <p className="text-warm-fg text-lg leading-relaxed mb-6">
              Founded in 2024, Cooking with Class began as a simple idea: to make world-class cooking education 
              accessible to everyone, everywhere. What started as a small platform has grown into a global 
              community of food enthusiasts, professional chefs, and home cooks.
            </p>
            <p className="text-warm-fg text-lg leading-relaxed">
              Today, we host thousands of cooking classes across hundreds of cities, featuring cuisines from 
              every corner of the globe. From traditional Italian pasta making to modern fusion techniques, 
              our platform celebrates the diversity and creativity of culinary arts.
            </p>
          </section>

          {/* Values Section */}
          <section className="bg-warm-bg-alt rounded-block p-8 border border-warm-border">
            <h2 className="text-3xl font-n64 text-warm-orange mb-6">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-4">👨‍🍳</div>
                <h3 className="text-xl font-n64 text-warm-fg mb-2">Expert Instructors</h3>
                <p className="text-warm-fg-muted">
                  We partner with experienced chefs and culinary professionals who are passionate about teaching.
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🌍</div>
                <h3 className="text-xl font-n64 text-warm-fg mb-2">Global Cuisine</h3>
                <p className="text-warm-fg-muted">
                  Discover authentic flavors and techniques from cultures around the world.
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="text-xl font-n64 text-warm-fg mb-2">Community</h3>
                <p className="text-warm-fg-muted">
                  Build connections with fellow food lovers and create lasting memories together.
                </p>
              </div>
            </div>
          </section>

          {/* Team Section */}
          <section className="bg-warm-bg-alt rounded-block p-8 border border-warm-border">
            <h2 className="text-3xl font-n64 text-warm-orange mb-6">Our Team</h2>
            <p className="text-warm-fg text-lg leading-relaxed mb-6">
              Our team is made up of food enthusiasts, technology experts, and customer service professionals 
              who are dedicated to creating the best possible experience for our community.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="text-center">
                <div className="w-24 h-24 bg-warm-orange rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">👨‍💼</span>
                </div>
                <h3 className="text-xl font-n64 text-warm-fg mb-2">Leadership Team</h3>
                <p className="text-warm-fg-muted">
                  Experienced professionals guiding our mission and growth.
                </p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 bg-warm-orange rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">👨‍💻</span>
                </div>
                <h3 className="text-xl font-n64 text-warm-fg mb-2">Development Team</h3>
                <p className="text-warm-fg-muted">
                  Building the technology that powers our platform.
                </p>
              </div>
            </div>
          </section>

          {/* Contact CTA */}
          <section className="text-center bg-warm-orange rounded-block p-8">
            <h2 className="text-3xl font-n64 text-warm-bg mb-4">Join Our Community</h2>
            <p className="text-warm-bg text-lg mb-6">
              Ready to start your culinary journey? Explore our classes and discover your next cooking adventure.
            </p>
            <a 
              href="/" 
              className="inline-block bg-warm-bg text-warm-orange font-n64 px-8 py-3 rounded-block hover:bg-warm-bg-alt transition-colors"
            >
              Browse Classes
            </a>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  )
} 