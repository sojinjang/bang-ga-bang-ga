import React from 'react';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { showUserProfileModalAtom } from '../../recoil/recruit-list/index';
import { get } from '../../utils/api';

import crown from '../../assets/images/icon/crown.png';

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
      <img className='absolute w-[30px] top-2 left-[40px]' src={crown} alt='' />
      </div>
    </div>
  );
};

export default UserProfileContainer;
