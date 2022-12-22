import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { showForgotAtom } from '../recoil/login';
import Forgot from '../modals/Forgot';
import { isValidEmail } from '../utils/validator';
import Background from '../components/common/Background';
import Navigators from '../components/common/Navigators';
import { post } from '../utils/api';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showForgot, setShowForgot] = useRecoilState(showForgotAtom);
  const onForgotBtn = (e) => {
    e.preventDefault();
    setShowForgot(true);
  };
  const onClickregister = (e) => {
    e.preventDefault();
    navigate('/register');
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError('이메일 형식이 올바른지 확인해주세요');
      return;
    }
    post('/api/Users/login', { email, password });
  };

  return (
    <Background img={'bg2'}>
      <Navigators />
      <div className='w-full flex h-[70%] justify-center items-center'>
        <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4' onSubmit={onSubmit}>
          <label>
            이메일:
            <input
              className='
            shadow
            border
            rounded
            w-full
            py-2
            px-3
            text-gray-700
            '
              type='email'
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <br />
          <label>
            비밀번호:
            <input
              className='
            shadow
            border
            rounded
            w-full
            py-2
            px-3
            text-gray-700
            '
              type='password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          {error && <p className='text-red-500'>{error}</p>}
          <div className='flex items-center justify-between'>
            <button
              className='mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
              type='submit'>
              로그인
            </button>
          </div>
          <div className='flex items-center justify-between text-sm text-[#878787]'>
            <button onClick={onClickregister}>회원가입</button>
            <button onClick={onForgotBtn}>비밀번호 분실</button>
          </div>
        </form>
        {showForgot && <Forgot />}
      </div>
    </Background>
  );
};

export default Login;
