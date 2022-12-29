import React from 'react';
import detective from '../../assets/images/icon/detective.png';
import crown from '../../assets/images/icon/crown.png';
import tw from 'tailwind-styled-components';

const Leader = ({ leaderList }) => {
  return (
    <Container>
      <div className='flex mx-[10px] mt-[13px] text-lg flex mt-[5px]'>
        <img src={detective} alt='탐정 이모지' className='w-[25px] h-[28px] inline-block pt-[3px]' />
        <span className='pl-[3px] font-semibold mt-[3px]'>{leaderList.matchingCount}</span>
      </div>
      <div className='relative w-[210px] h-[210px] mx-auto'>
        <LeaderProfileImg src={crown} alt='프로필 사진' />
        <Crown src={crown} alt='왕관 이모지' />
      </div>
      <NickName>{leaderList.nickName}</NickName>
      <div className='flex justify-between mx-[40px]'>
        <Score>{leaderList.escapeScore}</Score>
        <Score>{leaderList.mannerScore}</Score>
      </div>
    </Container>
  );
};

export default Leader;

const LeaderProfileImg = tw.img`

  absolute
  top-0
  left-0
  w-full
  h-full
  rounded-[50%]
  border-4
  border-cyan-500
  object-cover


  w-[210px]
  rounded-[50%]
  border-4
  border-[#63bfdb]
  object-cover
  shadow-lg

`;

const Crown = tw.img`
  w-[80px]
  translate-x-[65px]
  translate-y-[-70px]
`;

const Container = tw.div`
  border-slate-100
  border-[3px]
  w-[260px]
  h-[400px]
  inline-block
  mx-[20px]
  ml-[40px]
  rounded-[15px]
  bg-[#FF5ED2]
  bg-gradient-to-b
  from-[#C04572]
  to-[#ffe696]

  text-center
`;

const NickName = tw.div`
  text-[32px]
  font-bold
  text-white
  my-[10px]
`;

const Score = tw.span`
  inline-block
  w-[70px]
  h-[30px]
  rounded-[30px]
  bg-black
  text-white
  text-lg
`;
