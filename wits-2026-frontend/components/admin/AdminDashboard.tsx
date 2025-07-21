"use client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LogOut,
  Users,
  MessageSquare,
  UserCheck,
  Mic,
  BarChart3,
} from "lucide-react";
import SpeakersManager from "./SpeakersManager";
import CommitteesManager from "./CommitteesManager";
import ContactsManager from "./ContactsManager";
import RegistrationsManager from "./RegistrationsManager";
import DashboardStats from "./DashboardStats";

export default function AdminDashboard() {
  const { adminUsername, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                WITS 2026 Admin Dashboard
              </h1>
              <p className="text-sm text-gray-600">
                Welcome back, {adminUsername}
              </p>
            </div>
            <Button onClick={logout} variant="outline">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="speakers" className="flex items-center gap-2">
              <Mic className="h-4 w-4" />
              Speakers
            </TabsTrigger>
            <TabsTrigger value="committees" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Committees
            </TabsTrigger>
            <TabsTrigger
              value="registrations"
              className="flex items-center gap-2"
            >
              <UserCheck className="h-4 w-4" />
              Registrations
            </TabsTrigger>
            <TabsTrigger value="contacts" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Contacts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <DashboardStats />
          </TabsContent>

          <TabsContent value="speakers">
            <SpeakersManager />
          </TabsContent>

          <TabsContent value="committees">
            <CommitteesManager />
          </TabsContent>

          <TabsContent value="registrations">
            <RegistrationsManager />
          </TabsContent>

          <TabsContent value="contacts">
            <ContactsManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
