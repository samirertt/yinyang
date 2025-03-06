import { useEffect, useRef, useState } from "react";
import InputBar from "../components/InputBar";
import Typing from "../components/Typing";
import MessageBubble from "../components/MessageBubble";
import SideBar from "../components/SideBar";
import ChatNav from "../components/ChatNav";
import { useLocation } from "react-router-dom";

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

  // Getting the username from location.state (you might adjust this based on how you store the username)
  const location = useLocation();
  const username = location.state?.user?.username; 

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

  // Passing received character and list from location.state
  const [receivedCharacter, setReceivedCharacter] = useState(location.state.character);
  const [list, setList] = useState(location.state.historyList);

  return (
    <div>
      <div className="flex h-screen bg-[var(--page)]">
        <SideBar username={username} historyList={list} character={receivedCharacter} />
        <div className="flex flex-col flex-1 h-full w-full relative p-4 overflow-y-auto space-y-4 items-center">
          {/* Pass username to ChatNav */}
          <ChatNav username={username} />
          <div className="pt-15 mb-20 w-89 md:min-w-[10px] lg:min-w-[850px] items-center">
            {messages.map((msg, index) => (
              <MessageBubble key={index} text={msg.text} sender={msg.sender} image={receivedCharacter.img} />
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
