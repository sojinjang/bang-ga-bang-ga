import React from 'react';
import detective from '../../assets/images/icon/detective.png';
import tw from 'tailwind-styled-components';

const Leader = ({ leaderList }) => {
  return (
    <Container>
      <Count>
        <img src={detective} alt='탐정 이모지' className='w-[20px] inline-block' />
        <span>{leaderList.count}</span>
      </Count>
      <LeaderProfileImg src={leaderList.profile_img} alt='프로필 이미지' />
      <NickName>{leaderList.nick_name}</NickName>
      <div>
        <Score>{leaderList.escape}</Score>
        <Score>{leaderList.manner}</Score>
      </div>
    </Container>
  );
};

export default Leader;

const Container = tw.div`
  w-[250px]
  h-[400px]
  inline-block
  mx-[20px]
  my-[50px]
  ml-[40px]
  rounded-[15px]
  bg-[#FF5ED2]
  bg-gradient-to-b
  from-[#C04572]
  to-[#F75CC6]
  text-center
`;

const LeaderProfileImg = tw.img`
    w-[180px]
    h-[180px]
    rounded-[50%]
    border-4
    border-cyan-500
    object-cover
    shadow-lg
`;

const Count = tw.span`
  text-lg
`;

const NickName = tw.span`
  text-3xl
  font-bold
  text-white
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
