import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as api from '../utils/api';
import { ApiUrl } from '../constants/ApiUrl';
import { getCookieValue } from '../utils/cookie';
import Background from '../components/common/Background';
import Navigators from '../components/common/Navigators';
import Leader from '../components/recruit-detail/Leader';
import Participant from '../components/recruit-detail/Participant';
import LeaderBtn from '../components/recruit-detail/LeaderBtn';
import ParticipantBtn from '../components/recruit-detail/ParticipantBtn';
import jwt_decode from 'jwt-decode';

const RecruitDetail = () => {
  const params = useParams();
  const postId = params.postId;
  const [isLeader, setIsLeader] = useState(undefined); // user 리더인지 확인
  const [isRecruitCompleted, setIsRecruitCompleted] = useState(undefined);
  const [leaderList, setLeaderList] = useState({});
  const [participantList, setParticipantList] = useState([]);
  const [participantNumber, setParticipantNumber] = useState(1); // 현재 참여 인원
  const [totalParticipantNumber, setTotalParticipantNumber] = useState(1); // 총 모집 인원

  // userId 가져오기
  const loginToken = getCookieValue('token');
  const userId = jwt_decode(loginToken).userId;

  // 모집글 참가자 명단 가져오기
  const memberListData = async () => {
    const data = await api.get(ApiUrl.RECRUIT_USER_INFO, postId);
    const leader = data[0];
    const participant = data.slice(1);

    setLeaderList(leader); // 방장 명단은 항상 0번째 위치
    setParticipantList(participant);

    leader.userId === userId ? setIsLeader(true) : setIsLeader(false);
    leader.matchStatus ? setIsRecruitCompleted(true) : setIsRecruitCompleted(false);
    setTotalParticipantNumber(leader.peopleNum);
    setParticipantNumber(participant.length + 1);
  };

  useEffect(() => {
    memberListData();
  }, []);

  return (
    <Background img={'bg2'} className='relative'>
      <Navigators />
      <div>
        <h3 className='font-bold text-5xl text-white mt-[40px] ml-[50px]'>
          모집 인원 {participantNumber} / {totalParticipantNumber}
        </h3>
        <div style={{ width: '100%' }}>
          <div className='mt-[40px]' style={{ whiteSpace: 'nowrap', overflowX: 'auto' }}>
            {leaderList && <Leader leaderList={leaderList} />}
            {participantList && (
              <Participant
                isLeader={isLeader}
                isRecruitCompleted={isRecruitCompleted}
                participantList={participantList}
                postId={postId}
                memberListData={memberListData}
              />
            )}
          </div>
          {isLeader ? (
            <LeaderBtn
              postId={postId}
              isRecruitCompleted={isRecruitCompleted}
              setIsRecruitCompleted={setIsRecruitCompleted}
              leaderList={leaderList}
              participantList={participantList}
            />
          ) : (
            <ParticipantBtn
              postId={postId}
              userId={userId}
              participantList={participantList}
              isRecruitCompleted={isRecruitCompleted}
              memberListData={memberListData}
              participantNumber={participantNumber}
              totalParticipantNumber={totalParticipantNumber}
            />
          )}
        </div>
      </div>
    </Background>
  );
};

export default RecruitDetail;
