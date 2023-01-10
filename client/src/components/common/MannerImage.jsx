import React from 'react';
import manner1 from '../../assets/images/icon/manner1.png';
import manner2 from '../../assets/images/icon/manner2.png';
import manner3 from '../../assets/images/icon/manner3.png';
import manner4 from '../../assets/images/icon/manner4.png';
import manner5 from '../../assets/images/icon/manner5.png';

const MannerImage = ({ score, size }) => {
  if (score >= 80) {
    return <img src={manner5} style={{ width: size, height: size, display: 'inline-block' }} alt='이모지' />;
  } else if (score >= 60) {
    return <img src={manner4} style={{ width: size, height: size, display: 'inline-block' }} alt='이모지' />;
  } else if (score >= 40) {
    return <img src={manner3} style={{ width: size, height: size, display: 'inline-block' }} alt='이모지' />;
  } else if (score >= 20) {
    return <img src={manner2} style={{ width: size, height: size, display: 'inline-block' }} alt='이모지' />;
  } else {
    return (
      <img src={manner1} style={{ minWidth: size, width: size, height: size, display: 'inline-block' }} alt='이모지' />
    );
  }
};

export default MannerImage;
