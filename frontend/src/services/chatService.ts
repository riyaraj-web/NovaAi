import apiClient from "../lib/api";

export interface ChatMessage {
  id: string;
  userId: string;
  content: string;
  timestamp: string;
  role: "user" | "assistant";
}

export interface ChatResponse {
  userMessage: ChatMessage;
  aiMessage?: ChatMessage;
}

export const chatService = {
  getMessages: async (): Promise<ChatMessage[]> => {
    const response = await apiClient.get<ChatMessage[]>("/chat");
    return response.data;
  },

  sendMessage: async (content: string, role: "user" | "assistant" = "user"): Promise<ChatResponse | ChatMessage> => {
    const response = await apiClient.post<ChatResponse | ChatMessage>("/chat", {
      content,
      role,
    });
    return response.data;
  },
};
