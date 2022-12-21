import React from 'react';
import tw from 'tailwind-styled-components';

const UserScore = () => {
  return (
    <>
      <h3>매너점수💖</h3>
      <Wrapper>
        <MannerProgress>70점😊</MannerProgress>
      </Wrapper>
      <MannerScore>70점</MannerScore>

      <h3>탈출레벨🔑</h3>
      <Wrapper>
        <EscapeProgress>gold🥇</EscapeProgress>
      </Wrapper>
      <EscapeScore>55점</EscapeScore>
    </>
  );
};

export default UserScore;

const Wrapper = tw.div`
  w-[700px]
  bg-gray-200
  rounded-[20px]
`;

const MannerProgress = tw.div`
  w-[70%]
  bg-pink-400
  font-medium
  text-lg
  text-white
  text-center
  p-[3px]
  leading-none
  rounded-[20px]
  shadow-lg
  shadow-pink-500/50
`;

// translate 계산: Wrapper width * Progress width - 15 = 700 * 0.7 - 15 = 335px
const MannerScore = tw.div`
  translate-x-[475px]
`;

const EscapeProgress = tw.div`
  w-[55%]
  bg-blue-500
  font-medium
  text-lg
  text-white
  text-center
  p-[3px]
  leading-none
  rounded-[20px]
  shadow-lg
  shadow-blue-500/50
`;

const EscapeScore = tw.div`
  translate-x-[370px]
`;
