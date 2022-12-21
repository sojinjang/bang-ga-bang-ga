import React, { useState, useRef } from 'react';
import Background from '../components/common/Background';
import Navigators from '../components/common/Navigators';
import Evaluation from '../modals/Evaluation';
import tw from 'tailwind-styled-components';

const MatchingList = () => {
  const [visible, setVisible] = useState(false);
  const [selectedList, setSelectedList] = useState(null);
  // 날짜 최신순 정렬
  const LIST = [
    { matching_log_id: 1, date: '2022.12.02', title: '[강남] 방린이 모여라~ 친목환영', isEvaluated: false },
    { matching_log_id: 2, date: '2022.12.09', title: '[건대] 초고수 구합니다 공포 쫄보 금지', isEvaluated: true },
    { matching_log_id: 3, date: '2022.12.12', title: '[홍대] 같이 탈옥하실 분?', isEvaluated: false },
  ].reverse();

  return (
    <Background img={'bg3'}>
      <Navigators />
      <Container>
        <table className='w-[700px] text-xl text-left border-collapse'>
          <thead>
            <tr className='border-b-2 border-b-gray-300'>
              <Th>매칭 날짜</Th>
              <Th>매칭 제목</Th>
              <Th>평가하기</Th>
            </tr>
          </thead>
          <tbody>
            {LIST.map((list) => (
              <tr key={list.matching_log_id}>
                <Td>{list.date}</Td>
                <Td>{list.title}</Td>
                <Td>
                  {!list.isEvaluated && (
                    <button
                      className='text-white bg-blue-500 shadow-lg shadow-blue-500/50 px-[15px] py-[1px] rounded-lg'
                      onClick={() => {
                        setVisible(!visible);
                        setSelectedList(list);
                      }}>
                      팀원
                    </button>
                  )}
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </Container>
      {visible && <Evaluation selectedList={selectedList} setVisible={setVisible} />}
    </Background>
  );
};

export default MatchingList;

const Container = tw.div`
  w-[700px]
  h-[500px]
  bg-white
  bg-opacity-50
  rounded-[15px]
  p-[30px]
  mt-16

  flex
  justify-center
  items-start
`;

const Th = tw.th`
  pb-[8px]
`;

const Td = tw.td`
  p-[8px]
`;
