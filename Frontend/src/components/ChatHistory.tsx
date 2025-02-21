export default function ChatHistory() {
  return (
    <div className="w-1/6 bg-[var(--gray-black)] p-4 border-r border-[var(--gray-medium-dark)] flex flex-col">
      <h2 className="text-lg font-semibold mb-4 text-[var(--white)]">Chat History</h2>
      <div className="space-y-2">
        <button className="w-full text-left p-2 bg-[var(--gray-darker)] text-[var(--white)] rounded hover:bg-[var(--gray-medium-dark)]">
           Teca
        </button>
        <button className="w-full text-left p-2 bg-[var(--gray-darker)] text-[var(--white)] rounded hover:bg-[var(--gray-medium-dark)]">
          🤖 AI Assistant
        </button>
      </div>
    </div>
  );
}
