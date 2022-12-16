import React from 'react';
import tw from 'tailwind-styled-components';
const RegisterProfile = () => {
  const userRadioInputData = [
    { name: '성별', options: ['남자', '여자'] },
    { name: '나이', options: ['10대', '20대', '30대 이상'] },
    { name: '선호 지역', options: ['강남', '건대', '홍대'] },
  ];
  const userSelectInputData = [
    { name: 'MBTI', options: ['남자', '여자'] },
    { name: '선호 테마', options: ['10대', '20대', '30대 이상'] },
    { name: '비선호 테마', options: ['강남', '건대', '홍대'] },
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
      {userRadioInputData.map((inputData) => (
        <RadioInputBox inputData={inputData} key={inputData.name} />
      ))}
      {userSelectInputData.map((inputData) => (
        <SelectInputBox inputData={inputData} key={inputData.name} />
      ))}
    </div>
  );
};

const RadioInputBox = ({ inputData }) => (
  <div className='mx-[5%] w-[90%] h-10 border-b border-black flex'>
    <div className='w-1/5'>{inputData.name}</div>
    <div className='ml-auto w-4/5 flex'>
      {inputData.options.map((option) => (
        <div className='ml-2' key={inputData.name + option}>
          <label>{option}</label>
          <input type='radio' />
        </div>
      ))}
    </div>
  </div>
);

const SelectInputBox = () => {};

export default RegisterProfile;
