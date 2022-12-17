import React from 'react';
import tw from 'tailwind-styled-components';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { showCelebrateAtom, showRegisterProfileAtom } from '../recoil/register';

const Celebrate = () => {
  const setShowCelebrate = useSetRecoilState(showCelebrateAtom);
  const setShowRegisterProfile = useSetRecoilState(showRegisterProfileAtom);
  const navigate = useNavigate();

  /**skip버튼 클릭시 모달창을 닫고 홈으로 이동해주는 함수 */
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
      <div className='text-3xl mt-auto'>
        <div>방가네 식구가 되신 것을</div>
        <div>환영합니다!🎉🎉</div>
      </div>
      <BtnContainer>
        <button className='bg-gray-200  mx-5 p-4 rounded-[10px]' onClick={onSkipBtn}>
          나중에하기
        </button>
        <button className='bg-[#4A94D7] mx-5 p-4 rounded-[10px]' onClick={onRegisterProfileBtn}>
          프로필 작성하기
        </button>
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
const BtnContainer = tw.div`
  mt-auto mb-[20px] w-full mx-auto flex justify-center
`;

export default Celebrate;
