import React, { useState, useEffect } from 'react';
import * as api from '../utils/api';
import { ApiUrl } from '../constants/ApiUrl';
import Background from '../components/common/Background';
import Navigators from '../components/common/Navigators';
import Evaluation from '../modals/Evaluation';
import tw from 'tailwind-styled-components';

const MatchingList = () => {
  const [visible, setVisible] = useState(false);
  const [selectedList, setSelectedList] = useState([]);
  const [matchingList, setMatchingList] = useState([]);

  // 참가한 모집글 정보 - 날짜 최신순 정렬
  const recruitData = async () => {
    const data = await api.get(ApiUrl.RECRUIT_INFO);
    setMatchingList(data.reverse());
  };

  useEffect(() => {
    recruitData();
  }, []);

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
            {matchingList.map((list) => (
              <tr key={list.matching_log_id}>
                <Td>{list.createdAt.slice(0, 10).replaceAll('-', '.')}</Td>
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
