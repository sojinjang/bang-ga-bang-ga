import React from 'react';

const BackgroundScroll = ({ img, children }) => {
  return (
    <div
      className='w-screen h-[200vh] flex justify-center items-center flex-col bg-cover relative'
      style={{ backgroundImage: `url(/images/backgrounds/${img}.png)` }}>
      {children}
    </div>
  );
};

export default BackgroundScroll;
