import React, { useState, useEffect } from 'react';
import * as api from '../../utils/api';
import { ApiUrl } from '../../constants/ApiUrl';
import tw from 'tailwind-styled-components';

const ParticipantBtn = ({ postId, userId, participantList, isRecruitCompleted, memberListData }) => {
  const [isSignUp, setIsSignUp] = useState(undefined); // user 신청 상태인지 확인

  useEffect(() => {
    const isParticipate = participantList.find((participant) => participant.userId === userId);

    if (isParticipate) {
      // 참가자 명단에 있는 경우 -> 신청 취소 버튼 보이게
      setIsSignUp(true);
    } else {
      // 참가자 명단에 없는 경우 -> 신청 하기 버튼 보이게
      setIsSignUp(false);
    }
    // memberListData();
  }, [participantList]);

  const handleClick = () => {
    if (isSignUp) {
      // 참가 취소
      const deleteData = async () => {
        const data = await api.patch(ApiUrl.RECRUIT_INFO, postId);
        console.log('취소', data);
        memberListData();
      };
      deleteData();
      setIsSignUp(false);
      memberListData();
    } else {
      // 참가 신청
      const postData = async () => {
        const data = await api.post(ApiUrl.RECRUIT_INFO, { matchingPostsId: postId });
        console.log('신청', data);
        memberListData();
      };
      postData();
      setIsSignUp(true);
      memberListData();
    }
  };

  return (
    <>
      {!isRecruitCompleted && (
        <button
          type='submit'
          className='font-bold text-6xl font-bold text-white border-4 bg-[#5F5FAC] hover:bg-[#E24FA9] ml-[1100px] px-[30px] py-[10px] rounded-lg'
          onClick={handleClick}>
          {isSignUp ? '신청 취소!' : '신청 하기!'}
        </button>
      )}
    </>
  );
};

export default ParticipantBtn;
