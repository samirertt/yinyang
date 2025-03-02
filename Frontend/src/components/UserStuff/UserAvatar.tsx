import { useState } from "react";

const truncateText = (text: string, maxCharsPerLine = 12, maxLines = 3) => {
  const maxTotalChars = maxCharsPerLine * maxLines;
  return text.length > maxTotalChars ? text.slice(0, maxTotalChars) + "..." : text;
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
    <div className="flex flex-col items-start gap-2 px-4 sm:px-6 md:px-9 lg:px-13">
      <div>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300">Welcome back,</p>
      </div>
      <div className="flex flex-row space-x-3 sm:space-x-4 items-center">
        <img
          src={image_path}
          alt={name}
          className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full object-cover bg-white"
        />
        <p
          className="text-lg sm:text-xl text-white mt-1 whitespace-pre-wrap break-words cursor-pointer"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          {truncateText(name)}
        </p>
      </div>

      {showTooltip && (
        <div className="absolute left-1/2 -translate-x-1/2 w-max max-w-xs p-2 bg-gray-900 text-white text-sm sm:text-base rounded shadow-lg z-50">
          {name}
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
