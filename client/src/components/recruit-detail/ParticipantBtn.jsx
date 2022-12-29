import React, { useState, useEffect } from 'react';
import * as api from '../../utils/api';
import { ApiUrl } from '../../constants/ApiUrl';

const ParticipantBtn = ({
  postId,
  userId,
  participantList,
  isRecruitCompleted,
  memberListData,
  participantNumber,
  totalParticipantNumber,
}) => {
  const [isSignUp, setIsSignUp] = useState(undefined); // user 신청 상태인지 확인

  useEffect(() => {
    const isParticipate = participantList.find((participant) => participant.userId === userId);

    if (isParticipate) {
      setIsSignUp(true);
    } else {
      setIsSignUp(false);
    }
  }, [participantList]);

  const handleClick = () => {
    if (isSignUp) {
      const deleteData = async () => {
        await api.patch(ApiUrl.RECRUIT_INFO, postId);
        memberListData();
      };
      deleteData();
      setIsSignUp(false);
    } else {
      const postData = async () => {
        await api.post(ApiUrl.RECRUIT_INFO, { matchingPostsId: postId });
        memberListData();
      };
      postData();
      setIsSignUp(true);
    }
  };

  return (
    <>
      {!isRecruitCompleted && participantNumber < totalParticipantNumber && (
        <button
          type='submit'
          className='font-bold text-6xl font-bold text-white border-4 bg-[#5F5FAC] hover:bg-[#E24FA9] mt-[30px] ml-[1050px] px-[30px] pt-[15px] pb-[10px] rounded-lg'
          onClick={handleClick}>
          {isSignUp ? '신청 취소!' : '신청 하기!'}
        </button>
      )}
    </>
  );
};

export default ParticipantBtn;
