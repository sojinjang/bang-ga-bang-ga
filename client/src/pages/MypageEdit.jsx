import React from 'react';
import BackgroundScroll from '../components/common/BackgroundScroll';
import tw from 'tailwind-styled-components';
import Withdraw from '../modals/Withdraw';
import { useState } from 'react';
import Navigators from '../components/common/Navigators';
import UserProfile from '../components/mypageEdit/UserProfile';
import EditProfileIcon from '../components/mypageEdit/EditProfileIcon';
import EditBox from '../components/mypageEdit/EditBox';
import { getCookieValue } from '../utils/cookie';
import { useImmer } from 'use-immer';
import { useEffect } from 'react';
import { patch, get } from '../utils/api';
import { USER_BASIC_DATA } from '../constants/mypageEditUserBasicData';
import { USER_ADD_DATA } from '../constants/mypageEditUserAddData';
const MypageEdit = () => {
  const userId = getCookieValue('userId');
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [showAddProfileIcon, setShowAddProfileIcon] = useState(false);
  const [userBasicData, setUserBasicData] = useImmer({});
  const [userAddData, setUserAddData] = useImmer({});
  const getUserInfo = async () => {
    try {
      const res = await get('/api/user');
      return res;
    } catch (err) {
      console.log(err);
    }
  };
  const loadSavedUserData = async () => {
    const res = await getUserInfo();
    const {
      userName,
      nickName,
      mobileNumber,
      email,
      userIntro,
      gender,
      age,
      preferenceLocation,
      mbti,
      preferenceTheme,
      nonPreferenceTheme,
    } = res;
    setUserBasicData({ userName, nickName, mobileNumber, email });
    setUserAddData({ userIntro, gender, age, preferenceLocation, mbti, preferenceTheme, nonPreferenceTheme });
  };
  useEffect(() => {
    loadSavedUserData();
  }, []);

  const editUserBasicData = async () => {
    try {
      const response = await patch('/api/user', userId, userBasicData);
      console.log(response);
      console.log(userBasicData);
      alert('기본정보가 정상적으로 수정되었습니다');
    } catch (err) {
      alert(err);
    }
  };
  const editUserAddData = async () => {
    try {
      const response = await patch('/api/user', userId, userAddData);
      console.log(response);
      console.log(userAddData);
      alert('추가정보가 정상적으로 수정되었습니다');
    } catch (err) {
      console.log(userAddData);

      alert(err);
    }
  };

  const onSubmitBasicData = async (e) => {
    e.preventDefault();

    editUserBasicData();
  };
  const onSubmitAddData = async (e) => {
    e.preventDefault();
    editUserAddData();
  };

  return (
    <BackgroundScroll img={'bg3'} className='relative'>
      <Navigators />
      <UserProfileContainer>
        <EditProfileIcon showAddProfileIcon={showAddProfileIcon} setShowAddProfileIcon={setShowAddProfileIcon} />
        <UserProfile setShowAddProfileIcon={setShowAddProfileIcon} />
      </UserProfileContainer>
      {showWithdraw && <Withdraw setShowWithdraw={setShowWithdraw} />}
      <EditContainer>
        <EditBox
          title={'기본정보 수정'}
          data={USER_BASIC_DATA}
          setData={setUserBasicData}
          onSubmit={onSubmitBasicData}
          userData={userBasicData}>
          <WithdrawBtn onClick={() => setShowWithdraw(true)}>탈퇴하기</WithdrawBtn>
          <EditBtn type='submit'>변경</EditBtn>
        </EditBox>
        <EditBox
          title={'추가정보 수정'}
          data={USER_ADD_DATA}
          userData={userAddData}
          setData={setUserAddData}
          onSubmit={onSubmitAddData}>
          <EditBtn type='submit'>변경</EditBtn>
        </EditBox>
      </EditContainer>
    </BackgroundScroll>
  );
};

const UserProfileContainer = tw.div`
  h-[15%] justify-center items-center flex flex-col
`;
const EditBtn = tw.button`
  text-gray-500 ml-4 bg-white px-5 py-1 rounded-md shadow-lg
`;
const WithdrawBtn = tw.button`
  text-gray-500 underline hover:text-black
`;
const EditContainer = tw.div`
  h-[80%] w-1/2 flex flex-col mx-auto justify-center items-center
`;

export default MypageEdit;
