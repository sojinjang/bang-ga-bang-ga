import React, { useState, useEffect } from 'react';
import tw from 'tailwind-styled-components';
import {
  showRecruitPostAtom,
  maxPageNumAtom,
  showUserProfileModalAtom,
  currentPageAtom,
  currentRegionAtom,
} from '../recoil/recruit-list/index';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { get } from '../utils/api';
import { getCookieValue } from '../utils/cookie';
import RecuitPostContainer from '../components/recruit/RecruitPostContainer';
import PostModal from '../components/recruit/PostModal';
import PaginationButton from '../components/recruit/PageinationButton';
import UserProfileModal from '../components/recruit/UserProfileModal';
import Navigators from '../components/common/Navigators';
import Background from '../components/common/Background';
import { ApiUrl } from '../constants/ApiUrl';
import { useNavigate } from 'react-router-dom';

const RecruitList = () => {
  const navigate = useNavigate();
  const [showRecruitPost, setShowRecruitPost] = useRecoilState(showRecruitPostAtom);
  const [currentRegion, setCurrentRegion] = useRecoilState(currentRegionAtom);
  const [currentPage, setCurrentPage] = useRecoilState(currentPageAtom);
  const [showUserProfileModal, setShowUserProfileModal] = useRecoilState(showUserProfileModalAtom);
  const setMaxPageNum = useSetRecoilState(maxPageNumAtom);

  const [fetchedData, setFetchedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [nowRecruiting, setNowRecruiting] = useState(false);
  const [slicedData, setSlicedData] = useState([]);
  const [currentPageData, setCurrentPageData] = useState([]);

  const loginToken = getCookieValue('token');

  const REGION_DATA = ['전체', '홍대', '강남', '건대'];

  useEffect(() => {
    if (currentRegion === '전체') {
      // eslint-disable-next-line
      const fetchRecruitData = (async () => {
        try {
          const data = await get(ApiUrl.MATCHING_POSTS);
          const asendedData = data.reverse();

          setFetchedData(asendedData);
        } catch (err) {
          alert(err);
        }
      })();
    } else {
      // eslint-disable-next-line
      const fetchRecruitData = (async () => {
        try {
          const data = await get(ApiUrl.MATCHING_POSTS, currentRegion);
          const asendedData = data.reverse();

          setFetchedData(asendedData);
        } catch (err) {
          alert(err);
        }
      })();
    }
  }, [currentRegion]);

  useEffect(() => {
    if (nowRecruiting) {
      const nowRecruitingData = fetchedData.filter((data) => {
        return data.matchStatus === 0;
      });

      setFilteredData(nowRecruitingData);
    } else {
      setFilteredData(fetchedData);
    }
  }, [fetchedData, nowRecruiting]);

  useEffect(() => {
    const dataLength = filteredData.length;
    let dataArray = [];

    for (let i = 0; i < dataLength; i += 6) {
      dataArray.push(filteredData.slice(i, i + 6));
    }

    setCurrentPage(0);
    setSlicedData(dataArray);
    setMaxPageNum(dataArray.length - 1);
  }, [filteredData]);

  useEffect(() => {
    if (slicedData.length > 0) {
      setCurrentPageData(slicedData[currentPage]);
    } else if (slicedData.length === 1) {
      setCurrentPageData(slicedData[0]);
    }
  }, [slicedData, currentPage]);

  useEffect(() => {
    setShowUserProfileModal(false);
  }, [currentRegion]);

  return (
    <Background img={'bg1'}>
      <Navigators />
      <div className='w-screen h-[88vh]'>
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
                  setNowRecruiting(!nowRecruiting);
                }}
                type='checkbox'
              />
              모집중만 보기
            </label>
          </FilterContainer>
          <button
            onClick={() => {
              loginToken ? setShowRecruitPost(true) : (alert('로그인이 필요합니다.'), navigate('/login'));
            }}
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
      </div>
    </Background>
  );
};

export default RecruitList;

const FilterContainer = tw.div`
  flex flex-col
  flex flex-col
`;

const ListItemContainer = tw.div`
  grid grid-cols-3 grid-rows-2 gap-y-6 w-[1000px] mx-auto justify-items-center 
`;
