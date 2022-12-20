import React from 'react';
import tw from 'tailwind-styled-components';
import Celebrate from '../modals/Celebrate';
import RegisterProfile from '../modals/RegisterProfile';
import { useRecoilState, useRecoilValue } from 'recoil';
import * as validator from '../utils/validator';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Background from '../components/common/Background';
import Navigators from '../components/common/Navigators';


const CafeList = () => {
  const navigate = useNavigate();
  return (
    <Background img={'bg2'}>
      <Navigators />
      <h1>방탈출카페 리스트를 보여줍니다.</h1>
    </Background>
  );
};

export default CafeList;
