import React from 'react';
import BackgroundScroll from '../components/common/BackgroundScroll';
import tw from 'tailwind-styled-components';
import Withdraw from '../modals/Withdraw';
import { useState } from 'react';
import Navigators from '../components/common/Navigators';
import * as validator from '../utils/validator';
import UserProfile from '../components/mypageEdit/UserProfile';
import EditProfileIcon from '../components/mypageEdit/EditProfileIcon';
import EditBox from '../components/mypageEdit/EditBox';
import { getCookieValue } from '../utils/cookie';
import { useImmer } from 'use-immer';
import { useEffect } from 'react';
import { patch, get } from '../utils/api';
import { USER_BASIC_DATA } from '../constants/mypageEditUserBasicData';
import { USER_ADD_DATA } from '../constants/mypageEditUserAddData';
import { useNavigate } from 'react-router-dom';
import { ApiUrl } from '../constants/ApiUrl';
import { useSetRecoilState } from 'recoil';
import { profileImgAtom } from '../recoil/register';

const MypageEdit = () => {
  const userId = getCookieValue('userId');
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      alert('로그인이 필요한 페이지입니다');
      navigate('/');
    }
  }, []);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [showAddProfileIcon, setShowAddProfileIcon] = useState(false);
  const [userBasicData, setUserBasicData] = useImmer({});
  const [userAddData, setUserAddData] = useImmer({});
  const setUserProfile = useSetRecoilState(profileImgAtom);
  const getUserInfo = async () => {
    try {
      const res = await get(ApiUrl.USER);
      return res;
    } catch (err) {
      // alert('잘못된 접근입니다');
      // navigate('/');
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
      profileImg,
    } = res;
    setUserProfile(profileImg);
    setUserBasicData({ userName, nickName, mobileNumber, email });
    setUserAddData({ userIntro, gender, age, preferenceLocation, mbti, preferenceTheme, nonPreferenceTheme });
  };
  useEffect(() => {
    loadSavedUserData();
  }, []);

  const editUserBasicData = async () => {
    if (!validator.isName(userBasicData.userName)) {
      alert('이름은 2~4글자의 한글로 작성해주세요');
      return;
    }
    if (!validator.isNickName(userBasicData.nickName)) {
      alert('닉네임은 3~12자리로 작성해주세요');
      return;
    }
    if (!validator.isPhoneNumber(userBasicData.mobileNumber)) {
      alert('올바른 핸드폰 번호를 입력해주세요');
      return;
    }
    if (!validator.isValidEmail(userBasicData.email)) {
      alert('올바른 이메일 형식을 입력해주세요');
      return;
    }
    if (!validator.isValidPassword(userBasicData.password)) {
      alert('올바른 비밀번호 형식이 아닙니다.');
      return;
    }
    if (userBasicData.password !== userBasicData.pwdConfirm) {
      alert('새 비밀번호가 일치하지 않습니다');
      return;
    }
    try {
      await patch(ApiUrl.USER, userId, userBasicData);
      alert('기본정보가 정상적으로 수정되었습니다');
    } catch (err) {
      alert(err);
    }
  };
  const editUserAddData = async () => {
    try {
      await patch(ApiUrl.USER, userId, userAddData);
      alert('추가정보가 정상적으로 수정되었습니다');
    } catch (err) {
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
    <BackgroundScroll img={'bg3-long'} className='relative'>
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
          <WithdrawBtn type='button' onClick={() => setShowWithdraw(true)}>
            탈퇴하기
          </WithdrawBtn>
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
