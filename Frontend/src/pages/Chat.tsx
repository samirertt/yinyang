import { useEffect, useRef, useState } from "react";
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
  const messagesEndRef = useRef<HTMLDivElement>(null);


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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  return (
    <div className="top-0 flex h-screen bg-[var(--gray-black)] text-[var(--gray-light)] justify-center">
      <div className="flex-none w-50 p-4 h-full">
        <ChatHistory />
      </div>
        {/* Add margin-top to create space for ChatHistory */}
        <div className="flex-1 flex-col h-full relative "></div>
          <div className="flex-grow p-4 space-y-4 overflow-y-auto flex flex-col " style={{ maxHeight: "calc(100vh - 5rem)", marginTop: '1rem' }}>
            {messages.map((msg, index) => (
              <MessageBubble key={index} text={msg.text} sender={msg.sender} />
            ))}
            {typing && <Typing />}
            <div ref={messagesEndRef} />
            <div ><InputBar sendMessage={sendMessage} /></div>
            
          </div>
        <div/>
      </div>
  );
}
