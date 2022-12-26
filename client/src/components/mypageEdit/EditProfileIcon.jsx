import React, { useState } from 'react';
import Modal from 'react-modal';
import tw from 'tailwind-styled-components';

const EditProfileIcon = ({ showAddProfileIcon, setShowAddProfileIcon }) => {
  const modalStyle = {
    content: {
      top: '35%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '26%',
      height: '62%',
      'border-radius': '50px',
      background: '#D0DBF6',
    },
  };
  const [tempProfileImg, setTempProfileImg] = useState(false);
  return (
    <Modal style={modalStyle} isOpen={showAddProfileIcon} onRequestClose={() => setShowAddProfileIcon(false)}>
      <UploadProfile>프로필 사진을 업로드하세요</UploadProfile>
      <ProfileImageBox>
        {tempProfileImg ? (
          <img className='rounded-full w-full h-3/4' src={URL.createObjectURL(tempProfileImg)} alt='uploaded image' />
        ) : (
          <div className='rounded-full bg-gray-400 w-full h-3/4'></div>
        )}
      </ProfileImageBox>
      <form>
        <input type='file' onChange={(e) => setTempProfileImg(e.target.files[0])} />
        <EditBtnContainer>
          <EditBtn type='submit'>저장하기</EditBtn>
          <EditBtn>취소하기</EditBtn>
        </EditBtnContainer>
      </form>
    </Modal>
  );
};

const UploadProfile = tw.h2`
  text-center text-xl
`;
const ProfileImageBox = tw.div`
  w-3/4 h-3/4 flex items-center mx-auto
`;
const EditBtn = tw.button`
  text-gray-500 ml-4 bg-white px-5 py-1 rounded-md shadow-lg
`;
const EditBtnContainer = tw.div`
  w-full flex justify-center mt-4
`;
export default EditProfileIcon;
