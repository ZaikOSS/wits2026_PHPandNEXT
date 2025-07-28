"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge" // Badge is not used in the current render, but kept if needed
import { Icon } from "@/components/icon-mapper" // Assumed Icon component for Lucide icons
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { useToast } from "@/hooks/use-toast"

export default function ProgramPage() {
  const { toast } = useToast()

  // New JSON data provided by the user
  const data = {
    title: "Program Schedule",
    description: "Three days of cutting-edge research, networking, and knowledge sharing",
    schedule: [
      {
        day: "Day 1 - April 15, 2023",
        events: [
          {
            time: "08:00 - 09:00",
            title: "Registration & Welcome Coffee",
            type: "break",
            location: "Main Lobby"
          },
          {
            time: "09:00 - 09:15",
            title: "Opening Ceremony",
            type: "ceremony",
            location: "Main Auditorium",
            speaker: "Conference Chairs"
          },
          {
            time: "09:15 - 10:00",
            title: "Keynote 1: The Future of 6G Wireless Communications",
            type: "keynote",
            location: "Main Auditorium",
            speaker: "Prof. Elena Rodriguez"
          },
          {
            time: "10:00 - 10:30",
            title: "Coffee Break",
            type: "break",
            location: "Exhibition Hall"
          },
          {
            time: "10:30 - 12:00",
            title: "Session 1A: Wireless Communication Systems",
            type: "session",
            location: "Room A",
            papers: 6
          },
          {
            time: "10:30 - 12:00",
            title: "Session 1B: AI and Machine Learning",
            type: "session",
            location: "Room B",
            papers: 6
          },
          {
            time: "12:00 - 13:30",
            title: "Lunch Break",
            type: "break",
            location: "Restaurant"
          },
          {
            time: "13:30 - 14:15",
            title: "Keynote 2: AI-Powered Embedded Systems",
            type: "keynote",
            location: "Main Auditorium",
            speaker: "Dr. Hiroshi Yamamoto"
          },
          {
            time: "14:15 - 15:45",
            title: "Session 2A: IoT and Edge Computing",
            type: "session",
            location: "Room A",
            papers: 6
          },
          {
            time: "14:15 - 15:45",
            title: "Session 2B: Embedded Systems Design",
            type: "session",
            location: "Room B",
            papers: 6
          },
          {
            time: "15:45 - 16:15",
            title: "Coffee Break",
            type: "break",
            location: "Exhibition Hall"
          },
          {
            time: "16:15 - 17:45",
            title: "Panel Discussion: Future Trends in Wireless Technologies",
            type: "panel",
            location: "Main Auditorium"
          },
          {
            time: "19:00 - 22:00",
            title: "Welcome Reception",
            type: "social",
            location: "Hotel Terrace"
          }
        ]
      },
      {
        day: "Day 2 - April 16, 2023",
        events: [
          {
            time: "08:00 - 09:00",
            title: "Registration & Welcome Coffee",
            type: "break",
            location: "Main Lobby"
          },
          {
            time: "09:00 - 09:15",
            title: "Opening Ceremony",
            type: "ceremony",
            location: "Main Auditorium",
            speaker: "Conference Chairs"
          },
          {
            time: "09:15 - 10:00",
            title: "Keynote 1: The Future of 6G Wireless Communications",
            type: "keynote",
            location: "Main Auditorium",
            speaker: "Prof. Elena Rodriguez"
          },
          {
            time: "10:00 - 10:30",
            title: "Coffee Break",
            type: "break",
            location: "Exhibition Hall"
          },
          {
            time: "10:30 - 12:00",
            title: "Session 1A: Wireless Communication Systems",
            type: "session",
            location: "Room A",
            papers: 6
          },
          {
            time: "10:30 - 12:00",
            title: "Session 1B: AI and Machine Learning",
            type: "session",
            location: "Room B",
            papers: 6
          },
          {
            time: "12:00 - 13:30",
            title: "Lunch Break",
            type: "break",
            location: "Restaurant"
          },
          {
            time: "13:30 - 14:15",
            title: "Keynote 2: AI-Powered Embedded Systems",
            type: "keynote",
            location: "Main Auditorium",
            speaker: "Dr. Hiroshi Yamamoto"
          },
          {
            time: "14:15 - 15:45",
            title: "Session 2A: IoT and Edge Computing",
            type: "session",
            location: "Room A",
            papers: 6
          },
          {
            time: "14:15 - 15:45",
            title: "Session 2B: Embedded Systems Design",
            type: "session",
            location: "Room B",
            papers: 6
          },
          {
            time: "15:45 - 16:15",
            title: "Coffee Break",
            type: "break",
            location: "Exhibition Hall"
          },
          {
            time: "16:15 - 17:45",
            title: "Panel Discussion: Future Trends in Wireless Technologies",
            type: "panel",
            location: "Main Auditorium"
          },
          {
            time: "19:00 - 22:00",
            title: "Welcome Reception",
            type: "social",
            location: "Hotel Terrace"
          }
        ]
      }
    ],
    eventTypes: [
      { type: "keynote", color: "blue", label: "Keynote" },
      { type: "session", color: "green", label: "Technical Session" },
      { type: "break", color: "orange", label: "Break" },
      { type: "social", color: "purple", label: "Social Event" },
      { type: "panel", color: "cyan", label: "Panel" },
      { type: "ceremony", color: "red", label: "Ceremony" }
    ],
    notes: {
      presenters: [
        "Presentation time: 15 minutes + 5 minutes Q&A",
        "Technical check 30 minutes before session",
        "Bring backup of presentation on USB",
        "Session chairs will enforce time limits"
      ],
      attendees: [
        "Conference badge required for all sessions",
        "WiFi details provided at registration",
        "Coffee breaks include light refreshments",
        "Certificate of attendance available"
      ]
    }
  }

  const getEventIcon = (type: string) => {
    switch (type) {
      case "keynote":
        return <Icon name="Mic" className="w-5 h-5 text-blue-600" />
      case "session":
        return <Icon name="FileText" className="w-5 h-5 text-green-600" />
      case "break":
        return <Icon name="Coffee" className="w-5 h-5 text-orange-600" />
      case "social":
        return <Icon name="Utensils" className="w-5 h-5 text-purple-600" />
      case "panel":
        return <Icon name="Users" className="w-5 h-5 text-cyan-600" />
      case "industry": // This type is not in the new JSON, but kept for robustness
        return <Icon name="Briefcase" className="w-5 h-5 text-yellow-600" />
      case "poster": // This type is not in the new JSON, but kept for robustness
        return <Icon name="Layout" className="w-5 h-5 text-pink-600" />
      case "ceremony": // Added for the new JSON
        return <Icon name="Award" className="w-5 h-5 text-red-600" />
      default:
        return <Icon name="Clock" className="w-5 h-5 text-gray-600" />
    }
  }

  const getEventColor = (type: string) => {
    switch (type) {
      case "keynote":
        return "border-l-blue-500 bg-blue-50"
      case "session":
        return "border-l-green-500 bg-green-50"
      case "break":
        return "border-l-orange-500 bg-orange-50"
      case "social":
        return "border-l-purple-500 bg-purple-50"
      case "panel":
        return "border-l-cyan-500 bg-cyan-50"
      case "industry": // This type is not in the new JSON, but kept for robustness
        return "border-l-yellow-500 bg-yellow-50"
      case "poster": // This type is not in the new JSON, but kept for robustness
        return "border-l-pink-500 bg-pink-50"
      case "ceremony": // Added for the new JSON
        return "border-l-red-500 bg-red-50"
      default:
        return "border-l-gray-500 bg-gray-50"
    }
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

        {/* Schedule */}
        <div className="space-y-8">
          {data.schedule.map((day, dayIndex) => (
            <Card key={dayIndex} className="hover:shadow-md transition-shadow rounded-lg">
              <CardHeader>
                <CardTitle className="text-2xl">{day.day}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {day.events.map((event, eventIndex) => (
                  <div
                    key={eventIndex}
                    className={`border-l-4 pl-6 py-4 rounded-r-lg ${getEventColor(event.type)}`}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                      <div className="flex items-center gap-3 min-w-[140px]">
                        <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm">
                          {getEventIcon(event.type)}
                        </div>
                        <span className="text-gray-700 font-mono font-medium">{event.time}</span>
                      </div>

                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{event.title}</h3>
                        {event.speaker && (
                          <p className="text-gray-700 mb-1">
                            <span className="font-medium">Speaker:</span> {event.speaker}
                          </p>
                        )}
                        {event.papers && (
                          <p className="text-gray-600 mb-1">
                            <span className="font-medium">{event.papers}</span> papers
                          </p>
                        )}
                        <div className="flex items-center gap-2 text-gray-600">
                          <Icon name="MapPin" className="w-4 h-4" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Information */}
        <div className="grid lg:grid-cols-2 gap-8 mt-12">
          <Card className="hover:shadow-md transition-shadow rounded-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Icon name="Info" className="w-6 h-6 text-blue-600" />
                Information for Presenters
              </CardTitle>
              <CardDescription>Key details for those presenting at the conference.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {data.notes.presenters.map((note, index) => (
                <div key={index}>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-700">{note}</span>
                    </li>
                  </ul>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow rounded-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Icon name="Handshake" className="w-6 h-6 text-blue-600" />
                Information for Attendees
              </CardTitle>
              <CardDescription>Important notes for all conference attendees.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {data.notes.attendees.map((note, index) => (
                <div key={index}>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-700">{note}</span>
                    </li>
                  </ul>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
