import React from 'react';
import Background from '../components/common/Background';
import Navigators from '../components/common/Navigators';
import UserProfile from '../components/mypage/UserProfile';
import UserBanner from '../components/mypage/UserBanner';
import UserScore from '../components/mypage/UserScore';
import UserInfo from '../components/mypage/UserInfo';

const MyPage = () => {
  return (
    <Background img={'bg3'} className='relative'>
      <Navigators />
      <div className='mx-auto flex justify-between items-center mb-[20px] w-[1000px]'>
        <UserProfile />
        <div>
          <UserBanner />
          <UserScore />
        </div>
      </div>
      <UserInfo />
    </Background>
  );
};

export default MyPage;
