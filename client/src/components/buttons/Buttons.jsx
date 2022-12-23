import React from 'react';
import { useSetRecoilState } from 'recoil';
import { regionAtom } from '../../recoil/recruit-map/index';
import './Buttons.css';

const RegionButton = (props) => {
  const setRegion = useSetRecoilState(regionAtom);
  return (
    <button
      className='purpleButton mx-1'
      role='button'
      onClick={() => {
        setRegion(props.title);
      }}>
      {props.title}
    </button>
  );
};

export { RegionButton };
