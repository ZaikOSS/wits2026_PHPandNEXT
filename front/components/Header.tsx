"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button"; // Keep Button import if used elsewhere, otherwise it can be removed

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Speakers", href: "/speakers" },
    { name: "Committees", href: "/committees" },
    { name: "Program", href: "/program" },
    { name: "Venue", href: "/venue" },
    { name: "Registration", href: "/registration" },
    { name: "Contact", href: "/contact" },
    { name: "Call for papers", href: "/CallForPapers" },
    // Removed Admin link from here as it's not meant to be visible
  ];

  return (
    <header className="bg-white shadow-sm border-b">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span className="text-2xl font-bold text-blue-600">
                WITS 2026
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
            {/* Admin Button for desktop - NOW HIDDEN */}
            {/* <Link href="/admin">
              <Button variant="outline" size="sm">
                Admin
              </Button>
            </Link> */}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {/* Admin Button for mobile - NOW HIDDEN */}
              {/* <Link href="/admin" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" size="sm" className="mt-2 ml-3 bg-transparent">
                  Admin
                </Button>
              </Link> */}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
