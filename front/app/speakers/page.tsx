"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { speakersApi } from "@/lib/api";

interface Speaker {
  id: string;
  name: string;
  title: string;
  institution: string;
  bio: string;
  image?: string;
}

export default function SpeakersPage() {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedSpeakerForBio, setSelectedSpeakerForBio] =
    useState<Speaker | null>(null);
  const [isBioDialogOpen, setIsBioDialogOpen] = useState(false);

  useEffect(() => {
    fetchSpeakers();
  }, []);

  const fetchSpeakers = async () => {
    try {
      const data = await speakersApi.getAll();
      setSpeakers(data);
    } catch (error) {
      console.error("Failed to fetch speakers:", error);
      setError("Failed to load speakers. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + "...";
  };

  const handleViewBio = (speaker: Speaker) => {
    setSelectedSpeakerForBio(speaker);
    setIsBioDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Keynote Speakers
            </h1>
            <p className="text-xl text-gray-600">Loading speakers...</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="aspect-square relative bg-gray-200 animate-pulse"></div>
                <CardHeader>
                  <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-1"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Keynote Speakers
            </h1>
            <p className="text-xl text-red-600">{error}</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Keynote Speakers
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet our distinguished speakers who will share their expertise and
            insights on the latest developments in wireless technologies and
            communication systems.
          </p>
        </div>

        {speakers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">
              No speakers have been announced yet. Please check back later.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {speakers.map((speaker) => (
              <Card
                key={speaker.id}
                className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
              >
                <div className="aspect-square relative flex-shrink-0">
                  <img
                    // Update this URL to your deployed 'uploads' folder (HTTPS)
                    src={
                      speaker.image
                        ? `https://wits26.science-conf.net/${speaker.image}` // <-- CHANGE TO HTTPS
                        : "/placeholder.svg?height=300&width=300"
                    }
                    alt={speaker.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder.svg?height=300&width=300";
                    }}
                  />
                </div>
                <CardHeader className="flex-grow-0">
                  <CardTitle className="text-xl">{speaker.name}</CardTitle>
                  <CardDescription className="text-blue-600 font-medium">
                    {speaker.title}
                  </CardDescription>
                  <CardDescription>{speaker.institution}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between">
                  <div>
                    <p className="text-gray-600 text-sm mb-2">
                      {truncateText(speaker.bio, 150)}
                    </p>
                    {speaker.bio.length > 150 && (
                      <Button
                        variant="link"
                        className="p-0 h-auto text-blue-600 hover:no-underline"
                        onClick={() => handleViewBio(speaker)}
                      >
                        Read More
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      <Footer />

      <Dialog open={isBioDialogOpen} onOpenChange={setIsBioDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedSpeakerForBio && (
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold mb-2">
                {selectedSpeakerForBio.name}
              </DialogTitle>
              <DialogDescription className="text-blue-600 font-medium text-lg">
                {selectedSpeakerForBio.title}
              </DialogDescription>
              <DialogDescription className="text-gray-700 mb-4">
                {selectedSpeakerForBio.institution}
              </DialogDescription>
              {selectedSpeakerForBio.image && (
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4">
                  <img
                    // Update this URL to your deployed 'uploads' folder (HTTPS)
                    src={`https://wits26.science-conf.net/${selectedSpeakerForBio.image}`} // <-- CHANGE TO HTTPS
                    alt={selectedSpeakerForBio.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder.svg?height=300&width=300";
                    }}
                  />
                </div>
              )}
              <div className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                {selectedSpeakerForBio.bio}
              </div>
            </DialogHeader>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
