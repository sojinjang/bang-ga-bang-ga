import React from 'react';
import { useNavigate } from 'react-router-dom';
import tw from 'tailwind-styled-components';

const UserBanner = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Wrapper onClick={() => navigate('/matching-list')}>
        <Title>매칭 횟수</Title>
        <Count>3회</Count>
      </Wrapper>
      <div className='border-l-[1px] border-l-slate-800 h-[80%]'></div>
      <Wrapper>
        <Title>받은 매너 평가</Title>
        <Count>6개</Count>
      </Wrapper>
    </Container>
  );
};

export default UserBanner;

const Container = tw.div`
  w-[700px]
  h-[15vh]
  bg-white
  bg-opacity-50
  rounded-[15px]
  mb-[30px]

  flex
  items-center
`;

const Wrapper = tw.div`
  cursor-pointer
  w-full

  flex
  flex-col
  items-center
`;

const Title = tw.h3`
  text-2xl
`;

const Count = tw.span`
  text-3xl
`;
