import React from 'react';
import Profile from '../common/Profile';
import tw from 'tailwind-styled-components';

const UserProfile = () => {
  return (
    <div>
      <Profile></Profile>
      <UserName>탈주각</UserName>
      <div>프로 계획러입니다! 지각 노노</div>
    </div>
  );
};

export default UserProfile;

const UserName = tw.div`
  text-2xl
`;
