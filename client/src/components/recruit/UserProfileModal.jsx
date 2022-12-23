import React, { useState, useRef, useEffect, useCallback } from 'react';
import { showUserProfileModalAtom } from '../../recoil/recruit-list/index';
import { useSetRecoilState } from 'recoil';
import userArray from '../../assets/images/user-profile/profile';

const UserProfileModal = () => {
  const setShowUserProfileModal = useSetRecoilState(showUserProfileModalAtom);

  return (
    <div className='flex p-12 w-[750px] h-[600px] absolute bg-slate-100 rounded-2xl top-[50%] left-[50%] translate-x-[-50%] translate-y-[-30%]'>
      <div className='text-center w-full'>
        <img
          className='mx-auto w-[250px] h-[250px] drop-shadow-xl object-cover rounded-full border-solid border-[0.5px] border-gray-500'
          src={userArray[5]['url']}
          alt='프로필 사진'
        />
        <p>석산리맵찔이</p>
        <p>공포 초고수입니다. 다 덤비십시오.</p>
      </div>
      <div className='w-full p-10 border-solid border-2 border-white'>
        <p className='text-center font-bold text-white'>방가네 식구</p>
        <div>
          <p>매칭 횟수</p>
          <p>8회</p>
        </div>
        <div>
          <p>받은 매너 평가</p>
          <p>6개</p>
        </div>
      </div>
      <button
        className='w-[60px] h-[35px] right-8 bottom-6 bg-gray-400 drop-shadow-lg rounded-lg align-middle absolute '
        onClick={() => setShowUserProfileModal(false)}>
        닫기
      </button>
    </div>
  );
};

export default UserProfileModal;
