import apiClient from "../lib/api";

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface CreateNotificationPayload {
  title: string;
  message: string;
}

export const notificationsService = {
  getNotifications: async (): Promise<Notification[]> => {
    const response = await apiClient.get<Notification[]>("/notifications");
    return response.data;
  },

  createNotification: async (data: CreateNotificationPayload): Promise<Notification> => {
    const response = await apiClient.post<Notification>("/notifications", data);
    return response.data;
  },

  markAsRead: async (id: string): Promise<Notification> => {
    const response = await apiClient.put<Notification>(`/notifications/${id}/read`);
    return response.data;
  },

  deleteNotification: async (id: string): Promise<void> => {
    await apiClient.delete(`/notifications/${id}`);
  },
};
