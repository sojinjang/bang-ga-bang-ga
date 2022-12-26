import React from 'react';
import tw from 'tailwind-styled-components';

const Profile = ({ img, size }) => {
  return <ProfileImg src={img} style={{ width: size, height: size }} alt='프로필 사진' />;
};

export default Profile;

const ProfileImg = tw.img`
  rounded-[50%]
  border-4
  border-cyan-500
  object-cover
  shadow-lg
`;
