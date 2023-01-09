import React from 'react';
import closeBtn from '../assets/images/icon/close.png';
import Profile from '../components/common/Profile';

const Review = ({ setVisible, reviewData }) => {
  return (
    <div className='h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-70'>
      <div className='h-[600px] bg-white rounded-2xl w-10/12 md:w-1/3 overflow-auto p-[20px]'>
        <div className='flex justify-between pb-[3px] border-b-[2px] border-slate-400'>
          <h2 className='text-lg'>후기 {reviewData.length}개</h2>
          <button onClick={() => setVisible(false)}>
            <img className='w-5 h-5' src={closeBtn} alt='닫기 버튼' />
          </button>
        </div>
        <div className='py-[20px] px-[10px]'>
          {reviewData.map((review) => (
            <div key={review.nick_name} className='mb-[20px]'>
              <section className='flex justify-between'>
                <div className='flex'>
                  {review.profileImg && (
                    <Profile img={process.env.REACT_APP_SERVER_URL + review.profileImg} size={80} />
                  )}
                  <div className='mt-[5px] ml-[10px]'>
                    <span className='text-lg'>{review.nickName}</span>
                    <div className='text-xl bg-amber-200 bg-opacity-70'>{review.shortEvaluate}</div>
                  </div>
                </div>
                <div>{review.updatedAt.slice(0, 10).replaceAll('-', '.')}</div>
              </section>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Review;
