import React from 'react';
import tw from 'tailwind-styled-components';
import { useRecoilValue } from 'recoil';
import { profileImgAtom } from '../../recoil/register';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

const UserProfile = ({ setShowAddProfileIcon }) => {
  const profileImg = useRecoilValue(profileImgAtom);
  return (
    <>
      <ProfileImgDiv>
        {profileImg && (
          <img
            className='w-full h-full rounded-full'
            src={process.env.REACT_APP_SERVER_URL + profileImg}
            alt='uploaded image'
          />
        )}
        <EditBtnDiv>
          <button onClick={() => setShowAddProfileIcon(true)}>
            <FontAwesomeIcon icon={faPen} />
          </button>
        </EditBtnDiv>
      </ProfileImgDiv>
    </>
  );
};

const ProfileImgDiv = tw.div`
  w-[160px] h-[160px] rounded-full bg-gray-300 relative
`;

const EditBtnDiv = tw.div`
absolute w-10 h-10  top-0 left-[90%]  
`;

export default UserProfile;
