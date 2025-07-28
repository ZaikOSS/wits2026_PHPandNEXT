"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Trash2, Mail, Eye, Search, Download } from "lucide-react";
import { contactsApi } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Contact {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

export default function ContactsManager() {
  const [allContacts, setAllContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    filterContacts();
  }, [allContacts, searchTerm]);

  const fetchContacts = async () => {
    try {
      const data = await contactsApi.getAll();
      setAllContacts(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch contacts",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filterContacts = () => {
    let filtered = allContacts;

    if (searchTerm) {
      filtered = filtered.filter(
        (contact) =>
          contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contact.subject.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredContacts(filtered);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this contact message?")) {
      try {
        console.log("Attempting to delete contact with ID:", id);

        const response = await fetch(
          `http://localhost/witsReact/api/contacts/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "X-API-Key":
                "b0b4e0d7c9f8a1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6",
            },
          }
        );

        console.log("Delete response status:", response.status);
        console.log(
          "Delete response headers:",
          Object.fromEntries(response.headers.entries())
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.error(
            "Delete failed with status:",
            response.status,
            "Response:",
            errorText
          );
          throw new Error(
            `Delete failed: ${response.status} ${response.statusText}`
          );
        }

        const result = await response.json();
        console.log("Delete successful, result:", result);

        toast({
          title: "Success",
          description: "Contact message deleted successfully",
        });
        fetchContacts();
      } catch (error) {
        console.error("Delete error:", error);
        toast({
          title: "Error",
          description: `Failed to delete contact message: ${
            error instanceof Error ? error.message : "Unknown error"
          }`,
          variant: "destructive",
        });
      }
    }
  };

  const handleReply = (email: string, subject: string) => {
    const mailtoLink = `mailto:${email}?subject=Re: ${subject}`;
    window.open(mailtoLink);
  };

  const handleViewDetails = (contact: Contact) => {
    setSelectedContact(contact);
    setViewDialogOpen(true);
  };

  const exportToCSV = () => {
    const headers = ["Name", "Email", "Subject", "Message", "Date"];

    const csvContent = [
      headers.join(","),
      ...filteredContacts.map((contact) =>
        [
          `"${contact.name}"`,
          contact.email,
          `"${contact.subject}"`,
          `"${contact.message.replace(/"/g, '""')}"`,
          new Date(contact.created_at).toLocaleDateString(),
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "wits2026-contacts.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const deleteAllContacts = async () => {
    if (
      confirm(
        `Are you sure you want to delete all ${filteredContacts.length} contact messages? This action cannot be undone.`
      )
    ) {
      try {
        console.log(
          "Attempting to delete all contacts:",
          filteredContacts.map((c) => c.id)
        );

        const deletePromises = filteredContacts.map(async (contact) => {
          const response = await fetch(
            `http://localhost/witsReact/api/contacts/${contact.id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                "X-API-Key":
                  "b0b4e0d7c9f8a1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6",
              },
            }
          );

          if (!response.ok) {
            throw new Error(
              `Failed to delete contact ${contact.id}: ${response.status}`
            );
          }

          return response.json();
        });

        await Promise.all(deletePromises);

        toast({
          title: "Success",
          description: "All contact messages deleted successfully",
        });
        fetchContacts();
      } catch (error) {
        console.error("Delete all error:", error);
        toast({
          title: "Error",
          description: `Failed to delete some contact messages: ${
            error instanceof Error ? error.message : "Unknown error"
          }`,
          variant: "destructive",
        });
      }
    }
  };

  if (loading) {
    return <div className="flex justify-center py-8">Loading contacts...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Contact Messages</CardTitle>
              <CardDescription>
                View and manage contact form submissions ({allContacts.length}{" "}
                total messages)
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button onClick={exportToCSV} variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
              {filteredContacts.length > 0 && (
                <Button onClick={deleteAllContacts} variant="destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete All
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search by name, email, or subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900">Total Messages</h3>
              <p className="text-2xl font-bold text-blue-600">
                {allContacts.length}
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-900">This Week</h3>
              <p className="text-2xl font-bold text-green-600">
                {
                  allContacts.filter((contact) => {
                    const weekAgo = new Date();
                    weekAgo.setDate(weekAgo.getDate() - 7);
                    return new Date(contact.created_at) > weekAgo;
                  }).length
                }
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-900">
                Filtered Results
              </h3>
              <p className="text-2xl font-bold text-purple-600">
                {filteredContacts.length}
              </p>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Message Preview</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContacts.map((contact) => (
                <TableRow key={contact.id}>
                  <TableCell className="font-medium">{contact.name}</TableCell>
                  <TableCell>{contact.email}</TableCell>
                  <TableCell className="max-w-xs">
                    <div className="truncate">{contact.subject}</div>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <div className="truncate text-gray-600">
                      {contact.message}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {new Date(contact.created_at).toLocaleDateString()}
                      <br />
                      <span className="text-gray-500">
                        {new Date(contact.created_at).toLocaleTimeString()}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(contact)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          handleReply(contact.email, contact.subject)
                        }
                      >
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(contact.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredContacts.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              {searchTerm
                ? "No contacts found matching your search."
                : "No contact messages yet."}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Contact Details Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Contact Message Details</DialogTitle>
            <DialogDescription>
              Full contact message information
            </DialogDescription>
          </DialogHeader>
          {selectedContact && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-1">Name</h4>
                  <p className="text-gray-700">{selectedContact.name}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Email</h4>
                  <p className="text-gray-700">{selectedContact.email}</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-1">Subject</h4>
                <p className="text-gray-700">{selectedContact.subject}</p>
              </div>

              <div>
                <h4 className="font-semibold mb-1">Message</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {selectedContact.message}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-1">Received</h4>
                <p className="text-gray-700">
                  {new Date(selectedContact.created_at).toLocaleString()}
                </p>
              </div>

              <div className="flex justify-end space-x-2 pt-4 border-t">
                <Button
                  onClick={() =>
                    handleReply(selectedContact.email, selectedContact.subject)
                  }
                  className="flex items-center gap-2"
                >
                  <Mail className="h-4 w-4" />
                  Reply via Email
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    handleDelete(selectedContact.id);
                    setViewDialogOpen(false);
                  }}
                  className="flex items-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete Message
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
