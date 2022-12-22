import React, { useState } from 'react';
import teamMember1 from '../assets/images/user-profile/동하.png';
import teamMember2 from '../assets/images/user-profile/동현.JPG';
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

const Evaluation = ({ selectedList, setVisible }) => {
  const TEAM_MEMBERS = [
    { nick_name: '프로 탈옥수', profile_image: teamMember1 },
    { nick_name: '햄토리', profile_image: teamMember2 },
    { nick_name: '비둘기', profile_image: teamMember3 },
    { nick_name: '비둘기', profile_image: teamMember4 },
    { nick_name: '비둘기', profile_image: teamMember5 },
    { nick_name: '비둘기', profile_image: teamMember6 },
  ];

  const date = selectedList.date;
  const [YEAR, MONTH, DATE] = date.split('.');

  const [mannerScore, setMannerScore] = useState(1);
  const [escapeScore, setEscapeScore] = useState(1);

  return (
    <div className='h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-70'>
      <div className='h-[600px] bg-white rounded-2xl w-10/12 md:w-1/3 overflow-auto p-[20px]'>
        <div className='flex justify-between pb-[3px] border-b-[2px] border-slate-400'>
          <h2 className='text-lg'>팀원 평가</h2>
          <button onClick={() => setVisible(false)}>
            <img className='w-5 h-5' src={closeBtn} alt='닫기 버튼' />
          </button>
        </div>
        <h3 className='text-2xl text-center mx-[100px] my-[15px]'>{`${YEAR}년 ${MONTH}월 ${DATE}일 매칭된 방가인들은 어떠셨나요?`}</h3>
        <div>
          {TEAM_MEMBERS.map((member) => (
            <form key={member.nick_name} className='flex justify-between mb-[15px]'>
              <div className='w-[100px]'>
                <ProfileImg src={member.profile_image} alt='팀원 프로필 사진' />
                <div className='text-lg text-center'>{member.nick_name}</div>
              </div>
              <div className='flex flex-col'>
                <div className='flex'>
                  <div>
                    <span>매너지수</span>
                    <IconContainer onClick={(e) => setMannerScore(e.target.id)}>
                      <IconImg id='1' src={fullHeart} alt='꽉 찬 하트' />
                      {mannerScore >= 2 ? (
                        <IconImg id='2' src={fullHeart} alt='꽉 찬 하트' />
                      ) : (
                        <IconImg id='2' src={emptyHeart} alt='빈 하트' />
                      )}
                      {mannerScore >= 3 ? (
                        <IconImg id='3' src={fullHeart} alt='꽉 찬 하트' />
                      ) : (
                        <IconImg id='3' src={emptyHeart} alt='빈 하트' />
                      )}
                      {mannerScore >= 4 ? (
                        <IconImg id='4' src={fullHeart} alt='꽉 찬 하트' />
                      ) : (
                        <IconImg id='4' src={emptyHeart} alt='빈 하트' />
                      )}
                      {mannerScore >= 5 ? (
                        <IconImg id='5' src={fullHeart} alt='꽉 찬 하트' />
                      ) : (
                        <IconImg id='5' src={emptyHeart} alt='빈 하트' />
                      )}
                    </IconContainer>
                  </div>
                  <div>
                    <span>탈출레벨</span>
                    <IconContainer onClick={(e) => setEscapeScore(e.target.id)}>
                      <IconImg id='1' src={fullKey} alt='꽉 찬 키' />
                      {escapeScore >= 2 ? (
                        <IconImg id='2' src={fullKey} alt='꽉 찬 키' />
                      ) : (
                        <IconImg id='2' src={emptyKey} alt='빈 키' />
                      )}
                      {escapeScore >= 3 ? (
                        <IconImg id='3' src={fullKey} alt='꽉 찬 키' />
                      ) : (
                        <IconImg id='3' src={emptyKey} alt='빈 키' />
                      )}
                      {escapeScore >= 4 ? (
                        <IconImg id='4' src={fullKey} alt='꽉 찬 키' />
                      ) : (
                        <IconImg id='4' src={emptyKey} alt='빈 키' />
                      )}
                      {escapeScore >= 5 ? (
                        <IconImg id='5' src={fullKey} alt='꽉 찬 키' />
                      ) : (
                        <IconImg id='5' src={emptyKey} alt='빈 키' />
                      )}
                    </IconContainer>
                  </div>
                </div>
                <input
                  className='rounded-[80px] w-[310px] h-[40px] mt-[10px] px-[8px]  bg-gray border  border-[black]  border-[2px] '
                  type='text'
                  placeholder='한 줄 평 (선택)'
                />
              </div>
              <div>{mannerScore}</div>
              <div>{escapeScore}</div>
            </form>
          ))}
        </div>
        <button
          onClick={() => {}}
          type='submit'
          className='font-semibold text-white border-4 bg-blue-500 shadow-lg shadow-gray-500/50 my-[10px] px-[15px] py-[5px] rounded-lg'>
          제출하기
        </button>
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
  cursor-pointer
`;
