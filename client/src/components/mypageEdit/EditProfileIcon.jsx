import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import tw from 'tailwind-styled-components';
import { postImg, patch } from '../../utils/api';
import { getCookieValue } from '../../utils/cookie';
import { ApiUrl } from '../../constants/ApiUrl';

const EditProfileIcon = ({ showAddProfileIcon, setShowAddProfileIcon }) => {
  const userId = getCookieValue('userId');

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
  const [imgUrl, setImgUrl] = useState('');
  const [tempProfileImg, setTempProfileImg] = useState(false);

  const patchProfileUrl = async () => {
    console.log(imgUrl);
    try {
      await patch(ApiUrl.USER, userId, { profileImg: imgUrl });
    } catch (err) {
      alert(err);
    }
  };

  const uploadProfileImg = async () => {
    const formData = new FormData();
    formData.append('imgFile', tempProfileImg);
    try {
      const response = await postImg('/api/img-upload', formData);
      alert('프로필 사진이 정상적으로 업로드되었습니다');
      setImgUrl('/' + response.path);
    } catch (err) {
      console.log(err);
    }
  };
  const handleSubmit = async (e) => {
    await e.preventDefault();
    await uploadProfileImg();
    await setShowAddProfileIcon(false);
  };
  useEffect(() => {
    patchProfileUrl();
  }, [imgUrl]);

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
      <form onSubmit={handleSubmit} encType='multipart/form-data'>
        <input type='file' name='imgFile' onChange={(e) => setTempProfileImg(e.target.files[0])} />
        <EditBtnContainer>
          <EditBtn type='submit'>업로드</EditBtn>
          <EditBtn onClick={() => setShowAddProfileIcon(false)}>닫기</EditBtn>
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
