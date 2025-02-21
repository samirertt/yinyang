export default function Typing() {
  return (
    <div className="flex justify-start">
      <div className="p-2 rounded-xl max-w-xl text-sm bg-gray-700 text-gray-300"
      style={{ 
        backgroundColor: "var(--black)", 
        color: "var(--white", 
        border: "1px solid var(--gray-darker)"
      }}>
        <span className="animate-pulse">...</span>
      </div>
    </div>
  );
}
