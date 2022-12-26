import React from 'react';
import Forgot from '../../modals/Forgot';
import tw from 'tailwind-styled-components';

const LoginForm = ({ onSubmit, onClickregister, setEmail, setPassword, showForgot, onForgotBtn }) => {
  return (
    <LoginFormContainer>
      <StyledLoginForm onSubmit={onSubmit}>
        <LoginInputBox setInput={setEmail} type={'email'} />
        <LoginInputBox setInput={setPassword} type={'password'} />
        <LoginBtn type='submit'>로그인</LoginBtn>
        <RegisterAndLost>
          <button onClick={onClickregister}>회원가입</button>
          <button onClick={onForgotBtn}>비밀번호 분실</button>
        </RegisterAndLost>
      </StyledLoginForm>
      {showForgot && <Forgot />}
    </LoginFormContainer>
  );
};

const LoginInputBox = ({ setInput, type }) => {
  return (
    <label>
      {type === 'email' ? '이메일' : '비밀번호'}:
      <LoginInput type={type === 'email' ? 'email' : 'password'} onChange={(e) => setInput(e.target.value)} />
    </label>
  );
};
const LoginBtn = tw.button`
  mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded
`;
const RegisterAndLost = tw.div`
  flex items-center justify-between text-sm text-[#878787]
`;
const LoginInput = tw.input`
  shadow border rounded w-full py-2 px-3 text-gray-700
`;
const LoginFormContainer = tw.div`
  w-full flex h-[70%] justify-center items-center
`;
const StyledLoginForm = tw.form`
  bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col
`;

export default LoginForm;
