import React, { Fragment, useState } from 'react';
import tw from 'tailwind-styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { screenLevelAtom, showUserProfileModalAtom } from '../../recoil/recruit-list/index';

import userArray from '../../assets/images/user-profile/profile';
import completeRibon from '../../assets/images/icon/complete-ribon.png';

const RecuitPostContainer = ({ postData }) => {
  const screenLevel = useRecoilValue(screenLevelAtom);
  const [showUserProfileModal, setShowUserProfileModal] = useRecoilState(showUserProfileModalAtom);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [currentUserId, setCurrentUserId] = useState('');
  const { title, content, view, matchingTime, count, matchStatus, matchingLocation, createdAt, userId } = postData;

  const parseDateFunc = (date) => {
    const stringifiedDate = date.toString();
    const year = stringifiedDate.slice(0, 2);
    const month = stringifiedDate.slice(2, 4);
    const day = stringifiedDate.slice(4, 6);
    const hour = stringifiedDate.slice(6, 8);
    const minute = stringifiedDate.slice(8, 10);
    return `${year}년 ${month}월 ${day}일 ${hour}:${minute} 예정`;
  };

  const UserProfileContainer = () => {
    return (
      <div>
        <span className='text-2xl ml-[13px]'>👑</span>
        <div className='grid gap-3 grid-cols-4 grid-rows-2'>
          {userArray.map((user, index) => (
            <img
              onClick={() => setShowUserProfileModal(!showUserProfileModal)}
              className='w-[50px] h-[50px] drop-shadow-xl object-cover rounded-full border-solid border-[0.5px] border-gray-500 cursor-pointer'
              src={user['url']}
              alt='유저 프로필'
              key={index}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div
      className={`${screenLevel === 1 ? 'h-[340px]' : 'h-[260px]'}
      w-[280px] p-5 relative rounded-xl drop-shadow-xl border-[1.5px] border-solid border-black-500
  bg-gray-400 text-white`}>
      <CompleteRibon src={completeRibon} className={matchStatus ? '' : 'hidden'} />
      <p className='pt-5 text-lg font-semibold h-[70px] cursor-pointer'>
        {title}
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
        <span className='ml-0.5'>{view}</span>
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
        <span className='ml-0.5'>0</span>
      </div>
      <div className='cursor-pointer'>
        <p>{content}</p>
        <p className='mb-1'>{parseDateFunc(matchingTime)}</p>
      </div>

      {screenLevel === 1 ? (
        <UserProfileContainer />
      ) : (
        <div className='flex mt-7 justify-end gap-3 relative'>
          <button
            onClick={() => {
              setShowTeamModal(!showTeamModal);
            }}
            className='drop-shadow-xl h-9 w-[70px] border-solid border-[1.5px] border-white cursor-pointer'>
            팀원보기
          </button>
          <button className='drop-shadow-xl h-9 w-[70px] border-solid border-[1.5px] border-white cursor-pointer'>
            참여하기
          </button>
          {showTeamModal && (
            <div className='w-[300px] h-[170px] -right-[34px] bottom-12 px-4 absolute bg-white rounded-[10px] border-solid border-[1.5px] border-white'>
              <UserProfileContainer />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const CompleteRibon = tw.img`
  absolute w-[71px] h-[84.5px] top-[-6px] right-[-6px]
`;

export default RecuitPostContainer;
