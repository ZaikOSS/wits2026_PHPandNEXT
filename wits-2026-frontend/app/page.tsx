"use client"; // Add this directive at the very top of the file

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Users, Award, FileText, Globe } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const importantDates = [
    { event: "Paper Submission", date: "March 15, 2026" },
    { event: "Notification", date: "May 1, 2026" },
    { event: "Final Papers Due", date: "June 15, 2026" },
    { event: "Conference Dates", date: "August 20-22, 2026" },
  ];

  const highlights = [
    {
      icon: Users,
      title: "Expert Speakers",
      description:
        "Leading researchers and industry experts sharing cutting-edge insights",
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
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />

      {/* Hero Section - Updated Layout */}
      <section className="relative bg-white py-16 md:py-24 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Text Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 text-gray-900 leading-tight">
              WITS 2026
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-gray-700 max-w-4xl mx-auto lg:mx-0">
              International Conference on Wireless Technologies and Emerging
              Communication Systems
            </p>
            <p className="text-lg mb-10 text-gray-600 max-w-3xl mx-auto lg:mx-0">
              Join leading researchers and practitioners in exploring the future
              of information technologies and systems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/registration" passHref>
                <Button
                  size="lg"
                  className="bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 transition-transform shadow-lg"
                >
                  Register Now
                </Button>
              </Link>
              <Link href="/call-for-papers" passHref>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50 hover:text-blue-700 hover:scale-105 transition-transform bg-transparent shadow-lg"
                >
                  Submit Paper
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="relative h-64 md:h-96 lg:h-[500px] rounded-xl overflow-hidden shadow-xl transform hover:scale-[1.01] transition-transform duration-300">
            <img
              src="https://placehold.co/800x600/D1E0F0/000?text=Conference+Image" // Placeholder for a relevant conference image
              alt="Conference Image"
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src =
                  "https://placehold.co/800x600/D1E0F0/000?text=Conference+Image+Fallback"; // Fallback image
              }}
            />
            {/* Optional: Add a subtle overlay or caption on the image */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Important Dates */}
      <section className="py-16 bg-white shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Important Dates
            </h2>
            <p className="text-lg text-gray-600">
              Mark your calendar for these key milestones
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {importantDates.map((item, index) => (
              <Card
                key={index}
                className="text-center p-6 border-t-4 border-blue-600 shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
              >
                <CardHeader className="pb-4">
                  <Calendar className="h-10 w-10 text-blue-600 mx-auto mb-3" />
                  <CardTitle className="text-xl font-semibold text-gray-800">
                    {item.event}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-extrabold text-blue-700">
                    {item.date}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Conference Highlights */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Conference Highlights
            </h2>
            <p className="text-lg text-gray-600">
              What makes WITS 2026 special
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map((highlight, index) => (
              <div
                key={index}
                className="text-center bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
              >
                <div className="bg-blue-100 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center shadow-inner">
                  <highlight.icon className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {highlight.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {highlight.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Venue Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="lg:order-2 relative h-80 md:h-96 lg:h-[400px] rounded-xl overflow-hidden shadow-xl transform hover:scale-[1.01] transition-transform duration-300">
              <img
                src="https://placehold.co/800x600/E0F2F7/000?text=Fez,+Morocco" // Placeholder for Fez image
                alt="Fez, Morocco"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src =
                    "https://placehold.co/800x600/E0F2F7/000?text=Fez,+Morocco"; // Fallback
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold">Fez, Morocco</h3>
                <p className="text-lg opacity-90">
                  A city of rich history and vibrant culture
                </p>
              </div>
            </div>
            <div className="lg:order-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                Experience the Enchantment of{" "}
                <span className="text-blue-700">Fez, Morocco</span>
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Immerse yourself in the captivating blend of ancient traditions
                and modern advancements. Fez offers a unique backdrop for WITS
                2026, combining academic excellence with an unforgettable
                cultural journey.
              </p>
              <div className="flex items-center mb-6 text-gray-800">
                <MapPin className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" />
                <span className="text-lg font-medium">Fez, Morocco</span>
              </div>
              <Link href="/venue" passHref>
                <Button
                  variant="outline"
                  className="px-6 py-3 text-lg border-blue-600 text-blue-600 hover:bg-blue-50 hover:border-blue-700 transition-colors"
                >
                  Learn More About Venue
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-blue-700 text-white text-center shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-sm">
            Ready to Join WITS 2026?
          </h2>
          <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto opacity-90">
            Don't miss this opportunity to be part of the premier conference on
            wireless technologies and emerging communication systems.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/registration" passHref>
              <Button
                size="lg"
                className="bg-white text-blue-700 hover:bg-gray-100 hover:scale-105 transition-transform shadow-lg"
              >
                Register Today
              </Button>
            </Link>
            <Link href="/contact" passHref>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-700 hover:scale-105 transition-transform bg-transparent shadow-lg"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
