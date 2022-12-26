import React, { useState, useEffect } from 'react';
import { get } from '../../utils/api';
import Review from '../../modals/Review';
import { useNavigate } from 'react-router-dom';
import tw from 'tailwind-styled-components';

const UserBanner = ({ userData }) => {
  const [visible, setVisible] = useState(false);
  const [reviewData, setReviewData] = useState([]);

  const navigate = useNavigate();

  const fetchReviewData = async () => {
    const data = await get('/api/evaluate/shortevaluate');
    console.log(data);
    setReviewData(data.reverse());
  };

  useEffect(() => {
    fetchReviewData();
  }, []);

  // const reviewData = [
  //   { nick_name: '독설가', contents: '착한 매너에 그렇지 못한 실력', profile_image: teamMember1, date: '2022.11.18' },
  //   { nick_name: '런닝맨', contents: '문제를 너무 못푸시네요ㅜㅜ', profile_image: teamMember2, date: '2022.11.20' },
  //   { nick_name: '프로 탈옥수', contents: '매너 좋아요~', profile_image: teamMember3, date: '2022.12,08' },
  //   { nick_name: '방가맨', contents: '시간 약속 잘 지켜요!', profile_image: teamMember4, date: '2022.12.21' },
  // ].reverse();

  return (
    <>
      <Container>
        <Wrapper onClick={() => navigate('/matching-list')}>
          <Title>매칭 횟수</Title>
          <Count>{userData.matchingCount}회</Count>
        </Wrapper>
        <div className='border-l-[1px] border-l-slate-800 h-[80%]'></div>
        <Wrapper onClick={() => setVisible(!visible)}>
          <Title>받은 매너 평가</Title>
          <Count>{reviewData.length}개</Count>
        </Wrapper>
      </Container>
      {visible && <Review setVisible={setVisible} reviewData={reviewData} />}
    </>
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
