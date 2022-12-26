import React, { useState, useEffect } from 'react';
// import tw from 'tailwind-styled-components';
import { useImmer } from 'use-immer';
import tw from 'tailwind-styled-components';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, Link } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { showRegisterProfileAtom, showAddProfileIconAtom, profileImgAtom } from '../recoil/register';
import { patch, post } from '../utils/api';
import { Keys } from '../constants/Keys';
import { getCookieValue } from '../utils/cookie';
const RegisterProfile = ({ userId }) => {
  const userRadioInputData = [
    { name: 'gender', options: ['남자', '여자'] },
    { name: 'age', options: ['10대', '20대', '30대 이상'] },
    { name: 'preferenceLocation', options: ['강남', '건대', '홍대'] },
  ];
  const userSelectInputData = [
    {
      name: 'mbti',
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
      name: 'preferenceTheme',
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
      name: 'nonPreferenceTheme',
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
  const [tempProfileImg, setTempProfileImg] = useState(null);
  const [showAddProfileIcon, setShowAddProfileIcon] = useRecoilState(showAddProfileIconAtom);
  const [profileImg, setProfileImg] = useRecoilState(profileImgAtom);
  const [userAddInfo, setUserAddInfo] = useImmer({});

  const handleChange = (e) => {
    setUserAddInfo((userAddInfo) => {
      userAddInfo[e.target.name] = e.target.value;
    });
  };

  const navigate = useNavigate();
  const onCancelBtn = () => {
    const later = confirm('추가정보를 입력하지 않고 가입을 완료하시겠습니까?');
    if (later) {
      alert('가입이 완료되었습니다');
      setShowRegisterProfile(false);
      navigate('/login');
    }
  };
  const addUserAddInfo = async () => {
    try {
      const res = await patch('/api/users', userId, userAddInfo);
      alert('추가정보가 정상적으로 입력되었습니다');
      navigate('/login');
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmitAddData = async () => {
    setShowRegisterProfile(false);
    console.log(userAddInfo);
    const res = await fetch(`http://localhost:3008/api/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCookieValue(Keys.LOGIN_TOKEN)}`,
      },
      body: JSON.stringify(userAddInfo),
    });
    if (!res.ok) {
      const error = await res.json();
      alert(error.reason);
    } else {
      const result = await res.json();
      console.log(result);
      alert('추가정보가 정상적으로 입력되었습니다');
      navigate('/login');
    }
    // addUserAddInfo()
  };

  const onChangeProfileImg = (e) => {
    setTempProfileImg(e.target.files[0]);
  };

  const onSubmitProfileImg = (e) => {
    e.preventDefault();
    setProfileImg(tempProfileImg);
    setShowAddProfileIcon(false);
  };
  const onCancelProfileImg = (e) => {
    e.preventDefault();
    setShowAddProfileIcon(false);
  };

  const modalStyle = {
    content: {
      top: '35%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '26%',
      height: '62%',
      'border-radius': '50px',
      background: '#D0DBF6',
    },
  };

  return (
    <div
      className='mx-auto h-[90%] w-[104%] 
      border border-black rounded-[30px]
      flex flex-col 
      absolute 
      left-[-2%]
      bg-[#F2F2F2]
  '>
      <div className='mt-[5%] mx-auto  flex  relative'>
        <div className='w-[120px] h-[120px] rounded-full bg-gray-300'>
          {profileImg && (
            <img className='w-full h-full rounded-full' src={URL.createObjectURL(profileImg)} alt='uploaded image' />
          )}
        </div>
        <div className='absolute w-10 h-10  top-0 left-[90%]'>
          <button onClick={() => setShowAddProfileIcon(true)}>
            <FontAwesomeIcon icon={faPen} />
          </button>
        </div>
        <Modal style={modalStyle} isOpen={showAddProfileIcon} onRequestClose={() => setShowAddProfileIcon(false)}>
          <h2 className='text-center text-xl'>프로필 사진을 업로드하세요</h2>
          <div className='w-3/4 h-3/4 flex items-center mx-auto'>
            {tempProfileImg ? (
              <img
                className='rounded-full w-full h-3/4'
                src={URL.createObjectURL(tempProfileImg)}
                alt='uploaded image'
              />
            ) : (
              <div className='rounded-full bg-gray-400 w-full h-3/4'></div>
            )}
          </div>
          <form onSubmit={onSubmitProfileImg}>
            <input type='file' onChange={onChangeProfileImg} />
            <div className='w-full flex justify-center mt-4'>
              <EditBtn type='submit'>저장하기</EditBtn>
              <EditBtn onClick={onCancelProfileImg}>취소하기</EditBtn>
            </div>
          </form>
        </Modal>
      </div>
      <div className='mx-auto mt-[1%]'>닉네임</div>

      <form action='post' onSubmit={onSubmitAddData}>
        <div className='mx-auto mt-[1%] w-full text-center'>
          <input
            className='border rounded-full pl-[5%] w-4/5'
            type='text'
            placeholder='한 줄 소개'
            onChange={(e) =>
              setUserAddInfo((userAddInfo) => {
                userAddInfo.userIntro = e.target.value;
              })
            }
          />
        </div>
        {userRadioInputData.map((inputData) => (
          <RadioInputBox inputData={inputData} key={inputData.name} handleChange={handleChange} />
        ))}
        {userSelectInputData.map((inputData) => (
          <SelectInputBox inputData={inputData} key={inputData.name} handleChange={handleChange} />
        ))}
        <BtnBox onCancelBtn={onCancelBtn} />
      </form>
    </div>
  );
};

const RadioInputBox = ({ inputData, handleChange }) => (
  <div className='mx-[5%] w-[90%] h-10 border-b border-black flex'>
    <div className='w-1/5 flex items-center'>{inputData.name}</div>
    <div className='ml-auto w-4/5 flex items-center'>
      {inputData.options.map((option) => (
        <div className='ml-2 text-center' key={inputData.name + option}>
          <label value={option}>{option}</label>
          <input type='radio' name={inputData.name} onChange={handleChange} value={option} />
        </div>
      ))}
    </div>
  </div>
);

const SelectInputBox = ({ inputData, handleChange }) => (
  <div className='mx-[5%] w-[90%] h-10 border-b border-black flex'>
    <div className='w-1/5 flex items-center'>{inputData.name}</div>
    <div className='ml-auto w-4/5 flex items-center'>
      <select className='border border-black' name={inputData.name} onChange={handleChange}>
        {inputData.options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  </div>
);
const BtnBox = ({ onCancelBtn }) => {
  return (
    <div className='BtnBox w-[90%] mx-auto flex'>
      <div className='ml-auto mt-4'>
        <button className='px-4 py-2 bg-[#E5E5E5] rounded-lg mr-2 shadow-xl' onClick={onCancelBtn}>
          취소
        </button>
        <button className='px-4 py-2 bg-[#BCE3FF] rounded-lg shadow-xl' type='submit'>
          완료
        </button>
      </div>
    </div>
  );
};

const EditBtn = tw.button`
  text-gray-500 ml-4 bg-white px-5 py-1 rounded-md shadow-lg
`;
export default RegisterProfile;
