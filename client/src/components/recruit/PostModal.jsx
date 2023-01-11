import React, { useState, useEffect, useRef } from 'react';
import tw from 'tailwind-styled-components';
import { showRecruitPostAtom, showRecruitModalPageAtom, recruitPostDataAtom } from '../../recoil/recruit-list/index';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';

import { get, post } from '../../utils/api.js';
import { ApiUrl } from '../../constants/ApiUrl';
import jwt_decode from 'jwt-decode';
import { getCookieValue } from '../../utils/cookie';

const FirstModal = () => {
  const setRecruitPostData = useSetRecoilState(recruitPostDataAtom);
  const setShowRecruitPost = useSetRecoilState(showRecruitPostAtom);
  const setShowRecruitModalPage = useSetRecoilState(showRecruitModalPageAtom);
  const [showDateAlert, setShowDateAlert] = useState(false);
  const [showTitleAlert, setShowTitleAlert] = useState(false);
  const [selectedDate, selectedTitle, selectedMemberNum] = [useRef(), useRef(), useRef()];

  const checkPreviousDate = () => {
    const parsedDate = (dateValue, iso) => {
      if (iso === true) {
        dateValue = dateValue.slice(0, 16);
      }
      return parseInt(dateValue.toString().replace(/[^0-9]/g, ''));
    };
    const today = new Date();
    const offset = today.getTimezoneOffset() * 60000;

    const dateOffset = new Date(today.getTime() - offset).toISOString();
    const selectedDateValue = selectedDate.current.value;
    const isPrevDate = parsedDate(selectedDateValue) - parsedDate(dateOffset, true) < 0;

    if (isPrevDate || selectedDateValue == '') {
      setShowDateAlert(true);
    } else {
      setShowRecruitModalPage(2);
      setShowTitleAlert(false);
      setShowDateAlert(false);
    }
  };

  const checkInputIsEmpty = () => {
    const selectedTitleValue = selectedTitle.current.value;
    const selectedMemberNumValue = selectedMemberNum.current.value;

    if (!selectedTitleValue || !selectedMemberNumValue) setShowTitleAlert(true);
    else checkPreviousDate();
  };

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
            ref={selectedTitle}
            placeholder='제목을 입력하세요'
            className='w-[300px] h-[45px] p-3 border border-solid border-gray-400'
          />
          <p className={showTitleAlert || 'invisible'}>제목과 인원을 입력해주세요!</p>
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
            ref={selectedMemberNum}
            type='number'
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
            ref={selectedDate}
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
      {showDateAlert && <div className='ml-1 mt-1'>일자를 선택하지 않았거나, 이전 일자를 선택하였습니다!</div>}

      <div>
        <button
          className='w-[60px] h-[35px] right-[100px] bottom-6 bg-gray-400 drop-shadow-lg rounded-lg align-middle absolute '
          onClick={() => setShowRecruitPost(false)}>
          닫기
        </button>
        <button
          className='w-[60px] h-[35px] right-8 bottom-6 bg-sky-500/50 drop-shadow-lg rounded-lg align-middle absolute'
          onClick={() => {
            checkInputIsEmpty();
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
  const [showCafeSelection, setShowCafeSelection] = useState('disabled');
  const [showThemeSelection, setShowThemeSelection] = useState('disabled');
  const [currentRegion, setCurrentRegion] = useState('');
  const [currentCafeDataArray, setCurrentCafeDataArray] = useState([]);
  const [currentThemeDataArray, setCurrentThemeDataArray] = useState([]);
  const [currentThemeData, setCurrentThemeData] = useState({});
  const [submitStatus, setSubmitStatus] = useState(false);
  const [showSubmitAlert, setShowSubmitAlert] = useState(false);

  const REGION_DATA = ['홍대', '강남', '건대'];

  const loginToken = getCookieValue('token');
  const userId = jwt_decode(loginToken).userId;

  useEffect(() => {
    // eslint-disable-next-line
    const getCafeData = (async () => {
      try {
        const cafeData = await get(ApiUrl.MATCHING_POST_CAFE_INFO, recruitPostData.matchingLocation);

        setCurrentCafeDataArray(cafeData);
      } catch (err) {
        alert(err.message);
      }
    })();
  }, [currentRegion]);

  const getThemeData = async (cafeId) => {
    try {
      const themeData = await get(ApiUrl.MATCHING_POST_THEME_INFO, cafeId);

      setCurrentThemeDataArray(themeData);
    } catch (err) {
      alert(err.message);
    }
  };

  const calcDifficulty = (num) => {
    const difficultArray = ['신입 전용', '쉬움', '보통', '어려움', '프로탈출러 전용'];

    return difficultArray[parseInt(num / 2)];
  };

  const submitMatchingPost = async () => {
    const dateValue = recruitPostData.matchingTime;
    const parsedDate = parseInt(
      dateValue
        .toString()
        .slice(1)
        .replace(/[^0-9]/g, ''),
    );

    setRecruitPostData((prevState) => {
      return {
        ...prevState,

        userId: userId,
        matchingTime: parsedDate,
      };
    });
    await post('/api/matching-posts', recruitPostData);
  };

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

                      setShowCafeSelection('');
                      setCurrentRegion(e.target.value);
                      setSubmitStatus(false);
                    }}
                    type='radio'
                    value={region}
                    name='region'
                    className='mr-2'
                    defaultChecked={recruitPostData.matchingLocation === region}
                  />
                  {region}
                </label>
              </li>
            );
          })}
        </ul>
        <PostSelection>
          <span>방문 카페명</span>
          <select
            className='w-[300px] h-[45px] p-2 border border-solid border-gray-400'
            onChange={(e) => {
              getThemeData(e.target.value);
              setShowThemeSelection('');
              setSubmitStatus(false);

              setRecruitPostData((prevState) => {
                return {
                  ...prevState,

                  cafeId: parseInt(e.target.value),
                };
              });
            }}
            disabled={showCafeSelection}
            name='filter'
            id=''>
            <option value=''>
              {showCafeSelection === '' ? '---방문 예정인 카페명을 선택해주세요!' : '---방문 지역을 먼저 선택해주세요.'}
            </option>
            {currentCafeDataArray.map((cafe, index) => (
              <option value={cafe.cafeId} key={index}>
                {cafe.cafeName}
              </option>
            ))}
          </select>
        </PostSelection>
        <PostSelection className='mt-4'>
          <span>방문 테마명</span>
          <select
            onChange={(e) => {
              const themeId = parseInt(e.target.value);
              setCurrentThemeData(currentThemeDataArray[themeId]);
              setSubmitStatus(true);

              setRecruitPostData((prevState) => {
                return {
                  ...prevState,

                  themeName: e.target[themeId].text,
                };
              });
            }}
            className='w-[300px] h-[45px] p-2 border border-solid border-gray-400'
            disabled={showThemeSelection}
            name='filter'
            id=''>
            <option value=''>
              {showThemeSelection === ''
                ? '---방문 예정인 카페의 테마명을 선택해주세요!'
                : '---방문 예정인 카페를 먼저 선택해주세요.'}
            </option>
            {currentThemeDataArray.map((theme, index) => (
              <option title={theme.theme} value={index} key={index}>
                {theme.theme}
              </option>
            ))}
          </select>
        </PostSelection>
        <div>
          <button
            className='w-[60px] h-[35px] right-[168px] bottom-6 bg-gray-400 drop-shadow-lg rounded-lg align-middle absolute '
            onClick={() => {
              setShowRecruitModalPage(1);
              setShowRecruitPost(false);
              setRecruitPostData({
                title: '',
                peopleNum: 2,
                themeName: '',
                matchStatus: false,
                matchingTime: 0,
                matchingLocation: '',
                cafeId: 0,
                userId: 1,
              });
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
            onClick={async () => {
              if (submitStatus) {
                setShowSubmitAlert(true);
                await submitMatchingPost();
                setShowRecruitPost(false);
                window.location.replace('/recruit-list');
              }
            }}>
            등록
          </button>
        </div>
        {showSubmitAlert && <span className='absolute right-2'>등록하기 위해 한 번 더 눌러주세요!</span>}
      </div>
      <div className='mt-[126px]'>
        <div className='flex flex-col text-sm'>
          <span>장르</span>
          <span>난이도</span>
          <span>활동성</span>
          <span>추천 인원</span>
          <span>플레이타임</span>
        </div>
      </div>
      <div className='ml-3 mt-[126px]'>
        <div className='flex flex-col text-sm pl-3 border-l border-solid border-gray-500/20'>
          <span className='text-blue-500 font-semibold'>{currentThemeData.genre && currentThemeData.genre}</span>
          <p>
            <span className='text-blue-500 font-semibold'>
              {currentThemeData.difficulty && calcDifficulty(currentThemeData.difficulty)}
            </span>
          </p>
          <ul className='flex gap-2'>
            <li className='text-blue-500 font-semibold'>{currentThemeData.activity && currentThemeData.activity}</li>
          </ul>
          <ul className='flex gap-1'>
            <li className='text-blue-500 font-semibold'>
              {currentThemeData.recommendedNum && currentThemeData.recommendedNum}
            </li>
          </ul>
          <span className='text-blue-500 font-semibold'>{currentThemeData.time && currentThemeData.time}분 이내</span>
        </div>
      </div>
    </div>
  );
};

const PostModal = () => {
  const showRecruitModalPage = useRecoilValue(showRecruitModalPageAtom);

  return (
    <div className='rounded-xl absolute top-[30%] w-[600px] h-[350px] bg-slate-100 drop-shadow-lg'>
      <div className={showRecruitModalPage === 1 ? '' : 'hidden'}>
        <FirstModal />
      </div>
      <div className={showRecruitModalPage === 2 ? '' : 'hidden'}>
        <SecondModal />
      </div>
    </div>
  );
};

const PostSelection = tw.div`
  flex flex-col mt-5
`;

export default PostModal;
