import React from 'react';
import tw from 'tailwind-styled-components';

const Login = () => (
  <BackGround style={{ backgroundImage: 'url(/images/bg1.png)' }}>
    로그인페이지입니다
  </BackGround>
);

const BackGround = tw.div`
  w-screen h-screen flex justify-center items-center
`;

export default Login;
