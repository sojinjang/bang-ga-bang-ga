import React from 'react';
import tw from 'tailwind-styled-components';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/common/Footer';
import Navigators from '../components/common/Navigators';
import BackgroundScroll from '../components/common/BackgroundScroll';

const Home = () => {
  const navigate = useNavigate();
  return (
    <BackgroundScroll img={'bg1'}>
      <Navigators />
      <HomeIntro>
        <p className='pb-3'>방가인이 되어보세요!</p>
        <p>방가인이란? 방가방가에서 매칭되어</p>
        <p className='pb-3'>방탈출을 함께 하고 온 유저를 말합니다!</p>
        <p>지금까지 매칭된 횟수는 총 XXX회 입니다.</p>
        <button className='border-white border-solid border-2 mt-16 mb-40' onClick={() => navigate('/recruit-list')}>
          매칭 리스트 보기
        </button>
        <div>
          <button className='border-white border-solid border-2 mx-1' onClick={() => navigate('/login')}>
            로그인
          </button>
          <button className='border-white border-solid border-2' onClick={() => navigate('/register')}>
            회원가입
          </button>
        </div>
      </HomeIntro>
      <div className='h-[400px] w-full'></div>
      <NoticeDiv>
        <p className='text-4xl font-semibold'>NOTICE</p>
        <p className='mt-[20px] mb-[20px]'>아래 내용으로 3번 이상 신고된 계정은 이용이 제한될 수 있습니다.</p>
        <div className='flex flex-row space-x-10'>
          <NoticeCard className='border w-[230px] h-[400px] p-10 flex flex-col items-center'>
            <div className='border w-[150px] h-[150px]'></div>
            <div className='mt-6'>노쇼 금지</div>
            <div className='w-[150px] h-[120px] text-center flex justify-center items-center'>
              매칭된 팀원들과의 약속을 꼭 지켜주세요
            </div>
          </NoticeCard>
          <div className='border w-[230px] h-[400px] p-10 flex flex-col  items-center'>
            <div className='border w-[150px] h-[150px]'></div>
            <div className='mt-6'>지각 금지</div>
            <div className='w-[150px] h-[120px] text-center flex justify-center items-center'>
              원활한 게임 진행을 위해 게임 시작 최소 10분 전에 약속장소에 도착하셔야 합니다
            </div>
          </div>
          <div className='border w-[230px] h-[400px] p-10 flex flex-col  items-center'>
            <div className='border w-[150px] h-[150px]'></div>
            <div className='mt-6'>매너 필수</div>
            <div className='w-[150px] h-[120px] text-center flex justify-center items-center'>
              즐거운 게임을 위해 팀원들에게 매너를 지켜주세요
            </div>
          </div>
        </div>
      </NoticeDiv>
      {/* <Footer /> */}
    </BackgroundScroll>
  );
};

const HomeIntro = tw.div`
  mx-auto
  flex
  flex-col
  justify-center
  items-center
  font-bold
  mt-[40px]
  w-[300px]
  h-[400px] 
  border
`;

const NoticeDiv = tw.div` 
  w-[1300px] 
  h-[550px] 
  mb-[100px] 
  flex 
  flex-col 
  justify-center 
  items-center 
`;

const NoticeCard = tw.div`
  border 
  w-[230px] 
  h-[400px] 
  p-10 
  flex flex-col items-center
`;

export default Home;
