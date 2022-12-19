import React from 'react';
import './Buttons.css';

const RegionButton = (props) => {
  return (
    <button className='purpleButton' role='button'>
      {props.title}
    </button>
  );
};

export { RegionButton };
