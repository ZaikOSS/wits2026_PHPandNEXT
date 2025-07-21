import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Plane, Hotel } from "lucide-react"

export default function VenuePage() {
  const attractions = [
    {
      name: "Medina of Fez",
      description: "UNESCO World Heritage site with traditional architecture and bustling souks",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      name: "Al-Qarawiyyin Mosque",
      description: "One of the oldest universities in the world, founded in 859 AD",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      name: "Bou Inania Madrasa",
      description: "Beautiful example of Marinid architecture with intricate decorations",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  const hotels = [
    {
      name: "Riad Fes",
      category: "Luxury",
      description: "Traditional riad with modern amenities in the heart of the medina",
      distance: "2 km from venue",
    },
    {
      name: "Hotel Sahrai",
      category: "5-Star",
      description: "Contemporary hotel with panoramic views of the medina",
      distance: "3 km from venue",
    },
    {
      name: "Palais Medina & Spa",
      category: "4-Star",
      description: "Elegant hotel combining traditional Moroccan style with modern comfort",
      distance: "1.5 km from venue",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Venue & Fez</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the beautiful city of Fez, Morocco - a perfect blend of ancient history and modern hospitality for
            our international conference.
          </p>
        </div>

        {/* Venue Information */}
        <section className="mb-16">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-6 w-6 text-blue-600" />
                Conference Venue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Université Sidi Mohamed Ben Abdellah</h3>
                  <p className="text-gray-600 mb-4">
                    The conference will be held at the prestigious Université Sidi Mohamed Ben Abdellah, one of
                    Morocco's leading academic institutions. The modern conference facilities provide state-of-the-art
                    technology and comfortable spaces for presentations, networking, and collaboration.
                  </p>
                  <div className="space-y-2">
                    <p>
                      <strong>Address:</strong> Route d'Imouzzer, Fez, Morocco
                    </p>
                    <p>
                      <strong>Facilities:</strong> Modern auditoriums, high-speed WiFi, catering services
                    </p>
                    <p>
                      <strong>Capacity:</strong> 500+ attendees
                    </p>
                  </div>
                </div>
                <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                  <img
                    src="/placeholder.svg?height=300&width=400"
                    alt="Conference Venue"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* About Fez */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">About Fez</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Fez is Morocco's cultural and spiritual capital, known for its well-preserved medieval architecture,
              vibrant souks, and rich intellectual heritage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {attractions.map((attraction, index) => (
              <Card key={index}>
                <div className="aspect-video relative">
                  <img
                    src={attraction.image || "/placeholder.svg"}
                    alt={attraction.name}
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{attraction.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{attraction.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Transportation */}
        <section className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plane className="h-6 w-6 text-blue-600" />
                Getting to Fez
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-3">By Air</h3>
                  <p className="text-gray-600 mb-4">
                    <strong>Fez-Saïs Airport (FEZ)</strong> is the closest airport, located about 15 km from the city
                    center. The airport serves domestic and international flights with connections to major European
                    cities.
                  </p>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Direct flights from Paris, Madrid, Brussels</li>
                    <li>• Connecting flights via Casablanca</li>
                    <li>• Airport shuttle and taxi services available</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3">Ground Transportation</h3>
                  <ul className="text-gray-600 space-y-2">
                    <li>
                      <strong>Taxi:</strong> Available 24/7, approximately 30-45 minutes to city center
                    </li>
                    <li>
                      <strong>Car Rental:</strong> Major international brands available at the airport
                    </li>
                    <li>
                      <strong>Train:</strong> High-speed rail connections from Casablanca and Rabat
                    </li>
                    <li>
                      <strong>Bus:</strong> Regular intercity bus services
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Accommodation */}
        <section className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Hotel className="h-6 w-6 text-blue-600" />
                Recommended Hotels
              </CardTitle>
              <CardDescription>Carefully selected accommodations near the conference venue</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {hotels.map((hotel, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{hotel.name}</h3>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">{hotel.category}</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{hotel.description}</p>
                    <p className="text-blue-600 text-sm font-medium">{hotel.distance}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-blue-800">
                  <strong>Special Conference Rates:</strong> Mention "WITS 2026" when booking to receive discounted
                  rates at partner hotels. Contact us for booking assistance and group rates.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Map Section */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle>Location Map</CardTitle>
              <CardDescription>Interactive map showing the conference venue and nearby attractions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Interactive map will be displayed here</p>
                  <p className="text-sm text-gray-400">Google Maps integration</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  )
}
