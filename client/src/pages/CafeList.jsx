import React from 'react';
import tw from 'tailwind-styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import * as validator from '../utils/validator';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Background from '../components/common/Background';
import Navigators from '../components/common/Navigators';
import { RegionButton } from '../components/buttons/Buttons';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';

const CafeList = () => {
  // const navigate = useNavigate();
  const REGION_DATA = ['전체', '홍대', '강남', '건대'];
  const EXAMPLE_CAFEDATA = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <Background img={'bg2'}>
      <Navigators />
      <ul className='flex flex-row justify-center mx-auto my-5'>
        {REGION_DATA.map((data, index) => (
          <li key={index}>
            <RegionButton title={data} />
          </li>
        ))}
      </ul>
      <div className='border border-blue-500 w-[1200px] h-[550px]'>
        <Menu as='div' className='mx-auto'>
          <div>
            <Menu.Button className=' border w-20 h-20'>정렬하기</Menu.Button>
          </div>

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
                <Menu.Item>
                  <div className='text-sm px-4 py-2 w-full h-full text-gray-700 hover:bg-gray-100 hover:text-black hover:font-semibold'>
                    평점순
                  </div>
                </Menu.Item>
                <Menu.Item>
                  <div className='text-sm px-4 py-2 w-full h-full text-gray-700 hover:bg-gray-100 hover:text-black hover:font-semibold'>
                    리뷰 많은 순
                  </div>
                </Menu.Item>
                <Menu.Item>
                  <div className='text-sm px-4 py-2 w-full h-full text-gray-700 hover:bg-gray-100 hover:text-black hover:font-semibold'>
                    최신순
                  </div>
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
        <div className='border border-red-600 w-[1200px] h-[500px] grid grid-cols-3 grid-rows-3 gap-x-4 gap-y-6'>
          {EXAMPLE_CAFEDATA.map((data, index) => {
            return (
              <div className='border flex justify-center items-center' key={index}>
                <div className='border w-[100px] h-[100px]'>
                  <img></img>
                </div>
                <div className='ml-3'>
                  <p>
                    카페이름 <>네이버</>
                  </p>
                  <p>서울특별시 성동구 연무장 5길</p>
                  <p>www.escape.com</p>
                  <p>평점 4.3/5</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className='border w-[1200px] h-[50px]'>페이지네이션</div>
    </Background>
  );
};

export default CafeList;
