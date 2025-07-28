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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button"; // Import Button for "Show More/Less"
import { committeesApi } from "@/lib/api";
import { ChevronDown, ChevronUp } from "lucide-react"; // Icons for expand/collapse

interface Committee {
  id: string;
  name: string;
  role: string;
  description: string;
  category: string;
}

// Define how many members to show initially per category
const DISPLAY_LIMIT = 9;

export default function CommitteesPage() {
  const [committees, setCommittees] = useState<Committee[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<string>("All Categories");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // State to keep track of which categories are expanded
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    fetchCommittees();
    fetchCategories();
  }, []);

  const fetchCommittees = async (category?: string) => {
    try {
      const data = await committeesApi.getAll(category);
      setCommittees(data);
    } catch (error) {
      console.error("Failed to fetch committees:", error);
      setError("Failed to load committees. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await committeesApi.getCategories();
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setLoading(true);
    // Reset expanded categories when filter changes
    setExpandedCategories(new Set());
    fetchCommittees(category === "All Categories" ? undefined : category);
  };

  // Function to toggle the expanded state of a category
  const toggleExpandCategory = (category: string) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  // Group committees by category
  const groupedCommittees = committees.reduce((acc, committee) => {
    if (!acc[committee.category]) {
      acc[committee.category] = [];
    }
    acc[committee.category].push(committee);
    return acc;
  }, {} as Record<string, Committee[]>);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Conference Committees
            </h1>
            <p className="text-xl text-gray-600">
              Loading committee information...
            </p>
          </div>
          {/* Add skeleton loading for committee cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
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
              Conference Committees
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
            Conference Committees
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet the dedicated professionals organizing WITS 2026 and ensuring
            its success.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex justify-center">
          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Categories">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {committees.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">
              {selectedCategory === "All Categories"
                ? "No committee members have been announced yet."
                : `No committee members found in ${selectedCategory}.`}
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {Object.entries(groupedCommittees).map(([category, members]) => {
              const isExpanded = expandedCategories.has(category);
              const displayedMembers = isExpanded
                ? members
                : members.slice(0, DISPLAY_LIMIT);
              const needsExpansion = members.length > DISPLAY_LIMIT;

              return (
                <section key={category}>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                    {category}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayedMembers.map((member) => (
                      <Card
                        key={member.id}
                        className="hover:shadow-lg transition-shadow"
                      >
                        <CardHeader>
                          <CardTitle className="text-lg">
                            {member.name}
                          </CardTitle>
                          <CardDescription className="text-blue-600 font-medium">
                            {member.role}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600 text-sm">
                            {member.description}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  {needsExpansion && (
                    <div className="text-center mt-6">
                      <Button
                        variant="outline"
                        onClick={() => toggleExpandCategory(category)}
                      >
                        {isExpanded ? (
                          <>
                            <ChevronUp className="h-4 w-4 mr-2" />
                            Show Less
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-4 w-4 mr-2" />
                            Show More ({members.length - DISPLAY_LIMIT} more)
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
