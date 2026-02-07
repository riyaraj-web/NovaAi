import apiClient from "../lib/api";

export interface Note {
  id: string;
  userId: string;
  title: string;
  content: string;
  color?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateNotePayload {
  title: string;
  content: string;
  color?: string;
}

export const notesService = {
  getNotes: async (): Promise<Note[]> => {
    const response = await apiClient.get<Note[]>("/notes");
    return response.data;
  },

  createNote: async (data: CreateNotePayload): Promise<Note> => {
    const response = await apiClient.post<Note>("/notes", data);
    return response.data;
  },

  updateNote: async (id: string, data: Partial<CreateNotePayload>): Promise<Note> => {
    const response = await apiClient.put<Note>(`/notes/${id}`, data);
    return response.data;
  },

  deleteNote: async (id: string): Promise<void> => {
    await apiClient.delete(`/notes/${id}`);
  },
};
