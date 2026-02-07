import apiClient from "../lib/api";

interface AuthPayload {
  email: string;
  password: string;
  name?: string;
}

interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
  };
  token: string;
}

export const authService = {
  register: async (data: AuthPayload): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>("/auth/register", data);
    if (response.data.token) {
      localStorage.setItem("auth_token", response.data.token);
    }
    return response.data;
  },

  login: async (data: Omit<AuthPayload, "name">): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>("/auth/login", data);
    if (response.data.token) {
      localStorage.setItem("auth_token", response.data.token);
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("auth_token");
  },

  getToken: () => localStorage.getItem("auth_token"),

  isAuthenticated: () => !!localStorage.getItem("auth_token"),
};
