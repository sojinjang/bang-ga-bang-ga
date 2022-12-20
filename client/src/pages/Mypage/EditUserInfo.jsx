import React from 'react';
import BackgroundScroll from '../../components/common/BackgroundScroll';
import tw from 'tailwind-styled-components';
import Withdraw from '../../modals/Withdraw';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { profileImgAtom } from '../../recoil/register';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';

const EditUserInfo = () => {
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [showAddProfileIcon, setShowAddProfileIcon] = useState(false);

  const modalStyle = {
    content: {
      top: '35%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '20%', // specify desired width
      height: '60%', // specify desired height
    },
  };
  return (
    <BackgroundScroll img={'bg3'}>
      <div className='w-full h-[80%] my-auto relative'>
        {showWithdraw && <Withdraw setShowWithdraw={setShowWithdraw} />}
        <Modal style={modalStyle} isOpen={showAddProfileIcon} onRequestClose={() => setShowAddProfileIcon(false)}>
          <h2>프로필 사진을 업로드하세요</h2>
          <img className='rounded-full' alt='uploaded image' />
          <form>
            <input type='file' />
            <div className='w-full flex justify-between'>
              <button className='ml-auto border border-black' type='submit'>
                저장하기
              </button>
              <button className='ml-2 border border-black'>취소하기</button>
            </div>
          </form>
        </Modal>
        <div className='h-1/3 items-center flex flex-col'>
          <UserProfile setShowAddProfileIcon={setShowAddProfileIcon} />
        </div>
        <div className='flex mx-auto justify-center '>
          <EditBox>
            <EditTitle>기본정보 수정</EditTitle>
            <EditBasicInfo setShowWithdraw={setShowWithdraw} />
          </EditBox>
          <EditBox>
            <EditTitle>추가정보 수정</EditTitle>
            <EditAddInfo />
          </EditBox>
        </div>
      </div>
    </BackgroundScroll>
  );
};

const UserProfile = ({ setShowAddProfileIcon }) => {
  const [profileImg, setProfileImg] = useRecoilState(profileImgAtom);
  return (
    <>
      <div className='w-[120px] h-[120px] rounded-full bg-gray-300 relative'>
        {profileImg && (
          <img className='w-full h-full rounded-full' src={URL.createObjectURL(profileImg)} alt='uploaded image' />
        )}
        <div className='absolute w-10 h-10  top-0 left-[90%]'>
          <button onClick={() => setShowAddProfileIcon(true)}>
            <FontAwesomeIcon icon={faPen} />
          </button>
        </div>
      </div>

      <div>유저닉네임</div>
    </>
  );
};

const EditBasicInfo = ({ setShowWithdraw }) => {
  const EDIT_DATA = [
    { name: '이름', type: 'text', placeholder: '김탈출' },
    { name: '닉네임', type: 'text', placeholder: '위기탈출넘버원' },
    { name: '핸드폰 번호', type: 'text', placeholder: '바꿀 핸드폰 번호를 입력해주세요' },
    { name: '이메일', type: 'text', placeholder: '바꿀 이메일을 입력해주세요' },
    { name: '새 비밀번호', type: 'password', placeholder: '새로운 비밀번호를 입력해주세요' },
    { type: 'password', placeholder: '비밀번호 확인' },
  ];
  return (
    <EditInputContainer>
      <div className='w-4/5 h-[95%] flex flex-col  mx-auto'>
        <div className='my-auto w-full h-[90%] flex flex-col justify-center'>
          {EDIT_DATA.map((data) => (
            <EditInputBox key={data.name} data={data} />
          ))}
          <div className='ml-auto'>
            <button className='text-gray-400 underline hover:text-gray-600' onClick={() => setShowWithdraw(true)}>
              탈퇴하기
            </button>
            <button className='bg-white shadow-md rounded-md px-4 py-1 ml-3 text-gray-500 hover:bg-gray-500 hover:text-white'>
              변경
            </button>
          </div>
        </div>
      </div>
    </EditInputContainer>
  );
};
const EditInputBox = ({ data }) => (
  <div className='flex mb-4'>
    <InputName>{data.name}</InputName>
    <input className='ml-auto w-[75%] rounded-full border pl-2' type={data.type} placeholder={data.placeholder} />
  </div>
);
const EditAddInfo = () => {
  const USER_INPUT_DATA = [
    { name: '성별', options: ['남자', '여자'], type: 'radio' },
    { name: '나이', options: ['10대', '20대', '30대 이상'], type: 'radio' },
    { name: '선호 지역', options: ['강남', '건대', '홍대'], type: 'radio' },
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
      type: 'select',
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
      type: 'select',
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
      type: 'select',
    },
  ];

  return (
    <EditInputContainer>
      {USER_INPUT_DATA.map((inputData) => (
        <InputBox inputData={inputData} key={inputData.name} />
      ))}
      <div className='flex justify-end w-[90%] mt-2'>
        <button className=' bg-white shadow-md rounded-md px-4 py-1 ml-3 text-gray-500 hover:bg-gray-500 hover:text-white'>
          변경
        </button>
      </div>
    </EditInputContainer>
  );
};
const InputBox = ({ inputData, handleChange }) => (
  <div className='mx-[5%] w-[90%] h-10 flex'>
    <InputName>{inputData.name}</InputName>
    <InputValue>
      {inputData.type == 'radio' ? (
        inputData.options.map((option) => (
          <div className='ml-2 text-center' key={inputData.name + option}>
            <label value={option}>{option}</label>
            <input type='radio' name={inputData.name} onChange={handleChange} value={option} />
          </div>
        ))
      ) : (
        <select className='border border-black' name={inputData.name} onChange={handleChange}>
          {inputData.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}
    </InputValue>
  </div>
);

const EditBox = tw.div`
  w-2/5 
`;
const EditTitle = tw.div`
  border-b border-black text-xl w-[90%] mx-auto
`;
const EditInputContainer = tw.div`
  w-4/5 h-full  mx-auto mt-4 rounded-3xl bg-[#f4e3f1] shadow-2xl flex flex-col justify-center
`;
const InputName = tw.div`
  w-1/5 flex items-center
`;
const InputValue = tw.div`
  ml-auto w-4/5 flex items-center text-gray-500
`;

export default EditUserInfo;
