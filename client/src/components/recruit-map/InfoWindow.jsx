import React from 'react';

export const InfoWindow = ({ cafeName, recruitingNum }) => {
  return (
    <div id='controlCustomOverlay' className='wrap rounded-2xl bg-purple-200 bg-opacity-60 '>
      <div className='title text-sm font-medium'>{cafeName}</div>
      <div className='recruiting-info text-xs'>방가방가에서 모집중인 팀 {recruitingNum}팀</div>
    </div>
  );
};
