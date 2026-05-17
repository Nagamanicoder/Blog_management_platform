import { apiClient } from "../fetchClient";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatResponse {
  reply: string;
}

export async function fetchLLMReply(messages: Message[]): Promise<string> {
  const data = await apiClient.post<ChatResponse>("chatbot/chat/", { messages });
  return data.reply;
}