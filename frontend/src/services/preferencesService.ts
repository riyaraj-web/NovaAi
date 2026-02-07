import apiClient from "../lib/api";

export interface UserPreferences {
  id: string;
  userId: string;
  theme: "light" | "dark";
  language: string;
  notifications: boolean;
  emailDigest: boolean;
  timezone: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdatePreferencesPayload {
  theme?: "light" | "dark";
  language?: string;
  notifications?: boolean;
  emailDigest?: boolean;
  timezone?: string;
}

export const preferencesService = {
  getPreferences: async (): Promise<UserPreferences> => {
    const response = await apiClient.get<UserPreferences>("/preferences");
    return response.data;
  },

  updatePreferences: async (data: UpdatePreferencesPayload): Promise<UserPreferences> => {
    const response = await apiClient.put<UserPreferences>("/preferences", data);
    return response.data;
  },
};
