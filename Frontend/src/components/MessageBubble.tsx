import { useRef, useEffect } from "react";

interface MessageProps {
  text: string;
  sender: "user" | "ai";
}

export default function MessageBubble({ text, sender }: MessageProps) {
  const messageRef = useRef<HTMLDivElement>(null);

  // Adjust the height of the message bubble based on its content
  const adjustMessageHeight = () => {
    if (messageRef.current) {
      messageRef.current.style.height = "auto"; // Reset height to recalculate
      messageRef.current.style.height = `${messageRef.current.scrollHeight}px`;
    }
  };

  // Adjust the height whenever the text changes
  useEffect(() => {
    adjustMessageHeight();
  }, [text]);

  return (
    <div className={`flex ${sender === "user" ? "justify-end" : "justify-start"}`}>
      <div
        ref={messageRef}
        className={`p-3 rounded-xl max-w-xs text-sm overflow-hidden ${
          sender === "user"
            ? "bg-[var(--gray-almost-black)] text-[var(--white)] border border-[var(--gray-darker)]"  // User messages: Blue with white text
            : "bg-[var(--black)] text-[var(--white)] border border-[var(--gray-darker)]"
        }`}
        style={{
          whiteSpace: "pre-wrap", 
          wordWrap: "break-word", // Break long words if necessary
        }}
      >
        {text}
      </div>
    </div>
  );
}