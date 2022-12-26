import React from 'react';
import tw from 'tailwind-styled-components';

const UserInfo = ({ userData }) => {
  const { gender, age, mbti, preferenceTheme, nonPreferenceTheme, preferenceLocation } = userData;
  const USER_INFO = [
    ['성별', gender],
    ['나이', age],
    ['MBTI', mbti],
    ['선호 테마', preferenceTheme],
    ['비선호 테마', nonPreferenceTheme],
    ['선호 지역', preferenceLocation],
  ];

  return (
    <div className='w-[900px] bg-white bg-opacity-50 rounded-[15px] mx-auto flex justify-center items-center '>
      {/* <Container>
        <Information>
          <Title>성별</Title>
          <Body>{userData.gender}</Body>
        </Information>
        <Information>
          <Title>나이</Title>
          <Body>{userData.age}</Body>
        </Information>
        <Information>
          <Title>MBTI</Title>
          <Body>{userData.mbti}</Body>
        </Information>
        <Information>
          <Title>선호 테마</Title>
          <Body>{userData.preferenceTheme}</Body>
        </Information>
        <Information>
          <Title>비선호 테마</Title>
          <Body>{userData.nonPreferenceTheme}</Body>
        </Information>
        <Information>
          <Title>선호 지역</Title>
          <Body>홍대</Body>
        </Information>
      </Container> */}

      <Container>
        {USER_INFO.map((info) => (
          <Information key={info[0]}>
            <Title>{info[0]}</Title>
            <Body>{info[1]}</Body>
          </Information>
        ))}
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
