import React, { useEffect, useRef } from 'react';

export const InfoWindow = ({ cafeName, recruitingNum }) => {
  const customOverlayRef = useRef(null);

  useEffect(() => {
    if (customOverlayRef.current) {
      const customOverlay = customOverlayRef.current;
      customOverlay.parentElement.parentElement.style.border = 'none';
      customOverlay.parentElement.parentElement.style.backgroundColor = 'transparent';
      customOverlay.parentElement.parentElement.style.width = '180px';
      customOverlay.parentElement.previousSibling.style.background = 'none';
    }
  }, []);

  return (
    <div ref={customOverlayRef} className='wrap rounded-2xl bg-purple-200 bg-opacity-80 p-2.5'>
      <div className='title text-sm font-medium'>{cafeName}</div>
      <div className='recruiting-info text-xs'>방가방가에서 모집중인 팀 {recruitingNum}팀</div>
    </div>
  );
};
