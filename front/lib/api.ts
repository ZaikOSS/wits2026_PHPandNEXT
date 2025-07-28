// fileName: api.ts
// IMPORTANT: Set this to HTTPS to match your deployed backend and avoid mixed content issues.
const API_BASE_URL = "https://wits26.science-conf.net/api"; // <-- CHANGE TO HTTPS
const API_KEY =
  "b0b4e0d7c9f8a1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6";

interface ApiOptions {
  method?: string;
  body?: any;
  requireAuth?: boolean;
}

export async function apiCall(endpoint: string, options: ApiOptions = {}) {
  const { method = "GET", body, requireAuth = false } = options;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (requireAuth) {
    headers["X-API-Key"] = API_KEY;
  }

  const config: RequestInit = {
    method,
    headers,
  };

  if (body && method !== "GET") {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "Network error" }));
    throw new Error(errorData.message || "API request failed");
  }

  return response.json();
}

// Speakers API - matches your Speaker model
export const speakersApi = {
  getAll: () => apiCall("/speakers", { requireAuth: true }),
  get: (id: string) => apiCall(`/speakers/${id}`, { requireAuth: true }),
  create: (data: {
    name: string;
    title: string;
    institution: string;
    bio: string;
    image?: string | null;
  }) => apiCall("/speakers", { method: "POST", body: data, requireAuth: true }),
  update: (
    id: string,
    data: {
      name: string;
      title: string;
      institution: string;
      bio: string;
      image?: string | null;
    }
  ) =>
    apiCall(`/speakers/${id}`, {
      method: "PUT",
      body: data,
      requireAuth: true,
    }),
  delete: (id: string) =>
    apiCall(`/speakers/${id}`, { method: "DELETE", requireAuth: true }),
};

// Committees API - matches your Committee model
export const committeesApi = {
  getAll: (category?: string) =>
    apiCall(
      `/committees${
        category ? `?category=${encodeURIComponent(category)}` : ""
      }`,
      { requireAuth: true }
    ),
  get: (id: string) => apiCall(`/committees/${id}`, { requireAuth: true }),
  create: (data: {
    name: string;
    role: string;
    description: string;
    category: string;
  }) =>
    apiCall("/committees", { method: "POST", body: data, requireAuth: true }),
  update: (
    id: string,
    data: { name: string; role: string; description: string; category: string }
  ) =>
    apiCall(`/committees/${id}`, {
      method: "PUT",
      body: data,
      requireAuth: true,
    }),
  delete: (id: string) =>
    apiCall(`/committees/${id}`, { method: "DELETE", requireAuth: true }),
  getCategories: () => apiCall("/committees/categories", { requireAuth: true }),
};

// Contacts API - matches your Contact model
export const contactsApi = {
  getAll: () => apiCall("/contacts", { requireAuth: true }),
  create: (data: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) => apiCall("/contacts", { method: "POST", body: data }),
  delete: async (id: string) => {
    console.log("contactsApi.delete called with ID:", id);

    const response = await fetch(`${API_BASE_URL}/contacts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": API_KEY,
      },
    });

    console.log("Delete API response status:", response.status);

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: "Delete failed" }));
      console.error("Delete API error:", errorData);
      throw new Error(errorData.message || "Failed to delete contact");
    }

    const result = await response.json();
    console.log("Delete successful, result:", result);
    return result;
  },
};

// Registrations API - matches your Registration model with receipt_file support
export const registrationsApi = {
  getAll: () => apiCall("/registrations", { requireAuth: true }),
  getPending: () => apiCall("/registrations/pending", { requireAuth: true }),
  create: (data: {
    title: string;
    civility: string;
    last_name: string;
    first_name: string;
    organization: string;
    address: string;
    postal_code: string;
    city: string;
    country: string;
    email: string;
    phone: string;
    paper_id?: string;
    receipt_file?: string;
  }) => apiCall("/registrations", { method: "POST", body: data }),
  updateStatus: (id: string, status: string) =>
    apiCall(`/registrations/${id}/status`, {
      method: "PUT",
      body: { status },
      requireAuth: true,
    }),
  delete: (id: string) =>
    apiCall(`/registrations/${id}`, { method: "DELETE", requireAuth: true }),
};

// Upload API - now supports both images and receipt files
export async function uploadImage(file: File): Promise<{ image_path: string }> {
  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(`${API_BASE_URL}/upload_image`, {
    method: "POST",
    headers: {
      "X-API-Key": API_KEY,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "Upload failed" }));
    throw new Error(errorData.message || "Upload failed");
  }

  const result = await response.json();
  if (result && typeof result.image_path === "string") {
    return { image_path: result.image_path };
  } else {
    throw new Error("Upload response missing 'image_path' or invalid format.");
  }
}

// New function specifically for receipt uploads
export async function uploadReceipt(
  file: File
): Promise<{ file_path: string }> {
  const formData = new FormData();
  formData.append("receipt", file);

  const response = await fetch(`${API_BASE_URL}/upload_receipt`, {
    method: "POST",
    headers: {
      "X-API-Key": API_KEY,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "Receipt upload failed" }));
    throw new Error(errorData.message || "Receipt upload failed");
  }

  const result = await response.json();
  if (result && typeof result.file_path === "string") {
    return { file_path: result.file_path };
  } else {
    throw new Error("Upload response missing 'file_path' or invalid format.");
  }
}
