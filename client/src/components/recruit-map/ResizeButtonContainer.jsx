import React from 'react';

const DecreaseButton = ({ level, setLevel, setScope, getMapScreenScope, map }) => {
  const MAX_LEVEL = 6;
  return (
    <div className='w-[35px] h-[35px] p-1 rounded-lg bg-white border-solid border-2 shadow-xl mr-1'>
      <button
        type='button'
        onClick={() => {
          if (level < MAX_LEVEL) setLevel(level + 1);
          setScope(getMapScreenScope(map));
        }}>
        <img src={`${process.env.PUBLIC_URL}/images/icon/minus.png`} alt='minus' />
      </button>
    </div>
  );
};

const IncreaseButton = ({ level, setLevel, setScope, getMapScreenScope, map }) => {
  return (
    <div className='w-[35px] h-[35px] p-1 rounded-lg bg-white border-solid border-2 shadow-xl'>
      <button
        type='button'
        onClick={() => {
          setLevel(level - 1);
          setScope(getMapScreenScope(map));
        }}>
        <img src={`${process.env.PUBLIC_URL}/images/icon/plus.png`} alt='plus' />
      </button>
    </div>
  );
};

export const ResizeButtonContainer = ({ level, setLevel, setScope, getMapScreenScope, map }) => {
  return (
    <div className='flex absolute bottom-2 right-2 z-10'>
      <DecreaseButton
        level={level}
        setLevel={setLevel}
        setScope={setScope}
        getMapScreenScope={getMapScreenScope}
        map={map}></DecreaseButton>
      <IncreaseButton
        level={level}
        setLevel={setLevel}
        setScope={setScope}
        getMapScreenScope={getMapScreenScope}
        map={map}></IncreaseButton>
    </div>
  );
};
