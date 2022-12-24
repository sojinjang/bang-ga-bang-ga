import React from 'react';
import detective from '../../assets/images/icon/detective.png';
import tw from 'tailwind-styled-components';

const Participant = ({ participantList }) => {
  return (
    <>
      {participantList.map((participant) => (
        <Container key={participant.nick_name}>
          <Count>
            <img src={detective} alt='탐정 이모지' className='w-[20px] h-[23px] inline-block pt-[3px]' />
            <span className='pl-[3px]'>{participant.count}</span>
          </Count>
          <ProfileImg src={participant.profile_img} alt='프로필 이미지' />
          <NickName>{participant.nick_name}</NickName>
          <div>
            <Score>{participant.escape}</Score>
            <Score>{participant.manner}</Score>
          </div>
        </Container>
      ))}
    </>
  );
};

export default Participant;

const Container = tw.div`
  w-[250px]
  h-[350px]
  inline-block
  mx-[20px]
  my-[50px]
  rounded-[15px]
  bg-[#FF5ED2]
  bg-gradient-to-b
  from-[#ff9900]
  to-[#ffc047]
  text-center
`;

const ProfileImg = tw.img`
  w-[160px]
  h-[160px]
  rounded-[50%]
  border-4
  border-cyan-500
  object-cover
  shadow-lg
  mx-auto

`;

const Count = tw.span`
  text-lg
  flex
  ml-[10px]
  mt-[5px]
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
