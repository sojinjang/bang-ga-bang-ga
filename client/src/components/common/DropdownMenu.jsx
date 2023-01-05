import React from 'react';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import tw from 'tailwind-styled-components';
import { Link } from 'react-router-dom';
import { deleteCookie } from '../../utils/cookie';
import { MENUS } from '../../constants/dropdownMenus';
import { useRecoilValue } from 'recoil';
import { profileImgAtom } from '../../recoil/register';
export default function DropdownMenu() {
  const profileImg = useRecoilValue(profileImgAtom);
  const onLogout = () => {
    deleteCookie('token');
    deleteCookie('userId');
  };

  return (
    <Menu as='div' className='w-1/3 flex justify-end'>
      <Menu.Button className='w-20 h-20'>
        {profileImg && <ProfileImg src={process.env.REACT_APP_SERVER_URL + profileImg} alt='프로필 사진' />}
      </Menu.Button>
      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'>
        <Menu.Items className='z-20 absolute right-0 w-29 mt-20  origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
          <div className='py-1'>
            {MENUS.map((menu) => (
              <Menu.Item key={menu.name}>
                <Link to={menu.link} onClick={menu.name === '로그아웃' && onLogout}>
                  <MenuItemDiv>{menu.name}</MenuItemDiv>
                </Link>
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
const MenuItemDiv = tw.div`
  text-sm px-4 py-2 w-full h-full text-gray-700 hover:bg-gray-100 hover:text-black hover:font-semibold
`;

const ProfileImg = tw.img`
  w-14
  h-14
  bg-gray-300
  rounded-[50%]
  border-2
  border-cyan-500
  object-cover
  shadow-lg
`;
