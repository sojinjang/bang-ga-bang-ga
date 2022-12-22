import React from 'react';
import tw from 'tailwind-styled-components';
import Footer from '../components/common/Footer';
import Navigators from '../components/common/Navigators';
import BackgroundScroll from '../components/common/BackgroundScroll';
import { useNavigate, Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  const navigate = useNavigate();
  const onScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };
  const onScrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  const audioRef = useRef(null);
  useEffect(() => {
    if (localStorage.getItem('isMusicPlaying') === 'true') {
      audioRef.current.play();
    }
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('isMusicPlaying', !audioRef.current.paused);
    });
  }, []);

  const toggleMusic = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      localStorage.setItem('isMusicPlaying', true);
    } else {
      audioRef.current.pause();
      localStorage.setItem('isMusicPlaying', false);
    }
  };
  const [scale, setScale] = useState(1);

  useEffect(() => {
    //   const interval = setInterval(() => {
    //     setScale((scale) => scale * 1.1);
    //   }, 700);
    //   const interval2 = setInterval(() => {
    //     setScale((scale) => scale / 1.1);
    //   }, 1400);

    //   return () => clearInterval(interval);
    // }, []);
    const interval = setInterval(() => {
      setScale((scale) => scale * 1.08);
    }, 700);
    const interval2 = setInterval(() => {
      setScale((scale) => scale / (1.08 * 1.08));
    }, 1400);
  }, []);

  return (
    <BackgroundScroll img={'bg1'}>
      <Navigators />
      <div className='w-full h-[46%] '>
        <div className='h-full w-full flex flex-col '>
          <div className='w-full h-2/5 flex justify-center'>
            <MatchingBtnBorder
              style={{
                transform: `scale(${scale})`,
                transition: 'transform 2s',
              }}>
              <MatchingBtn
                onClick={() => {
                  navigate('/login');
                }}>
                <div className='absolute top-[-110px] left-[60px]'>매칭 리스트 보기!</div>
              </MatchingBtn>
            </MatchingBtnBorder>
          </div>
          <div className='w-full h-2/5 flex justify-center items-center'>
            <Link to='/login'>
              <LoginBtn>로그인</LoginBtn>
            </Link>
            <Link to='/register'>
              <RegisterBtn>회원가입</RegisterBtn>
            </Link>
          </div>
          <div className='w-[90%] mx-auto h-[10%] flex justify-end'>
            <audio ref={audioRef} src='/sounds/LetsHuntAliens.mp3'></audio>
            <BGMBtn onClick={toggleMusic}>BGM</BGMBtn>
          </div>
          <div className='h-[10%] flex justify-end items-center pr-[4%]'>
            <ScrollBtn onClick={onScrollDown}>
              이용수칙 안내
              <FontAwesomeIcon icon={faArrowDown} />
            </ScrollBtn>
          </div>
        </div>
      </div>
      <div className='w-full h-[5%] flex justify-end items-center pr-[4%]'>
        <ScrollBtn onClick={onScrollUp}>
          메인화면으로
          <FontAwesomeIcon icon={faArrowUp} />
        </ScrollBtn>
      </div>
      <NoticeDiv>
        <div className='flex w-full'>
          <p className='text-4xl font-semibold mx-auto'>NOTICE</p>
        </div>
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
      <Footer />
    </BackgroundScroll>
  );
};

const NoticeDiv = tw.div` 
  w-[1300px] 
  h-[550px] 
  mb-[160px] 
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

const MatchingBtn = tw.button`
  w-[640px]
  border-t-[120px] 
  border-t-[#E150A9]
  border-l-[25px] 
  border-r-[25px] 
  border-x-transparent
  text-white
  text-[70px]
  top-[-130px]
  left-[-2.5%]
  absolute
  hover:border-t-white
  hover:text-[#E150A9]
`;
const MatchingBtnBorder = tw.div`
  w-[660px]
  border-t-[140px] 
  border-t-white
  border-l-[25px] 
  border-r-[25px] 
  border-x-transparent
  mt-[14%]
  relative
`;

const LoginBtn = tw.button`
  px-4 py-2 border-8 rounded-3xl border-white
  text-white text-2xl font-bold ml-4
  bg-[#3F51A2] hover:text-[#3F51A2] hover:border-[#3F51A2] hover:bg-white
`;
const RegisterBtn = tw.button`
  px-4 py-2 border-8 rounded-3xl border-white
  text-white text-2xl font-bold ml-4
  bg-[#4497D4] hover:text-[#4497D4] hover:border-[#4497D4] hover:bg-white
`;
const BGMBtn = tw.button`
  px-4 py-2 border-8 rounded-3xl border-white
  text-white text-2xl font-bold ml-4
  bg-[#DBB2E6] hover:text-[#DBB2E6] hover:border-[#DBB2E6] hover:bg-white
`;
const ScrollBtn = tw.button`
  text-white text-xl font-semibold flex justify-end items-center pr-[4%]
  px-4 py-2 border-b-8 rounded-xl border-white
  bg-[#3F51A2] hover:text-[#3F51A2] hover:border-[#3F51A2] hover:bg-white

`;
export default Home;
