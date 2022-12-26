import React, { useState, useEffect } from 'react';
import { get, del } from '../utils/api';
import Leader from '../components/recruit-detail/Leader';
import Participant from '../components/recruit-detail/Participant';
import Background from '../components/common/Background';
import Navigators from '../components/common/Navigators';
import member1 from '../assets/images/user-profile/동하.png';
import leader from '../assets/images/user-profile/동현.jpg';
import member2 from '../assets/images/user-profile/선아.png';
import member3 from '../assets/images/user-profile/소진.jpg';
import member4 from '../assets/images/user-profile/승빈.png';
import member5 from '../assets/images/user-profile/재웅.png';
import user from '../assets/images/user-profile/지현.jpeg';
import tw from 'tailwind-styled-components';

const RecruitDetail = () => {
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   const data = get('http://localhost:3008');
  //   setData(data);
  // }, []);

  const LIST = [
    { role: 'leader', nick_name: '돌체프로지망생', count: '20회', manner: 70, escape: 'gold', profile_img: leader },
    { role: 'user', nick_name: '탈주각', count: '3회', manner: 70, escape: 'gold', profile_img: user },
    {
      role: 'member1',
      nick_name: '왕복3시간통학러',
      count: '15회',
      manner: 70,
      escape: 'silver',
      profile_img: member1,
    },
    { role: 'member2', nick_name: '비둘기', count: '20회', manner: 70, escape: 'gold', profile_img: member2 },
    { role: 'member3', nick_name: '다람쥐', count: '20회', manner: 70, escape: 'gold', profile_img: member3 },
    { role: 'member4', nick_name: '거북이', count: '20회', manner: 70, escape: 'gold', profile_img: member4 },
    { role: 'member5', nick_name: '토끼', count: '20회', manner: 70, escape: 'gold', profile_img: member5 },
  ];
  const leaderList = LIST[0];
  const participantList = LIST.slice(1);

  const [isSignUp, setIsSignUp] = useState(true);

  return (
    <Background img={'bg2'} className='relative'>
      <Navigators />
      <div style={{ width: '100%', height: '800px', margin: '0 auto' }}>
        <div style={{ whiteSpace: 'nowrap', overflowX: 'auto' }}>
          <Leader leaderList={leaderList} />
          <Participant participantList={participantList} />
        </div>
        <button
          className='font-bold text-6xl font-bold text-white border-4 bg-[#5F5FAC] my-[10px] px-[30px] py-[10px] rounded-lg'
          onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? '신청 취소!' : '신청 하기!'}
        </button>
      </div>
    </Background>
  );
};

export default RecruitDetail;
