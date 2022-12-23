import React, { useState, useRef, useEffect } from 'react';
import tw from 'tailwind-styled-components';
import { showRecruitPostAtom, showRecruitModalPageAtom, screenLevelAtom } from '../../recoil/recruit-list/index';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';

import userArray from '../../assets/images/user-profile/profile';
import completeRibon from '../../assets/images/icon/complete-ribon.png';

import { RegionButton } from '../../components/buttons/Buttons';
import Navigators from '../../components/common/Navigators';
import Background from '../../components/common/Background';

const RecruitList = () => {
  document.title = '방가방가 모집글 리스트';

  const [showRecruitPost, setShowRecruitPost] = useRecoilState(showRecruitPostAtom);
  const setScreenLevel = useSetRecoilState(screenLevelAtom);
  const REGION_DATA = ['홍대', '강남', '건대'];

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
      <div className='px-[10vw] w-screen'>
        <MainContainer>
          <FilterContainer>
            <label className='flex mb-3 text-gray-100 justify-around'>
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
          <div className='flex justify-end mb-5'>
            <ul className='flex flex-row justify-center mr-[235px]'>
              {REGION_DATA.map((data, index) => (
                <li key={index}>
                  <RegionButton title={data} />
                </li>
              ))}
            </ul>
            <div className='flex justify-end drop-shadow-xl'>
              <button
                onClick={() => setShowRecruitPost(true)}
                className='mb-3 mr-[75px] border-solid border-[1px] p-1.5 border-gray-500 bg-white'>
                글쓰기
              </button>
            </div>
          </div>
          <ListItemContainer>
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
            {showRecruitPost && <Modal />}
            <svg
              className='absolute top-[320px] -right-[80px]'
              width='80'
              height='80'
              viewBox='0 0 8 14'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M5.17168 6.99999L0.22168 2.04999L1.63568 0.635986L7.99968 6.99999L1.63568 13.364L0.22168 11.95L5.17168 6.99999Z'
                fill='black'
              />
            </svg>
            <svg
              className='absolute top-[320px] -left-[80px]'
              width='80'
              height='80'
              viewBox='0 0 8 14'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M2.828 6.99999L7.778 11.95L6.364 13.364L0 6.99999L6.364 0.635986L7.778 2.04999L2.828 6.99999Z'
                fill='black'
              />
            </svg>
          </ListItemContainer>
          <PaginationButton>
            <button className='w-[25px] h-[25px] text-sm mx-1 text-white bg-blue-1 border-solid border-[0.5px] rounded border-white'>
              1
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
    region: '',
    cafeName: '',
    themeName: '',
  });

  const [titleRef, countRef, dateRef, regionRef, cafeRef, themeRef] = [
    useRef(),
    useRef(),
    useRef(),
    useRef([]),
    useRef(),
    useRef(),
  ];

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
      if (e.target.checked) {
        setRecruitPostData((prevState) => {
          return {
            ...prevState,
            region: e.target.value,
          };
        });
      }
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
                  ref={(el) => (regionRef.current[0] = el)}
                  type='radio'
                  value={'홍대'}
                  name='region'
                  className='mr-2'
                />
                홍대
              </label>
            </li>
            <li>
              <label>
                <input
                  onClick={(e) => checkRegion(e)}
                  ref={(el) => (regionRef.current[1] = el)}
                  type='radio'
                  value={'강남'}
                  name='region'
                  className='mr-2'
                />
                강남
              </label>
            </li>
            <li>
              <label>
                <input
                  onClick={(e) => checkRegion(e)}
                  ref={(el) => (regionRef.current[2] = el)}
                  type='radio'
                  value={'건대'}
                  name='region'
                  className='mr-2'
                />
                건대
              </label>
            </li>
          </ul>
          <div className='flex flex-col mt-5'>
            <span>방문 카페명</span>
            <input
              defaultValue={recruitPostData.cafeName}
              ref={cafeRef}
              type='text'
              placeholder='방문 예정인 카페명을 입력하세요.'
              className='w-[300px] h-[45px] p-3 border border-solid border-gray-400'
            />
          </div>
          <div className='flex flex-col mt-4'>
            <span>방문 테마명</span>
            <input
              defaultValue={recruitPostData.themeName}
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

                    cafeName: cafeRef.current.value,
                    themeName: themeRef.current.value,
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

const ListItem = () => {
  const [isComplete, setIsComplete] = useState(false);
  const screenLevel = useRecoilValue(screenLevelAtom);

  return (
    <div
      className={`${
        screenLevel === 1 ? 'h-[340px]' : 'h-[260px]'
      }w-[280px] p-5 relative rounded-xl drop-shadow-xl border-[1.5px] border-solid border-black-500
  bg-gray-400 text-white`}>
      <CompleteRibon src={completeRibon} className={isComplete ? '' : 'hidden'} />
      <p className='pt-5 text-lg font-semibold h-[70px] cursor-pointer' onClick={() => setIsComplete(true)}>
        초고수 환영 공포 쫄보 금지
        <span className='text-blue-4 stroke-cyan-50 stroke-width-1'> (7/7)</span>
      </p>
      <div className='flex flex-row'>
        <span className='mb-2'>1시간 전</span>
        <span className='mx-1.5'>・</span>
        <svg
          className='align-middle'
          width='12'
          height='24'
          viewBox='0 0 12 10'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M6.00008 0.5C8.69608 0.5 10.9391 2.44 11.4096 5C10.9396 7.56 8.69608 9.5 6.00008 9.5C3.30408 9.5 1.06108 7.56 0.590576 5C1.06058 2.44 3.30408 0.5 6.00008 0.5ZM6.00008 8.5C7.01981 8.49978 8.00927 8.15341 8.8065 7.51758C9.60374 6.88176 10.1615 5.99414 10.3886 5C10.1607 4.00665 9.60255 3.12 8.80539 2.48501C8.00823 1.85002 7.01923 1.50426 6.00008 1.50426C4.98092 1.50426 3.99192 1.85002 3.19476 2.48501C2.39761 3.12 1.83946 4.00665 1.61158 5C1.83862 5.99414 2.39641 6.88176 3.19365 7.51758C3.99088 8.15341 4.98034 8.49978 6.00008 8.5V8.5ZM6.00008 7.25C5.40334 7.25 4.83104 7.01295 4.40909 6.59099C3.98713 6.16903 3.75008 5.59674 3.75008 5C3.75008 4.40326 3.98713 3.83097 4.40909 3.40901C4.83104 2.98705 5.40334 2.75 6.00008 2.75C6.59681 2.75 7.16911 2.98705 7.59107 3.40901C8.01302 3.83097 8.25008 4.40326 8.25008 5C8.25008 5.59674 8.01302 6.16903 7.59107 6.59099C7.16911 7.01295 6.59681 7.25 6.00008 7.25ZM6.00008 6.25C6.3316 6.25 6.64954 6.1183 6.88396 5.88388C7.11838 5.64946 7.25008 5.33152 7.25008 5C7.25008 4.66848 7.11838 4.35054 6.88396 4.11612C6.64954 3.8817 6.3316 3.75 6.00008 3.75C5.66856 3.75 5.35061 3.8817 5.11619 4.11612C4.88177 4.35054 4.75008 4.66848 4.75008 5C4.75008 5.33152 4.88177 5.64946 5.11619 5.88388C5.35061 6.1183 5.66856 6.25 6.00008 6.25Z'
            fill='white'
          />
        </svg>
        <span className='ml-0.5'>130</span>
        <span className='mx-1.5'>・</span>
        <svg width='12' height='24' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <g clipPath='url(#clip0_203_554)'>
            <path
              d='M5 1.5H7C8.06087 1.5 9.07828 1.92143 9.82843 2.67157C10.5786 3.42172 11 4.43913 11 5.5C11 6.56087 10.5786 7.57828 9.82843 8.32843C9.07828 9.07857 8.06087 9.5 7 9.5V11.25C4.5 10.25 1 8.75 1 5.5C1 4.43913 1.42143 3.42172 2.17157 2.67157C2.92172 1.92143 3.93913 1.5 5 1.5ZM6 8.5H7C7.39397 8.5 7.78407 8.4224 8.14805 8.27164C8.51203 8.12087 8.84274 7.8999 9.12132 7.62132C9.3999 7.34274 9.62087 7.01203 9.77164 6.64805C9.9224 6.28407 10 5.89397 10 5.5C10 5.10603 9.9224 4.71593 9.77164 4.35195C9.62087 3.98797 9.3999 3.65726 9.12132 3.37868C8.84274 3.1001 8.51203 2.87913 8.14805 2.72836C7.78407 2.5776 7.39397 2.5 7 2.5H5C4.20435 2.5 3.44129 2.81607 2.87868 3.37868C2.31607 3.94129 2 4.70435 2 5.5C2 7.305 3.231 8.483 6 9.74V8.5Z'
              fill='white'
            />
          </g>
          <defs>
            <clipPath id='clip0_203_554'>
              <rect width='12' height='12' fill='white' />
            </clipPath>
          </defs>
        </svg>
        <span className='ml-0.5'>13</span>
      </div>
      <div className='cursor-pointer'>
        <p>서울 이스케이프룸 홍대점 - 카지노</p>
        <p className='mb-1'>12월 13일(금) 15:00 예정</p>
      </div>

      {screenLevel === 1 ? (
        <>
          <span className='text-2xl ml-[13px]'>👑</span>
          <div className='grid gap-3 grid-cols-4 grid-rows-2'>
            {userArray.map((user, index) => (
              <img
                className='w-[50px] h-[50px] drop-shadow-xl object-cover rounded-full border-solid border-[0.5px] border-gray-500 cursor-pointer'
                src={user['url']}
                alt='유저 프로필'
                key={index}
              />
            ))}
          </div>
        </>
      ) : (
        <div className='flex mt-7 justify-end gap-3 relative'>
          {console.log('hi')}
          <button
            onClick={() => {
              const [memberModal, setMemberModal] = useState(false);
              setMemberModal((e) => !e);
            }}
            className='drop-shadow-xl h-9 w-[70px] border-solid border-[1.5px] border-white cursor-pointer'>
            팀원보기
          </button>
          <button className='drop-shadow-xl h-9 w-[70px] border-solid border-[1.5px] border-white cursor-pointer'>
            참여하기
          </button>
          <div className='w-[300px] h-[170px] -right-[34px] bottom-12 px-4 absolute bg-white rounded-[10px] border-solid border-[1.5px] border-white'>
            <span className='text-2xl ml-[13px]'>👑</span>
            <div className='grid gap-3 grid-cols-4 grid-rows-2'>
              {userArray.map((user, index) => (
                <img
                  className='w-[50px] h-[50px] drop-shadow-xl object-cover rounded-full border-solid border-[0.5px] border-gray-500 cursor-pointer'
                  src={user['url']}
                  alt='유저 프로필'
                  key={index}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecruitList;

const MainContainer = tw.div`
mt-10
relative
`;

const CompleteRibon = tw.img`
  absolute w-[71px] h-[84.5px] top-[-6px] right-[-6px]
`;

const PaginationButton = tw.div`
  flex justify-center mt-7
`;

const FilterContainer = tw.div`
  flex flex-col absolute -right-[80px] top-[65px]
`;

const ListItemContainer = tw.div`
  grid grid-cols-3 grid-rows-2 gap-y-10 w-[1000px] mx-auto justify-items-center relative
`;
