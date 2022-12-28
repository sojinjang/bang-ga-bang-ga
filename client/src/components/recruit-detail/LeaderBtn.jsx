import React, { useState } from 'react';
import * as api from '../../utils/api';
import { ApiUrl } from '../../constants/ApiUrl';

const LeaderBtn = ({ postId, isRecruitCompleted }) => {
  // const [isRecruit, setIsRecruit] = useState(true); // 방장 - 모집중인지 확인
  const data = [{ matchStatus: 1 }];

  const handleClick = () => {
    const recruitDone = async () => {
      await api.patch(ApiUrl.MATCHING_POSTS, postId, data);
    };
    recruitDone();
    // setIsRecruit(false);
  };

  return (
    <>
      {!isRecruitCompleted && (
        <button
          type='submit'
          className='font-bold text-6xl font-bold text-white border-4 bg-[#5F5FAC] hover:bg-[#E24FA9] ml-[1100px] px-[30px] py-[10px] rounded-lg'
          onClick={handleClick}>
          모집 완료!
        </button>
      )}
    </>
  );
};

export default LeaderBtn;
