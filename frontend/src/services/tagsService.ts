import apiClient from "../lib/api";

export interface Tag {
  id: string;
  userId: string;
  name: string;
  color?: string;
  createdAt: string;
}

export interface CreateTagPayload {
  name: string;
  color?: string;
}

export const tagsService = {
  getTags: async (): Promise<Tag[]> => {
    const response = await apiClient.get<Tag[]>("/tags");
    return response.data;
  },

  createTag: async (data: CreateTagPayload): Promise<Tag> => {
    const response = await apiClient.post<Tag>("/tags", data);
    return response.data;
  },

  deleteTag: async (id: string): Promise<void> => {
    await apiClient.delete(`/tags/${id}`);
  },
};
