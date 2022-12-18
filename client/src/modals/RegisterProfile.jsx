import React from 'react';
// import tw from 'tailwind-styled-components';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { showRegisterProfileAtom } from '../recoil/register';
const RegisterProfile = () => {
  //변수 모음
  /**radio type input들의 정보를 담은 변수 */
  const userRadioInputData = [
    { name: '성별', options: ['남자', '여자'] },
    { name: '나이', options: ['10대', '20대', '30대 이상'] },
    { name: '선호 지역', options: ['강남', '건대', '홍대'] },
  ];
  /**select type input들의 정보를 담은 변수 */
  const userSelectInputData = [
    {
      name: 'MBTI',
      options: [
        '선택',
        'ISTJ',
        'ISFJ',
        'INFJ',
        'INTJ',
        'ISTP',
        'ISFP',
        'INFP',
        'INTP',
        'ESTP',
        'ESFP',
        'ENFP',
        'ENTP',
        'ESTJ',
        'ESFJ',
        'ENFJ',
        'ENTJ',
      ],
    },
    {
      name: '선호 테마',
      options: [
        '없음',
        '추리',
        '미스테리',
        '공포',
        '판타지',
        'SF',
        '모험',
        '로맨스',
        '드라마',
        '감성',
        '범죄',
        '스릴러',
        '액션',
        '19금',
      ],
    },
    {
      name: '비선호 테마',
      options: [
        '없음',
        '추리',
        '미스테리',
        '공포',
        '판타지',
        'SF',
        '모험',
        '로맨스',
        '드라마',
        '감성',
        '범죄',
        '스릴러',
        '액션',
        '19금',
      ],
    },
  ];
  const setShowRegisterProfile = useSetRecoilState(showRegisterProfileAtom);

  //함수 모음

  const navigate = useNavigate();
  /**취소버튼 클릭시 모달창을 닫아주는 함수 */
  const onCancelBtn = () => {
    setShowRegisterProfile(false);
  };

  /**완료버튼 클릭시 인풋값들이 올바르게 입력되었는지 체킹하고 올바르면 모달을 닫고 홈화면으로 이동해주는 함수 */
  const onCompleteBtn = () => {
    setShowRegisterProfile(false);
    navigate('/');
  };
  return (
    <div
      className='mx-auto h-[90%] w-[104%] 
      border border-black border-[1px] rounded-[30px]
      flex flex-col 
      absolute 
      left-[-2%]
      bg-[#F2F2F2]
  '>
      <div
        className='mt-[5%] mx-auto w-[120px] h-[120px] rounded-full bg-[#D9D9D9] flex justify-center items-center'
        style={{ backgroundImage: 'url(/images/user-profile/선아.png)', 'background-size': 'cover' }}></div>
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
      <div className='BtnBox w-[90%] mx-auto flex'>
        <div className='ml-auto mt-4'>
          <button className='px-4 py-2 bg-[#E5E5E5] rounded-lg mr-2 shadow-xl' onClick={onCancelBtn}>
            취소
          </button>
          <button className='px-4 py-2 bg-[#BCE3FF] rounded-lg shadow-xl' onClick={onCompleteBtn}>
            완료
          </button>
        </div>
      </div>
    </div>
  );
};

const RadioInputBox = ({ inputData }) => (
  <div className='mx-[5%] w-[90%] h-10 border-b border-black flex'>
    <div className='w-1/5 flex items-center'>{inputData.name}</div>
    <div className='ml-auto w-4/5 flex items-center'>
      {inputData.options.map((option) => (
        <div className='ml-2 text-center' key={inputData.name + option}>
          <label>{option}</label>
          <input type='radio' name={inputData.name} />
        </div>
      ))}
    </div>
  </div>
);

const SelectInputBox = ({ inputData }) => (
  <div className='mx-[5%] w-[90%] h-10 border-b border-black flex'>
    <div className='w-1/5 flex items-center'>{inputData.name}</div>
    <div className='ml-auto w-4/5 flex items-center'>
      <select className='border border-black' name='' id=''>
        {inputData.options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  </div>
);

export default RegisterProfile;
