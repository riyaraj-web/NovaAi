import apiClient from "../lib/api";

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  bio?: string;
}

export const profileService = {
  getProfile: async (): Promise<UserProfile> => {
    const response = await apiClient.get<UserProfile>("/profile");
    return response.data;
  },

  updateProfile: async (data: Partial<UserProfile>): Promise<UserProfile> => {
    const response = await apiClient.put<UserProfile>("/profile", data);
    return response.data;
  },
};
