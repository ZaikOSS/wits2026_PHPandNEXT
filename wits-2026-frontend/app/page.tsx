import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, MapPin, Users, Award, FileText, Globe } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const importantDates = [
    { event: "Paper Submission", date: "March 15, 2026" },
    { event: "Notification", date: "May 1, 2026" },
    { event: "Final Papers Due", date: "June 15, 2026" },
    { event: "Conference Dates", date: "August 20-22, 2026" },
  ]

  const highlights = [
    {
      icon: Users,
      title: "Expert Speakers",
      description: "Leading researchers and industry experts sharing cutting-edge insights",
    },
    {
      icon: Globe,
      title: "Global Network",
      description: "Connect with professionals from around the world",
    },
    {
      icon: Award,
      title: "Best Paper Awards",
      description: "Recognition for outstanding research contributions",
    },
    {
      icon: FileText,
      title: "Publication Opportunities",
      description: "Selected papers will be published in prestigious journals",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">WITS 2026</h1>
            <p className="text-xl md:text-2xl mb-4 max-w-4xl mx-auto">
              International Conference on Wireless Technologies and Emerging Communication Systems
            </p>
            <p className="text-lg mb-8 max-w-3xl mx-auto">
              Join leading researchers and practitioners in exploring the future of information technologies and systems
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/registration">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  Register Now
                </Button>
              </Link>
              <Link href="/call-for-papers">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
                >
                  Submit Paper
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Important Dates */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Important Dates</h2>
            <p className="text-lg text-gray-600">Mark your calendar for these key milestones</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {importantDates.map((item, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <CardTitle className="text-lg">{item.event}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-blue-600">{item.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Conference Highlights */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Conference Highlights</h2>
            <p className="text-lg text-gray-600">What makes WITS 2026 special</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map((highlight, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <highlight.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{highlight.title}</h3>
                <p className="text-gray-600">{highlight.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Venue Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Beautiful Fez, Morocco</h2>
              <p className="text-lg text-gray-600 mb-6">
                Experience the rich culture and history of Fez while attending cutting-edge presentations on wireless
                technologies and emerging communication systems.
              </p>
              <div className="flex items-center mb-4">
                <MapPin className="h-5 w-5 text-blue-600 mr-2" />
                <span className="text-gray-700">Fez, Morocco</span>
              </div>
              <Link href="/venue">
                <Button variant="outline">Learn More About Venue</Button>
              </Link>
            </div>
            <div className="relative h-64 lg:h-80 rounded-lg overflow-hidden">
              <img
                src="/placeholder.svg?height=320&width=480"
                alt="Fez, Morocco"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join WITS 2026?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Don't miss this opportunity to be part of the premier conference on wireless technologies
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/registration">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Register Today
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
