import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { get } from '../utils/api';
import { ApiUrl } from '../constants/ApiUrl';
import Background from '../components/common/Background';
import Navigators from '../components/common/Navigators';
import UserProfile from '../components/mypage/UserProfile';
import UserBanner from '../components/mypage/UserBanner';
import UserScore from '../components/mypage/UserScore';
import UserInfo from '../components/mypage/UserInfo';

const MyPage = () => {
  const [userData, setUserData] = useState({});
  const [matchingList, setMatchingList] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const data = await get(ApiUrl.USER);
      setUserData(data);
    } catch (err) {
      console.error(err);
      alert('로그인 후 이용해주세요.');
      navigate('/');
    }
  };

  // 참가한 모집글 정보
  const recruitData = async () => {
    const data = await get(ApiUrl.RECRUIT_INFO);
    setMatchingList(data);
  };

  useEffect(() => {
    fetchData();
    recruitData();
  }, []);

  return (
    <Background img={'bg3'} className='relative'>
      <Navigators />
      <div className='mx-auto flex justify-between items-center mb-[20px] w-[1000px]'>
        <UserProfile userData={userData} />
        <div>
          <UserBanner matchingList={matchingList} />
          <UserScore userData={userData} />
        </div>
      </div>
      <UserInfo userData={userData} />
    </Background>
  );
};

export default MyPage;
