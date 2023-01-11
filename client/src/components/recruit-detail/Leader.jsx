import React, { useState } from 'react';
import detective from '../../assets/images/icon/detective.png';
import crown from '../../assets/images/icon/crown.png';
import LevelImage from '../common/LevelImage';
import MannerImage from '../common/MannerImage';
import Profile from '../../modals/UserProfile';
import tw from 'tailwind-styled-components';

const Leader = ({ leaderList }) => {
  const [visible, setVisible] = useState(false);
  const [userData, setUserData] = useState([]);

  return (
    <>
      <Container>
        <div className='flex mx-[10px] mt-[13px] text-lg flex mt-[5px]'>
          <img src={detective} alt='탐정 이모지' className='w-[25px] h-[28px] inline-block pt-[3px]' />
          <span className='pl-[3px] font-semibold mt-[3px]'>{leaderList.matchingCount}</span>
        </div>
        <div className='mt-[23px]'>
          <div className='relative w-[210px] h-[210px] mx-auto'>
            {leaderList.profileImg && (
              <LeaderProfileImg
                onClick={() => {
                  setVisible(true);
                  setUserData(leaderList);
                }}
                src={process.env.REACT_APP_SERVER_URL + leaderList.profileImg}
                alt='프로필 이미지'
                className='cursor-pointer'
              />
            )}
            <Crown src={crown} alt='왕관 이모지' />
          </div>
          <NickName>{leaderList.nickName}</NickName>
          <div className='flex justify-evenly'>
            <Score>
              <span className='absolute w-10 h-10 left-[-23px] top-[-5px]'>
                <LevelImage score={leaderList.escapeScore} size={'100%'} />
              </span>
              <span>{leaderList.escapeScore}</span>
            </Score>
            <Score>
              <span className='absolute w-10 h-10 left-[-23px] top-[-5px]'>
                <MannerImage score={leaderList.mannerScore} size={'100%'} />
              </span>
              <span>{leaderList.mannerScore}</span>
            </Score>
          </div>
        </div>
      </Container>
      {visible && <Profile setVisible={setVisible} userData={userData} />}
    </>
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
  ml-[20px]

  relative
`;
