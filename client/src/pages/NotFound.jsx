import React, { useState, useEffect } from 'react';
import './Home.css';
import tw from 'tailwind-styled-components';
import Background from '../components/common/Background';
const Notfound = () => {
  const [snow, setSnow] = useState([]);
  useEffect(() => {
    const letItSnow = setInterval(() => {
      setSnow([
        ...snow,
        <Snow
          style={{
            animation: 'fall 8s linear',
            opacity: `${Math.random()}`,
            left: `${Math.random() * window.screen.width * 0.98}px`,
          }}
          key={snow.length}
        />,
      ]);
    }, 1);
    return () => clearInterval(letItSnow);
  }, [snow]);
  return (
    <Background img={'bg1'}>
      {snow}
      404 not found
    </Background>
  );
};

const Snow = tw.div`
  w-2 h-2 rounded-full bg-white absolute
  top-[-8px] fall 
`;

export default Notfound;
