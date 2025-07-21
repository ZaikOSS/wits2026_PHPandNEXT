// fileName: SpeakersManager.tsx
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
import { Textarea } from "@/components/ui/textarea";
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
import { speakersApi, uploadImage } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

interface Speaker {
  id: string;
  name: string;
  title: string;
  institution: string;
  bio: string;
  image?: string | null; // This type should match api.ts
}

export default function SpeakersManager() {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingSpeaker, setEditingSpeaker] = useState<Speaker | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    institution: "",
    bio: "",
    image: "", // Stores the current image path (if editing) or will be overwritten by imageUrl
  });
  const [imageFile, setImageFile] = useState<File | null>(null); // Stores the actual File object
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchSpeakers();
  }, []);

  const fetchSpeakers = async () => {
    setLoading(true);
    try {
      const data = await speakersApi.getAll();
      console.log("SpeakersManager: Fetched speakers from API:", data);
      setSpeakers(data);
    } catch (error) {
      console.error("SpeakersManager: Failed to fetch speakers:", error);
      toast({
        title: "Error",
        description: "Failed to fetch speakers",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    console.log("SpeakersManager: handleSubmit started.");
    console.log("SpeakersManager: Current imageFile state:", imageFile);
    console.log(
      "SpeakersManager: Current formData.image state:",
      formData.image
    );

    try {
      // Initialize imageUrl. If formData.image is an empty string, treat it as null.
      let imageUrl: string | null =
        formData.image === "" ? null : formData.image;
      console.log(
        "SpeakersManager: imageUrl after initial assignment:",
        imageUrl
      );

      // If a new image file is selected, upload it first
      if (imageFile) {
        console.log(
          "SpeakersManager: Image file detected for upload:",
          imageFile
        );
        try {
          const uploadResult = await uploadImage(imageFile);
          imageUrl = uploadResult.image_path; // Get the new path
          console.log(
            "SpeakersManager: Image uploaded successfully, new path:",
            imageUrl
          );
        } catch (uploadError: any) {
          console.error("SpeakersManager: Image upload failed:", uploadError);
          toast({
            title: "Upload Error",
            description:
              uploadError.message ||
              "Failed to upload image. Please try again.",
            variant: "destructive",
          });
          setUploading(false);
          return; // Stop submission if image upload fails
        }
      } else {
        console.log(
          "SpeakersManager: No new image file selected. Using existing path or null:",
          imageUrl
        );
      }

      // Construct the data payload for speaker creation/update
      const speakerData = {
        name: formData.name,
        title: formData.title,
        institution: formData.institution,
        bio: formData.bio,
        image: imageUrl, // This will be string or null
      };

      console.log(
        "SpeakersManager: Final speaker data to be submitted:",
        speakerData
      );

      if (editingSpeaker) {
        console.log(
          "SpeakersManager: Attempting to update speaker with ID:",
          editingSpeaker.id
        );
        await speakersApi.update(editingSpeaker.id, speakerData);
        toast({
          title: "Success",
          description: "Speaker updated successfully",
        });
      } else {
        console.log("SpeakersManager: Attempting to create new speaker.");
        await speakersApi.create(speakerData);
        toast({
          title: "Success",
          description: "Speaker created successfully",
        });
      }

      setDialogOpen(false);
      resetForm();
      fetchSpeakers(); // Re-fetch speakers to update the list
    } catch (error: any) {
      console.error("SpeakersManager: Failed to save speaker:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to save speaker",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (speaker: Speaker) => {
    setEditingSpeaker(speaker);
    // When editing, set formData.image to the speaker's image path or an empty string if null/undefined
    setFormData({
      name: speaker.name,
      title: speaker.title,
      institution: speaker.institution,
      bio: speaker.bio,
      image: speaker.image || "", // Convert null/undefined to empty string for the input field
    });
    setImageFile(null); // Clear any previously selected file when starting an edit
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    // IMPORTANT: Replaced window.confirm with a toast-based confirmation for better UI/UX
    toast({
      title: "Confirm Deletion",
      description: "Are you sure you want to delete this speaker?",
      variant: "destructive",
      action: (
        <Button
          variant="secondary"
          onClick={async () => {
            try {
              await speakersApi.delete(id);
              toast({
                title: "Success",
                description: "Speaker deleted successfully",
              });
              fetchSpeakers(); // Re-fetch speakers after deletion
            } catch (error) {
              console.error(
                "SpeakersManager: Failed to delete speaker:",
                error
              );
              toast({
                title: "Error",
                description: "Failed to delete speaker",
                variant: "destructive",
              });
            }
          }}
        >
          Delete
        </Button>
      ),
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      title: "",
      institution: "",
      bio: "",
      image: "", // Reset image path to empty string
    });
    setEditingSpeaker(null);
    setImageFile(null); // Clear selected file
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    resetForm(); // Reset form when dialog closes (e.g., by clicking outside or cancel)
  };

  if (loading) {
    return <div className="flex justify-center py-8">Loading speakers...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Speakers Management</CardTitle>
            <CardDescription>
              Manage keynote speakers and presenters
            </CardDescription>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  setDialogOpen(true);
                  resetForm(); // Ensure form resets on "Add Speaker" click
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Speaker
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingSpeaker ? "Edit Speaker" : "Add New Speaker"}
                </DialogTitle>
                <DialogDescription>
                  Fill in the speaker information below
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
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
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="institution">Institution *</Label>
                  <Input
                    id="institution"
                    value={formData.institution}
                    onChange={(e) =>
                      setFormData({ ...formData, institution: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Biography *</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) =>
                      setFormData({ ...formData, bio: e.target.value })
                    }
                    rows={4}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Speaker Photo</Label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  />
                  {/* Display current image path if editing and no new file selected */}
                  {editingSpeaker && !imageFile && formData.image && (
                    <p className="text-sm text-gray-600">
                      Current image: {formData.image}
                    </p>
                  )}
                  {/* Display selected new file name */}
                  {imageFile && (
                    <p className="text-sm text-gray-600">
                      Selected new file: {imageFile.name}
                    </p>
                  )}
                </div>

                <div className="flex justify-end space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleDialogClose}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={uploading}>
                    {uploading
                      ? "Saving..."
                      : editingSpeaker
                      ? "Update"
                      : "Create"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Institution</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {speakers.map((speaker) => (
              <TableRow key={speaker.id}>
                <TableCell className="font-medium">{speaker.name}</TableCell>
                <TableCell>{speaker.title}</TableCell>
                <TableCell>{speaker.institution}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(speaker)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(speaker.id)}
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
