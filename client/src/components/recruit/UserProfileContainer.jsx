import React, { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { showUserProfileModalAtom, currentPostIdAtom, currentUserIndexAtom } from '../../recoil/recruit-list/index';

import crown from '../../assets/images/icon/crown.png';
import { get } from '../../utils/api';
import { ApiUrl } from '../../constants/ApiUrl';

const UserProfileContainer = ({ postId }) => {
  const [showUserProfileModal, setShowUserProfileModal] = useRecoilState(showUserProfileModalAtom);
  const setCurrentPostId = useSetRecoilState(currentPostIdAtom);
  const setCurrentUserIndex = useSetRecoilState(currentUserIndexAtom);
  const [currentTeamInfo, setCurrentTeamInfo] = useState([]);

  const userArray = async () => {
    try {
      const data = await get(ApiUrl.RECRUIT_USER_INFO, postId);
      setCurrentPostId(postId);
      setCurrentTeamInfo(data);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    userArray();
  }, []);

  return (
    <div>
      <img className='absolute w-[30px] top-2 left-[40px] z-20' src={crown} alt='' />
      <div className='mt-8 grid gap-3 grid-cols-3 grid-rows-3'>
        {currentTeamInfo.length > 0 &&
          currentTeamInfo.map((user, index) => (
            <div className='flex flex-col text-center' key={index}>
              {user['profileImg'] && (
                <img
                  onClick={() => {
                    setCurrentUserIndex(index);
                    setShowUserProfileModal(!showUserProfileModal);
                  }}
                  className='mx-auto w-[50px] h-[50px] drop-shadow-xl object-cover rounded-full border-solid border-[0.5px] border-gray-500 cursor-pointer'
                  src={process.env.REACT_APP_SERVER_URL + user['profileImg']}
                  alt='유저 프로필'
                />
              )}
              <span className='text-black text-xs'>{user['nickName']}</span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserProfileContainer;
