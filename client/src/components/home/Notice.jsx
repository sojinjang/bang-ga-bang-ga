import React from 'react';
import tw from 'tailwind-styled-components';

const Notice = () => {
  return (
    <NoticeDiv>
      <div className='flex w-full'>
        <p className='text-4xl font-semibold mx-auto'>NOTICE</p>
      </div>
      <p className='mt-[20px] mb-[20px]'>아래 내용으로 3번 이상 신고된 계정은 이용이 제한될 수 있습니다.</p>
      <div className='flex flex-row space-x-10'>
        <NoticeCard>
          <NoticeImg>🙅🏻‍♀️</NoticeImg>
          <div className='mt-6'>노쇼 금지</div>
          <div className='w-[148px] h-[120px] text-center flex justify-center items-center'>
            매칭된 팀원들과의 약속을 꼭 지켜주세요
          </div>
        </NoticeCard>
        <NoticeCard>
          <NoticeImg>🕰️</NoticeImg>
          <div className='mt-6'>지각 금지</div>
          <div className='w-[152px] h-[120px] text-center flex justify-center items-center'>
            원활한 게임 진행을 위해 게임 시작 최소 10분 전에 약속장소에 도착하셔야 합니다
          </div>
        </NoticeCard>
        <NoticeCard>
          <NoticeImg>👼🏻</NoticeImg>
          <div className='mt-6'>매너 필수</div>
          <div className='w-[150px] h-[120px] text-center flex justify-center items-center'>
            즐거운 게임을 위해 매너를 지켜주세요
          </div>
        </NoticeCard>
      </div>
    </NoticeDiv>
  );
};
const NoticeDiv = tw.div` 
  w-full
  h-[70%]
  flex 
  flex-col 
  justify-center 
  items-center 
`;

const NoticeCard = tw.div`
  rounded-[20px]
  bg-[#62BFDB]
  border-[10px] 
  w-[230px] 
  h-[400px] 
  p-10 
  flex flex-col items-center
`;

const NoticeImg = tw.div`
  flex
  justify-center
  items-center
  text-[100px]
  bg-white
  rounded-full
  border w-[150px] h-[150px]
`;

export default Notice;
