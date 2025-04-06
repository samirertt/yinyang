import { useState } from "react";
import { Heart } from "lucide-react";
import { MessageCircle } from "lucide-react";

function truncateText(text: string, maxCharsPerLine = 13, maxLines = 4) {
  const maxTotalChars = maxCharsPerLine * maxLines; // 10 * 3 = 30 characters max
  return text.length > maxTotalChars
    ? text.slice(0, maxTotalChars) + "..."
    : text;
}

const CharacterInfo = ({
  img_path,
  name,
  details,
  usage,
  onClick,
}: {
  img_path: string;
  name: string;
  details: string;
  usage: number;
  onClick: () => void;
}) => {
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked((prev) => !prev);
  };

  return (
    <div
      className="relative flex w-70 sm:w-fit  h-30  items-center p-4 rounded-lg bg-[#303030] hover:bg-[#454545] overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      <button
        className={`absolute top-2 right-2 hover:text-red-500 ${
          isLiked ? "text-red-500" : "text-gray-500"
        }`}
        onClick={(e) => {
          e.stopPropagation();
          toggleLike();
        }}
      >
        <Heart size={18} fill={isLiked ? "red " : "none"} />
      </button>

      <img src={img_path} alt={name} className="w-20 h-25 rounded-2xl " />

      <div className="ml-4 flex-1">
        <h2 className="text-sm font-bold mb-1 text-white text-left">{name}</h2>
        <p className="mb-2 text-white text-left text-xs">
          {truncateText(details)}
        </p>
        <span className="text-gray-500 text-xs flex items-center gap-1">
          <MessageCircle size={14} className="text-gray-500" />
          Usage: {usage}
        </span>
      </div>
    </div>
  );
};

export default CharacterInfo;
