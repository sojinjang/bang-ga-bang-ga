import React from 'react';
import tw from 'tailwind-styled-components';
import Celebrate from '../modals/Celebrate';
import RegisterProfile from '../modals/RegisterProfile';
import { useRecoilState, useRecoilValue } from 'recoil';
import { showCelebrateAtom, showRegisterProfileAtom } from '../recoil/register';

const Register = () => {
  /**유저가 입력해야하는 input들에 대한 정보를 담은  */
  const inputDatas = [
    { name: '이름', placeHolder: '김탈출', type: 'text' },
    { name: '닉네임', placeHolder: '위기탈출넘버원', type: 'text' },
    { name: '휴대전화 번호', placeHolder: '010-1234-5678', type: 'text' },
    { name: '이메일', placeHolder: 'example@escape.elice', type: 'text' },
    { name: '비밀번호', placeHolder: '영문, 숫자, 특수문자 조합 최소 8자', type: 'password' },
    { name: '비밀번호 확인', placeHolder: '비밀번호를 다시 한번 입력해주세요', type: 'password' },
  ];

  const [showCelebrate, setShowCelebrate] = useRecoilState(showCelebrateAtom);
  const showRegisterProfile = useRecoilValue(showRegisterProfileAtom);

  /**ㄷ */
  const onRegisterBtn = () => {
    setShowCelebrate(true);
  };

  return (
    <BackGround style={{ backgroundImage: 'url(/images/backgrounds/bg1.png)' }}>
      <Title>회원가입</Title>
      <InputContainer>
        {showCelebrate && <Celebrate />}
        {showRegisterProfile && <RegisterProfile />}
        <InnnerContainer>
          {inputDatas.map((inputData) => (
            <InputBox key={inputData.name} inputData={inputData} />
          ))}
          <RegisterBtn onClick={onRegisterBtn}>가입하기</RegisterBtn>
        </InnnerContainer>
      </InputContainer>
    </BackGround>
  );
};

const InputBox = ({ inputData }) => {
  return (
    <div className='w-4/5'>
      <div className='mr-auto'>{inputData.name}</div>
      <input
        className='w-full border border-black rounded pl-2 h-10  mb-[3%]'
        type={inputData.type}
        placeholder={inputData.placeHolder}
      />
    </div>
  );
};

const BackGround = tw.div`
  w-screen h-screen flex justify-center items-center flex-col bg-cover
`;
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
const InnnerContainer = tw.div`
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
