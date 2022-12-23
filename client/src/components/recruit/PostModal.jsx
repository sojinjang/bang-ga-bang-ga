import React, { useState, useRef, useMemo } from 'react';
import { showRecruitPostAtom, showRecruitModalPageAtom } from '../../recoil/recruit-list/index';
import { useRecoilState, useSetRecoilState } from 'recoil';

const PostModal = () => {
  const setShowRecruitPost = useSetRecoilState(showRecruitPostAtom);
  const [showRecruitModalPage, setShowRecruitModalPage] = useRecoilState(showRecruitModalPageAtom);
  const [recruitPostData, setRecruitPostData] = useState({
    title: '',
    count: 2,
    date: '',
    matchingLocation: '',
    cafeId: '',
    themeName: '',
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

    const postFunc = useMemo(() => console.log(recruitPostData), [recruitPostData]);

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

                    cafeId: cafeRef.current.value,
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

                    cafeId: cafeRef.current.value,
                    themeName: themeRef.current.value,
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
