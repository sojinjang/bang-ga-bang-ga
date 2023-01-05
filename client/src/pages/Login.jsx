import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { showForgotAtom } from '../recoil/login';
import Background from '../components/common/Background';
import Navigators from '../components/common/Navigators';
import LoginForm from '../components/login/LoginForm';
import { Keys } from '../constants/Keys';
import { setCookie } from '../utils/cookie';
import { post } from '../utils/api';
import jwt_decode from 'jwt-decode';
import { ApiUrl } from '../constants/ApiUrl';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showForgot, setShowForgot] = useRecoilState(showForgotAtom);
  const onForgotBtn = (e) => {
    e.preventDefault();
    setShowForgot(true);
  };
  const onClickregister = (e) => {
    e.preventDefault();
    navigate('/register');
  };
  const loginRequest = async () => {
    try {
      const response = await post(ApiUrl.LOGIN, { email, password });
      const accessToken = response.accessToken;
      const userId = jwt_decode(accessToken).userId;
      setCookie(Keys.LOGIN_TOKEN, accessToken);
      setCookie(Keys.USER_ID, userId);
      navigate('/');
    } catch (err) {
      alert(err);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    loginRequest();
  };

  return (
    <Background img={'bg2'}>
      <Navigators />
      <LoginForm
        onSubmit={onSubmit}
        onClickregister={onClickregister}
        setEmail={setEmail}
        setPassword={setPassword}
        showForgot={showForgot}
        onForgotBtn={onForgotBtn}
      />
    </Background>
  );
};

export default Login;
