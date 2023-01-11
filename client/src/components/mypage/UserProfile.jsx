import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileWithHat from '../common/ProfileWithHat';

const UserProfile = ({ userData }) => {
  const navigate = useNavigate();

  return (
    <div>
      {userData.profileImg && <ProfileWithHat img={process.env.REACT_APP_SERVER_URL + userData.profileImg} />}
      <div className='pl-[15px]'>
        <h2 className='font-bold text-3xl'>{userData.nickName}</h2>
        <div className='font-medium text-xl mb-[3px]'>{userData.userIntro}</div>
        <button
          onClick={() => navigate('/mypage/edit')}
          className='font-semibold text-white border-4 bg-amber-500 shadow-lg shadow-gray-500/50 my-[10px] px-[15px] py-[5px] rounded-lg'>
          회원정보 수정
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
