import React from 'react';
import { NavLink } from 'react-router-dom';
import tw from 'tailwind-styled-components';

const Navigators = () => {
  const customClassName = (str) => {
    return `px-1 py-1 border-2 border-white  text-xs leading-tight rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out + ${str}`;
  };

  return (
    <>
      <NavbarBg />
      <NavButtonsContainer>
        <NavLink
          to='/'
          className={({ isActive }) =>
            isActive
              ? customClassName('bg-skyblue-1 text-red-600 font-extrabold')
              : customClassName('bg-skyblue-1 text-gray-200 font-medium')
          }>
          홈
        </NavLink>
        <NavLink
          to='/recruit-list'
          className={({ isActive }) =>
            isActive
              ? customClassName('bg-yellow-500 text-red-600 font-extrabold')
              : customClassName('bg-yellow-500 text-gray-200 font-medium')
          }>
          모집하기
          <ion-icon name='accessibility-outline'></ion-icon>
        </NavLink>
        <NavLink
          to='/recruit-map'
          className={({ isActive }) =>
            isActive
              ? customClassName('bg-pink-2 text-red-600 font-extrabold')
              : customClassName('bg-pink-2 text-gray-200 font-medium')
          }>
          보러가기
        </NavLink>
        <NavLink
          to='/cafeinfo'
          className={({ isActive }) =>
            isActive
              ? customClassName('bg-skyblue-1 text-red-600 font-extrabold')
              : customClassName('bg-skyblue-1 text-gray-200 font-medium')
          }>
          방탈출 정보
        </NavLink>
      </NavButtonsContainer>
      <ProfileContainer>
        <ProfileImg src={process.env.PUBLIC_URL + '/images/user-profile/지현.jpeg'} alt='프로필 사진' />
      </ProfileContainer>
      <ProfileDropdown>
        <NavLink to='/mypage' className={({ isActive }) => (isActive ? 'font-extrabold' : '')}>
          마이페이지
        </NavLink>
        <NavLink to='/mypage/edit' className={({ isActive }) => (isActive ? 'font-extrabold' : '')}>
          회원정보수정
        </NavLink>
        <NavLink to='/mypage/matching-history' className={({ isActive }) => (isActive ? 'font-extrabold' : '')}>
          매칭이력
        </NavLink>
        <NavLink to='/mypage/' className={({ isActive }) => (isActive ? 'font-extrabold' : '')}>
          내 모집글 관리
        </NavLink>
        <NavLink to='/'>로그아웃</NavLink>
      </ProfileDropdown>
    </>
  );
};

const NavbarBg = tw.div`
  fixed 
  z-10
  top-0
  w-[400px]
  h-[50px]
  border-solid 
  border-t-[50px] 
  border-t-black 
  border-l-8 
  border-r-8 
  border-x-transparent
`;

const NavButtonsContainer = tw.div`
  flex 
  justify-center 
  space-x-3 
  fixed 
  z-10 
  top-3
`;

const ProfileContainer = tw.div`
  fixed
  z-10
  top-4
  w-[40px]
  h-[40px]
  right-8
`;

const ProfileImg = tw.img`
  absolute
  top-0
  left-0
  w-full
  h-full
  rounded-[50%]
  border-2
  border-cyan-500
  object-cover
  shadow-lg
`;

const ProfileDropdown = tw.div`
  bg-white 
  z-10 
  flex 
  flex-col 
  justify-center 
  items-center
  space-y-2 
  w-36 
  h-52 
  fixed 
  top-20 
  right-0 
  rounded-l-lg 
  shadow-lg
`;

export default Navigators;
