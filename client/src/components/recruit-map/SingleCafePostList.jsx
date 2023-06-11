import React from 'react';
import RecuitPostContainer from '../recruit/RecruitPostContainer';

const CafeDescription = ({ cafeId, recruitingInfo }) => {
  return (
    recruitingInfo[cafeId] && (
      <div className='my-3'>
        <div className='text-lg font-semibold text-blue-4'>
          {recruitingInfo[cafeId]['recruitingInfo'].length}팀 모집중
        </div>
        <div className='text-xl font-medium'>{recruitingInfo[cafeId]['cafeInfo'].cafeName}</div>
        <div>{recruitingInfo[cafeId]['cafeInfo'].address}</div>
      </div>
    )
  );
};

const SingleCafePostList = ({ cafeId, recruitingInfo }) => {
  return (
    <div>
      <CafeDescription cafeId={cafeId} recruitingInfo={recruitingInfo} />
      {recruitingInfo[cafeId] &&
        recruitingInfo[cafeId]['recruitingInfo'].map((recruitPost) => (
          <RecuitPostContainer key={recruitPost.matchingPostsId} postData={recruitPost} />
        ))}
    </div>
  );
};

export default SingleCafePostList;
