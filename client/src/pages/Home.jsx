import React from 'react';
import tw from 'tailwind-styled-components';
import Footer from '../components/common/Footer';
import Navigators from '../components/common/Navigators';
import BackgroundScroll from '../components/common/BackgroundScroll';
import Notice from '../components/home/Notice';
import { useNavigate, Link } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { getCookieValue, deleteCookie } from '../utils/cookie';
const Home = () => {
  const loginToken = getCookieValue('token');
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

  const divRef = useRef(null);

  let size = 1;
  let direction = 'increase';
  useEffect(() => {
    const btnBeat = setInterval(() => {
      if (direction === 'increase') {
        size *= 1.1;
        direction = 'decrease';
      } else {
        size /= 1.1;
        direction = 'increase';
      }
      divRef.current.style.transform = `scale(${size})`;
      divRef.current.style.transition = `transform 1.5s`;
    }, 700);
    return () => clearInterval(btnBeat);
  }, []);
  const onLogout = () => {
    deleteCookie('token');
    deleteCookie('userId');
    window.location.reload();
  };

  return (
    <BackgroundScroll img={'bg1-long'}>
      <HomeFirstPage>
        <Navigators />
        <MatchingBtnContainer>
          <OuterTrapezoid ref={divRef}>
            <InnerTrapezoid
              onClick={() => {
                navigate('/recruit-list');
              }}>
              <MatchingBtn>모집 리스트 보기!</MatchingBtn>
            </InnerTrapezoid>
          </OuterTrapezoid>
        </MatchingBtnContainer>
        <LoginRegisterContainer>
          {loginToken ? (
            <LoginBtn onClick={onLogout}>로그아웃</LoginBtn>
          ) : (
            <Link to='/login'>
              <LoginBtn>로그인</LoginBtn>
            </Link>
          )}
          {!loginToken && (
            <Link to='/register'>
              <RegisterBtn>회원가입</RegisterBtn>
            </Link>
          )}
        </LoginRegisterContainer>
        <BGMBtnContainer>
          <audio ref={audioRef} src='/sounds/LetsHuntAliens.mp3'></audio>
          <BGMBtn onClick={toggleMusic}>BGM</BGMBtn>
        </BGMBtnContainer>
        <ScrollBtnContainer>
          <ScrollBtn onClick={onScrollDown}>
            이용수칙 안내
            <FontAwesomeIcon icon={faArrowDown} />
          </ScrollBtn>
        </ScrollBtnContainer>
      </HomeFirstPage>
      <HomeSecondPage>
        <ScrollBtnContainer>
          <ScrollBtn onClick={onScrollUp}>
            메인화면으로
            <FontAwesomeIcon icon={faArrowUp} />
          </ScrollBtn>
        </ScrollBtnContainer>
        <Notice />
        <Footer />
      </HomeSecondPage>
    </BackgroundScroll>
  );
};

const HomeFirstPage = tw.div`
  w-full h-[100vh] flex flex-col
`;
const HomeSecondPage = tw.div`
  w-full h-[100vh]
`;
const MatchingBtnContainer = tw.div`
  w-full h-2/5 flex justify-center
`;
const OuterTrapezoid = tw.div`
  w-[660px]
  border-t-[140px] 
  border-t-white
  border-l-[25px] 
  border-r-[25px] 
  border-x-transparent
  mt-[14%]
  relative
`;
const InnerTrapezoid = tw.button`
  w-[640px]
  border-t-[120px] 
  border-t-[#E150A9]
  border-l-[25px] 
  border-r-[25px] 
  border-x-transparent
  text-white
  text-[67px]
  top-[-130px]
  left-[-2.5%]
  absolute
  hover:border-t-white
  hover:text-[#E150A9]
`;
const MatchingBtn = tw.div`
  absolute top-[-110px] left-[45px]
`;
const LoginRegisterContainer = tw.div`
  w-full h-[35%] flex justify-center items-center
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
const BGMBtnContainer = tw.div`
  w-[90%] mx-auto h-[15%] flex justify-end
`;
const BGMBtn = tw.button`
  flex items-center
  h-[50%] my-auto
  px-4 py-2 border-8 rounded-3xl border-white
  text-white text-2xl font-bold ml-4
  bg-[#DBB2E6] hover:text-[#DBB2E6] hover:border-[#DBB2E6] hover:bg-white
`;
const ScrollBtnContainer = tw.div`
  w-full h-[10%] flex justify-end items-center pr-[4%]
`;
const ScrollBtn = tw.button`
  text-white text-xl font-semibold flex justify-end items-center pr-[4%]
  px-4 py-2 border-b-8 rounded-xl border-white
  bg-[#3F51A2] hover:text-[#3F51A2] hover:border-[#3F51A2] hover:bg-white

`;

export default Home;
