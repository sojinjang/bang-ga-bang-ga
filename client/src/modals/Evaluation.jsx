import React, { useState } from 'react';
import teamMember1 from '../assets/images/user-profile/동하.png';
import teamMember2 from '../assets/images/user-profile/동현.jpg';
import teamMember3 from '../assets/images/user-profile/선아.png';
import teamMember4 from '../assets/images/user-profile/소진.jpg';
import teamMember5 from '../assets/images/user-profile/승빈.png';
import teamMember6 from '../assets/images/user-profile/재웅.png';
import closeBtn from '../assets/images/icon/close.png';
import fullHeart from '../assets/images/icon/full-heart.png';
import emptyHeart from '../assets/images/icon/empty-heart.png';
import fullKey from '../assets/images/icon/full-key.png';
import emptyKey from '../assets/images/icon/empty-key.png';
import tw from 'tailwind-styled-components';
import { useImmer } from 'use-immer';
import { get, post } from '../utils/api';
import { useEffect } from 'react';

const Evaluation = ({ selectedList, setVisible }) => {
  const matchingPostId = selectedList.matchingPostsId;
  const userId = selectedList.userId;
  const [evalRes, setEvalRes] = useImmer([]);
  const getMembers = async () => {
    try {
      const res = await get(`/api/matching-situation/myteam/${matchingPostId}`);
      const team = [];
      res.map((member) => {
        team.push({
          nickName: member['nickName'],
          evaluateTargetId: member['userId'],
          // profileImg: member['profileImg'],
          evaluatorId: userId,
        });
      });
      setEvalRes(team);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getMembers();
  }, []);

  const mockMembers = [
    { nickName: '서나서나', evaluateTargetId: 13, profileImg: null },
    { nickName: '보라돌이', evaluateTargetId: 8, profileImg: null },
  ];

  const TEAM_MEMBERS = [
    { nick_name: '프로 탈옥수', profile_image: teamMember1 },
    { nick_name: '햄토리', profile_image: teamMember2 },
    { nick_name: '비둘기', profile_image: teamMember3 },
    { nick_name: '다람쥐', profile_image: teamMember4 },
    { nick_name: '몬스터', profile_image: teamMember5 },
    { nick_name: '김승빈', profile_image: teamMember6 },
  ];

  const date = selectedList.date;
  // const [YEAR, MONTH, DATE] = date.split('.');
  const postEvaluation = async () => {
    try {
      const res = await post('/api/evaluate', evalRes);
    } catch (err) {
      console.log(err);
    }
  };

  const submitEvaluation = (e) => {
    e.preventDefault();
    const finish = confirm('평가를 완료하시겠습니까? 제출된 평가는 다시 수정할 수 없습니다');
    postEvaluation();
    {
      finish && (alert('평가가 완료되었습니다'), setVisible(false));
    }
  };

  return (
    <div className='h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-70'>
      <div className='h-[600px] bg-white rounded-2xl w-10/12 md:w-1/3 overflow-auto p-[20px]'>
        <div className='flex justify-between pb-[3px] border-b-[2px] border-slate-400'>
          <h2 className='text-lg'>팀원 평가</h2>
          <button onClick={() => setVisible(false)}>
            <img className='w-5 h-5' src={closeBtn} alt='닫기 버튼' />
          </button>
        </div>
        <h3 className='text-2xl text-center mx-[100px] my-[15px]'>{`일 매칭된 방가인들은 어떠셨나요?`}</h3>
        <form onSubmit={submitEvaluation}>
          <div>
            {evalRes.map(({ nickName, profileImg }) => (
              <div key={nickName} className='flex justify-between mb-[15px]'>
                <div className='w-[100px]'>
                  <ProfileImg src={profileImg} alt='팀원 프로필 사진' />
                  <div className='text-lg text-center'>{nickName}</div>
                </div>
                <div className='flex flex-col'>
                  <div className='flex'>
                    <div>
                      <span>매너지수</span>
                      <IconContainer>
                        {[1, 2, 3, 4, 5].map((value) => (
                          <IconImg
                            src={
                              evalRes.find((user) => user['nickName'] == nickName)
                                ? evalRes.find((user) => user['nickName'] == nickName).mannerEvaluate >= value
                                  ? fullHeart
                                  : emptyHeart
                                : emptyHeart
                            }
                            key={value}
                            onClick={(e) => {
                              e.preventDefault();
                              const mannerEvaluate = value;
                              setEvalRes((evalRes) => {
                                const userIndex = evalRes.findIndex((user) => user['nickName'] == nickName);
                                evalRes[userIndex] = { ...evalRes[userIndex], mannerEvaluate };
                              });
                            }}
                          />
                        ))}
                      </IconContainer>
                    </div>
                    <div>
                      <span>탈출레벨</span>
                      <IconContainer>
                        {[1, 2, 3, 4, 5].map((level) => (
                          <IconImg
                            src={
                              evalRes.find((user) => user['nickName'] == nickName)
                                ? evalRes.find((user) => user['nickName'] == nickName).escapeEvaluate >= level
                                  ? fullKey
                                  : emptyKey
                                : emptyKey
                            }
                            key={level}
                            onClick={(e) => {
                              e.preventDefault();
                              const escapeEvaluate = level;
                              setEvalRes((evalRes) => {
                                const userIndex = evalRes.findIndex((user) => user['nickName'] == nickName);
                                {
                                  userIndex == -1
                                    ? evalRes.push({ nickName, escapeEvaluate })
                                    : (evalRes[userIndex] = { ...evalRes[userIndex], escapeEvaluate });
                                }
                              });
                            }}
                          />
                        ))}
                      </IconContainer>
                    </div>
                  </div>
                  <input
                    className='rounded-[80px] w-[310px] h-[40px] mt-[10px] px-[8px]  bg-gray border-[black]  border-[2px] '
                    type='text'
                    placeholder='한 줄 평 (선택)'
                    onChange={(e) => {
                      const shortEvaluate = e.target.value;
                      setEvalRes((evalRes) => {
                        const userIndex = evalRes.findIndex((user) => user['nickName'] == nickName);
                        {
                          userIndex == -1
                            ? evalRes.push({ nickName, shortEvaluate })
                            : (evalRes[userIndex] = { ...evalRes[userIndex], shortEvaluate });
                        }
                      });
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <button
            type='submit'
            className='font-semibold text-white border-4 bg-blue-500 shadow-lg shadow-gray-500/50 my-[10px] px-[15px] py-[5px] rounded-lg'>
            제출하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default Evaluation;

const ProfileImg = tw.img`
    w-[100px]
    h-[100px]
    rounded-[50%]
    border-4
    border-cyan-500
    object-cover
    shadow-lg
`;

const IconContainer = tw.div`
  flex
  w-[160px]
`;

const IconImg = tw.img`
  w-[30px]
`;
