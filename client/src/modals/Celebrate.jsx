import React from 'react';
import tw from 'tailwind-styled-components';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { showCelebrateAtom, showRegisterProfileAtom } from '../recoil/register';

const Celebrate = () => {
  const setShowCelebrate = useSetRecoilState(showCelebrateAtom);
  const setShowRegisterProfile = useSetRecoilState(showRegisterProfileAtom);
  const navigate = useNavigate();

  const onSkipBtn = () => {
    setShowCelebrate(false);
    navigate('/');
  };
  const onRegisterProfileBtn = () => {
    setShowCelebrate(false);
    setShowRegisterProfile(true);
  };

  return (
    <Modal>
      <CelebrateTextBox>
        <div className='mb-4'>가입을 환영합니다!🎉</div>
        <div>프로필도 바로 작성하실까요?</div>
      </CelebrateTextBox>
      <BtnContainer>
        <SkipBtn className='bg-[#EAB30A]' onClick={onSkipBtn}>
          Later
        </SkipBtn>
        <SkipBtn className='bg-[#4A94D7]' onClick={onRegisterProfileBtn}>
          Now!
        </SkipBtn>
      </BtnContainer>
    </Modal>
  );
};

const Modal = tw.div`
  text-black
  mx-auto rounded-[10px] h-[40%] w-[120%] border-4 border-[#E24FA9]
  flex flex-col justify-center items-center
  absolute top-[30%] left-[-10%]
  bg-white
`;
const CelebrateTextBox = tw.div`
  text-2xl mt-auto text-center
  flex flex-col
`;
const BtnContainer = tw.div`
  mt-auto mb-[20px] w-full mx-auto flex justify-center font-semibold 
`;
const SkipBtn = tw.button`
  mx-5 p-3 rounded-full
`;

export default Celebrate;
