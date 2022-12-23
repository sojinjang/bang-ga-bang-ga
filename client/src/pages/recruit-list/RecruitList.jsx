import React, { useState, useRef, useEffect } from 'react';
import tw from 'tailwind-styled-components';
import {
  showRecruitPostAtom,
  showRecruitModalPageAtom,
  screenLevelAtom,
  showUserProfileModalAtom,
} from '../../recoil/recruit-list/index';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { get } from '../../utils/api';
import RecuitPostContainer from '../../components/recruit/RecruitPostContainer';

import { RegionButton } from '../../components/buttons/Buttons';
import Navigators from '../../components/common/Navigators';
import Background from '../../components/common/Background';

const RecruitList = () => {
  document.title = '방가방가 모집글 리스트';

  const [showRecruitPost, setShowRecruitPost] = useRecoilState(showRecruitPostAtom);
  const setScreenLevel = useSetRecoilState(screenLevelAtom);
  const showUserProfileModal = useRecoilValue(showUserProfileModalAtom);
  const REGION_DATA = ['홍대', '강남', '건대'];

  const [postData, setPostData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  const fetchRecruitData = async (pageNumber) => {
    const data = await get('http://localhost:3008/api/matching-posts', pageNumber);

    setPostData(data);
  };

  useEffect(() => {
    fetchRecruitData(pageNumber);
  }, [pageNumber]);

  const handleResize = () => {
    window.innerHeight < 985 ? setScreenLevel(2) : setScreenLevel(1);
  };

  useEffect(() => {
    window.addEventListener('load', handleResize);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('load', handleResize);
      window.removeEventListener('resize', handleResize);
    };
  });

  return (
    <Background img={'bg1'}>
      <Navigators />
      <div className='w-screen'>
        <MainContainer>
          <div className='flex justify-end'>
            <ul className='flex flex-row justify-center mx-auto'>
              {REGION_DATA.map((data, index) => (
                <li key={index}>
                  <RegionButton title={data} />
                </li>
              ))}
            </ul>
          </div>
          <div className='flex justify-end drop-shadow-xl gap-[50px] mb-3 mr-[10vw]'>
            <FilterContainer>
              <label className='flex mb-1 text-gray-100 justify-around'>
                <input className='required:border-red-500' type='checkbox' />
                모집중만 보기
              </label>
              <div>
                <select className='w-[110px]' name='filter' id=''>
                  <option value=''>--필터링--</option>
                  <option value=''>난이도순</option>
                  <option value=''>활동성순</option>
                  <option value=''>평점순</option>
                  <option value=''>리뷰많은순</option>
                </select>
              </div>
            </FilterContainer>
            <button
              onClick={() => setShowRecruitPost(true)}
              className='h-10 border-solid border-[1px] p-1.5 border-gray-500 bg-white'>
              글쓰기
            </button>
          </div>
          <ListItemContainer>
            {postData.map((post, index) => (
              <RecuitPostContainer postData={post} key={index} />
            ))}
            {showUserProfileModal && (
              <div className='w-[450px] h-[600px] absolute bg-white top-[50%] left-[50%] translate-x-[-50%] translate-y-[-70%]'></div>
            )}
            {showRecruitPost && <Modal />}
          </ListItemContainer>
          <PaginationButton>
            <button
              className='w-[30px] h-[30px] text-sm mx-1 text-white bg-gray-400 border-solid border-[0.5px] rounded border-white'
              onClick={() => {
                pageNumber > 1 ? setPageNumber((prevNumber) => prevNumber - 1) : false;
              }}>
              <svg
                className='mx-auto'
                width='7'
                height='14'
                viewBox='0 0 8 14'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M2.828 6.99999L7.778 11.95L6.364 13.364L0 6.99999L6.364 0.635986L7.778 2.04999L2.828 6.99999Z'
                  fill='white'
                />
              </svg>
            </button>
            <button className='w-[30px] h-[30px] text-sm mx-1 text-white bg-blue-1 border-solid border-[0.5px] rounded border-white'>
              {pageNumber}
            </button>
            <button
              className=' w-[30px] h-[30px] text-sm mx-1 text-white bg-gray-400 border-solid border-[0.5px] rounded border-white'
              onClick={() => setPageNumber((prevNumber) => prevNumber + 1)}>
              <svg
                className='mx-auto'
                width='7'
                height='14'
                viewBox='0 0 8 14'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M5.17168 6.99999L0.22168 2.04999L1.63568 0.635986L7.99968 6.99999L1.63568 13.364L0.22168 11.95L5.17168 6.99999Z'
                  fill='white'
                />
              </svg>
            </button>
          </PaginationButton>
        </MainContainer>
      </div>
    </Background>
  );
};

export default RecruitList;

const MainContainer = tw.div`
mt-10
relative
`;

const PaginationButton = tw.div`
  flex justify-center mt-4
`;

const FilterContainer = tw.div`
  flex flex-col
`;

const ListItemContainer = tw.div`
  grid grid-cols-3 grid-rows-2 gap-y-10 w-[1000px] mx-auto justify-items-center relative
`;
