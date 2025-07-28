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
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Trash2,
  Eye,
  Search,
  Filter,
  Download,
  FileText,
  ExternalLink,
} from "lucide-react";
import { registrationsApi } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Registration {
  id: string;
  title: string;
  civility: string;
  first_name: string;
  last_name: string;
  organization: string;
  address: string;
  postal_code: string;
  city: string;
  country: string;
  email: string;
  phone: string;
  paper_id?: string;
  receipt_file?: string;
  status: string;
  created_at: string;
}

export default function RegistrationsManager() {
  const [allRegistrations, setAllRegistrations] = useState<Registration[]>([]);
  const [filteredRegistrations, setFilteredRegistrations] = useState<
    Registration[]
  >([]);
  const [pendingRegistrations, setPendingRegistrations] = useState<
    Registration[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedRegistration, setSelectedRegistration] =
    useState<Registration | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchRegistrations();
    fetchPendingRegistrations();
  }, []);

  useEffect(() => {
    filterRegistrations();
  }, [allRegistrations, searchTerm, statusFilter]);

  const fetchRegistrations = async () => {
    try {
      const data = await registrationsApi.getAll();
      setAllRegistrations(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch registrations",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchPendingRegistrations = async () => {
    try {
      const data = await registrationsApi.getPending();
      setPendingRegistrations(data);
    } catch (error) {
      console.error("Failed to fetch pending registrations:", error);
    }
  };

  const filterRegistrations = () => {
    let filtered = allRegistrations;

    if (searchTerm) {
      filtered = filtered.filter(
        (reg) =>
          reg.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          reg.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          reg.organization.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((reg) => reg.status === statusFilter);
    }

    setFilteredRegistrations(filtered);
  };

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      await registrationsApi.updateStatus(id, status);
      toast({
        title: "Success",
        description: `Registration ${status} successfully`,
      });
      fetchRegistrations();
      fetchPendingRegistrations();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update registration status",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this registration?")) {
      try {
        await registrationsApi.delete(id);
        toast({
          title: "Success",
          description: "Registration deleted successfully",
        });
        fetchRegistrations();
        fetchPendingRegistrations();
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete registration",
          variant: "destructive",
        });
      }
    }
  };

  const handleViewDetails = (registration: Registration) => {
    setSelectedRegistration(registration);
    setViewDialogOpen(true);
  };

  const handleViewReceipt = (receiptFile: string) => {
    // Update this URL to your deployed 'uploads' folder (HTTPS)
    const receiptUrl = `https://wits26.science-conf.net/${receiptFile}`; // <-- CHANGE TO HTTPS
    window.open(receiptUrl, "_blank");
  };

  const getStatusBadge = (status: string) => {
    const statusColors = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      approved: "bg-green-100 text-green-800 border-green-200",
      rejected: "bg-red-100 text-red-800 border-red-200",
    };

    return (
      <Badge
        variant="outline"
        className={
          statusColors[status as keyof typeof statusColors] ||
          "bg-gray-100 text-gray-800 border-gray-200"
        }
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const exportToCSV = () => {
    const headers = [
      "Name",
      "Email",
      "Organization",
      "Country",
      "Phone",
      "Paper IDs",
      "Status",
      "Registration Date",
    ];

    const csvContent = [
      headers.join(","),
      ...filteredRegistrations.map((reg) =>
        [
          `"${reg.title} ${reg.first_name} ${reg.last_name}"`,
          reg.email,
          `"${reg.organization}"`,
          reg.country,
          reg.phone,
          `"${reg.paper_id || "N/A"}"`,
          reg.status,
          new Date(reg.created_at).toLocaleDateString(),
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "wits2026-registrations.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">Loading registrations...</div>
    );
  }

  const RegistrationTable = ({
    registrations,
    showActions = true,
  }: {
    registrations: Registration[];
    showActions?: boolean;
  }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Organization</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Country</TableHead>
          <TableHead>Paper IDs</TableHead>
          <TableHead>Receipt</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
          {showActions && <TableHead>Actions</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {registrations.map((registration) => (
          <TableRow key={registration.id}>
            <TableCell className="font-medium">
              {registration.title} {registration.first_name}{" "}
              {registration.last_name}
            </TableCell>
            <TableCell>{registration.organization}</TableCell>
            <TableCell>{registration.email}</TableCell>
            <TableCell>{registration.country}</TableCell>
            <TableCell>
              {registration.paper_id ? (
                <div className="text-sm">
                  {registration.paper_id.split(",").map((id, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="mr-1 mb-1"
                    >
                      {id.trim()}
                    </Badge>
                  ))}
                </div>
              ) : (
                <span className="text-gray-400">No papers</span>
              )}
            </TableCell>
            <TableCell>
              {registration.receipt_file ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleViewReceipt(registration.receipt_file!)}
                  className="flex items-center gap-1"
                >
                  <FileText className="h-3 w-3" />
                  <ExternalLink className="h-3 w-3" />
                </Button>
              ) : (
                <span className="text-gray-400">No receipt</span>
              )}
            </TableCell>
            <TableCell>
              {showActions ? (
                <Select
                  value={registration.status}
                  onValueChange={(value) =>
                    handleStatusUpdate(registration.id, value)
                  }
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                getStatusBadge(registration.status)
              )}
            </TableCell>
            <TableCell>
              {new Date(registration.created_at).toLocaleDateString()}
            </TableCell>
            {showActions && (
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewDetails(registration)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(registration.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Registration Management</CardTitle>
              <CardDescription>
                View and manage conference registrations
              </CardDescription>
            </div>
            <Button onClick={exportToCSV} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">
                All Registrations ({allRegistrations.length})
              </TabsTrigger>
              <TabsTrigger value="pending">
                Pending ({pendingRegistrations.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search by name, email, or organization..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <RegistrationTable registrations={filteredRegistrations} />
            </TabsContent>

            <TabsContent value="pending">
              <RegistrationTable registrations={pendingRegistrations} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Registration Details Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Registration Details</DialogTitle>
            <DialogDescription>
              Complete registration information
            </DialogDescription>
          </DialogHeader>
          {selectedRegistration && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Personal Information</h4>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Name:</strong> {selectedRegistration.title}{" "}
                    {selectedRegistration.first_name}{" "}
                    {selectedRegistration.last_name}
                  </p>
                  <p>
                    <strong>Email:</strong> {selectedRegistration.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {selectedRegistration.phone}
                  </p>
                  <p>
                    <strong>Organization:</strong>{" "}
                    {selectedRegistration.organization}
                  </p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Address Information</h4>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Address:</strong> {selectedRegistration.address}
                  </p>
                  <p>
                    <strong>City:</strong> {selectedRegistration.city}
                  </p>
                  <p>
                    <strong>Postal Code:</strong>{" "}
                    {selectedRegistration.postal_code}
                  </p>
                  <p>
                    <strong>Country:</strong> {selectedRegistration.country}
                  </p>
                </div>
              </div>
              <div className="md:col-span-2">
                <h4 className="font-semibold mb-3">Registration Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="mb-2">
                      <strong>Status:</strong>{" "}
                      {getStatusBadge(selectedRegistration.status)}
                    </p>
                    <p className="mb-2">
                      <strong>Registration Date:</strong>{" "}
                      {new Date(
                        selectedRegistration.created_at
                      ).toLocaleString()}
                    </p>
                    {selectedRegistration.paper_id && (
                      <div>
                        <p className="mb-2">
                          <strong>Paper IDs:</strong>
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {selectedRegistration.paper_id
                            .split(",")
                            .map((id, index) => (
                              <Badge key={index} variant="secondary">
                                {id.trim()}
                              </Badge>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div>
                    {selectedRegistration.receipt_file && (
                      <div>
                        <p className="mb-2">
                          <strong>Payment Receipt:</strong>
                        </p>
                        <Button
                          onClick={() =>
                            handleViewReceipt(
                              selectedRegistration.receipt_file!
                            )
                          }
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-2"
                        >
                          <FileText className="h-4 w-4" />
                          View Receipt
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
