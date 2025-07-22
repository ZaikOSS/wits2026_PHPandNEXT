"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Users,
  Mic,
  MessageSquare,
  UserCheck,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import {
  speakersApi,
  committeesApi,
  contactsApi,
  registrationsApi,
} from "@/lib/api";

interface Stats {
  totalSpeakers: number;
  totalCommittees: number;
  totalContacts: number;
  totalRegistrations: number;
  pendingRegistrations: number;
  approvedRegistrations: number;
  rejectedRegistrations: number;
}

// Define props interface to accept onNavigateToTab function
interface DashboardStatsProps {
  onNavigateToTab: (tabValue: string) => void;
}

export default function DashboardStats({
  onNavigateToTab,
}: DashboardStatsProps) {
  const [stats, setStats] = useState<Stats>({
    totalSpeakers: 0,
    totalCommittees: 0,
    totalContacts: 0,
    totalRegistrations: 0,
    pendingRegistrations: 0,
    approvedRegistrations: 0,
    rejectedRegistrations: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [speakers, committees, contacts, registrations, pendingRegs] =
        await Promise.allSettled([
          speakersApi.getAll(),
          committeesApi.getAll(),
          contactsApi.getAll(),
          registrationsApi.getAll(),
          registrationsApi.getPending(),
        ]);

      const speakersData =
        speakers.status === "fulfilled" ? speakers.value : [];
      const committeesData =
        committees.status === "fulfilled" ? committees.value : [];
      const contactsData =
        contacts.status === "fulfilled" ? contacts.value : [];
      const registrationsData =
        registrations.status === "fulfilled" ? registrations.value : [];
      const pendingRegsData =
        pendingRegs.status === "fulfilled" ? pendingRegs.value : [];

      const approved = registrationsData.filter(
        (reg: any) => reg.status === "approved"
      ).length;
      const rejected = registrationsData.filter(
        (reg: any) => reg.status === "rejected"
      ).length;

      setStats({
        totalSpeakers: speakersData.length,
        totalCommittees: committeesData.length,
        totalContacts: contactsData.length,
        totalRegistrations: registrationsData.length,
        pendingRegistrations: pendingRegsData.length,
        approvedRegistrations: approved,
        rejectedRegistrations: rejected,
      });
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Speakers",
      value: stats.totalSpeakers,
      description: "Keynote speakers registered",
      icon: Mic,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Committee Members",
      value: stats.totalCommittees,
      description: "Organizing & program committee",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Total Registrations",
      value: stats.totalRegistrations,
      description: "Conference registrations",
      icon: UserCheck,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Contact Messages",
      value: stats.totalContacts,
      description: "Unread contact messages",
      icon: MessageSquare,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

  const registrationStats = [
    {
      title: "Pending",
      value: stats.pendingRegistrations,
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      title: "Approved",
      value: stats.approvedRegistrations,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Rejected",
      value: stats.rejectedRegistrations,
      icon: XCircle,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {stat.description}
                  </p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Registration Status Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Registration Status Overview</CardTitle>
          <CardDescription>Breakdown of registration statuses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {registrationStats.map((stat, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-4 border rounded-lg"
              >
                <div className={`p-2 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Add onClick handlers to navigate to specific tabs */}
            <div
              className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => onNavigateToTab("speakers")}
            >
              <Mic className="h-8 w-8 text-blue-600 mb-2" />
              <h3 className="font-semibold">Add Speaker</h3>
              <p className="text-sm text-gray-600">Add new keynote speaker</p>
            </div>
            <div
              className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => onNavigateToTab("committees")}
            >
              <Users className="h-8 w-8 text-green-600 mb-2" />
              <h3 className="font-semibold">Add Committee Member</h3>
              <p className="text-sm text-gray-600">
                Add organizing committee member
              </p>
            </div>
            <div
              className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => onNavigateToTab("registrations")}
            >
              <Clock className="h-8 w-8 text-yellow-600 mb-2" />
              <h3 className="font-semibold">Review Registrations</h3>
              <p className="text-sm text-gray-600">
                Process pending registrations
              </p>
            </div>
            <div
              className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => onNavigateToTab("contacts")}
            >
              <MessageSquare className="h-8 w-8 text-orange-600 mb-2" />
              <h3 className="font-semibold">Check Messages</h3>
              <p className="text-sm text-gray-600">Review contact messages</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
