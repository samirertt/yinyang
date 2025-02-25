import { useState } from "react";
const truncateText = (text: string, maxCharsPerLine = 10, maxLines = 3) => {
  text = "Welcome, " + text;
  const maxTotalChars = maxCharsPerLine * maxLines; // 10 * 3 = 30 characters max
  return text.length > maxTotalChars
    ? text.slice(0, maxTotalChars) + "..."
    : text;
};

const UserAvatar = ({
  name,
  image_path,
}: {
  name: string;
  image_path: string;
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  return (
    <div className="flex flex-col items-start gap-2 pl-6 ">
      <div>
        <p>Welcome back,</p>
      </div>
      <div className="flex flex-row space-x-4">
        <img
          src={image_path}
          alt={name}
          className="w-10 h-10 rounded-full object-cover bg-white"
        />
        <p
          className="text-3xl text-[var(--white)] mt-1 whitespace-pre-wrap break-words cursor-pointer"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          {truncateText(name)}
        </p>
      </div>

      {showTooltip && (
        <div className="absolute left-1/2 -translate-x-1/2 w-max max-w-xs p-2 bg-gray-900 text-white text-sm rounded shadow-lg z-50">
          {name}
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
