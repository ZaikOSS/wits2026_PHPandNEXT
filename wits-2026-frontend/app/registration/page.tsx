// fileName: page.tsx
"use client";

import type React from "react";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Upload } from "lucide-react";
import { registrationsApi, uploadReceipt } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

export default function RegistrationPage() {
  const [formData, setFormData] = useState({
    title: "",
    civility: "",
    last_name: "",
    first_name: "",
    organization: "",
    address: "",
    postal_code: "",
    city: "", // Corrected: Ensure this is 'city', not 'Ccity'
    country: "",
    email: "",
    phone: "",
    paper_ids: [""], // This is a client-side array for multiple inputs
    receipt_file: "", // This will store the path after upload
  });
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Start loading for the entire submission process
    console.log("RegistrationPage: handleSubmit started.");
    console.log("RegistrationPage: Current receiptFile state:", receiptFile);
    console.log(
      "RegistrationPage: Current formData.receipt_file state:",
      formData.receipt_file
    );

    try {
      let receiptPath = formData.receipt_file; // Initialize with existing path from formData

      // Step 1: Handle Receipt File Upload (if a new file is selected)
      if (receiptFile) {
        setUploading(true); // Indicate file is being uploaded
        console.log(
          "RegistrationPage: New receipt file detected for upload:",
          receiptFile
        );
        try {
          const uploadResult = await uploadReceipt(receiptFile);
          receiptPath = uploadResult.file_path; // Get the path from the successful upload
          console.log(
            "RegistrationPage: Receipt uploaded successfully, new path:",
            receiptPath
          );
        } catch (uploadError: any) {
          console.error(
            "RegistrationPage: Upload Error (during receipt upload):",
            uploadError
          );
          toast({
            title: "Upload Error",
            description:
              uploadError.message ||
              "Failed to upload receipt file. Please try again.",
            variant: "destructive",
          });
          setLoading(false); // Stop overall loading
          return; // Crucial: Stop submission if upload fails
        } finally {
          setUploading(false); // Reset uploading state
        }
      } else {
        // If no new file is selected, but 'receipt_file' is required by backend,
        // ensure it's not empty, especially if the input has 'required' attribute.
        // This handles cases where a user might clear the file input or if it's an edit form.
        if (!receiptPath) {
          console.warn(
            "RegistrationPage: No receipt file selected and no existing path. Validation required."
          );
          toast({
            title: "Validation Error",
            description: "Payment receipt is required.",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }
        console.log(
          "RegistrationPage: No new receipt file selected. Using existing path:",
          receiptPath
        );
      }

      // Step 2: Prepare Registration Data for the Main API Call
      // Filter out empty paper IDs and join them with commas for the backend's 'paper_id' field
      const paper_id_string = formData.paper_ids
        .filter((id) => id.trim() !== "")
        .join(",");

      // Construct the data payload for registration
      // Ensure all keys here EXACTLY match the column names in your 'registrations' table
      // and the parameters expected by your backend's Registration model/controller.
      const registrationData = {
        title: formData.title,
        civility: formData.civility,
        last_name: formData.last_name,
        first_name: formData.first_name,
        organization: formData.organization,
        address: formData.address,
        postal_code: formData.postal_code,
        city: formData.city, // Corrected: Ensure this maps to 'city' in formData
        country: formData.country,
        email: formData.email,
        phone: formData.phone,
        paper_id: paper_id_string, // This is the string field for the backend
        receipt_file: receiptPath, // This is the path from the upload step
        // Do NOT include 'paper_ids' (the array) as a field in registrationData,
        // as the backend expects 'paper_id' as a string.
      };

      // Log the final data payload before sending to the API for debugging
      console.log(
        "RegistrationPage: Sending registration data to API:",
        registrationData
      );
      console.log(
        "RegistrationPage: JSON string being sent:",
        JSON.stringify(registrationData)
      );

      // Step 3: Make the Main Registration API Call
      await registrationsApi.create(registrationData);

      // Step 4: Handle Success
      setSuccess(true);
      toast({
        title: "Success",
        description: "Registration submitted successfully!",
      });

      // Reset form after successful submission
      setFormData({
        title: "",
        civility: "",
        last_name: "",
        first_name: "",
        organization: "",
        address: "",
        postal_code: "",
        city: "",
        country: "",
        email: "",
        phone: "",
        paper_ids: [""],
        receipt_file: "",
      });
      setReceiptFile(null);
    } catch (error: any) {
      // Step 5: Handle Errors
      // Log the full error object from the API call for detailed debugging
      console.error(
        "RegistrationPage: Registration submission failed (API Response):",
        error
      );
      toast({
        title: "Error",
        description:
          error.message || "Failed to submit registration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false); // Stop overall loading regardless of success or failure
    }
  };

  // Corrected: handleInputChange now directly updates the field by name
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePaperIdChange = (index: number, value: string) => {
    const newPaperIds = [...formData.paper_ids];
    newPaperIds[index] = value;
    setFormData((prev) => ({ ...prev, paper_ids: newPaperIds }));
  };

  const addPaperId = () => {
    setFormData((prev) => ({ ...prev, paper_ids: [...prev.paper_ids, ""] }));
  };

  const removePaperId = (index: number) => {
    if (formData.paper_ids.length > 1) {
      const newPaperIds = formData.paper_ids.filter((_, i) => i !== index);
      setFormData((prev) => ({ ...prev, paper_ids: newPaperIds }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "application/pdf",
      ];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid File Type",
          description: "Please upload a JPEG, PNG, or PDF file.",
          variant: "destructive",
        });
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Please upload a file smaller than 5MB.",
          variant: "destructive",
        });
        return;
      }

      setReceiptFile(file);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-green-600">
                Registration Successful!
              </CardTitle>
              <CardDescription>
                Thank you for registering for WITS 2026. You will receive a
                confirmation email shortly. Your registration is currently
                pending review.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button onClick={() => setSuccess(false)}>
                Register Another Participant
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Conference Registration
          </h1>
          <p className="text-xl text-gray-600">
            Register for WITS 2026 and secure your spot at this premier
            conference
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Registration Form</CardTitle>
            <CardDescription>
              Please fill in all required fields to complete your registration
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Select
                    value={formData.title}
                    onValueChange={(value) => handleInputChange("title", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select title" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Dr">Dr</SelectItem>
                      <SelectItem value="Prof">Prof</SelectItem>
                      <SelectItem value="Mr">Mr</SelectItem>
                      <SelectItem value="Ms">Ms</SelectItem>
                      <SelectItem value="Mrs">Mrs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="civility">Civility *</Label>
                  <Select
                    value={formData.civility}
                    onValueChange={(value) =>
                      handleInputChange("civility", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select civility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mr">Mr</SelectItem>
                      <SelectItem value="Ms">Ms</SelectItem>
                      <SelectItem value="Mrs">Mrs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first_name">First Name *</Label>
                  <Input
                    id="first_name"
                    value={formData.first_name}
                    onChange={(e) =>
                      handleInputChange("first_name", e.target.value)
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="last_name">Last Name *</Label>
                  <Input
                    id="last_name"
                    value={formData.last_name}
                    onChange={(e) =>
                      handleInputChange("last_name", e.target.value)
                    }
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="organization">Organization *</Label>
                <Input
                  id="organization"
                  value={formData.organization}
                  onChange={(e) =>
                    handleInputChange("organization", e.target.value)
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address *</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="postal_code">Postal Code *</Label>
                  <Input
                    id="postal_code"
                    value={formData.postal_code}
                    onChange={(e) =>
                      handleInputChange("postal_code", e.target.value)
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Country *</Label>
                  <Input
                    id="country"
                    value={formData.country}
                    onChange={(e) =>
                      handleInputChange("country", e.target.value)
                    }
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Paper IDs Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Paper IDs (Optional)</Label>
                  <Button
                    type="button"
                    onClick={addPaperId}
                    variant="outline"
                    size="sm"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Paper ID
                  </Button>
                </div>
                {formData.paper_ids.map((paperId, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder={`Paper ID ${index + 1}`}
                      value={paperId}
                      onChange={(e) =>
                        handlePaperIdChange(index, e.target.value)
                      }
                    />
                    {formData.paper_ids.length > 1 && (
                      <Button
                        type="button"
                        onClick={() => removePaperId(index)}
                        variant="outline"
                        size="sm"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <p className="text-sm text-gray-600">
                  If you have submitted papers, enter their IDs here. You can
                  add multiple paper IDs.
                </p>
              </div>

              {/* Receipt Upload Section */}
              <div className="space-y-2">
                <Label htmlFor="receipt">Payment Receipt *</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-4">
                      <label htmlFor="receipt" className="cursor-pointer">
                        <span className="mt-2 block text-sm font-medium text-gray-900">
                          Upload payment receipt
                        </span>
                        <span className="mt-1 block text-sm text-gray-500">
                          PNG, JPG, or PDF up to 5MB
                        </span>
                      </label>
                      <input
                        id="receipt"
                        name="receipt"
                        type="file"
                        className="sr-only"
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={handleFileChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                {receiptFile && (
                  <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-md">
                    <p className="text-sm text-green-800">
                      Selected file: {receiptFile.name} (
                      {(receiptFile.size / 1024 / 1024).toFixed(2)} MB)
                    </p>
                  </div>
                )}
                <p className="text-sm text-gray-600">
                  Please upload your payment receipt. This is required to
                  complete your registration.
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">
                  Registration Information
                </h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Registration fee: $200 for regular participants</li>
                  <li>• Student discount: $100 with valid student ID</li>
                  <li>• Payment methods: Bank transfer or credit card</li>
                  <li>• Your registration will be reviewed after submission</li>
                </ul>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={loading || uploading}
              >
                {loading
                  ? "Submitting..."
                  : uploading
                  ? "Uploading..."
                  : "Submit Registration"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
