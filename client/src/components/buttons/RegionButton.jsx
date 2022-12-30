import React from 'react';
import { useSetRecoilState } from 'recoil';
import { regionAtom } from '../../recoil/recruit-map/index';
import './RegionButton.css';

const RegionButton = ({ title }) => {
  const setRegion = useSetRecoilState(regionAtom);
  return (
    <button
      className='purpleButton mx-1'
      role='button'
      onClick={() => {
        setRegion(title);
      }}>
      {title}
    </button>
  );
};

export { RegionButton };
