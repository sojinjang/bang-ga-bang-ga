import React, { useState, useEffect } from 'react';
import tw from 'tailwind-styled-components';
import {
  showRecruitPostAtom,
  screenLevelAtom,
  showUserProfileModalAtom,
  currentPageAtom,
} from '../../recoil/recruit-list/index';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { get } from '../../utils/api';

import RecuitPostContainer from '../../components/recruit/RecruitPostContainer';
import PostModal from '../../components/recruit/PostModal';
import PaginationButton from '../../components/recruit/PageinationButton';
import UserProfileModal from '../../components/recruit/UserProfileModal';
import { RegionButton } from '../../components/buttons/Buttons';
import Navigators from '../../components/common/Navigators';
import Background from '../../components/common/Background';

const RecruitList = () => {
  document.title = '방가방가 모집글 리스트';

  const [showRecruitPost, setShowRecruitPost] = useRecoilState(showRecruitPostAtom);
  const showUserProfileModal = useRecoilValue(showUserProfileModalAtom);
  const currentPage = useRecoilValue(currentPageAtom);
  const REGION_DATA = ['전체', '홍대', '강남', '건대'];

  const [fetchedData, setFetchedData] = useState([]);
  const [currentRegion, setCurrentRegion] = useState('');
  const [checkRecruitingPost, setCheckRecruitingPost] = useState(false);
  const [slicedData, setSlicedData] = useState([]);
  const [currentPageData, setCurrentPageData] = useState([]);

  useEffect(() => {
    const fetchRecruitData = async () => {
      const data = await get('http://localhost:3008/api/matching-posts');

      setFetchedData(data);
    };

    fetchRecruitData();
  }, []);

  useEffect(() => {
    let dataArray = [];

    for (let i = 0; i < fetchedData.length; i += 6) {
      dataArray.push(fetchedData.slice(i, i + 6));
    }

    setSlicedData(dataArray);
  }, [fetchedData]);

  useEffect(() => {
    setCurrentPageData(slicedData[currentPage]);
  }, [slicedData]);

  return (
    <Background img={'bg1'}>
      <Navigators />
      <div className='w-screen'>
        <MainContainer>
          <div className='flex justify-end'>
            <ul className='flex flex-row justify-center mx-auto'>
              {REGION_DATA.map((data, index) => (
                <li key={index}>
                  <RegionButton
                    title={data}
                    onClick={() => {
                      setCurrentRegion(data);
                    }}
                  />
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
            {/* 
              memo 재웅: 오류 발생(이슈 참조)으로 현재 주석처리한 코드입니다.
              currentPageData: fetchedData를 활용하여 페이지네이션을 구현한 변수
            */}
            {/* {currentPageData.map((post, index) => (
              <RecuitPostContainer postData={post} key={index} />
            ))} */}
            {fetchedData.map((post, index) => (
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
