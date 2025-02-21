import { useState } from "react";
import Chat from "./pages/Chat";
import ChatHistory from "./components/ChatHistory";

export interface Message {
  text: string;
  sender: "user" | "ai";
}

export default function App() {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! How can I help you today?", sender: "ai" },
  ]);
  const [typing, setTyping] = useState<boolean>(false);

  const sendMessage = (message: string) => {
    setMessages([...messages, { text: message, sender: "user" }]);
    setTyping(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: "This is an AI-generated response.", sender: "ai" },
      ]);
      setTyping(false);
    }, 1000);
  };

  return (
    <>
	<h1 className="text-xl font-bold text-red-500">Hello yinyang! team </h1>
    </>
  )
}
