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
import jwt_decode from 'jwt-decode';
import { Keys } from '../constants/Keys';
import { setCookie } from '../utils/cookie';
import { ApiUrl } from '../constants/ApiUrl';

const Register = () => {
  const [showCelebrate, setShowCelebrate] = useRecoilState(showCelebrateAtom);
  const showRegisterProfile = useRecoilValue(showRegisterProfileAtom);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useImmer({});
  const [userId, setUserId] = useState('');

  const registerUser = async (email, password) => {
    try {
      const result = await post(ApiUrl.USER, userData);
      setUserId(result.userId);
      setShowCelebrate(true);
      const response = await post(ApiUrl.LOGIN, { email, password });
      const accessToken = response.accessToken;
      const userId = jwt_decode(accessToken).userId;
      setCookie(Keys.LOGIN_TOKEN, accessToken);
      setCookie(Keys.USER_ID, userId);
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmitRegisterBtn = async (e) => {
    e.preventDefault();
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
    registerUser(userData.email, userData.password);
  };

  return (
    <Background img={'bg1'}>
      <Navigators />
      <InputContainer>
        {showCelebrate && <Celebrate />}
        {showRegisterProfile && <RegisterProfile userId={userId} userPWD={userData.password} />}
        <Title>회원가입</Title>
        <InnerContainer>
          <form onSubmit={onSubmitRegisterBtn}>
            {USER_INPUT_DATA.map((inputData) => (
              <InputBox key={inputData.name} inputData={inputData} setUserData={setUserData} />
            ))}
            {error && <p className='text-red-500'>{error}</p>}
            <div className='flex justify-center'>
              <RegisterBtn type='submit'>가입하기</RegisterBtn>
            </div>
          </form>
        </InnerContainer>
      </InputContainer>
    </Background>
  );
};

const InputBox = ({ inputData, setUserData }) => {
  return (
    <div className='w-full h-[60px] mt-1 text-black'>
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
  text-3xl 
  bg-[#3F51A2] 
  text-white 
  w-full
  border-white
  border-[3px]
  rounded-[10px]
  py-[2%]
  flex
  justify-center
  items-center
`;
const InputContainer = tw.div`
pt-[1%]
  text-white
  rounded-[30px] w-[22%] h-[70%] mx-auto mb-[1%]  bg-[#4497D4]   
  border 
  border-[#4497D4] 
  border-[6px] 
  relative
  text-sm
`;
const InnerContainer = tw.div`
  w-[80%] h-[84%] flex flex-col justify-center items-center mx-auto mt-[10%]
`;
const RegisterBtn = tw.button`
 bg-white w-3/4 rounded-[24px]   
 text-2xl
 text-[#3F51A2]
 border 
 border-[#3F51A2]
 border-[6px] 
`;
const RegisterInput = tw.input`
  w-full border border-black rounded pl-2 h-8  mb-[2%]
`;
export default Register;
