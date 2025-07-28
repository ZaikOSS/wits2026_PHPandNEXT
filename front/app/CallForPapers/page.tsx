"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Icon } from "@/components/icon-mapper"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { useToast } from "@/hooks/use-toast"

export default function CallForPapersPage() {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  // Mock data - replace with your actual data fetching logic
  const data = {
    title: "Share Your Research with the World",
    description: "We invite researchers and practitioners to submit papers on emerging topics in information systems and technology.",
    submissionGuidelines: {
      paperFormat: [
        "Papers should be in English and not exceed 12 pages",
        "Use Springer LNCS format for submissions",
        "Submissions must be original and not previously published"
      ],
      reviewProcess: [
        "Double-blind peer review process",
        "Notification of acceptance within 4-6 weeks",
        "Revised papers may be requested"
      ]
    },
    importantDates: [
      { event: "Abstract Submission Deadline", date: "January 15, 2025" },
      { event: "Full Paper Submission Deadline", date: "February 20, 2025" },
      { event: "Notification of Acceptance", date: "April 10, 2025" },
      { event: "Camera-ready Submission", date: "May 15, 2025" }
    ],
    topics: [
      "Artificial Intelligence in Business",
      "Blockchain Technologies",
      "Cloud Computing",
      "Data Analytics and Big Data",
      "Digital Transformation",
      "E-Commerce and Digital Markets",
      "Human-Computer Interaction",
      "Information Security and Privacy",
      "Internet of Things",
      "Social Media and Networks"
    ],
    awards: [
      {
        title: "Best Paper Award",
        description: "Recognizes the most outstanding paper in the conference as determined by the program committee."
      },
      {
        title: "Best Student Paper Award",
        description: "Awarded to the best paper whose primary author is a student."
      }
    ]
  }

  const handleSubmitClick = () => {
    setLoading(true)
    // Simulate submission process
    setTimeout(() => {
      setLoading(false)
      toast({
        title: "Redirecting",
        description: "You are being redirected to the submission system.",
      })
      window.open("https://easychair.org/conferences/?conf=yourconference", "_blank")
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{data.title}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {data.description}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Submission Guidelines Card */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Icon name="FileText" className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  Submission Guidelines
                  <CardDescription>Requirements and review process</CardDescription>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-3">Paper Format</h3>
                <ul className="space-y-2">
                  {data.submissionGuidelines.paperFormat.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-3">Review Process</h3>
                <ul className="space-y-2">
                  {data.submissionGuidelines.reviewProcess.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Important Dates Card */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Icon name="Calendar" className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  Important Dates
                  <CardDescription>Submission deadlines and notifications</CardDescription>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.importantDates.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0"
                >
                  <span className="text-gray-700 font-medium">{item.event}</span>
                  <span className="text-gray-900 font-semibold">{item.date}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Research Topics Card */}
        <Card className="mb-12 hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                <Icon name="Users" className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                Research Topics
                <CardDescription>Areas of interest for the conference</CardDescription>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-6">
              We welcome submissions on all aspects of information technologies and systems, including but not limited to:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {data.topics.map((topic, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-700">{topic}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Awards Card */}
        <Card className="mb-12 hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                <Icon name="Award" className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                Awards & Recognition
                <CardDescription>Prizes for outstanding contributions</CardDescription>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {data.awards.map((award, index) => (
              <div key={index}>
                <h3 className="font-semibold text-lg mb-2">{award.title}</h3>
                <p className="text-gray-700">{award.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="text-center">
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold"
            onClick={handleSubmitClick}
            disabled={loading}
          >
            {loading ? "Redirecting..." : "Submit Your Paper via EasyChair"}
          </Button>
          <p className="text-gray-600 mt-4">
            Submission system is now open. Click above to submit your paper.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}