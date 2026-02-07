import apiClient from "../lib/api";

export interface Analytics {
  id: string;
  userId: string;
  totalChats: number;
  totalTasks: number;
  completedTasks: number;
  totalNotes: number;
  totalEvents: number;
  lastActiveAt?: string;
  createdAt: string;
  updatedAt: string;
}

export type AnalyticsEvent = "chat" | "task" | "task_completed" | "note" | "event";

export const analyticsService = {
  getAnalytics: async (): Promise<Analytics> => {
    const response = await apiClient.get<Analytics>("/analytics");
    return response.data;
  },

  trackEvent: async (event: AnalyticsEvent, data?: any): Promise<Analytics> => {
    const response = await apiClient.post<Analytics>("/analytics/track", {
      event,
      data,
    });
    return response.data;
  },
};
