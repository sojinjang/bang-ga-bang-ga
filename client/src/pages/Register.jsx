import React from 'react';
import tw from 'tailwind-styled-components';
import Celebrate from '../modals/Celebrate';
import { useNavigate } from 'react-router-dom';
import RegisterProfile from '../modals/RegisterProfile';
import { useRecoilState, useRecoilValue } from 'recoil';
import { showCelebrateAtom, showRegisterProfileAtom } from '../recoil/register';
import * as validator from '../utils/validator';
import { useState } from 'react';
import Background from '../components/common/Background';
import Navigators from '../components/common/Navigators';
import { post } from '../utils/api';
import { useImmer } from 'use-immer';
import { Keys } from '../constants/Keys';
import { getCookieValue } from '../utils/cookie';

const Register = () => {
  const navigate = useNavigate();
  const [showCelebrate, setShowCelebrate] = useRecoilState(showCelebrateAtom);
  const showRegisterProfile = useRecoilValue(showRegisterProfileAtom);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useImmer({});
  const USER_INPUT_DATA = [
    { name: '이름', placeHolder: '김탈출', type: 'text', info: 'userName' },
    { name: '닉네임', placeHolder: '위기탈출넘버원', type: 'text', info: 'nickName' },
    { name: '휴대전화 번호', placeHolder: '010-1234-5678', type: 'text', info: 'mobileNumber' },
    { name: '이메일', placeHolder: 'example@escape.elice', type: 'email', info: 'email' },
    { name: '비밀번호', placeHolder: '영문, 숫자, 특수문자 조합 최소 8자', type: 'password', info: 'password' },
    {
      name: '비밀번호 확인',
      placeHolder: '비밀번호를 다시 한번 입력해주세요',
      type: 'password',
      info: 'pwdConfirm',
    },
  ];

  const onSubmitRegisterBtn = async (e) => {
    e.preventDefault();
    console.log(userData);
    if (!validator.isName(userData.userName)) {
      setError('이름은 2~4글자의 한글로 작성해주세요');
      return;
    }
    if (!validator.isNickName(userData.nickName)) {
      setError('닉네임은 3~12자리로 작성해주세요');
      return;
    }
    if (!validator.isPhoneNumber(userData.mobileNumber)) {
      setError('올바른 핸드폰 번호를 입력해주세요');
      return;
    }
    if (!validator.isValidEmail(userData.email)) {
      setError('올바른 이메일 형식을 입력해주세요');
      return;
    }
    if (!validator.isValidPassword(userData.password)) {
      setError('올바른 비밀번호 형식이 아닙니다.');
      return;
    }
    if (userData.password !== userData.pwdConfirm) {
      setError('비밀번호가 일치하지 않습니다');
      return;
    }
    setError('');
    // const result = post('http://localhost:3008/api/users', userData);
    // console.log(result);
    const res = await fetch('http://localhost:3008/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCookieValue(Keys.LOGIN_TOKEN)}`,
      },
      body: JSON.stringify(userData),
    });
    if (!res.ok) {
      const error = await res.json();
      alert(error.reason);
    } else {
      const result = await res.json();
      console.log(result);
      setShowCelebrate(true);
    }
    //result.success? -> setShowCelebrate(true);
  };

  return (
    <Background img={'bg1'}>
      <Navigators />
      <Title>회원가입</Title>
      <InputContainer>
        {showCelebrate && <Celebrate />}
        {showRegisterProfile && <RegisterProfile />}
        <InnerContainer>
          <form onSubmit={onSubmitRegisterBtn}>
            {USER_INPUT_DATA.map((inputData) => (
              <InputBox key={inputData.name} inputData={inputData} setUserData={setUserData} />
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

const InputBox = ({ inputData, setUserData }) => {
  return (
    <div className='w-full'>
      <label className='mr-auto'>
        {inputData.name}
        <input
          onChange={(e) =>
            setUserData((userData) => {
              userData[inputData.info] = e.target.value;
            })
          }
          className='w-full border border-black rounded pl-2 h-10  mb-[3%]'
          type={inputData.type}
          placeholder={inputData.placeHolder}
        />
      </label>
    </div>
  );
};

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
  rounded-[80px] w-[30%] h-3/4 mx-auto mb-[2%]  bg-gradient-to-r from-cyan-200 to-blue-300   
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
