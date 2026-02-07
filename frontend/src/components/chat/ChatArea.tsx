import { useState, useEffect, useRef } from "react";
import { Send, Bot, User as UserIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { chatService, ChatMessage } from "../../services/chatService";

export default function ChatArea() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchMessages = async () => {
    try {
      const data = await chatService.getMessages();
      setMessages(data);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessageContent = input;
    setInput("");
    setLoading(true);

    try {
      const response = await chatService.sendMessage(userMessageContent, "user");
      
      // Check if response has both messages (new format)
      if ('userMessage' in response && response.userMessage) {
        const newMessages: ChatMessage[] = [response.userMessage];
        if (response.aiMessage) {
          newMessages.push(response.aiMessage);
        }
        setMessages((prev) => [...prev, ...newMessages]);
      } else {
        // Fallback for single message response
        setMessages((prev) => [...prev, response as ChatMessage]);
      }
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full p-8">
            <div className="text-center max-w-2xl">
              <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-6 shadow-xl">
                <Bot className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-3 text-gray-900 dark:text-white">
                Welcome to Nova AI
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
                Start a conversation with your AI assistant
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto">
                {[
                  "Help me plan my day",
                  "Write a creative story",
                  "Explain quantum physics",
                  "Give me productivity tips"
                ].map((suggestion, i) => (
                  <button
                    key={i}
                    onClick={() => setInput(suggestion)}
                    className="p-4 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-600 hover:shadow-md transition-all duration-200 text-sm text-left font-medium text-gray-700 dark:text-gray-300"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto p-6 space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-4 animate-slide-up ${
                  message.role === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-md ${
                  message.role === "assistant"
                    ? "gradient-primary"
                    : "bg-gradient-to-r from-blue-500 to-cyan-500"
                }`}>
                  {message.role === "assistant" ? (
                    <Bot className="w-5 h-5 text-white" />
                  ) : (
                    <UserIcon className="w-5 h-5 text-white" />
                  )}
                </div>
                
                <div className={`flex-1 max-w-[75%] ${
                  message.role === "user" ? "flex flex-col items-end" : ""
                }`}>
                  <div
                    className={`px-5 py-3 rounded-2xl shadow-sm ${
                      message.role === "user"
                        ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-tr-sm"
                        : "bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-gray-100 rounded-tl-sm"
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1 px-2">
                    {new Date(message.timestamp).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex gap-4 animate-slide-up">
                <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center shadow-md">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="bg-gray-100 dark:bg-slate-800 px-5 py-3 rounded-2xl rounded-tl-sm shadow-sm">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t bg-white dark:bg-slate-900 p-4 flex-shrink-0">
        <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto">
          <div className="flex gap-3">
            <Input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              className="flex-1 h-12 px-4 rounded-xl border-2 focus:border-purple-500 transition-colors"
            />
            <Button
              type="submit"
              disabled={loading || !input.trim()}
              className="h-12 px-6 gradient-primary text-white shadow-md hover:shadow-lg transition-all duration-200 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
