import React, { useState, useEffect, useMemo } from 'react';
import { showRecruitPostAtom, showRecruitModalPageAtom, recruitPostDataAtom } from '../../recoil/recruit-list/index';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';

import { get } from '../../utils/api.js';
import { ApiUrl } from '../../constants/ApiUrl';

const FirstModal = () => {
  const setRecruitPostData = useSetRecoilState(recruitPostDataAtom);
  const setShowRecruitPost = useSetRecoilState(showRecruitPostAtom);
  const setShowRecruitModalPage = useSetRecoilState(showRecruitModalPageAtom);

  return (
    <div className=' mt-10 ml-[40px]'>
      <div className='flex'>
        <div className='flex flex-col mr-[20px]'>
          <span>제목</span>
          <input
            onChange={(e) =>
              setRecruitPostData((prevState) => {
                return {
                  ...prevState,
                  title: e.target.value,
                };
              })
            }
            placeholder='제목을 입력하세요'
            className='w-[300px] h-[45px] p-3 border border-solid border-gray-400'
          />
        </div>
        <div className='flex flex-col'>
          <span>인원</span>
          <input
            onChange={(e) =>
              setRecruitPostData((prevState) => {
                return {
                  ...prevState,
                  peopleNum: parseInt(e.target.value),
                };
              })
            }
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
            onChange={(e) =>
              setRecruitPostData((prevState) => {
                return {
                  ...prevState,
                  matchingTime: e.target.value,
                };
              })
            }
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
          }}>
          다음
        </button>
      </div>
    </div>
  );
};

const SecondModal = () => {
  const setShowRecruitPost = useSetRecoilState(showRecruitPostAtom);
  const setShowRecruitModalPage = useSetRecoilState(showRecruitModalPageAtom);
  const [recruitPostData, setRecruitPostData] = useRecoilState(recruitPostDataAtom);
  const [localCafeData, setLocalCafeData] = useState('');

  const REGION_DATA = ['홍대', '강남', '건대'];

  const getCafeData = async () => {
    const cafeData = await get(ApiUrl.CAFE_DETAIL_INFO, recruitPostData.matchingLocation);

    setLocalCafeData(cafeData);
  };

  const postFunc = useMemo(() => console.log(recruitPostData), [recruitPostData]);

  return (
    <div className='flex'>
      <div className='mt-10 ml-[40px] mr-[30px]'>
        <p>지역</p>
        <ul className='flex justify-between'>
          {REGION_DATA.map((region, index) => {
            return (
              <li key={index}>
                <label>
                  <input
                    onClick={(e) => {
                      setRecruitPostData((prevState) => {
                        return {
                          ...prevState,
                          matchingLocation: e.target.value,
                        };
                      });

                      getCafeData();
                    }}
                    type='radio'
                    value={region}
                    name='region'
                    className='mr-2'
                    defaultChecked={recruitPostData.matchingLocation === region ? true : false}
                  />
                  {region}
                </label>
              </li>
            );
          })}
        </ul>
        <div className='flex flex-col mt-5'>
          <span>방문 카페명</span>
          <select className='w-[110px]' name='filter' id=''>
            <option value=''>--필터링--</option>
            <option value=''>난이도순</option>
            <option value=''>활동성순</option>
            <option value=''>평점순</option>
            <option value=''>리뷰많은순</option>
          </select>
          <input
            type='text'
            placeholder='방문 예정인 카페명을 입력하세요.'
            className='w-[300px] h-[45px] p-3 border border-solid border-gray-400'
          />
        </div>
        <div className='flex flex-col mt-4'>
          <span>방문 테마명</span>
          <input
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

                  date: parsedDate,
                };
              });

              postFunc;
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

const PostModal = () => {
  const showRecruitModalPage = useRecoilValue(showRecruitModalPageAtom);

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

export default PostModal;
