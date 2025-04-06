import React from 'react';

interface ProfileImageProps {
  name: string;
}

const ProfileImage = ({ name }: ProfileImageProps) => {
  const nameParts = name.split(' ');
  const firstNameInitial = nameParts[0]?.[0] || '';
  const lastNameInitial = nameParts[1]?.[0] || '';

  const initials = (firstNameInitial + lastNameInitial).toUpperCase();

  return (
    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-600 text-white font-semibold text-sm shadow-md">
      {initials}
    </div>
  );
};

export default ProfileImage;
