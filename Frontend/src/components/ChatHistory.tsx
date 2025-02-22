import YinYang from "../assets/yinyang.png";

export default function ChatHistory() {
  return (
    <div 
      className="w-full h-full bg-[var(--gray-black)] p-4 border-r border-[var(--gray-medium-dark)] flex flex-col"
      style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}
    >
      <div className="flex items-center gap-2 mb-4">
        <img 
          src={YinYang} 
          alt="AI Avatar" 
          className="w-7 h-7 rounded-xl" 
        />
        <h2 className="text-lg font-semibold text-[var(--white)]">YinYang</h2>
      </div>

      <div className="space-y-2">
        <button className="w-full text-left p-2 bg-[var(--gray-darker)] text-[var(--white)] rounded hover:bg-[var(--gray-medium-dark)]">
          Teca
        </button>
        <button className="w-full text-left p-2 bg-[var(--gray-darker)] text-[var(--white)] rounded hover:bg-[var(--gray-medium-dark)]">
          AI Assistant
        </button>
      </div>
    </div>
  );
}