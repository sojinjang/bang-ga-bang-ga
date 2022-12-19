import React from 'react';
import tw from 'tailwind-styled-components';
import Celebrate from '../modals/Celebrate';
import RegisterProfile from '../modals/RegisterProfile';
import { useRecoilState, useRecoilValue } from 'recoil';
import { showCelebrateAtom, showRegisterProfileAtom } from '../recoil/register';
import * as validator from '../utils/validator';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Background from '../components/common/Background';

const Register = () => {
  const [showCelebrate, setShowCelebrate] = useRecoilState(showCelebrateAtom);
  const showRegisterProfile = useRecoilValue(showRegisterProfileAtom);
  const [userName, setUserName] = useState(null);
  const [userNickname, setUserNickName] = useState('');
  const [userPhoneNum, setUserPhoneNum] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userPWD, setUserPWD] = useState(null);
  const [userPWDConfirm, setUserPWDConfirm] = useState(null);
  const [error, setError] = useState(null);
  const USER_INPUT_DATA = [
    { name: '이름', placeHolder: '김탈출', type: 'text', setState: setUserName },
    { name: '닉네임', placeHolder: '위기탈출넘버원', type: 'text', setState: setUserNickName },
    { name: '휴대전화 번호', placeHolder: '010-1234-5678', type: 'text', setState: setUserPhoneNum },
    { name: '이메일', placeHolder: 'example@escape.elice', type: 'email', setState: setUserEmail },
    { name: '비밀번호', placeHolder: '영문, 숫자, 특수문자 조합 최소 8자', type: 'password', setState: setUserPWD },
    {
      name: '비밀번호 확인',
      placeHolder: '비밀번호를 다시 한번 입력해주세요',
      type: 'password',
      setState: setUserPWDConfirm,
    },
  ];

  const navigate = useNavigate();

  const onSubmitRegisterBtn = async (e) => {
    e.preventDefault();

    if (!validator.isName(userName)) {
      setError('이름은 2~4글자의 한글로 작성해주세요');
      return;
    }
    if (!validator.isNickName(userNickname)) {
      setError('닉네임은 3~12자리로 작성해주세요');
      return;
    }
    if (!validator.isPhoneNumber(userPhoneNum)) {
      setError('올바른 핸드폰 번호를 입력해주세요');
      return;
    }
    if (!validator.isValidEmail(userEmail)) {
      setError('올바른 이메일 형식을 입력해주세요');
      return;
    }
    if (!validator.isValidPassword(userPWD)) {
      setError('올바른 비밀번호 형식이 아닙니다.');
      return;
    }
    if (userPWD !== userPWDConfirm) {
      setError('비밀번호가 일치하지 않습니다');
      return;
    }
    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName, userNickname, userPhoneNum, userEmail, userPWD, userPWDConfirm }),
      });
      const result = await response.json();
      if (result.success) {
        //성공했을때 처리
      } else {
        setError(response.error);
      }
    } catch (error) {
      setError('회원가입을 시도하는 중 에러가 발생했습니다');
      console.error(error);
    }

    //memo: 나중에 성공했을 때만 보여주도록 위치를 바꿔야하는 코드
    setShowCelebrate(true);
  };

  return (
    <Background img={'bg1'}>
      <Title>회원가입</Title>
      <InputContainer>
        {showCelebrate && <Celebrate />}
        {showRegisterProfile && <RegisterProfile />}
        <InnerContainer>
          <form onSubmit={onSubmitRegisterBtn}>
            {USER_INPUT_DATA.map((inputData) => (
              <InputBox key={inputData.name} inputData={inputData} setState={inputData.setState} />
            ))}
            {error && <p className='text-red-500'>{error}</p>}
            <RegisterBtn type='submit'>가입하기</RegisterBtn>
            <RegisterBtn onClick={() => setShowCelebrate(true)} type='submit'>
              가입완료(임시)
            </RegisterBtn>
          </form>
        </InnerContainer>
      </InputContainer>
    </Background>
  );
};

const InputBox = ({ inputData }) => {
  return (
    <div className='w-full'>
      <label className='mr-auto'>
        {inputData.name}
        <input
          onChange={(e) => inputData.setState(e.target.value)}
          // required
          className='w-full border border-black rounded pl-2 h-10  mb-[3%]'
          type={inputData.type}
          placeholder={inputData.placeHolder}
        />
      </label>
    </div>
  );
};

// const BackGround = tw.div`
//   w-screen h-screen flex justify-center items-center flex-col bg-cover
// `;
const Title = tw.div`
  mx-auto 
  mt-auto 
  mb-4 
  text-3xl 
  bg-[#3F51A2] 
  text-white 
  border 
  border-white 
  border-[6px] 
  rounded-[24px]
  w-[150px]
  h-[60px]
  flex
  justify-center
  items-center
`;
const InputContainer = tw.div`
  rounded-[80px] w-[30%] h-4/5 mx-auto mb-auto bg-gradient-to-r from-cyan-200 to-blue-300   
  border 
  border-[#4497D4] 
  border-[6px] 
  relative
`;
const InnerContainer = tw.div`
  w-[80%] h-[84%] flex flex-col justify-center items-center mx-auto mt-[10%]
`;
const RegisterBtn = tw.button`
 bg-white w-1/2 mt-auto rounded-[24px]   
 text-2xl
 text-[#3F51A2]
 border 
 border-[#3F51A2]
 border-[6px] 
`;
export default Register;
