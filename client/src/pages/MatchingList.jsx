import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { get } from '../utils/api';
import Background from '../components/common/Background';
import Navigators from '../components/common/Navigators';
import Evaluation from '../modals/Evaluation';
import tw from 'tailwind-styled-components';
import Pagination from 'react-js-pagination';
import './CafeList.css';
import { ApiUrl } from '../constants/ApiUrl';

const MatchingList = () => {
  const [visible, setVisible] = useState(false);
  const [selectedList, setSelectedList] = useState([]);

  const [recruitList, setRecruitList] = useState([]);
  const [pagePerList, setPagePerList] = useState([]);

  const [openTab, setOpenTab] = useState(1);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const handlePageChange = (page) => {
    setPage(page);
  };

  const slicedList = () => {
    setPagePerList(recruitList.slice(5 * (page - 1), page * 5));
  };
  useEffect(() => {
    slicedList();
  }, [page, recruitList]);

  // 진행중:참가한 모집글 정보 - 날짜 최신순 정렬
  const getRecruitingData = async () => {
    const data = await get(ApiUrl.RECRUIT_USER_INFO_ALL);
    setRecruitList(data.sort((a,b)=>b.matchingTime-a.matchingTime));
  };

  // 매칭완료:참가한 모집글 정보 - 날짜 최신순 정렬
  const getRecruitedData = async () => {
    const data = await get(ApiUrl.RECRUIT_INFO);
    setRecruitList(data.sort((a,b)=>b.matchingTime-a.matchingTime));
  };

  useEffect(() => {
    getRecruitingData();
  }, []);

  useEffect(() => {
    getRecruitedData();
  }, [visible]);

  return (
    <Background img={'bg3'}>
      <Navigators />
      <div className=' flex flex-wrap w-[700px] mt-10'>
        <ul className='flex list-none flex-wrap pt-3 px-[15px] flex-row' role='tablist'>
          <li className='-mb-px mr-1 last:mr-0 flex-auto text-center'>
            <a
              className={
                'text-xs font-bold uppercase px-5 pt-3 rounded-t-[10px] block' +
                (openTab === 1 ? 'text-black bg-white pb-3' : 'text-gray-400 bg-white bg-opacity-50 pb-[9px]')
              }
              onClick={(e) => {
                e.preventDefault();
                setOpenTab(1);
                getRecruitingData();
                setPage(1);
              }}
              data-toggle='tab'
              href='#link1'
              role='tablist'>
              진행중
            </a>
          </li>
          <li className='-mb-px mr-2 last:mr-0 flex-auto text-center'>
            <a
              className={
                'text-xs font-bold uppercase px-5 pt-3 rounded-t-[10px]  block' +
                (openTab === 2 ? 'text-black bg-white pb-3' : 'text-gray-400 bg-white bg-opacity-50 pb-[9px]')
              }
              onClick={(e) => {
                e.preventDefault();
                setOpenTab(2);
                getRecruitedData();
                setPage(1);
              }}
              data-toggle='tab'
              href='#link2'
              role='tablist'>
              매칭완료
            </a>
          </li>
        </ul>
        <div>
          <div className='px-4 flex-auto'>
            <div className='tab-content tab-space'>
              <div className={openTab === 1 ? 'block' : 'hidden'} id='link1'>
                <Container>
                  <table className='w-[800px] text-xl text-left border-collapse'>
                    <thead>
                      <tr className='border-b-2 border-b-gray-300'>
                        <Th>매칭 날짜</Th>
                        <Th>매칭 제목</Th>
                        <Th>게시글 보러가기</Th>
                      </tr>
                    </thead>

                    {recruitList.length !== 0 ? (
                      pagePerList.map((list) => (
                        
                        <tbody key={list.matching_log_id}>
                          <tr>
                            <Td>{list.matchingTime.toString().slice(0, 2)}.{list.matchingTime.toString().slice(2, 4)}.{list.matchingTime.toString().slice(4, 6)}</Td>
                            <Td>{list.title}</Td>
                            <Td>
                              {!list.isEvaluated && (
                                <button
                                  className='text-white bg-blue-500 shadow-lg shadow-blue-500/50 px-[15px] py-[1px] rounded-lg'
                                  onClick={() => {
                                    navigate(`/recruit-detail/${list.matchingPostsId}`);
                                  }}>
                                  이동
                                </button>
                              )}
                            </Td>
                          </tr>
                        </tbody>
                      ))
                    ) : (
                      <tbody>
                        <tr>
                          <Td></Td>
                          <Td></Td>
                          <Td></Td>
                        </tr>
                        <div>진행 중인 매칭 이력이 없습니다.</div>
                      </tbody>
                    )}
                  </table>
                  <div className='h-20 w-full place-content-center'>
                    <Pagination
                      activePage={page}
                      itemsCountPerPage={5}
                      totalItemsCount={recruitList.length}
                      pageRangeDisplayed={3}
                      prevPageText={'<'}
                      nextPageText={'>'}
                      hideDisabled={false}
                      hideFirstLastPages={true}
                      onChange={handlePageChange}
                      disabledClass={'cursor:not-allowed'}
                    />
                  </div>
                </Container>
              </div>

              <div className={openTab === 2 ? 'block' : 'hidden'} id='link2'>
                <Container>
                  <table className='w-[800px] text-xl text-left border-collapse'>
                    <thead>
                      <tr className='border-b-2 border-b-gray-300'>
                        <Th>매칭 날짜</Th>
                        <Th>매칭 제목</Th>
                        <Th>팀원 평가</Th>
                      </tr>
                    </thead>

                    {recruitList.length !== 0 ? (
                      pagePerList.map((list) => (
                        <tbody key={list.matching_log_id}>
                          <tr>
                            <Td>{list.matchingTime.toString().slice(0, 2)}.{list.matchingTime.toString().slice(2, 4)}.{list.matchingTime.toString().slice(4, 6)}</Td>
                            <Td>{list.title}</Td>
                            <Td>{list.title}</Td>
                            <Td>
                              {!list.isEvaluate == 1 ? (
                                <button
                                  className='text-white bg-blue-500 shadow-lg shadow-blue-500/50 px-[15px] py-[1px] rounded-lg'
                                  onClick={() => {
                                    setVisible(!visible);
                                    setSelectedList(list);
                                  }}>
                                  평가 남기기
                                </button>
                              ) : (
                                <button
                                  className='text-blue-500 border-bg-blue-500 px-[15px] py-[1px] rounded-lg'
                                  disabled>
                                  평가 완료
                                </button>
                              )}
                            </Td>
                          </tr>
                        </tbody>
                      ))
                    ) : (
                      <tbody>
                        <tr>
                          <Td></Td>
                          <Td></Td>
                          <Td></Td>
                        </tr>
                        <div>완료된 매칭 이력이 없습니다.</div>
                      </tbody>
                    )}
                  </table>
                  <div className='h-20 w-full place-content-center'>
                    <Pagination
                      activePage={page}
                      itemsCountPerPage={5}
                      totalItemsCount={recruitList.length}
                      pageRangeDisplayed={3}
                      prevPageText={'<'}
                      nextPageText={'>'}
                      hideDisabled={false}
                      hideFirstLastPages={true}
                      onChange={handlePageChange}
                    />
                  </div>
                </Container>
              </div>
            </div>
          </div>
        </div>
      </div>
      {visible && (
        <Evaluation getRecruitedData={getRecruitedData} selectedList={selectedList} setVisible={setVisible} />
      )}
    </Background>
  );
};

export default MatchingList;

const Container = tw.div`
  w-[900px]
  h-[500px]
  mt-[0.7rem]
  bg-white
  rounded-b-[15px]
  rounded-tr-[15px]
  p-[30px]
  pt-[40px]

  flex
  flex-col
  justify-between
  items-start

`;

const Th = tw.th`
  pb-[8px]
`;

const Td = tw.td`
  p-[8px]
`;
