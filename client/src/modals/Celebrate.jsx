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
        <div>방가네 식구가 되신 것을 환영합니다!🎉</div>
        <div>바로 프로필을 작성하러 가실까요?</div>
      </CelebrateTextBox>
      <BtnContainer>
        <SkipBtn className='bg-gray-200' onClick={onSkipBtn}>
          나중에 하기
        </SkipBtn>
        <SkipBtn className='bg-[#4A94D7]' onClick={onRegisterProfileBtn}>
          지금 작성하기
        </SkipBtn>
      </BtnContainer>
    </Modal>
  );
};

const Modal = tw.div`
  mx-auto rounded-[60px] h-[40%] w-[110%] border border-[#E24FA9]
  flex flex-col justify-center items-center
  absolute top-[10%] left-[-5%]
  bg-white
`;
const CelebrateTextBox = tw.div`
  text-2xl mt-auto text-center
  flex flex-col
`;
const BtnContainer = tw.div`
  mt-auto mb-[20px] w-full mx-auto flex justify-center
`;
const SkipBtn = tw.button`
  mx-5 p-4 rounded-[10px]
`;

export default Celebrate;
