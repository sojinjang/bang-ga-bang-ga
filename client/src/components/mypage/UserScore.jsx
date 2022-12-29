import React from 'react';
import tw from 'tailwind-styled-components';

import level1 from '../../assets/images/icon/lv1.png';
import level2 from '../../assets/images/icon/lv2.png';
import level3 from '../../assets/images/icon/lv3.png';
import level4 from '../../assets/images/icon/lv4.png';
import level5 from '../../assets/images/icon/lv5.png';
import mn1 from '../../assets/images/icon/manner1.png';
import mn2 from '../../assets/images/icon/manner2.png';
import mn3 from '../../assets/images/icon/manner3.png';
import mn4 from '../../assets/images/icon/manner4.png';
import mn5 from '../../assets/images/icon/manner5.png';

const UserScore = ({ userData }) => {
  const mannerScore = userData.mannerScore;
  const escapeScore = userData.escapeScore;
  const mannerProgressWith = 700 * (mannerScore / 100);
  const escapeProgressWith = 700 * (escapeScore / 100);

  const myMedalImg = (score) => {
    const medalImg = score >= 80 ? level5 : score >= 60 ? level4 : score >= 40 ? level3 : score >= 20 ? level2 : level1;
    return medalImg;
  };
  const myMannerImg = (score) => {
    const mannerImg = score >= 80 ? mn5 : score >= 60 ? mn4 : score >= 40 ? mn3 : score >= 20 ? mn2 : mn1;
    return mannerImg;
  };
  myMedalImg(escapeScore);
  myMannerImg(mannerScore);

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
  
  flex
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
