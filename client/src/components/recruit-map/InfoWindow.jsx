import React from 'react';

export const InfoWindow = ({ cafeName, recruitingNum }) => {
  return (
    <div id='controlCustomOverlay' className='bg-white'>
      <div className='title text-sm font-medium'>{cafeName}</div>
      <div className='recruiting-info text-xs'>방가방가에서 {recruitingNum}팀 모집중</div>
    </div>
  );
};
