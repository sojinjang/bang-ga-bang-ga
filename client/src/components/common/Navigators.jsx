import React from 'react';
import { NavLink } from 'react-router-dom';
import tw from 'tailwind-styled-components';
import DropdownMenu from './DropdownMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faTableList, faMap, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { get } from '../../utils/api';
import { useEffect } from 'react';
import { getCookieValue } from '../../utils/cookie';
import { useState } from 'react';
import level1 from '../../assets/images/icon/lv1.png';
import level2 from '../../assets/images/icon/lv2.png';
import level3 from '../../assets/images/icon/lv3.png';
import level4 from '../../assets/images/icon/lv4.png';
import level5 from '../../assets/images/icon/lv5.png';
import mn1 from '../../assets/images/icon/manner1.png';
import mn2 from '../../assets/images/icon/manner2.png';
import mn3 from '../../assets/images/icon/manner3.png';
import mn4 from '../../assets/images/icon/manner4.png';
import mn5 from '../../assets/images/icon/manner5.png';
import { ApiUrl } from '../../constants/ApiUrl';
import { useSetRecoilState } from 'recoil';
import { profileImgAtom } from '../../recoil/register';
const Navigators = () => {
  const setProfileImg = useSetRecoilState(profileImgAtom);
  const [myManner, setMyManner] = useState(null);
  const [myTier, setMyTier] = useState(null);
  const getUserInfo = async () => {
    try {
      const res = await get(ApiUrl.USER);
      const { mannerScore, escapeScore, profileImg } = res;
      setMyManner(mannerScore);
      setMyTier(escapeScore);
      setProfileImg(profileImg);
    } catch (err) {
      console.log(err);
    }
  };
  const loginToken = getCookieValue('token');

  useEffect(() => {
    {
      loginToken && getUserInfo();
    }
  }, []);
  const myMedalImg = (score) => {
    const medalImg = score >= 80 ? level5 : score >= 60 ? level4 : score >= 40 ? level3 : score >= 20 ? level2 : level1;
    return medalImg;
  };
  const myMannerImg = (score) => {
    const mannerImg = score >= 80 ? mn5 : score >= 60 ? mn4 : score >= 40 ? mn3 : score >= 20 ? mn2 : mn1;
    return mannerImg;
  };
  myMedalImg(myTier);
  return (
    <NavContainer>
      <NavMenu />
      {loginToken && (
        <MyStatContainer>
          <MyStat myStat={myTier}>
            <span className='absolute w-12 h-12 left-[-18px] top-[-8px]'>
              <img src={myMedalImg(myTier)} className='w-full h-full' alt='' />
            </span>
          </MyStat>
          <MyStat myStat={myManner}>
            <span className='absolute w-12 h-12 left-[-18px] top-[-8px]'>
              <img src={!myManner ? mn3 : myMannerImg(myManner)} className='w-full h-full' alt='' />
            </span>
          </MyStat>
          <DropdownMenu />
        </MyStatContainer>
      )}
    </NavContainer>
  );
};

const NavMenu = () => {
  return (
    <div className='ml-[33.33%] w-1/3 flex justify-center '>
      <NavbarBg>
        <NavButtonsContainer>
          <NavLink to='/'>
            <NavBtn className='bg-[#62BFDB]'>
              <FontAwesomeIcon icon={faHouse} />
            </NavBtn>
          </NavLink>
          <NavLink to='/recruit-list'>
            <NavBtn className='bg-yellow-500'>
              <FontAwesomeIcon icon={faTableList} />
            </NavBtn>
          </NavLink>
          <NavLink to='/recruit-map'>
            <NavBtn className='bg-[#FF88AF]'>
              <FontAwesomeIcon icon={faMap} />
            </NavBtn>
          </NavLink>
          <NavLink to='/cafelist'>
            <NavBtn className='bg-[#4497D4]'>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </NavBtn>
          </NavLink>
        </NavButtonsContainer>
      </NavbarBg>
    </div>
  );
};

const NavContainer = tw.div`
  flex w-full h-[12vh]
`;

const NavbarBg = tw.div`
  w-[390px]
  border-t-[85px] 
  border-t-[#242229]
  border-l-[25px] 
  border-r-[25px] 
  border-x-transparent
  rounded-b-[3000px]
  flex
  justify-center
  relative
`;

const NavButtonsContainer = tw.div`
  top-[-70px]
  absolute
  flex
`;

const NavBtn = tw.nav`
  text-white border-white border-2 rounded-md w-14 h-12 text-center mx-3
  flex justify-center items-center text-3xl
`;
const MyStatContainer = tw.div`
  w-1/3 flex justify-between
`;

const MyStat = ({ myStat, children }) => {
  return (
    <div className='w-[28%] flex justify-center items-center'>
      <span className='bg-black w-4/5 h-9 pl-2 relative rounded-full flex justify-center items-center'>
        <span className='text-white text-xl font-extrabold'>{myStat}</span>
        {children}
      </span>
    </div>
  );
};

export default Navigators;
