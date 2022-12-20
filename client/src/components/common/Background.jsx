import React from 'react';

const Background = ({ img, children }) => {
  return (
    <div
      className='w-full h-screen flex justify-center items-center flex-col bg-cover'
      style={{ backgroundImage: `url(/images/backgrounds/${img}.png)` }}>
      {children}
    </div>
  );
};

export default Background;
