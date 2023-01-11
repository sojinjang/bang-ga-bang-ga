import React from 'react';
import UserProfileModalInner from '../components/recruit-detail/UserProfileModalInner';
import Profile from '../components/common/Profile';

const UserProfile = ({ setVisible, userData }) => {
  return (
    <div className='flex p-12 w-[760px] h-[600px] absolute bg-slate-300 rounded-2xl top-[33%] left-[50%] translate-x-[-50%] translate-y-[-30%] z-10'>
      <div className='text-center w-full'>
        {userData.profileImg && <Profile img={process.env.REACT_APP_SERVER_URL + userData.profileImg} size={250} />}
        <p className='text-[35px] font-semibold mt-[10px]'>{userData.nickName}</p>
      </div>
      <div className='h-[480px] ml-5 p-4'>
        <div className=' bg-white bg-opacity-50 w-[300px] rounded-[15px] mb-[10px] mx-auto flex items-center'>
          <div className='flex flex-col w-full p-3 items-center'>
            <p>매칭 횟수</p>
            <p>{userData.matchingCount}회</p>
          </div>
        </div>
        <UserProfileModalInner userData={userData} />
      </div>
      <button
        className='w-[60px] h-[35px] right-8 bottom-6 bg-gray-400 drop-shadow-lg rounded-lg align-middle absolute top-[545px]'
        onClick={() => {
          setVisible(false);
        }}>
        닫기
      </button>
    </div>
  );
};

export default UserProfile;
