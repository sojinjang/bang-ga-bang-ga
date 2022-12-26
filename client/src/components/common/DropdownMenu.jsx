import React from 'react';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import tw from 'tailwind-styled-components';
import { Link } from 'react-router-dom';
import { deleteCookie } from '../../utils/cookie';
import { MENUS } from '../../constants/dropdownMenus';

export default function DropdownMenu() {
  const onLogout = () => {
    deleteCookie('token');
    deleteCookie('userId');
  };

  return (
    <Menu as='div' className='ml-auto'>
      <Menu.Button className='w-20 h-20'>
        <ProfileImg src={process.env.PUBLIC_URL + '/images/user-profile/지현.jpeg'} alt='프로필 사진' />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'>
        <Menu.Items className='absolute right-0 w-28 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
          <div className='py-1'>
            {MENUS.map((menu) => (
              <Menu.Item key={menu.name}>
                <MenuItemDiv>
                  <Link to={menu.link} onClick={menu.name === '로그아웃' && onLogout}>
                    {menu.name}
                  </Link>
                </MenuItemDiv>
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
