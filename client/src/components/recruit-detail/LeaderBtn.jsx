import React from 'react';
import * as api from '../../utils/api';
import { ApiUrl } from '../../constants/ApiUrl';

const LeaderBtn = ({ postId, isRecruitCompleted, setIsRecruitCompleted, leaderList, participantList }) => {
  const data = [{ matchStatus: 1 }];

  const handleClick = () => {
    const recruitDone = async () => {
      await api.patch(ApiUrl.MATCHING_POSTS, postId, data);
    };
    recruitDone();

    // 모집 완료 상태 - matchingCount++
    const members = [leaderList, ...participantList];
    members.forEach((member) => {
      const userId = member.userId;
      const data = async () => {
        await api.post(ApiUrl.USER_MANNER, { userId });
      };
      data();
    });

    setIsRecruitCompleted(true);
  };

  return (
    <>
      {!isRecruitCompleted && (
        <button
          type='submit'
          className='font-bold text-6xl text-white border-4 bg-[#5F5FAC] hover:bg-[#E24FA9] mt-[30px] ml-[1100px] px-[30px] py-[10px] rounded-lg'
          onClick={handleClick}>
          모집 완료!
        </button>
      )}
    </>
  );
};

export default LeaderBtn;
