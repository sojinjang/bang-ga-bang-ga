import React from 'react';
import tw from 'tailwind-styled-components';

const UserScore = ({ userData }) => {
  const mannerScore = userData.mannerScore;
  const escapeScore = userData.escapeScore;
  const mannerProgressWith = 700 * (mannerScore / 100);
  const escapeProgressWith = 700 * (escapeScore / 100);

  return (
    <>
      <section>
        <h3>매너점수💖</h3>
        <Wrapper style={{ whiteSpace: 'nowrap' }}>
          <MannerProgress style={{ width: mannerProgressWith }}>{mannerScore}점😊</MannerProgress>
        </Wrapper>
        <div style={{ paddingLeft: mannerProgressWith - 15 }}>{mannerScore}점</div>
      </section>

      <section>
        <h3>탈출레벨🔑</h3>
        <Wrapper style={{ whiteSpace: 'nowrap' }}>
          <EscapeProgress style={{ width: escapeProgressWith }}>{userData.tier}🥇</EscapeProgress>
        </Wrapper>
        <div style={{ paddingLeft: escapeProgressWith - 15 }}>{escapeScore}점</div>
      </section>
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
  w-[490px]
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

const EscapeProgress = tw.div`
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
