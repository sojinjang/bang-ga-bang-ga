import React from 'react';
import tw from 'tailwind-styled-components';

const Home = () => {
  return (
    <div>
      <ContentBox>안녕하세요 홈화면입니다</ContentBox>
    </div>
  );
};

export default Home;

const ContentBox = tw.div`
  mx-auto
  flex 
  justify-center 
  items-center 
  font-bold 
  mt-16
  w-48
  h-32 
  border-4
`;
