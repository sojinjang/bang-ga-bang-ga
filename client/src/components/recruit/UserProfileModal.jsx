import React, { useState, useEffect } from 'react';
import {
  showUserProfileModalAtom,
  currentPostIdAtom,
  currentUserIndexAtom,
  currentUserDataAtom,
} from '../../recoil/recruit-list/index';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import Profile from '../common/Profile';

import { get } from '../../utils/api';
import { ApiUrl } from '../../constants/ApiUrl';
import UserProfileModalInner from './UserProfileModalInner';

const UserProfileModal = () => {
  const setShowUserProfileModal = useSetRecoilState(showUserProfileModalAtom);
  const currentPostId = useRecoilValue(currentPostIdAtom);
  const currentUserIndex = useRecoilValue(currentUserIndexAtom);
  const [usersData, setUsersData] = useState([]);
  const [currentUserData, setCurrentUserData] = useRecoilState(currentUserDataAtom);

  const { profileImg, role, nickName, matchingCount } = currentUserData;

  const fetchPostInfo = async () => {
    try {
      const data = await get(ApiUrl.RECRUIT_USER_INFO, currentPostId);
      setUsersData(data);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    fetchPostInfo();
  }, []);

  useEffect(() => {
    if (usersData.length > 0) {
      setCurrentUserData(usersData[currentUserIndex]);
    }
  }, [usersData]);

  return (
    <div className='flex p-12 w-[760px] h-[600px] absolute bg-slate-300 rounded-2xl top-[33%] left-[50%] translate-x-[-50%] translate-y-[-30%] z-10'>
      <div className='text-center w-full'>
        {profileImg && <Profile img={process.env.REACT_APP_SERVER_URL + profileImg} size={250} />}
        <p className='mt-3'>{role}</p>
        <p className='text-[35px] font-semibold'>{nickName}</p>
      </div>
      <div className='h-[480px] ml-5 p-4'>
        <div className=' bg-white bg-opacity-50 w-[300px] rounded-[15px] mb-[30px] mx-auto flex items-center'>
          <div className='flex flex-col w-full p-3 items-center'>
            <p>매칭 횟수</p>
            <p>{matchingCount}회</p>
          </div>
        </div>
        <UserProfileModalInner />
      </div>
      <button
        className='w-[60px] h-[35px] right-8 bottom-6 bg-gray-400 drop-shadow-lg rounded-lg align-middle absolute top-[545px]'
        onClick={() => {
          setCurrentUserData({});
          setShowUserProfileModal(false);
        }}>
        닫기
      </button>
    </div>
  );
};

export default UserProfileModal;
