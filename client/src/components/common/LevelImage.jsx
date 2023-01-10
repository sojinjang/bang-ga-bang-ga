import React from 'react';
import level1 from '../../assets/images/icon/lv1.png';
import level2 from '../../assets/images/icon/lv2.png';
import level3 from '../../assets/images/icon/lv3.png';
import level4 from '../../assets/images/icon/lv4.png';
import level5 from '../../assets/images/icon/lv5.png';

const LevelImage = ({ score, size }) => {
  if (score >= 80) {
    return <img src={level5} style={{ width: size, height: size, display: 'inline-block' }} alt='이모지' />;
  } else if (score >= 60) {
    return <img src={level4} style={{ width: size, height: size, display: 'inline-block' }} alt='이모지' />;
  } else if (score >= 40) {
    return <img src={level3} style={{ width: size, height: size, display: 'inline-block' }} alt='이모지' />;
  } else if (score >= 20) {
    return <img src={level2} style={{ width: size, height: size, display: 'inline-block' }} alt='이모지' />;
  } else {
    return (
      <img src={level1} style={{ minWidth: size, width: size, height: size, display: 'inline-block' }} alt='이모지' />
    );
  }
};

export default LevelImage;
