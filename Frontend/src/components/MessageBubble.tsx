import { useRef, useEffect, useState } from "react";
import Copy from "../assets/Copy.svg";
// import Emi from "../assets/Emi.jpg";


interface MessageProps {
  text: string;
  sender: string;
  image:string;
  anim:boolean;
}

export default function MessageBubble({ text, sender,image,anim }: MessageProps) {
  const messageRef = useRef<HTMLDivElement>(null);
  const [displayedText, setDisplayedText] = useState(sender === "user" ? text : ""); 

  useEffect(() => {
    if (sender === "ai") {
      if(!anim)
      {
        setDisplayedText(""); 
        
      }
      else
      {
        setDisplayedText(text); 
        return;
      }
        let index = 0;

        const interval = setInterval(() => {
          setDisplayedText((prev) => text.slice(0, index + 1)); 
          index++;

          if (index >= text.length) {
            clearInterval(interval);
          }
        }, 10);

        return () => clearInterval(interval);
      }
    
    
  }, [text, sender]);

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.style.height = "auto";
      messageRef.current.style.height = `${messageRef.current.scrollHeight}px`;
    }
  }, [displayedText]);

  return (
    <div className={`flex lg:max-w-[770px] min-w-[200px] md:min-w-[500px] lg:min-w-[800px] flex-col items-${sender === "user" ? "end" : "start"}`}>
      <div className={`flex items-center gap-2 pt-2 ${sender === "ai" ? "justify-start" : "justify-end"}`}>
        {sender === "ai" && (
          <img
            src={image}
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
          className={`p-3 rounded-xl max-w-lg sm:max-w-xl md:max-w-2xl text-mm overflow-hidden ${
            sender === "user"
              ? "bg-[var(--gray-almost-black)] text-[var(--white)] border border-[var(--gray-darker)]"
              : "bg-[var(--page)] text-[var(--white)] border border-[var(--gray-darker)]"
          }`}
          style={{
            whiteSpace: "pre-wrap",
            wordWrap: "break-word",
          }}
        >
          {displayedText}
        </div>
      </div>
      {sender === "user" && (
        <div className="flex justify-end mt-2 gap-4">
          <img src={Copy} alt="Copy icon" className="w-4 h-4 cursor-pointer" />
        </div>
      )}
    </div>
  );
}
