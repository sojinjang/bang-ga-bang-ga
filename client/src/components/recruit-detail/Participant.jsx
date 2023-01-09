import React, { useState } from 'react';
import detective from '../../assets/images/icon/detective.png';
import closeBtn from '../../assets/images/icon/close.png';
import LevelImage from '../common/LevelImage';
import MannerImage from '../common/MannerImage';
import Profile from '../../modals/UserProfile';
import * as api from '../../utils/api';
import { ApiUrl } from '../../constants/ApiUrl';
import tw from 'tailwind-styled-components';

const Participant = ({ isLeader, isRecruitCompleted, participantList, postId, memberListData }) => {
  const [visible, setVisible] = useState(false);
  const [userData, setUserData] = useState([]);

  const deleteData = async (userId) => {
    await api.post(ApiUrl.RECRUIT_LEADER_INFO, { matchingPostsId: postId, userId });
    memberListData();
  };

  const handleKickOut = (participant) => {
    const userId = participant.userId;
    deleteData(userId);
  };

  return (
    <>
      {participantList.map((participant) => (
        <Container key={participant.nickName}>
          <div className='flex justify-between mx-[10px] mt-[5px]'>
            <div className='text-lg flex mt-[5px]'>
              <img src={detective} alt='탐정 이모지' className='w-[25px] h-[28px] inline-block pt-[3px]' />
              <span className='pl-[3px] font-semibold mt-[5px]'>{participant.matchingCount}</span>
            </div>
            {!isRecruitCompleted && isLeader && (
              <button onClick={() => handleKickOut(participant)}>
                <img className='w-5 h-5' src={closeBtn} alt='삭제 버튼' />
              </button>
            )}
          </div>
          {participant.profileImg && (
            <ProfileImg
              onClick={() => {
                setVisible(true);
                setUserData(participant);
              }}
              src={process.env.REACT_APP_SERVER_URL + participant.profileImg}
              alt='프로필 이미지'
              className='cursor-pointer'
            />
          )}
          <NickName>{participant.nickName}</NickName>
          <div className='flex justify-evenly'>
            <Score>
              <span className='absolute w-10 h-10 left-[-23px] top-[-5px]'>
                <LevelImage score={participant.escapeScore} size={'100%'} />
              </span>
              <span>{participant.escapeScore}</span>
            </Score>
            <Score>
              <span className='absolute w-10 h-10 left-[-23px] top-[-5px]'>
                <MannerImage score={participant.mannerScore} size={'100%'} />
              </span>
              <span>{participant.mannerScore}</span>
            </Score>
          </div>
        </Container>
      ))}
      {visible && <Profile setVisible={setVisible} userData={userData} />}
    </>
  );
};

export default Participant;

const Container = tw.div`
  border-slate-100
  border-[3px]
  w-[250px]
  h-[350px]
  inline-block
  mx-[20px]
  
  rounded-[15px]
  bg-gradient-to-b
  from-[#3e7dab]
  to-[#c994c2]

  text-center
`;

const ProfileImg = tw.img`
  w-[180px]
  h-[180px]
  rounded-[50%]
  border-4
  border-[#e9b306]
  object-cover
  shadow-lg
  mx-auto
`;

const NickName = tw.div`
  text-3xl
  font-bold
  text-white
  my-[18px]
`;

const Score = tw.span`
  inline-block
  w-[80px]
  h-[30px]
  rounded-[30px]
  bg-black
  text-white
  text-lg
  ml-[20px]

  relative
`;
