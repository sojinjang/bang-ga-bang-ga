import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { showForgotAtom } from '../recoil/login';
import Forgot from '../modals/Forgot';

const Login = () => {
  const navigate = useNavigate();
  const [showForgot, setShowForgot] = useRecoilState(showForgotAtom);
  const onForgotBtn = (e) => {
    e.preventDefault();
    setShowForgot(true);
  };
  return (
    <div
      className='h-screen flex items-center justify-center'
      style={{ backgroundImage: 'url(/images/backgrounds/bg1.png)' }}>
      <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
            이메일
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='email'
            type='text'
            placeholder='example@escape.elice'
          />
        </div>
        <div className='mb-6'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>
            암호
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
            id='password'
            type='password'
            placeholder='******************'
          />
        </div>
        <div className='flex items-center justify-between'>
          <button className='w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' type='button'>
            로그인
          </button>
        </div>
        <div className='flex items-center justify-between text-sm text-[#878787]'>
          <button
            onClick={() => {
              () => navigate('/register');
            }}>
            회원가입
          </button>
          <button onClick={onForgotBtn}>비밀번호 찾기</button>
        </div>
      </form>
      {showForgot && <Forgot />}
    </div>
  );
};

export default Login;
