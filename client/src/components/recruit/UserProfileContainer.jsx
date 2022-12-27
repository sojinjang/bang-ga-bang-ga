import React from 'react';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { showUserProfileModalAtom } from '../../recoil/recruit-list/index';
import { get } from '../../utils/api';

const UserProfileContainer = ({ postId }) => {
  const [showUserProfileModal, setShowUserProfileModal] = useRecoilState(showUserProfileModalAtom);

  const userArray = async () => {
    const data = await get('/api/matching-situation/post', postId);
    console.log(data);

    return data;
  };

  useEffect(() => {
    userArray();
  }, []);

  return (
    <div>
      <span className='text-2xl ml-[13px]'>👑</span>
      <div className='grid gap-3 grid-cols-4 grid-rows-2'>
        {/* {userArray.map((user, index) => (
          <img
            onClick={() => setShowUserProfileModal(!showUserProfileModal)}
            className='w-[50px] h-[50px] drop-shadow-xl object-cover rounded-full border-solid border-[0.5px] border-gray-500 cursor-pointer'
            src={user['url']}
            alt='유저 프로필'
            key={index}
          />
        ))} */}
      </div>
    </div>
  );
};

export default UserProfileContainer;
