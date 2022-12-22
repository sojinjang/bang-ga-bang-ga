import React from 'react';
import { useNavigate } from 'react-router-dom';
import Profile from '../common/Profile';

const UserProfile = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Profile></Profile>
      <div className='pl-[15px]'>
        <h2 className='font-bold text-3xl'>탈주각</h2>
        <div className='font-medium text-xl mb-[3px]'>프로 계획러입니다! 지각 노노</div>
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
