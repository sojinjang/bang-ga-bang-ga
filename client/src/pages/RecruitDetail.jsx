import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { get, post, patch, del } from '../utils/api';
import { getCookieValue } from '../utils/cookie';
import Background from '../components/common/Background';
import Navigators from '../components/common/Navigators';
import Leader from '../components/recruit-detail/Leader';
import Participant from '../components/recruit-detail/Participant';
import LeaderBtn from '../components/recruit-detail/LeaderBtn';
import ParticipantBtn from '../components/recruit-detail/ParticipantBtn';
import tw from 'tailwind-styled-components';
import jwt_decode from 'jwt-decode';

const RecruitDetail = () => {
  const params = useParams();
  const postId = params.postId;
  const [isLeader, setIsLeader] = useState(undefined); // user 리더인지 확인
  const [leaderList, setLeaderList] = useState({});
  const [participantList, setParticipantList] = useState([]);

  // userId 가져오기
  const loginToken = getCookieValue('token');
  const userId = jwt_decode(loginToken).userId;
  console.log('내 아이디', userId);

  // 모집글 참가자 명단 가져오기
  const memberListData = async () => {
    const data = await get(`/api/matching-situation/post/${postId}`);
    setLeaderList(data[0]); // 방장 명단은 항상 0번째 위치
    setParticipantList(data.slice(1));

    data[0].userId === userId ? setIsLeader(true) : setIsLeader(false);
  };

  useEffect(() => {
    memberListData();
  }, []);

  return (
    <Background img={'bg2'} className='relative'>
      <Navigators />
      <div style={{ width: '100%', height: '800px', margin: '0 auto' }}>
        <div style={{ whiteSpace: 'nowrap', overflowX: 'auto' }}>
          <>
            {leaderList && <Leader leaderList={leaderList} />}
            {participantList && (
              <Participant
                isLeader={isLeader}
                participantList={participantList}
                postId={postId}
                memberListData={memberListData}
              />
            )}
          </>
        </div>
        {isLeader ? (
          <LeaderBtn />
        ) : (
          <ParticipantBtn
            postId={postId}
            userId={userId}
            participantList={participantList}
            memberListData={memberListData}
          />
        )}
      </div>
    </Background>
  );
};

export default RecruitDetail;
