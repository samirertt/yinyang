import React from "react";

const CharacterAvatar = ({ name, avatar }) => {
  return (
    <div className="flex items-center space-x-2">
      <img src={avatar} alt={name} className="w-8 h-8 rounded-full" />
      <span className="text-gray-300 font-medium">{name}</span>
    </div>
  );
};

export default CharacterAvatar;
