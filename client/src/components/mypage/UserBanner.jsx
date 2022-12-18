import React from 'react';
import tw from 'tailwind-styled-components';

const UserBanner = () => {
  return (
    <Container>
      <MatchCount>
        <h3>매칭 횟수</h3>
        <span>3회</span>
      </MatchCount>
      <MannerCount>
        <h3>받은 매너 평가</h3>
        <span>6개</span>
      </MannerCount>
    </Container>
  );
};

export default UserBanner;

const Container = tw.div`
  w-[800px]
  h-[300px]
  bg-[#8D8D8D]
`;

const MatchCount = tw.div`

`;

const MannerCount = tw.div`

`;
