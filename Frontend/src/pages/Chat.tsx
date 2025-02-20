
import InputBar from "../components/InputBar";
import Typing from "../components/Typing";
import MessageBubble from "../components/MessageBubble";
import { Message } from "../App";

interface ChatProps {
  messages: Message[];
  sendMessage: (message: string) => void;
  typing: boolean;
}

export default function Chat({ messages, sendMessage, typing }: ChatProps) {
  return (
    <div className="flex flex-col h-full w-full relative">
      <div className="flex-grow p-4 space-y-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <MessageBubble key={index} text={msg.text} sender={msg.sender} />
        ))}
        {typing && <Typing />}
        <InputBar sendMessage={sendMessage}/>
      </div>
    </div>
  );
}