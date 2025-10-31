const API_BASE_URL = "http://localhost:4000";

export const getAuthToken = (): string | null => {
  return localStorage.getItem("adminToken");
};

export const setAuthToken = (token: string) => {
  localStorage.setItem("adminToken", token);
};

export const clearAuthToken = () => {
  localStorage.removeItem("adminToken");
  localStorage.removeItem("currentAdmin");
};

export const apiCall = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<any> => {
  const token = getAuthToken();
  
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // Log outgoing request
  console.log("🚀 API Request:", {
    endpoint: `${API_BASE_URL}${endpoint}`,
    method: options.method || "GET",
    body: options.body ? JSON.parse(options.body as string) : null,
    hasToken: !!token
  });

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  // Log incoming response
  console.log("✅ API Response:", {
    endpoint: `${API_BASE_URL}${endpoint}`,
    status: response.status,
    ok: response.ok,
    data
  });

  if (!response.ok) {
    console.error("❌ API Error:", {
      endpoint: `${API_BASE_URL}${endpoint}`,
      status: response.status,
      error: data.error || "An error occurred"
    });
    throw new Error(data.error || "An error occurred");
  }

  return data;
};

// Auth API
export const registerAdmin = async (data: {
  collegeName: string;
  email: string;
  password: string;
  confirmPassword: string;
}) => {
  return apiCall("/api/college-admin/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const loginAdmin = async (data: { email: string; password: string }) => {
  return apiCall("/api/college-admin/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// Event API
export const createEvent = async (data: {
  title: string;
  date: string;
  category: string;
  location: string;
  maxParticipants?: number;
  description?: string;
  banner?: string;
}) => {
  return apiCall("/api/events/create", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const getEventRegistrations = async (eventId: string) => {
  return apiCall(`/api/events/admin/registrations/${eventId}`, {
    method: "GET",
  });
};
