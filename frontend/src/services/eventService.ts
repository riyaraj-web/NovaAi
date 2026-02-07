import apiClient from "../lib/api";

export interface CalendarEvent {
  id: string;
  userId: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  location?: string;
  color?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEventPayload {
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  location?: string;
  color?: string;
}

export const eventService = {
  getEvents: async (): Promise<CalendarEvent[]> => {
    const response = await apiClient.get<CalendarEvent[]>("/events");
    return response.data;
  },

  createEvent: async (data: CreateEventPayload): Promise<CalendarEvent> => {
    const response = await apiClient.post<CalendarEvent>("/events", data);
    return response.data;
  },

  updateEvent: async (id: string, data: Partial<CreateEventPayload>): Promise<CalendarEvent> => {
    const response = await apiClient.put<CalendarEvent>(`/events/${id}`, data);
    return response.data;
  },

  deleteEvent: async (id: string): Promise<void> => {
    await apiClient.delete(`/events/${id}`);
  },
};
