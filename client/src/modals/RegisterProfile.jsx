import React from 'react';
import tw from 'tailwind-styled-components';
const RegisterProfile = () => {
  const userInputData = [
    { 성별: ['남자', '여자'] },
    { 나이: ['10대', '20대', '30대 이상'] },
    { '선호 지역': ['강남', '건대', '홍대'] },
  ];
  return (
    <div
      className='mx-auto h-[90%] w-[130%] 
      border border-black border-[1px] rounded-[30px]
      flex flex-col 
      absolute 
      left-[-15%]
      bg-[#F2F2F2]
  '>
      <div className='mt-[5%] mx-auto w-[120px] h-[120px] rounded-full bg-[#D9D9D9] flex justify-center items-center'>
        유저 프로필
      </div>
      <div className='mx-auto mt-[1%]'>닉네임</div>
      <div className='mx-auto mt-[1%] w-full text-center'>
        <input className='border rounded-full pl-[5%] w-4/5' type='text' placeholder='한 줄 소개' />
      </div>
    </div>
  );
};

const RadioInputBox = () => <div></div>;

export default RegisterProfile;
