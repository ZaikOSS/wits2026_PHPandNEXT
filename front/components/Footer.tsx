import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">WITS 2026</h3>
            <p className="text-gray-300 mb-4">
              International Conference on Wireless Technologies and Emerging Communication Systems
            </p>
            <p className="text-gray-300">Organized by USMBA - Université Sidi Mohamed Ben Abdellah</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/speakers" className="text-gray-300 hover:text-white">
                  Speakers
                </Link>
              </li>
               <li>
                <Link href="/CallForPapers" className="text-gray-300 hover:text-white">
                  CallForPapers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/program" className="text-gray-300 hover:text-white">
                  Program
                </Link>
              </li>
              <li>
                <Link href="/registration" className="text-gray-300 hover:text-white">
                  Registration
                </Link>
              </li>
              <li>
                <Link href="/venue" className="text-gray-300 hover:text-white">
                  Venue
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span className="text-gray-300">Fez, Morocco</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <span className="text-gray-300">info@wits2026.org</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <span className="text-gray-300">06 51 71 26 04</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-300">© 2026 WITS Conference. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
