import { useState } from "react";
import InputBar from "../components/InputBar";
import Typing from "../components/Typing";
import MessageBubble from "../components/MessageBubble";
import ChatHistory from "../components/ChatHistory";

export interface Message {
  text: string;
  sender: "user" | "ai";
}

export default function Chat() {
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
    <div className="flex h-screen bg-[var(--gray-black)] text-[var(--gray-light)]">
      <ChatHistory />
      <div className="flex-2 flex flex-col w-full h-full relative">
        <div className="flex-grow p-4 space-y-4 overflow-y-auto">
          {messages.map((msg, index) => (
            <MessageBubble key={index} text={msg.text} sender={msg.sender} />
          ))}
          {typing && <Typing />}
          <InputBar sendMessage={sendMessage} />
        </div>
        
      </div>
    </div>
  );
}
