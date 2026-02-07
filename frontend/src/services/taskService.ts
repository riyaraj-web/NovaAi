import apiClient from "../lib/api";

export interface Task {
  id: string;
  userId: string;
  title: string;
  description?: string;
  completed: boolean;
  dueDate?: string;
  priority: "low" | "medium" | "high";
  category?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskPayload {
  title: string;
  description?: string;
  dueDate?: string;
  priority?: "low" | "medium" | "high";
  category?: string;
}

export const taskService = {
  getTasks: async (): Promise<Task[]> => {
    const response = await apiClient.get<Task[]>("/tasks");
    return response.data;
  },

  createTask: async (data: CreateTaskPayload): Promise<Task> => {
    const response = await apiClient.post<Task>("/tasks", data);
    return response.data;
  },

  updateTask: async (id: string, data: Partial<CreateTaskPayload> & { completed?: boolean }): Promise<Task> => {
    const response = await apiClient.put<Task>(`/tasks/${id}`, data);
    return response.data;
  },

  deleteTask: async (id: string): Promise<void> => {
    await apiClient.delete(`/tasks/${id}`);
  },
};
