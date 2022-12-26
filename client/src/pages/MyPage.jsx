import React, { useState, useEffect } from 'react';
import { get } from '../utils/api';
import Background from '../components/common/Background';
import Navigators from '../components/common/Navigators';
import UserProfile from '../components/mypage/UserProfile';
import UserBanner from '../components/mypage/UserBanner';
import UserScore from '../components/mypage/UserScore';
import UserInfo from '../components/mypage/UserInfo';

const MyPage = () => {
  const [userData, setUserData] = useState({});

  const fetchData = async () => {
    const data = await get('/api/user');
    setUserData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Background img={'bg3'} className='relative'>
      <Navigators />
      <div className='mx-auto flex justify-between items-center mb-[20px] w-[1000px]'>
        <UserProfile userData={userData} />
        <div>
          <UserBanner userData={userData} />
          <UserScore userData={userData} />
        </div>
      </div>
      <UserInfo userData={userData} />
    </Background>
  );
};

export default MyPage;
