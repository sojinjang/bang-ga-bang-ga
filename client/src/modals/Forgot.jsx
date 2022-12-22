import React from 'react';
import tw from 'tailwind-styled-components';
import { useSetRecoilState } from 'recoil';
import { showForgotAtom } from '../recoil/login';

const Forgot = () => {
  const showForgot = useSetRecoilState(showForgotAtom);

  const onCancelBtn = () => {
    showForgot(false);
  };
  const onConfirmBtn = (e) => {
    e.preventDefault();
    const correct = confirm('입력한 이메일이 정확한가요?');
    {
      correct && (confirm('입력하신 이메일로 임시 비밀번호가 발급되었습니다.'), showForgot(false));
    }
  };
  return (
    <Modal>
      <div className='text-2xl text-center mx-auto'>
        <div className='mt-[20%]'>회원가입한 이메일 정보를 입력해주세요</div>
        <div>
          <EmailInput placeholder='이메일을 입력해주세요' type='email' required />
        </div>
        <div className='flex justify-right mt-[15%]'>
          <button className='bg-gray-200 ml-auto px-4 py-2 rounded-[10px]' onClick={onCancelBtn}>
            취소
          </button>
          <button className='bg-[#4A94D7] ml-2 px-4 py-2 rounded-[10px]' onClick={onConfirmBtn}>
            확인
          </button>
        </div>
      </div>
    </Modal>
  );
};

const EmailInput = tw.input`
w-full border border-black text-lg rounded-lg pl-2 mt-4 h-12
`;

const Modal = tw.div`
flex
  rounded-[30px] h-[40%] w-[30%] 
  absolute top-[24%] left-[35%]
  bg-white
`;

export default Forgot;
