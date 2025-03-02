import { useState, useRef, useEffect } from "react";
import SendIcon from "../assets/SendIcon.svg"; 
import SpeakIcon from "../assets/SpeakIcon.svg";

interface InputBarProps {
  sendMessage: (message: string) => void;
}

export default function InputBar({ sendMessage }: InputBarProps) {
  const [message, setMessage] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (message.trim() === "") return;
    sendMessage(message);
    setMessage("");
  };

  const handleSpeak = () => {
    if (!message) return;
    const speech = new SpeechSynthesisUtterance(message);
    speechSynthesis.speak(speech);
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; 
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [message]);

  return (
    <div 
      className="fixed bottom-4 p-2  min-h-[60px] max-w-xs min-w-[800px] flex items-center  rounded-xl shadow-lg"
      style={{ 
        backgroundColor: "var(--gray-even-darker)", 
        color: "var(--gray-light)", 
        border: "1px solid var(--gray-darker)"
      }}
    >

      <textarea
        ref={textareaRef}
        className="flex-1 rounded-xl  min-h-[20px] outline-none resize-none overflow-hidden" 
  placeholder="Type a message..."
  style={{ 
    position: "relative",
    backgroundColor: "var(--Black)", 
    color: "var(--white)", 
    border: "1px solid var(--gray-even-darker)",
    maxHeight: "40px",
    padding: "4px", 
    textAlign: "left",
    verticalAlign: "top"
  }}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
        rows={1}
      />

      {message.trim() === "" ? (
        <button
          onClick={handleSpeak}
          className="p-2 hover: rounded-xl ml-2 cursor-pointer"
          style={{
            backgroundColor: "var(--white)",
            border: "1px solid var(--gray-even-darker)",
          }}
        >
          <img src={SpeakIcon} alt="Speak" className="w-6 h-6" />
        </button>
      ) : (
        <button
        onClick={handleSend}
        className="p-2 hover: rounded-xl ml-2 cursor-pointer"
        style={{
          backgroundColor: "var(--white)",
          border: "1px solid var(--gray-even-darker)",
        }}
        >
          <img src={SendIcon} alt="Send" className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}