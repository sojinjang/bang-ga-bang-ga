import React, { useState, useEffect } from 'react';
import './Home.css';
import tw from 'tailwind-styled-components';
import Background from '../components/common/Background';
import { useNavigate } from 'react-router-dom';
const Notfound = () => {
  const navigate = useNavigate();
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
      <div className='w-full h-full flex flex-col  justify-center items-center'>
        <div className='bg-gray-100 mb-10 text-center p-4 rounded-[10px]'>
          <div>요청하신 주소는 존재하지 않는 페이지입니다</div>
          <div className='mt-10'>잠깐 눈 좀 구경하고 가세요!</div>
        </div>

        <button className='bg-blue-400 px-4 py-1 rounded border-2  border-white' onClick={() => navigate(-1)}>
          돌아가기
        </button>
      </div>
    </Background>
  );
};

const Snow = tw.div`
  w-2 h-2 rounded-full bg-white absolute
  top-[-8px] fall 
`;

export default Notfound;
