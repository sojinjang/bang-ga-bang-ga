import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import tw from 'tailwind-styled-components';
import DropdownMenu from './DropdownMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faTableList, faMap, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { get } from '../../utils/api';
import { useEffect } from 'react';
const Navigators = () => {
  const get = async (url) => {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
      },
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.reason);
    }

    const result = await res.json();
    return result;
  };
  const test = async () => {
    console.log('실행됨');

    const res = await get('http://localhost:3008/api/users/user');
    console.log(res);
  };
  useEffect(() => {
    console.log('useEffect');
    test();
  }, []);
  const navigate = useNavigate();
  const loginToken = sessionStorage.getItem('accessToken');

  return (
    <div className='flex w-full'>
      <div className='w-1/3 flex justify-center ml-auto'>
        <NavMenu />
      </div>
      <div className='w-1/3 flex justify-end'>
        <div className='w-1/3 flex justify-center items-center'>
          {loginToken && (
            <span className='bg-black w-4/5 h-9 pl-2 relative rounded-full flex justify-center items-center'>
              <span className='text-white text-xl font-extrabold'>silver</span>
              <span className='absolute w-12 h-12 left-[-18px] top-[-8px]'>
                <img src={`${process.env.PUBLIC_URL}/images/icon/gold-medal.png`} className='w-full h-full' alt='' />
              </span>
            </span>
          )}
        </div>
        <div className='w-1/3 flex justify-center items-center'>
          {loginToken && (
            <span className='bg-black w-4/5 h-9 pl-2 relative rounded-full flex justify-center items-center'>
              <span className='text-white text-xl font-extrabold'>70</span>
              <span className='absolute w-12 h-12 left-[-14px] top-[-12px] text-[42px]'>😊</span>
            </span>
          )}
        </div>
        <div className='w-1/3 flex justify-end'>
          <DropdownMenu />
        </div>
      </div>
    </div>
  );
};

const NavMenu = () => {
  return (
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
  );
};

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

export default Navigators;
