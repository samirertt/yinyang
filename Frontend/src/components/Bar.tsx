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
    <div className="relative rounded-xl border border-secondary-200 bg-background-primary transition-colors duration-300 ease-in-out @container/message-input shadow-medium">
        <div className="pointer-events-none absolute left-0 top-0 z-0 h-full w-full"></div>
        <div className="flex w-full flex-col p-4">
            <div dir="ltr" class="relative overflow-hidden mb-2 min-h-10 w-full" style="position: relative; --radix-scroll-area-corner-width: 0px; --radix-scroll-area-corner-height: 0px;">
                <style>
                    [data-radix-scroll-area-viewport] {
                        scrollbars-width: none;
                        -ms-overflow-style: none;
                        -webkit-overflow-scrolling: touch;
                    }
                    [data-radix-scroll-area-viewport]::-webkit-scrollbar {
                        display: none;
                    }
                </style>
                <div data-radix-scroll-area-viewport="" class="h-full w-full rounded-[inherit] [&>div]:!block max-h-[30vh]" style="overflow: hidden scroll;">
                    <div style="min-width: 100%; display: table;">
                        <textarea
                            class="flex w-full rounded-md border-input px-3 py-2 ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-none relative m-0 box-border h-fit min-h-0 resize-none border-0 bg-transparent pl-2 text-base placeholder:text-secondary-400 focus-visible:outline-none focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0 firefox:min-h-16 sm:text-base sm:firefox:min-h-0"
                            rows="1"
                            placeholder="Demander au Chat"
                            style="height: 44px;"
                            data-qb-tmp-id="lt-994826"
                            spellcheck="false"
                            data-gramm="false"
                        ></textarea>
                    </div>
                </div>
            </div>
            <div class="flex w-full max-w-full items-center justify-start gap-4">
                <input multiple accept="image/png,image/gif,image/jpeg,image/jpg,image/webp,application/pdf" class="hidden" type="file" name="file-upload">

                <span>
                    <button
                        class="disabled:pointer-auto gap-2 whitespace-nowrap rounded-2 text-sm font-normal leading-5.5 transition-colors focus-visible:outline-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0 text-button-tertiary-fg hover:text-secondary-900 disabled:text-secondary-300 dark:text-secondary-400 dark:hover:text-secondary-900 m-0 flex h-8 w-8 items-center justify-center rounded-lg bg-background-tertiary p-0"
                        disabled
                        aria-label="Add files"
                        data-state="closed"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-paperclip h-5 w-5 text-icon-primary">
                            <path d="M13.234 20.252 21 12.3"></path>
                            <path d="m16 6-8.414 8.586a2 2 0 0 0 0 2.828 2 2 0 0 0 2.828 0l8.414-8.586a4 4 0 0 0 0-5.656 4 4 0 0 0-5.656 0l-8.415 8.585a6 6 0 1 0 8.486 8.486"></path>
                        </svg>
                    </button>
                </span>
                <button
                    class="disabled:pointer-auto inline-flex items-center justify-center whitespace-nowrap rounded-2 text-sm font-normal leading-5.5 transition-colors focus-visible:outline-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0 hover:text-secondary-900 disabled:text-secondary-300 dark:hover:text-secondary-900 h-8 gap-[unset] rounded-lg bg-background-tertiary px-2.5 py-0 text-icon-secondary dark:text-icon-primary"
                >
                    <div style="opacity: 1; width: 28px;">
                        <div class="px-1">
                            <span class="flex size-5 items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-globe">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                                    <path d="M2 12h20"></path>
                                </svg>
                            </span>
                        </div>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down size-5">
                        <path d="m6 9 6 6 6-6"></path>
                    </svg>
                </button>

                <!-- Send Button -->
                <div class="ml-auto flex gap-2">
                    <button
                        class="disabled:pointer-auto inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2 text-sm font-normal leading-5.5 transition-colors focus-visible:outline-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0 bg-secondary-900 text-white dark:text-secondary-50 size-8 rounded-lg p-0"
                        disabled
                        aria-label="Send question"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" id="a" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" version="1.1" class="-rotate-90">
                            <path fill="currentColor" d="M12 18v4h4v-4h-4ZM16 14v4h4v-4h-4ZM20 10v4h4v-4h-4ZM16 6v4h4V6h-4ZM12 2v4h4V2h-4ZM12 10v4h4v-4h-4ZM8 10v4h4v-4H8ZM4 10v4h4v-4H4ZM0 10v4h4v-4H0Z"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
}


