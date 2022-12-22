import React from 'react';
import tw from 'tailwind-styled-components';

const UserInfo = () => {
  return (
    <div className='w-[900px] bg-white bg-opacity-50 rounded-[15px] mx-auto flex justify-center items-center '>
      <Container>
        {/* DB에서 받을 정보 */}
        <Information>
          <Title>성별</Title>
          <Body>남성</Body>
        </Information>
        <Information>
          <Title>나이</Title>
          <Body>20대</Body>
        </Information>
        <Information>
          <Title>MBTI</Title>
          <Body>ESFJ</Body>
        </Information>
        <Information>
          <Title>선호 테마</Title>
          <Body>판타지</Body>
        </Information>
        <Information>
          <Title>비선호 테마</Title>
          <Body>공포</Body>
        </Information>
        <Information>
          <Title>선호 지역</Title>
          <Body>홍대</Body>
        </Information>
      </Container>
    </div>
  );
};

export default UserInfo;

const Container = tw.table`
  w-[700px]
  h-[300px]
`;

const Information = tw.tr`
  border-b-2
  border-b-slate-300
`;

const Title = tw.th`
  p-[10px]
  text-xl
`;

const Body = tw.td`
  p-[10px]
  text-xl
`;
