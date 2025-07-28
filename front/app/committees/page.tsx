"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { committeesApi } from "@/lib/api";

interface Committee {
  id: string;
  name: string;
  role: string;
  description: string;
  category: string;
}

export default function CommitteesPage() {
  const [committees, setCommittees] = useState<Committee[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All Categories");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
    fetchCommittees(category === "All Categories" ? undefined : category);
  };

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
            Meet the dedicated professionals organizing WITS 2026 and ensuring its success.
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
            {Object.entries(groupedCommittees).map(([category, members]) => (
              <section key={category}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                  {category}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-6">
                  {members.map((member) => (
                    <div
                      key={member.id}
                      className="text-base text-gray-800 leading-relaxed"
                    >
                      <span className="font-semibold uppercase">
                        {member.name}
                      </span>
                      , {member.role}, {member.description}
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
