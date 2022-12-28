import React from 'react';
import UserProfile from '../components/mypage/UserProfile';
import UserBanner from '../components/mypage/UserBanner';
import UserScore from '../components/mypage/UserScore';
import UserInfo from '../components/mypage/UserInfo';
import tw from 'tailwind-styled-components';

const MyPage = () => {
  return (
    <div>
      <UserProfile />
      <UserBanner />
      <UserScore />
      <UserInfo />
    </div>
  );
};

export default MyPage;
