import React, { useState, useEffect } from 'react';
import tw from 'tailwind-styled-components';
import {
  showRecruitPostAtom,
  maxPageNumAtom,
  showUserProfileModalAtom,
  currentPageAtom,
  currentRegionAtom,
} from '../recoil/recruit-list/index';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { get } from '../utils/api';

import RecuitPostContainer from '../components/recruit/RecruitPostContainer';
import PostModal from '../components/recruit/PostModal';
import PaginationButton from '../components/recruit/PageinationButton';
import UserProfileModal from '../components/recruit/UserProfileModal';
import { ListRegionButton } from '../components/buttons/Buttons';
import Navigators from '../components/common/Navigators';
import Background from '../components/common/Background';
import { ApiUrl } from '../constants/ApiUrl';

const RecruitList = () => {
  document.title = '방가방가 모집글 리스트';

  const [showRecruitPost, setShowRecruitPost] = useRecoilState(showRecruitPostAtom);
  const [currentRegion, setCurrentRegion] = useRecoilState(currentRegionAtom);
  const setMaxPageNum = useSetRecoilState(maxPageNumAtom);
  const showUserProfileModal = useRecoilValue(showUserProfileModalAtom);
  const currentPage = useRecoilValue(currentPageAtom);
  const REGION_DATA = ['전체', '홍대', '강남', '건대'];

  const [fetchedData, setFetchedData] = useState([]);
  const [checkRecruitingPost, setCheckRecruitingPost] = useState(false);
  const [slicedDataArray, setSlicedDataArray] = useState([]);
  const [currentPageData, setCurrentPageData] = useState([]);

  useEffect(() => {
    if (currentRegion === '전체') {
      const fetchRecruitData = (async () => {
        const data = await get(ApiUrl.MATCHING_POSTS);

        setFetchedData(data);
      })();
    } else {
      const fetchRecruitData = (async () => {
        const data = await get(ApiUrl.MATCHING_POSTS, currentRegion);

        setFetchedData(data);
      })();
    }
  }, [currentRegion]);

  useEffect(() => {
    const dataLength = fetchedData.length;
    let dataArray = [];

    for (let i = 0; i < dataLength; i += 6) {
      dataArray.push(fetchedData.slice(i, i + 6));
    }

    if (dataArray.length > 0) {
      setSlicedDataArray(dataArray);
      setMaxPageNum(dataArray.length - 1);
    }
  }, [fetchedData]);

  useEffect(() => {
    if (slicedDataArray.length > 1) {
      setCurrentPageData(slicedDataArray[currentPage]);
    } else if (slicedDataArray.length === 1) {
      setCurrentPageData(slicedDataArray[0]);
    }
  }, [slicedDataArray]);

  useEffect(() => {
    if (slicedDataArray.length > 0) {
      setCurrentPageData(slicedDataArray[currentPage]);
    }
  }, [currentPage]);

  return (
    <Background img={'bg1'}>
      <Navigators />
      <div className='w-screen'>
        <MainContainer>
          <div className='flex justify-end'>
            <ul className='flex flex-row justify-center mx-auto'>
              {REGION_DATA.map((data, index) => (
                <li key={index}>
                  <button className='purpleButton mx-1' onClick={() => setCurrentRegion(data)} title={data}>
                    {data}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className='flex justify-end drop-shadow-xl gap-[50px] mb-3 mr-[10vw]'>
            <FilterContainer>
              <label className='flex mb-1 text-gray-100 justify-around'>
                <input
                  className='required:border-red-500'
                  onClick={() => {
                    setCheckRecruitingPost(!checkRecruitingPost);
                  }}
                  type='checkbox'
                />
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
            {currentPageData.map((post, index) => (
              <RecuitPostContainer postData={post} key={index} />
            ))}
            {showUserProfileModal && <UserProfileModal />}
            {showRecruitPost && <PostModal />}
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

const FilterContainer = tw.div`
  flex flex-col
  flex flex-col
`;

const ListItemContainer = tw.div`
  grid grid-cols-3 grid-rows-2 gap-y-6 w-[1000px] mx-auto justify-items-center relative
`;
