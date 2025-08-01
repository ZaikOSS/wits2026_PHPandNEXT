import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Users } from "lucide-react";

export default function ProgramPage() {
  const programDays = [
    {
      date: "August 20, 2026",
      day: "Day 1",
      sessions: [
        {
          time: "08:00 - 09:00",
          title: "Registration & Welcome Coffee",
          type: "registration",
          location: "Main Lobby",
          description: "Check-in and networking with fellow attendees",
        },
        {
          time: "09:00 - 09:30",
          title: "Opening Ceremony",
          type: "ceremony",
          location: "Main Auditorium",
          description:
            "Welcome address by conference chairs and keynote introduction",
          speakers: ["Prof. Ahmed Hassan", "Dr. Sarah Johnson"],
        },
        {
          time: "09:30 - 10:30",
          title: "Keynote 1: Future of 5G and Beyond",
          type: "keynote",
          location: "Main Auditorium",
          description:
            "Exploring the evolution of wireless communication technologies",
          speakers: ["Dr. Sarah Johnson"],
        },
        {
          time: "10:30 - 11:00",
          title: "Coffee Break",
          type: "break",
          location: "Exhibition Hall",
          description: "Networking and refreshments",
        },
        {
          time: "11:00 - 12:30",
          title: "Session 1A: Wireless Networks",
          type: "session",
          location: "Room A",
          description: "Latest advances in wireless network architectures",
          papers: [
            "Optimizing 5G Network Slicing for IoT Applications",
            "Machine Learning Approaches for Network Resource Allocation",
            "Energy-Efficient Protocols for Wireless Sensor Networks",
          ],
        },
        {
          time: "11:00 - 12:30",
          title: "Session 1B: Signal Processing",
          type: "session",
          location: "Room B",
          description:
            "Advanced signal processing techniques for wireless systems",
          papers: [
            "MIMO Signal Processing for Massive IoT",
            "Beamforming Techniques for mmWave Communications",
            "Interference Mitigation in Dense Networks",
          ],
        },
        {
          time: "12:30 - 14:00",
          title: "Lunch Break",
          type: "break",
          location: "Restaurant Area",
          description: "Lunch and networking opportunities",
        },
        {
          time: "14:00 - 15:30",
          title: "Session 2A: IoT and Smart Cities",
          type: "session",
          location: "Room A",
          description: "Internet of Things applications in urban environments",
          papers: [
            "Smart City Infrastructure Using LoRaWAN",
            "Edge Computing for Real-time IoT Analytics",
            "Security Challenges in Smart City Networks",
          ],
        },
        {
          time: "14:00 - 15:30",
          title: "Session 2B: Cybersecurity",
          type: "session",
          location: "Room B",
          description: "Security aspects of wireless communication systems",
          papers: [
            "Blockchain-based Authentication for 5G Networks",
            "Privacy-Preserving Techniques in Wireless Systems",
            "Quantum Cryptography for Future Networks",
          ],
        },
        {
          time: "15:30 - 16:00",
          title: "Coffee Break",
          type: "break",
          location: "Exhibition Hall",
          description: "Afternoon refreshments and poster session",
        },
        {
          time: "16:00 - 17:00",
          title: "Panel Discussion: Industry Perspectives",
          type: "panel",
          location: "Main Auditorium",
          description:
            "Industry leaders discuss current challenges and future opportunities",
          speakers: ["Industry Panel Members"],
        },
      ],
    },
    {
      date: "August 21, 2026",
      day: "Day 2",
      sessions: [
        {
          time: "09:00 - 10:00",
          title: "Keynote 2: AI in Wireless Communications",
          type: "keynote",
          location: "Main Auditorium",
          description:
            "The role of artificial intelligence in next-generation wireless systems",
          speakers: ["Prof. Maria Rodriguez"],
        },
        {
          time: "10:00 - 10:30",
          title: "Coffee Break",
          type: "break",
          location: "Exhibition Hall",
          description: "Morning refreshments",
        },
        {
          time: "10:30 - 12:00",
          title: "Session 3A: Machine Learning",
          type: "session",
          location: "Room A",
          description: "ML applications in wireless communication systems",
          papers: [
            "Deep Learning for Channel Estimation",
            "Reinforcement Learning in Network Optimization",
            "AI-Driven Resource Management",
          ],
        },
        {
          time: "10:30 - 12:00",
          title: "Session 3B: Antenna Design",
          type: "session",
          location: "Room B",
          description: "Advanced antenna technologies for wireless systems",
          papers: [
            "Metamaterial Antennas for 5G Applications",
            "Reconfigurable Antenna Arrays",
            "Millimeter-Wave Antenna Design",
          ],
        },
        {
          time: "12:00 - 13:30",
          title: "Lunch Break",
          type: "break",
          location: "Restaurant Area",
          description: "Lunch and networking",
        },
        {
          time: "13:30 - 15:00",
          title: "Session 4A: Embedded and Intelligent Systems.",
          type: "session",
          location: "Room A",
          description: "Next-generation wireless technologies",
          papers: [
            "6G Vision and Requirements",
            "Terahertz Communications",
            "Satellite-Terrestrial Integration",
          ],
        },
        {
          time: "13:30 - 15:00",
          title: "Session 4B: Network Protocols",
          type: "session",
          location: "Room B",
          description: "Protocol design for modern wireless networks",
          papers: [
            "Protocol Stack Optimization for 5G",
            "Cross-Layer Design Approaches",
            "Quality of Service in Wireless Networks",
          ],
        },
        {
          time: "15:00 - 15:30",
          title: "Coffee Break",
          type: "break",
          location: "Exhibition Hall",
          description: "Afternoon break with poster presentations",
        },
        {
          time: "15:30 - 17:00",
          title: "Workshop: Hands-on 5G Testing",
          type: "workshop",
          location: "Lab Room",
          description:
            "Practical session on 5G network testing and measurement",
        },
        {
          time: "19:00 - 22:00",
          title: "Conference Dinner",
          type: "social",
          location: "Hotel Restaurant",
          description:
            "Gala dinner with traditional Moroccan cuisine and entertainment",
        },
      ],
    },
    {
      date: "August 22, 2026",
      day: "Day 3",
      sessions: [
        {
          time: "09:00 - 10:00",
          title: "Keynote 3: Sustainable Wireless Systems",
          type: "keynote",
          location: "Main Auditorium",
          description:
            "Green technologies and energy efficiency in wireless communications",
          speakers: ["Dr. Ahmed Hassan"],
        },
        {
          time: "10:00 - 10:30",
          title: "Coffee Break",
          type: "break",
          location: "Exhibition Hall",
          description: "Final networking opportunity",
        },
        {
          time: "10:30 - 12:00",
          title: "Session 5A: Green Communications",
          type: "session",
          location: "Room A",
          description: "Energy-efficient wireless communication systems",
          papers: [
            "Energy Harvesting for Wireless Sensors",
            "Green Base Station Design",
            "Sustainable Network Architectures",
          ],
        },
        {
          time: "10:30 - 12:00",
          title: "Session 5B: Applications",
          type: "session",
          location: "Room B",
          description: "Real-world applications of wireless technologies",
          papers: [
            "Healthcare Applications of Wireless Systems",
            "Industrial IoT Implementation",
            "Smart Agriculture Solutions",
          ],
        },
        {
          time: "12:00 - 13:00",
          title: "Best Paper Awards & Closing Ceremony",
          type: "ceremony",
          location: "Main Auditorium",
          description:
            "Recognition of outstanding contributions and conference wrap-up",
        },
        {
          time: "13:00 - 14:00",
          title: "Farewell Lunch",
          type: "social",
          location: "Restaurant Area",
          description: "Final networking and farewell",
        },
      ],
    },
  ];

  const getSessionTypeColor = (type: string) => {
    const colors = {
      keynote: "bg-blue-100 text-blue-800 border-blue-200",
      session: "bg-green-100 text-green-800 border-green-200",
      panel: "bg-purple-100 text-purple-800 border-purple-200",
      workshop: "bg-orange-100 text-orange-800 border-orange-200",
      break: "bg-gray-100 text-gray-800 border-gray-200",
      ceremony: "bg-red-100 text-red-800 border-red-200",
      social: "bg-pink-100 text-pink-800 border-pink-200",
      registration: "bg-yellow-100 text-yellow-800 border-yellow-200",
    };
    return (
      colors[type as keyof typeof colors] ||
      "bg-gray-100 text-gray-800 border-gray-200"
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Conference Program
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Detailed schedule for WITS 2026 featuring keynote presentations,
            technical sessions, and networking opportunities.
          </p>
        </div>

        {/* Program Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Program Overview</CardTitle>
            <CardDescription>
              Three days of cutting-edge research presentations and networking
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  3 Keynote Speakers
                </h3>
                <p className="text-gray-600">
                  World-renowned experts in wireless technologies
                </p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Clock className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  10 Technical Sessions
                </h3>
                <p className="text-gray-600">
                  Covering latest advances in wireless communications
                </p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <MapPin className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Multiple Venues</h3>
                <p className="text-gray-600">
                  Parallel sessions and networking spaces
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Daily Programs */}
        <div className="space-y-8">
          {programDays.map((day, dayIndex) => (
            <Card key={dayIndex}>
              <CardHeader>
                <CardTitle className="text-2xl">
                  {day.day} - {day.date}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {day.sessions.map((session, sessionIndex) => (
                    <div
                      key={sessionIndex}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Badge
                              variant="outline"
                              className={getSessionTypeColor(session.type)}
                            >
                              {session.type.charAt(0).toUpperCase() +
                                session.type.slice(1)}
                            </Badge>
                            <div className="flex items-center text-sm text-gray-600">
                              <Clock className="h-4 w-4 mr-1" />
                              {session.time}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <MapPin className="h-4 w-4 mr-1" />
                              {session.location}
                            </div>
                          </div>
                          <h3 className="text-lg font-semibold mb-2">
                            {session.title}
                          </h3>
                          <p className="text-gray-600 mb-3">
                            {session.description}
                          </p>

                          {session.speakers && (
                            <div className="mb-3">
                              <p className="text-sm font-medium text-gray-700 mb-1">
                                Speakers:
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {session.speakers.map(
                                  (speaker, speakerIndex) => (
                                    <Badge
                                      key={speakerIndex}
                                      variant="secondary"
                                    >
                                      {speaker}
                                    </Badge>
                                  )
                                )}
                              </div>
                            </div>
                          )}

                          {session.papers && (
                            <div>
                              <p className="text-sm font-medium text-gray-700 mb-2">
                                Papers:
                              </p>
                              <ul className="text-sm text-gray-600 space-y-1">
                                {session.papers.map((paper, paperIndex) => (
                                  <li
                                    key={paperIndex}
                                    className="flex items-start"
                                  >
                                    <span className="text-blue-600 mr-2">
                                      •
                                    </span>
                                    {paper}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Important Notes */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Important Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">General Information</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• All times are in Morocco Standard Time (GMT+1)</li>
                  <li>
                    • Registration includes access to all sessions and coffee
                    breaks
                  </li>
                  <li>• Lunch is provided on all three days</li>
                  <li>• Conference materials will be available digitally</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Presentation Guidelines</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Oral presentations: 15 minutes + 5 minutes Q&A</li>
                  <li>• Poster sessions during coffee breaks</li>
                  <li>• Technical support available in all rooms</li>
                  <li>• Slides should be submitted 24 hours in advance</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
