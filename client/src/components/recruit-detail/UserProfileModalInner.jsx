import React from 'react';
import LevelImage from '../common/LevelImage';
import MannerImage from '../common/MannerImage';
import tw from 'tailwind-styled-components';

const UserProfileModalInner = ({ userData }) => {
  const { gender, age, mbti, preferenceTheme, nonPreferenceTheme, preferenceLocation } = userData;
  const mannerScore = userData.mannerScore;
  const escapeScore = userData.escapeScore;
  const mannerProgressWith = 350 * (mannerScore / 100);
  const escapeProgressWith = 350 * (escapeScore / 100);

  const USER_INFO = [
    { name: '성별', value: gender === null ? '없음' : gender },
    { name: '나이', value: age === null ? '없음' : age },
    { name: 'MBTI', value: mbti === null ? '없음' : mbti },
    { name: '선호 테마', value: preferenceTheme === null ? '없음' : preferenceTheme },
    { name: '비선호 테마', value: nonPreferenceTheme === null ? '없음' : nonPreferenceTheme },
    { name: '선호 지역', value: preferenceLocation === null ? '없음' : preferenceLocation },
  ];

  return (
    <div className='h-[480px]'>
      <div>
        <section>
          <h3>매너점수💖</h3>
          {!isNaN(mannerScore) && (
            <Wrapper style={{ whiteSpace: 'nowrap' }}>
              <MannerProgress style={{ width: mannerProgressWith }}>
                <span>{mannerScore}점</span>
                <MannerImage score={mannerScore} size={20} />
              </MannerProgress>
            </Wrapper>
          )}
          <div style={{ paddingLeft: mannerProgressWith - 15 }}>{mannerScore}점</div>
        </section>

        <section>
          <h3>탈출레벨🔑</h3>
          {!isNaN(escapeScore) && (
            <Wrapper style={{ whiteSpace: 'nowrap' }}>
              <EscapeProgress style={{ width: escapeProgressWith }}>
                <span>{userData.tier}</span>
                <LevelImage score={escapeScore} size={20} />
              </EscapeProgress>
            </Wrapper>
          )}
          <div style={{ paddingLeft: escapeProgressWith - 15 }}>{escapeScore}점</div>
        </section>
      </div>
      <div className='w-[360px] bg-white bg-opacity-50 rounded-[15px] mt-[20px] mx-auto flex justify-center items-center '>
        <Container>
          {USER_INFO.map((info) => (
            <Information key={info.name}>
              <Title>{info.name}</Title>
              <Body>{info.value}</Body>
            </Information>
          ))}
        </Container>
      </div>
    </div>
  );
};

export default UserProfileModalInner;

const Wrapper = tw.div`
  w-[360px]
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

const Container = tw.table`
  w-full
`;

const Information = tw.tr`
  border-b-2
  border-b-slate-300
`;

const Title = tw.th`
  w-[180px]
  p-[4.9px]
  pl-[30px]
  text-start
  font-semibold
`;

const Body = tw.td`
  p-[3px]
`;
