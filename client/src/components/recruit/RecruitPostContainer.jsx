import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import tw from 'tailwind-styled-components';

import { useRecoilValue } from 'recoil';
import { currentRegionAtom, currentPageAtom } from '../../recoil/recruit-list/index';

import { getCookieValue } from '../../utils/cookie';
import { get } from '../../utils/api';
import { ApiUrl } from '../../constants/ApiUrl';
import completeRibbon from '../../assets/images/icon/complete-ribbon.png';
import UserProfileContainer from './UserProfileContainer';

const RecuitPostContainer = ({ postData }) => {
  const navigate = useNavigate();
  const {
    title,
    view,
    matchingTime,
    matchStatus,
    matchingLocation,
    cafeName,
    matchingPostsId,
    peopleNum,
    matchingSituationUserSum,
    createdAt,
    themeName,
  } = postData;

  const currentRegion = useRecoilValue(currentRegionAtom);
  const currentPage = useRecoilValue(currentPageAtom);
  const [showTeamModal, setShowTeamModal] = useState(false);

  useEffect(() => {
    setShowTeamModal(false);
  }, [currentRegion, currentPage]);

  const moveToDetailPage = async (e) => {
    const loginToken = getCookieValue('token');

    if ((loginToken == '') | !loginToken) {
      alert('로그인이 필요한 서비스입니다.');
      navigate('/login');
    } else {
      try {
        await get(ApiUrl.MATCHING_POST_READ_POST, e.currentTarget.id);
        navigate(`/recruit-detail/${matchingPostsId}`);
      } catch (err) {
        alert(err);
      }
    }
  };

  const convertDate = () => {
    if (matchingTime == null) {
      return '';
    }

    const stringifiedDate = matchingTime.toString();
    const result = [];

    for (let i = 0; i < 10; i += 2) {
      result.push(stringifiedDate.slice(i, i + 2));
    }

    const [year, month, day, hour, minute] = result;

    return `${year}년 ${month}월 ${day}일 ${hour}:${minute} 예정`;
  };

  const convertRemainDate = () => {
    const postedDate = new Date(createdAt);
    const today = new Date();

    const relativeFormatter = new Intl.RelativeTimeFormat('ko', {
      numeric: 'always',
    });

    let timeDiffDay = Math.ceil((postedDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    let timeDiffHour = Math.ceil((postedDate.getTime() - today.getTime()) / (1000 * 60 * 60));

    if (timeDiffHour === 0) {
      timeDiffHour = Math.ceil((postedDate.getTime() - today.getTime()) / (1000 * 60));
      return relativeFormatter.format(timeDiffHour, 'minute');
    }
    if (timeDiffDay === 0) {
      return relativeFormatter.format(timeDiffHour, 'hour');
    } else {
      return relativeFormatter.format(timeDiffDay, 'day');
    }
  };

  return (
    <div
      className='h-[240px] w-[270px] p-5 relative rounded-[20px] border-opacity-10	  drop-shadow-xl border-[3px] border-solid border-black-500
      bg-gradient-to-b  from-[#4057A7] to-[#4496D3] text-white'>
      <CompleteRibbon src={completeRibbon} className={!matchStatus && 'hidden'} />
      <div className='flex w-full mt-2 border-b border-white'>
        <p
          onClick={(e) => moveToDetailPage(e)}
          className='w-[185px] text-lg font-semibold cursor-pointer truncate'
          id={matchingPostsId}>
          {title}
        </p>
        <p className='text-blue-300 font-semibold'>
          ({matchingSituationUserSum}/{peopleNum})
        </p>
      </div>
      <div className='flex flex-row'>
        <span className='mb-2 mr-3'>{convertRemainDate()}</span>
        <svg width='12' height='24' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M6.00008 0.5C8.69608 0.5 10.9391 2.44 11.4096 5C10.9396 7.56 8.69608 9.5 6.00008 9.5C3.30408 9.5 1.06108 7.56 0.590576 5C1.06058 2.44 3.30408 0.5 6.00008 0.5ZM6.00008 8.5C7.01981 8.49978 8.00927 8.15341 8.8065 7.51758C9.60374 6.88176 10.1615 5.99414 10.3886 5C10.1607 4.00665 9.60255 3.12 8.80539 2.48501C8.00823 1.85002 7.01923 1.50426 6.00008 1.50426C4.98092 1.50426 3.99192 1.85002 3.19476 2.48501C2.39761 3.12 1.83946 4.00665 1.61158 5C1.83862 5.99414 2.39641 6.88176 3.19365 7.51758C3.99088 8.15341 4.98034 8.49978 6.00008 8.5V8.5ZM6.00008 7.25C5.40334 7.25 4.83104 7.01295 4.40909 6.59099C3.98713 6.16903 3.75008 5.59674 3.75008 5C3.75008 4.40326 3.98713 3.83097 4.40909 3.40901C4.83104 2.98705 5.40334 2.75 6.00008 2.75C6.59681 2.75 7.16911 2.98705 7.59107 3.40901C8.01302 3.83097 8.25008 4.40326 8.25008 5C8.25008 5.59674 8.01302 6.16903 7.59107 6.59099C7.16911 7.01295 6.59681 7.25 6.00008 7.25ZM6.00008 6.25C6.3316 6.25 6.64954 6.1183 6.88396 5.88388C7.11838 5.64946 7.25008 5.33152 7.25008 5C7.25008 4.66848 7.11838 4.35054 6.88396 4.11612C6.64954 3.8817 6.3316 3.75 6.00008 3.75C5.66856 3.75 5.35061 3.8817 5.11619 4.11612C4.88177 4.35054 4.75008 4.66848 4.75008 5C4.75008 5.33152 4.88177 5.64946 5.11619 5.88388C5.35061 6.1183 5.66856 6.25 6.00008 6.25Z'
            fill='white'
          />
        </svg>
        <span className='ml-0.5'>{view}</span>
      </div>
      <div>
        <p className='truncate'>{`${matchingLocation} ${cafeName}`}</p>
        <p className='truncate'>{themeName}</p>
        <p className='mt-2 mb-1'>{convertDate()}</p>
      </div>
      <div className='flex mt-3 justify-end gap-3 relative'>
        <button
          onClick={() => {
            setShowTeamModal(!showTeamModal);
          }}
          className='drop-shadow-xl h-9 w-[70px] border-solid rounded-[5px]  border-[1.5px] border-white cursor-pointer'>
          팀원보기
        </button>
        {showTeamModal && (
          <div
            onMouseLeave={() => setShowTeamModal(false)}
            className='w-[287px] h-[270px] -right-[26px] -bottom-5 px-4 absolute bg-white rounded-[10px] border-solid border-[1.5px] border-white'>
            <svg
              onClick={() => setShowTeamModal(false)}
              className='absolute right-2 top-2 cursor-pointer'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <g clipPath='url(#clip0_16_1336)'>
                <path
                  d='M11.9997 10.586L16.9497 5.63599L18.3637 7.04999L13.4137 12L18.3637 16.95L16.9497 18.364L11.9997 13.414L7.04974 18.364L5.63574 16.95L10.5857 12L5.63574 7.04999L7.04974 5.63599L11.9997 10.586Z'
                  fill='black'
                />
              </g>
              <defs>
                <clipPath id='clip0_16_1336'>
                  <rect width='24' height='24' fill='white' />
                </clipPath>
              </defs>
            </svg>

            <UserProfileContainer postId={matchingPostsId} />
          </div>
        )}
      </div>
    </div>
  );
};

const CompleteRibbon = tw.img`
  absolute w-[71px] h-[84.5px] top-[-6px] right-[-6px]
`;

export default RecuitPostContainer;
