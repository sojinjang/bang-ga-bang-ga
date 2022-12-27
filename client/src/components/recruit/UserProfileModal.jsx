import React, { useState, useRef, useEffect, useCallback } from 'react';
import { showUserProfileModalAtom } from '../../recoil/recruit-list/index';
import { useSetRecoilState } from 'recoil';
import userArray from '../../assets/images/user-profile/profile';

import UserScore from '../mypage/UserScore';
import { get } from '../../utils/api';

const UserProfileModal = () => {
  const setShowUserProfileModal = useSetRecoilState(showUserProfileModalAtom);

  const fetchPostInfo = async () => {
    const data = await get('api/matching-situation/post/1');
  };

  return (
    <div className='flex p-12 w-[750px] h-[600px] absolute bg-slate-100 rounded-2xl top-[13%] left-[50%] translate-x-[-50%] translate-y-[-30%]'>
      <div className='text-center w-full'>
        <img
          className='mx-auto w-[250px] h-[250px] drop-shadow-xl object-cover rounded-full border-solid border-[0.5px] border-gray-500'
          src={currentUserData['profileImg']}
          alt='프로필 사진'
        />
        <p className='mt-3'>{currentUserData['role']}</p>
        <p className='text-[35px] font-semibold'>{currentUserData['nickName']}</p>
      </div>
      <div className='h-[480px] ml-5 p-4'>
        <div className=' bg-white bg-opacity-50 rounded-[15px] mb-[30px] flex items-center'>
          <div className='flex flex-col p-3 w-full items-center'>
            <p>매칭 횟수</p>
            <p>{currentUserData['matchingCount']}</p>
          </div>
          <div className='flex align-items h-[50px] border-solid border-l-[1px] border-black'></div>
          <div className='flex flex-col p-3 w-full items-center'>
            <p>받은 매너 평가</p>
            <p>없음</p>
          </div>
        </div>
        <div>
          <section>
            <h3>매너점수💖</h3>
            <Wrapper style={{ whiteSpace: 'nowrap' }}>
              <MannerProgress style={{ width: mannerProgressWith }}>{mannerScore}점😊</MannerProgress>
            </Wrapper>
            <div style={{ paddingLeft: mannerProgressWith - 15 }}>{mannerScore}점</div>
          </section>

          <section>
            <h3>탈출레벨🔑</h3>
            <Wrapper style={{ whiteSpace: 'nowrap' }}>
              <EscapeProgress style={{ width: escapeProgressWith }}>{currentUserData['tier']}🥇</EscapeProgress>
            </Wrapper>
            <div style={{ paddingLeft: escapeProgressWith - 15 }}>{currentUserData['escapeScore']}점</div>
          </section>
        </div>
        <div className='w-[360px] bg-white bg-opacity-50 rounded-[15px] mx-auto flex justify-center items-center '>
          <Container>
            {USER_INFO.map((info) => (
              <Information key={info.name}>
                <Title>{info.name}</Title>
                <Body>{info.value}</Body>
              </Information>
            ))}
          </Container>
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

const Wrapper = tw.div`
  w-[360px]
  bg-gray-200
  rounded-[20px]
`;

const MannerProgress = tw.div`
  w-[490px]
  bg-pink-400
  font-medium
  text-lg
  text-white
  text-center
  p-[3px]
  leading-none
  rounded-[20px]
  shadow-lg
  shadow-pink-500/50
`;

const EscapeProgress = tw.div`
  bg-blue-500
  font-medium
  text-lg
  text-white
  text-center
  p-[3px]
  leading-none
  rounded-[20px]
  shadow-lg
  shadow-blue-500/50
`;

const Container = tw.table`
  w-full
`;

const Information = tw.tr`
  border-b-2
  border-b-slate-300
`;

const Title = tw.th`
  w-[180px]
  p-[4.9px]
  pl-[30px]
  text-start
  font-semibold
`;

const Body = tw.td`
  p-[3px]
`;
