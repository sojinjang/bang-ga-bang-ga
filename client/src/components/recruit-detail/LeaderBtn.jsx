import React, { useState } from 'react';
import tw from 'tailwind-styled-components';

const LeaderBtn = () => {
  const [isRecruit, setIsRecruit] = useState(true); // 방장 - 모집중인지 확인

  const handleClick = () => {
    setIsRecruit(false);
  };

  return (
    <>
      {isRecruit && (
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
