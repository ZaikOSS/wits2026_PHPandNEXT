"use client"

import type React from "react"
import { useState } from "react"
import Header from "@/components/Header" // Re-enabled Header import
import Footer from "@/components/Footer" // Re-enabled Footer import
import { Button } from "@/components/ui/button" // Fixed import path
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card" // Fixed import path
import { Input } from "@/components/ui/input" // Fixed import path
import { Label } from "@/components/ui/label" // Fixed import path
import { Textarea } from "@/components/ui/textarea" // Fixed import path
import { Mail, Phone, MapPin, Clock } from "lucide-react" // Added Clock icon
import { contactsApi } from "@/lib/api" // Re-enabled original contactsApi import
import { useToast } from "@/hooks/use-toast" // Re-enabled original useToast import

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await contactsApi.create(formData)
      setSuccess(true)
      toast({
        title: "Success",
        description: "Your message has been sent successfully!",
      })
      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // Data for the new contact cards, based on the image and original info
  const contactPersons = [
    {
      icon: Mail,
      title: "General Information",
      name: "Pr: M. ALAMI MARKTANI",
      role: "Local Arrangements Chair",
      email: "info@wits2026.org\nconference@wits2026.org",
      phone: "+212 (06) 51 71 26 04",
    },
    {
      icon: Phone,
      title: "Program Committee",
      name: "Pr: H. CHOUGRAD",
      role: "Program Chair",
      email: "program@wits2026.org",
      phone: "+212 (0)5 35 60 04 03",
    },
    {
      icon: MapPin, // Using MapPin as a general contact point for registration
      title: "Registration & Payment",
      name: "Pr: S.D. BENNANI",
      role: "Registration Team",
      email: "registration@wits2026.org",
      phone: "+212 (0)5 35 60 03 86",
    },
    {
      icon: Clock, // Using Clock for sponsorship opportunities (time-related)
      title: "Sponsorship Opportunities",
      name: "Pr: S.D. BENNANI",
      role: "General Chair",
      email: "sponsors@wits2026.org",
      phone: "+212 (0)5 35 60 03 86",
    },
  ];

  return (
    // Main container with Tailwind CSS for full page height and background
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* Header component */}
      <Header />

      {/* Main content area, centered and with padding */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page title and description */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions about WITS 2026? We're here to help. Get in touch with our organizing committee.
          </p>
        </div>

        {/* Grid layout for contact information and form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column: New Contact Persons Grid + Conference Venue */}
          <div className="space-y-8">
            {/* New 4-card grid for contact persons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contactPersons.map((person, index) => (
                <Card key={index} className="rounded-xl shadow-lg">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    {/* Icon container with dark background and rounded corners */}
                    <div className="bg-gray-900 rounded-xl p-4 mb-4">
                      <person.icon className="h-8 w-8 text-white" />
                    </div>
                    {/* Title */}
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{person.title}</h3>
                    {/* Name and Role */}
                    <p className="text-gray-700 font-medium">{person.name}</p>
                    <p className="text-gray-600 text-sm mb-3">{person.role}</p>
                    {/* Email */}
                    <p className="text-blue-600 hover:underline mb-1">
                      {person.email.split('\n').map((email, i) => (
                        <a key={i} href={`mailto:${email.trim()}`} className="block">
                          {email.trim()}
                        </a>
                      ))}
                    </p>
                    {/* Phone */}
                    <p className="text-gray-700">
                      <a href={`tel:${person.phone.replace(/\s/g, '')}`} className="hover:underline">
                        {person.phone}
                      </a>
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Conference Venue Card - Retained from original */}
            <Card className="rounded-xl shadow-lg">
              <CardHeader>
                <CardTitle>Conference Venue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                  <iframe
                    src="https://maps.google.com/maps?q=33.9965042,-4.9918778&t=k&z=17&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    title="Conference Venue Map"
                  ></iframe>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Contact Form - Retained from original */}
          <Card className="rounded-xl shadow-lg">
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
              <CardDescription>Fill out the form below and we'll get back to you as soon as possible</CardDescription>
            </CardHeader>
            <CardContent>
              {success ? (
                <div className="text-center py-8">
                  <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-4">
                    Thank you for your message! We'll get back to you soon.
                  </div>
                  <Button onClick={() => setSuccess(false)} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-gray-700 font-medium">Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required
                        className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-700 font-medium">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                        className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-gray-700 font-medium">Subject *</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      required
                      className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-gray-700 font-medium">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      rows={6}
                      required
                      className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer component */}
      <Footer />
    </div>
  )
}
