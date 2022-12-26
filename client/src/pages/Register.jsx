import React from 'react';
import tw from 'tailwind-styled-components';
import Celebrate from '../modals/Celebrate';
import RegisterProfile from '../modals/RegisterProfile';
import { useRecoilState, useRecoilValue } from 'recoil';
import { showCelebrateAtom, showRegisterProfileAtom } from '../recoil/register';
import * as validator from '../utils/validator';
import { useState } from 'react';
import Background from '../components/common/Background';
import Navigators from '../components/common/Navigators';
import { post } from '../utils/api';
import { useImmer } from 'use-immer';
import { USER_INPUT_DATA } from '../constants/registerUserInputData';

const Register = () => {
  const [showCelebrate, setShowCelebrate] = useRecoilState(showCelebrateAtom);
  const showRegisterProfile = useRecoilValue(showRegisterProfileAtom);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useImmer({});
  const [userId, setUserId] = useState('');

  const registerUser = async () => {
    try {
      const result = await post('/api/user', userData);
      setUserId(result.userId);
      setShowCelebrate(true);
    } catch (err) {
      console.log(err);
    }
  };
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
    registerUser();
  };

  return (
    <Background img={'bg1'}>
      <Navigators />
      <Title>회원가입</Title>
      <InputContainer>
        {showCelebrate && <Celebrate />}
        {showRegisterProfile && <RegisterProfile userId={userId} />}
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
        <RegisterInput
          type={inputData.type}
          placeholder={inputData.placeHolder}
          onChange={(e) =>
            setUserData((userData) => {
              userData[inputData.info] = e.target.value;
            })
          }
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
const RegisterInput = tw.input`
  w-full border border-black rounded pl-2 h-10  mb-[3%]
`;
export default Register;
