"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Edit, Trash2 } from "lucide-react";
import { committeesApi } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";

// Update the Committee interface to match your model
interface Committee {
  id: string;
  name: string;
  role: string;
  description: string;
  category: string;
}

export default function CommitteesManager() {
  const [committees, setCommittees] = useState<Committee[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCommittee, setEditingCommittee] = useState<Committee | null>(
    null
  );
  const [selectedCategory, setSelectedCategory] =
    useState<string>("All Categories");
  // Update the form data state
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    description: "",
    category: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchCommittees();
    fetchCategories();
  }, []);

  const fetchCommittees = async (category?: string) => {
    try {
      const data = await committeesApi.getAll(category);
      setCommittees(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch committees",
        variant: "destructive",
      });
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingCommittee) {
        await committeesApi.update(editingCommittee.id, formData);
        toast({
          title: "Success",
          description: "Committee member updated successfully",
        });
      } else {
        await committeesApi.create(formData);
        toast({
          title: "Success",
          description: "Committee member created successfully",
        });
      }

      setDialogOpen(false);
      resetForm();
      fetchCommittees(
        selectedCategory === "All Categories" ? undefined : selectedCategory
      );
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save committee member",
        variant: "destructive",
      });
    }
  };

  // Update the edit handler
  const handleEdit = (committee: Committee) => {
    setEditingCommittee(committee);
    setFormData({
      name: committee.name,
      role: committee.role,
      description: committee.description,
      category: committee.category,
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this committee member?")) {
      try {
        await committeesApi.delete(id);
        toast({
          title: "Success",
          description: "Committee member deleted successfully",
        });
        fetchCommittees(
          selectedCategory === "All Categories" ? undefined : selectedCategory
        );
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete committee member",
          variant: "destructive",
        });
      }
    }
  };

  // Update the reset form function
  const resetForm = () => {
    setFormData({
      name: "",
      role: "",
      description: "",
      category: "",
    });
    setEditingCommittee(null);
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    fetchCommittees(category === "All Categories" ? undefined : category);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">Loading committees...</div>
    );
  }

  // Update the predefined categories to match your model
  const predefinedCategories = [
    "Honorary Committee",
    "Organizing Committee",
    "Steering Committee",
    "Special Issues Committee",
    "International Committee",
    "Keynote Committee",
    "Technical Committee",
    "Financial Committee",
    "Junior Committee",
    "Web Team",
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Committee Management</CardTitle>
            <CardDescription>
              Manage organizing and program committee members
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Select
              value={selectedCategory}
              onValueChange={handleCategoryFilter}
            >
              <SelectTrigger className="w-48">
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
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Member
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {editingCommittee
                      ? "Edit Committee Member"
                      : "Add New Committee Member"}
                  </DialogTitle>
                  <DialogDescription>
                    Fill in the committee member information below
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Update the form fields in the dialog */}
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="role">Role *</Label>
                    <Input
                      id="role"
                      value={formData.role}
                      onChange={(e) =>
                        setFormData({ ...formData, role: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) =>
                        setFormData({ ...formData, category: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {predefinedCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editingCommittee ? "Update" : "Create"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {/* Update the table headers and cells */}
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {committees.map((committee) => (
              <TableRow key={committee.id}>
                {/* Update table cells */}
                <TableCell className="font-medium">{committee.name}</TableCell>
                <TableCell>{committee.role}</TableCell>
                <TableCell className="max-w-xs truncate">
                  {committee.description}
                </TableCell>
                <TableCell>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    {committee.category}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(committee)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(committee.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
