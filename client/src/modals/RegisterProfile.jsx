import React, { useState, useEffect } from 'react';
import { useImmer } from 'use-immer';
import tw from 'tailwind-styled-components';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { showRegisterProfileAtom, showAddProfileIconAtom, profileImgAtom } from '../recoil/register';
import { patch, postImg } from '../utils/api';
import { REGISTER_USER_ADD_DATA } from '../constants/registerUserAddData';
import { ApiUrl } from '../constants/ApiUrl';

const RegisterProfile = ({ userId }) => {
  const setShowRegisterProfile = useSetRecoilState(showRegisterProfileAtom);
  const [tempProfileImg, setTempProfileImg] = useState(null);
  const [showAddProfileIcon, setShowAddProfileIcon] = useRecoilState(showAddProfileIconAtom);
  const [profileImg, setProfileImg] = useRecoilState(profileImgAtom);
  const [userAddInfo, setUserAddInfo] = useImmer({});

  const patchProfileUrl = async () => {
    try {
      await patch(ApiUrl.USER, userId, { profileImg: profileImg });
    } catch (err) {
      alert(err);
    }
  };

  const uploadProfileImg = async () => {
    const formData = new FormData();
    formData.append('imgFile', tempProfileImg);
    try {
      const response = await postImg(ApiUrl.UPLOAD_IMG, formData);
      setProfileImg('/' + response.path);
    } catch (err) {
      console.log(err);
    }
  };
  const handleSubmit = async (e) => {
    await e.preventDefault();
    await uploadProfileImg();
    // await patchProfileUrl();
    setShowAddProfileIcon(false);
  };
  useEffect(() => {
    patchProfileUrl();
  }, [profileImg]);
  const navigate = useNavigate();
  const onCancelBtn = () => {
    const later = confirm('추가정보를 입력하지 않고 가입을 완료하시겠습니까?');
    if (later) {
      alert('가입이 완료되었습니다');
      setShowRegisterProfile(false);
      navigate('/login');
    }
  };
  const addUserAddInfo = async () => {
    try {
      await patch(ApiUrl.USER, userId, { ...userAddInfo });
      alert('추가정보가 정상적으로 입력되었습니다');
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmitAddData = async () => {
    setShowRegisterProfile(false);
    addUserAddInfo();
  };

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

  return (
    <ModalBox>
      <div className='mt-[5%] m-auto h-1/4 flex relative'>
        <div className='w-[120px] h-[120px] rounded-full bg-white'>
          {profileImg && (
            <img
              className='w-full h-full rounded-full'
              src={process.env.REACT_APP_SERVER_URL + profileImg}
              alt='uploaded image'
            />
          )}
        </div>
        <div className='absolute w-10 h-10  top-0 left-[90%]'>
          <button onClick={() => setShowAddProfileIcon(true)}>
            <FontAwesomeIcon icon={faPen} />
          </button>
        </div>
        <Modal style={modalStyle} isOpen={showAddProfileIcon} onRequestClose={() => setShowAddProfileIcon(false)}>
          <h2 className='text-center text-xl'>프로필 사진을 업로드하세요</h2>
          <div className='w-3/4 h-3/4 flex items-center mx-auto'>
            {tempProfileImg ? (
              <img
                className='rounded-full w-full h-3/4'
                src={URL.createObjectURL(tempProfileImg)}
                alt='uploaded image'
              />
            ) : (
              <div className='rounded-full bg-gray-400 w-full h-3/4'></div>
            )}
          </div>
          <form onSubmit={handleSubmit} encType='multipart/form-data'>
            <input type='file' name='imgFile' onChange={(e) => setTempProfileImg(e.target.files[0])} />
            <div className='w-full flex justify-center mt-4'>
              <EditBtn type='submit'>업로드</EditBtn>
              <EditBtn onClick={() => setShowAddProfileIcon(false)}>닫기</EditBtn>
            </div>
          </form>
        </Modal>
      </div>
      <form className='h-3/4' onSubmit={onSubmitAddData}>
        {REGISTER_USER_ADD_DATA.map((data) => (
          <EditInputDiv key={data.name}>
            <EditInputName>{data.name}</EditInputName>
            <EditInput>
              {data.options ? (
                data.type === 'radio' ? (
                  data.options.map((option) => (
                    <RadioInput key={data.name + option} data={data} setData={setUserAddInfo} option={option} />
                  ))
                ) : (
                  <SelectInput data={data} setData={setUserAddInfo} />
                )
              ) : (
                <TextInput
                  type={data.type}
                  placeholder={data.placeHolder}
                  onChange={(e) => {
                    setUserAddInfo((userData) => {
                      userData[data.dataName] = e.target.value;
                    });
                  }}
                />
              )}
            </EditInput>
          </EditInputDiv>
        ))}
        <BtnBox onCancelBtn={onCancelBtn} />
      </form>
    </ModalBox>
  );
};

const BtnBox = ({ onCancelBtn }) => {
  return (
    <div className='BtnBox w-[90%] mx-auto flex  mb-[5%]'>
      <div className='ml-auto mt-4'>
        <button className='px-4 py-2 bg-[#E5E5E5] rounded-lg mr-2 shadow-xl' onClick={onCancelBtn}>
          취소
        </button>
        <button className='px-4 py-2 bg-[#BCE3FF] rounded-lg shadow-xl' type='submit'>
          완료
        </button>
      </div>
    </div>
  );
};

const ModalBox = tw.div`
  text-black
  mx-auto h-[114%] w-[94%] px-[4%]
      border-[10px] border-white rounded-[60px]
      flex flex-col 
      absolute
      top-0
      left-[3%]
      bg-[#8eebf9]
      
`;

const EditBtn = tw.button`
  text-gray-500 ml-4 bg-white px-5 py-1 rounded-md shadow-lg
`;

const EditInputDiv = tw.div`
  w-full h-8 mt-5 flex  
`;
const EditInputName = tw.div`
   flex justify-start items-center text-gray-500
`;
const EditInput = tw.div`
  flex ml-auto
`;

const TextInput = tw.input`
  w-full h-full rounded-full pl-3
`;
const RadioInput = ({ data, setData, option }) => {
  return (
    <div className='ml-2 text-center'>
      <label value={option}>{option}</label>
      <input
        type='radio'
        name={data.name}
        value={option}
        onChange={(e) => {
          setData((userData) => {
            userData[data.dataName] = e.target.value;
          });
        }}
      />
    </div>
  );
};
const SelectInput = ({ data, setData }) => {
  return (
    <select
      className='border border-black rounded ml-auto w-[80px]'
      name={data.name}
      onChange={(e) => {
        setData((userData) => {
          userData[data.dataName] = e.target.value;
        });
      }}>
      {data.options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default RegisterProfile;
