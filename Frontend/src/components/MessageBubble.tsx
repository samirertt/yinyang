import { useRef, useEffect } from "react";
import Avatar from "../assets/Avatar.png"


interface MessageProps {
  text: string;
  sender: "user" | "ai";
}

export default function MessageBubble({ text, sender }: MessageProps) {
  const messageRef = useRef<HTMLDivElement>(null);

  const adjustMessageHeight = () => {
    if (messageRef.current) {
      messageRef.current.style.height = "auto"; // Reset height to recalculate
      messageRef.current.style.height = `${messageRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustMessageHeight();
  }, [text]);

  return (
    <div className={`flex items-center gap-2 max-w-xs min-w-[510px] ${sender === "user" ? "justify-end" : "justify-start"}`}>
        {sender === "ai" && (
          <img 
            src={Avatar} 
            alt="AI Avatar" 
            className="w-8 h-8 rounded-xl" 
            style={{
              backgroundColor: "var(--white)",
              border: "1px solid var(--gray-even-darker)",
            }}
          />
        )}
        <div
        ref={messageRef}
        className={`p-3 rounded-xl max-w-xs text-sm overflow-hidden ${
          sender === "user"
            ? "bg-[var(--gray-almost-black)] text-[var(--white)] border border-[var(--gray-darker)]"
            : "bg-[var(--black)] text-[var(--white)] border border-[var(--gray-darker)]"
        }`}
        style={{
          whiteSpace: "pre-wrap", 
          wordWrap: "break-word", 
        }}>
        {text}
        </div>
    </div>
  );
}

