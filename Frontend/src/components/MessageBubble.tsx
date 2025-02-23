import { useRef, useEffect } from "react";
import Avatar from "../assets/Avatar.png"
import Delete from "../assets/Delete.svg"
import Edit from "../assets/Edit.svg"
import Copy from "../assets/Copy.svg"


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
    <div className={`flex flex-col items-${sender === "user" ? "end" : "start"} max-w-xs min-w-[800px] `}>
      <div className={`flex items-center gap-2 ${sender === "ai" ? "justify-start" : "justify-end"}`}>
        {sender === "ai" && (
          <img
            src={Avatar}
            alt="Avatar"
            className="w-8 h-8 rounded-xl"
            style={{
              backgroundColor: "var(--white)",
              border: "1px solid var(--gray-even-darker)",
            }}
          />
        )}
        <div
          ref={messageRef}
          className={`p-3 rounded-xl max-w-[800px] text-mm overflow-hidden ${
            sender === "user"
              ? "bg-[var(--gray-almost-black)] text-[var(--white)] border border-[var(--gray-darker)]"
              : "bg-[var(--page)] text-[var(--white)]"
          }`}
          style={{
            whiteSpace: "pre-wrap",
            wordWrap: "break-word",
          }}
        >
          {text}
        </div>
      </div>
      {sender === "user" && (
        <div className="flex justify-end mt-2 gap-8">
          <img src={Delete} alt="Delete icon" className="w-5 h-5 cursor-pointer"  />
          <img src={Edit} alt="Edit icon" className="w-5 h-5 cursor-pointer"  />
          <img src={Copy} alt="Copy icon" className="w-5 h-5 cursor-pointer"  />
        </div>
      )}
    </div>
  );
}