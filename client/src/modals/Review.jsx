import React from 'react';
import closeBtn from '../assets/images/icon/close.png';
import tw from 'tailwind-styled-components';

const Review = ({ setVisible, REVIEW }) => {
  return (
    <div className='h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-70'>
      <div className='h-[600px] bg-white rounded-2xl w-10/12 md:w-1/3 overflow-auto p-[20px]'>
        <div className='flex justify-between pb-[3px] border-b-[2px] border-slate-400'>
          <h2 className='text-lg'>후기 {REVIEW.length}개</h2>
          <button onClick={() => setVisible(false)}>
            <img className='w-5 h-5' src={closeBtn} alt='닫기 버튼' />
          </button>
        </div>
        <div className='py-[20px] px-[10px]'>
          {REVIEW.map((member) => (
            <div key={member.nick_name} className='mb-[20px]'>
              <section className='flex justify-between'>
                <div className='flex'>
                  <ProfileImg src={member.profile_image} alt='팀원 프로필 사진' />
                  <div className='mt-[5px] ml-[10px]'>
                    <span className='text-lg'>{member.nick_name}</span>
                    <div className='text-xl bg-amber-200 bg-opacity-70'>{member.contents}</div>
                  </div>
                </div>
                <div>{member.date}</div>
              </section>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Review;

const ProfileImg = tw.img`
  w-[80px]
  h-[80px]
  rounded-[50%]
  border-4
  border-cyan-500
  object-cover
  shadow-lg
`;
