import React from 'react';

interface ProfileImageProps {
  name: string;
}

const ProfileImage = ({ name }: ProfileImageProps) => {
  const nameParts = name.split(' ');
  const firstNameInitial = nameParts[0] ? nameParts[0][0] : '';
  const lastNameInitial = nameParts[1] ? nameParts[1][0] : '';

  // Combine initials for the avatar
  const initials = firstNameInitial + lastNameInitial;

  return (
    <span className="user-profile-image">
      {initials}
    </span>
  );
};

export default ProfileImage;
