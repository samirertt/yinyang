import { useEffect, useRef, useState } from "react";
import InputBar from "../components/InputBar";
import Typing from "../components/Typing";
import MessageBubble from "../components/MessageBubble";
import SideBar from "../components/SideBar";
import ChatNav from "../components/ChatNav";


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
    <div className="flex h-screen bg-[var(--page)] justify-center">      
    <SideBar/>
      <div>
        <ChatNav/>
      </div>
      <div className="pt-14 flex flex-col flex-1 h-full relative p-4 overflow-y-auto space-y-4 items-center">
        {messages.map((msg, index) => (
          <MessageBubble key={index} text={msg.text} sender={msg.sender} />
        ))}
        {typing && <Typing />}
        <div ref={messagesEndRef} />
        <div className="flex flex-col flex-1 h-full relative min-h-[90px] overflow-y-auto space-y-4 items-center">
          <InputBar sendMessage={sendMessage} />
        </div>
      </div>
    </div>
  );
}
