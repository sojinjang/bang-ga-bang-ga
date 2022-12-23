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

          <PaginationButton />
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
  flex justify-center mt-4
`;

const FilterContainer = tw.div`
  flex flex-col
  flex flex-col
`;

const ListItemContainer = tw.div`
  grid grid-cols-3 grid-rows-2 gap-y-10 w-[1000px] mx-auto justify-items-center relative
`;
