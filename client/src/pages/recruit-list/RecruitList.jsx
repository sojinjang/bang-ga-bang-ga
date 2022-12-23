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

const Modal = () => {
  const setShowRecruitPost = useSetRecoilState(showRecruitPostAtom);
  const [showRecruitModalPage, setShowRecruitModalPage] = useRecoilState(showRecruitModalPageAtom);
  const [recruitPostData, setRecruitPostData] = useState({
    title: '',
    count: 2,
    date: '',
    matchingLocation: '',
    cafeId: '',
    operationInformationId: '',
    userId: '',
  });

  const [titleRef, countRef, dateRef, cafeRef, themeRef] = [useRef(), useRef(), useRef(), useRef(), useRef()];

  const FirstModal = () => {
    return (
      <div className=' mt-10 ml-[40px]'>
        <div className='flex'>
          <div className='flex flex-col mr-[20px]'>
            <span>제목</span>
            <input
              defaultValue={recruitPostData.title}
              ref={titleRef}
              placeholder='제목을 입력하세요'
              className='w-[300px] h-[45px] p-3 border border-solid border-gray-400'
            />
          </div>
          <div className='flex flex-col'>
            <span>인원</span>
            <input
              defaultValue={recruitPostData.count}
              ref={countRef}
              type='number'
              placeholder='2'
              min={2}
              max={8}
              className='w-[60px] h-[45px] p-3 border border-solid border-gray-400'
              onKeyDown={(event) => {
                event.preventDefault();
              }}
            />
          </div>
        </div>
        <div className='flex mt-5'>
          <div className='flex flex-col'>
            <span>접선 시간</span>
            <input
              defaultValue={recruitPostData.date}
              ref={dateRef}
              type='datetime-local'
              className='w-[300px] h-[45px] p-3 border border-solid border-gray-400'
            />
          </div>
        </div>
        <div>
          <button
            className='w-[60px] h-[35px] right-[100px] bottom-6 bg-gray-400 drop-shadow-lg rounded-lg align-middle absolute '
            onClick={() => setShowRecruitPost(false)}>
            닫기
          </button>
          <button
            className='w-[60px] h-[35px] right-8 bottom-6 bg-sky-500/50 drop-shadow-lg rounded-lg align-middle absolute'
            onClick={() => {
              setShowRecruitModalPage(2);
              setRecruitPostData((prevState) => {
                return {
                  ...prevState,

                  title: titleRef.current.value,
                  count: countRef.current.value,
                  date: dateRef.current.value,
                };
              });
            }}>
            다음
          </button>
        </div>
      </div>
    );
  };

  const SecondModal = () => {
    const checkRegion = (e) => {
      setRecruitPostData((prevState) => {
        return {
          ...prevState,
          matchingLocation: e.target.value,
        };
      });
    };

    return (
      <div className='flex'>
        <div className='mt-10 ml-[40px] mr-[30px]'>
          <p>지역</p>
          <ul className='flex justify-between'>
            <li>
              <label>
                <input
                  onClick={(e) => checkRegion(e)}
                  type='radio'
                  value={'홍대'}
                  name='region'
                  className='mr-2'
                  defaultChecked={recruitPostData.matchingLocation === '홍대' ? true : false}
                />
                홍대
              </label>
            </li>
            <li>
              <label>
                <input
                  onClick={(e) => checkRegion(e)}
                  type='radio'
                  value={'강남'}
                  name='region'
                  className='mr-2'
                  defaultChecked={recruitPostData.matchingLocation === '강남' ? true : false}
                />
                강남
              </label>
            </li>
            <li>
              <label>
                <input
                  onClick={(e) => checkRegion(e)}
                  type='radio'
                  value={'건대'}
                  name='region'
                  className='mr-2'
                  defaultChecked={recruitPostData.matchingLocation === '건대' ? true : false}
                />
                건대
              </label>
            </li>
          </ul>
          <div className='flex flex-col mt-5'>
            <span>방문 카페명</span>
            <input
              defaultValue={recruitPostData.cafeId}
              ref={cafeRef}
              type='text'
              placeholder='방문 예정인 카페명을 입력하세요.'
              className='w-[300px] h-[45px] p-3 border border-solid border-gray-400'
            />
          </div>
          <div className='flex flex-col mt-4'>
            <span>방문 테마명</span>
            <input
              defaultValue={recruitPostData.operationInformationId}
              ref={themeRef}
              type='text'
              placeholder='방문 예정인 카페의 테마명을 입력하세요.'
              className='w-[300px] h-[45px] p-3 border border-solid border-gray-400'
            />
          </div>
          <div>
            <button
              className='w-[60px] h-[35px] right-[168px] bottom-6 bg-gray-400 drop-shadow-lg rounded-lg align-middle absolute '
              onClick={() => {
                setShowRecruitModalPage(1);
                setShowRecruitPost(false);
              }}>
              닫기
            </button>
            <button
              className='w-[60px] h-[35px] right-[100px] bottom-6 bg-gray-400/50 drop-shadow-lg rounded-lg align-middle absolute'
              onClick={() => {
                setShowRecruitModalPage(1);
                setRecruitPostData((prevState) => {
                  return {
                    ...prevState,

                    cafeId: cafeRef.current.value,
                    operationInformationId: themeRef.current.value,
                  };
                });
              }}>
              이전
            </button>
            <button
              className='w-[60px] h-[35px] right-8 bottom-6 bg-sky-500/50 drop-shadow-lg rounded-lg align-middle absolute'
              onClick={() => {
                const dateValue = recruitPostData.date;
                const parsedDate = parseInt(dateValue.toString().replace(/[^0-9]/g, ''));

                setRecruitPostData((prevState) => {
                  return {
                    ...prevState,

                    cafeId: cafeRef.current.value,
                    operationInformationId: themeRef.current.value,
                    date: parsedDate,
                  };
                });
              }}>
              등록
            </button>
          </div>
        </div>
        <div className='mt-[126px]'>
          <div className='flex flex-col text-sm'>
            <span>장르</span>
            <span>난이도</span>
            <span>활동성</span>
            <span>추천인원</span>
            <span>플레이타임</span>
          </div>
        </div>
        <div className='ml-3 mt-[126px]'>
          <div className='flex flex-col text-sm pl-3 border-l border-solid border-gray-500/20'>
            <span className='text-blue-500 font-bold'>추리 / 스릴러</span>
            <span className='text-blue-500 font-bold'>어려움</span>
            <ul className='flex gap-2'>
              <li>적음</li>
              <li>보통</li>
              <li className='text-blue-500 font-bold'>많음</li>
            </ul>
            <ul className='flex gap-1'>
              <li>2인</li>
              <li>3인</li>
              <li className='text-blue-500 font-bold'>4인</li>
              <li>5인 이상</li>
            </ul>
            <span className='text-blue-500 font-bold'>50분</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className='rounded-xl absolute top-[65px] w-[600px] h-[350px] bg-slate-100 drop-shadow-lg'>
      <div className={showRecruitModalPage === 1 ? '' : 'hidden'}>
        <FirstModal />
      </div>
      <div className={showRecruitModalPage === 2 ? '' : 'hidden'}>
        <SecondModal />
      </div>
    </div>
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
