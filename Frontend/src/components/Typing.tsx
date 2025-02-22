export default function Typing() {
  return (
    <div className="flex justify-start">
      <div className="p-2 rounded-xl max-w-xl text-sm "
      style={{ 
        color: "var(--white)", 
      }}>
        <span className="animate-pulse">...</span>
      </div>
    </div>
  );
}
