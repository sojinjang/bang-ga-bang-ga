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
      <div className='mt-[16%]'>회원가입하신 이메일 정보를 입력해주세요</div>
      <EmailInput placeholder='이메일을 입력해주세요' type='email' required />
      <ForgotBtnContainer>
        <ForgotBtn className='bg-gray-200 ml-auto ' onClick={onCancelBtn}>
          취소
        </ForgotBtn>
        <ForgotBtn className='bg-[#4A94D7] ml-2' onClick={onConfirmBtn}>
          임시비밀번호 발급
        </ForgotBtn>
      </ForgotBtnContainer>
    </Modal>
  );
};

const EmailInput = tw.input`
w-full border border-black text-lg rounded-lg pl-2 mt-4 h-12
`;

const Modal = tw.div`
  flex flex-col
  rounded-[30px] h-[35%] w-[30%] 
  absolute top-[28.5%] left-[35%]
  bg-white
  text-xl text-center mx-auto
  px-[1%]
`;
const ForgotBtnContainer = tw.div`
  flex justify-right mt-auto mb-[2%]
`;
const ForgotBtn = tw.button`
  ml-2 px-4 py-2 rounded-[10px]
`;

export default Forgot;
