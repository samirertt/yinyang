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
        { text: "Maybe next time Honey ", sender: "ai" },
      ]);
      setTyping(false);
    }, 1000);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  return (
    <div>
      
      <div className=" flex h-screen bg-[var(--page)] ">      
      <SideBar/>
        <div className="flex flex-col flex-1 h-full w-full relative p-4 overflow-y-auto space-y-4 items-center">
        <ChatNav/>
          <div className="pt-10 mb-20 w-100 md:min-w-[120px] lg:min-w-[850px] items-center">
          {messages.map((msg, index) => (
            <MessageBubble key={index} text={msg.text} sender={msg.sender} />
          ))}
            <InputBar sendMessage={sendMessage} />
          </div>
          {typing && <Typing />}
          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
}
