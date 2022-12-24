import React from 'react';
import hat from '../../assets/images/icon/hat-icon.png';
import tw from 'tailwind-styled-components';

const ProfileWithHat = ({ img, size }) => {
  return (
    <Container>
      <ProfileImg src={img} style={size} alt='프로필 사진' />
      <Hat src={hat} alt='모자' />
    </Container>
  );
};

export default ProfileWithHat;

const Container = tw.div`
  relative
  w-[250px]
  h-[250px]
`;

const ProfileImg = tw.img`
  absolute
  top-0
  left-0
  w-full
  h-full
  rounded-[50%]
  border-4
  border-cyan-500
  object-cover
`;

const Hat = tw.img`
  w-[130px]
  translate-x-[110px]
  translate-y-[-45px]
`;
