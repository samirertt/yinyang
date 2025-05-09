import { useState, useRef, useEffect } from "react";
import SendIcon from "../assets/SendIcon.svg";
import SpeakIcon from "../assets/SpeakIcon.svg";
import StopIcon from "../assets/StopIcon.svg";

interface InputBarProps {
  sendMessage: (message: string) => void;
}

export default function InputBar({ sendMessage }: InputBarProps) {
  const [message, setMessage] = useState<string>("");
  const [isListening, setIsListening] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<any>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const animationRef = useRef<Animation | null>(null);

  const handleSend = () => {
    if (message.trim() === "") return;
    sendMessage(message);
    setMessage("");
    // Scroll to bottom after sending message
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  };

  const handleVoiceToText = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in your browser.");
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognitionRef.current = recognition;
    setIsListening(true);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setMessage(transcript);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
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

  useEffect(() => {
    if (buttonRef.current) {
      // Clean up any existing animation
      if (animationRef.current) {
        animationRef.current.cancel();
      }

      if (isListening) {
        // Start heartbeat animation
        animationRef.current = buttonRef.current.animate([
          { transform: 'scale(1)', opacity: 1, boxShadow: '0 0 0 0 rgba(239, 68, 68, 0.7)' },
          { transform: 'scale(1.05)', opacity: 0.9, boxShadow: '0 0 0 4px rgba(239, 68, 68, 0.4)' },
          { transform: 'scale(1)', opacity: 1, boxShadow: '0 0 0 8px rgba(239, 68, 68, 0)' }
        ], {
          duration: 1200,
          iterations: Infinity
        });
      }
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.cancel();
      }
    };
  }, [isListening]);

  return (
    <div
      className="fixed bottom-4 p-2 min-h-[60px] max-w-[800px] w-[360px] md:min-w-[500px] lg:min-w-[800px] flex items-center rounded-xl shadow-lg z-5"
      style={{
        backgroundColor: "var(--gray-even-darker)",
        color: "var(--gray-light)",
        border: "1px solid var(--gray-darker)",
      }}
    >
      <textarea
        ref={textareaRef}
        className="flex-1 rounded-xl min-h-[20px] outline-none resize-none overflow-y-auto"
        placeholder="Type a message..."
        style={{
          position: "relative",
          backgroundColor: "var(--Black)",
          color: "var(--white)",
          border: "1px solid var(--gray-even-darker)",
          maxHeight: "80px",
          minHeight: "40px",
          padding: "4px",
          textAlign: "left",
          verticalAlign: "top",
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
          ref={buttonRef}
          onClick={handleVoiceToText}
          className={`p-2 ml-2 cursor-pointer transition-all duration-300 ${
            isListening 
              ? "bg-red-500 rounded-full"
              : "bg-white rounded-full hover:bg-gray-100"
          }`}
          style={{
            border: "1px solid var(--gray-even-darker)",
            transition: "all 0.3s ease",
          }}
          aria-label={isListening ? "Stop recording" : "Start voice recording"}
        >
          <img
            src={isListening ? StopIcon : SpeakIcon}
            alt={isListening ? "Stop Listening" : "Voice Input"}
            className={`w-6 h-6 transition-transform ${
              isListening ? "animate-pulse duration-500" : ""
            }`}
          />
        </button>
      ) : (
        <button
          onClick={handleSend}
          className="p-2 rounded-full ml-2 cursor-pointer bg-white hover:bg-gray-100 transition-colors duration-300"
          style={{
            border: "1px solid var(--gray-even-darker)",
          }}
          aria-label="Send message"
        >
          <img src={SendIcon} alt="Send" className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}