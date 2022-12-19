import React from 'react';
import listIcon from '../../assets/images/icon/list-icon.png';
import mapIcon from '../../assets/images/icon/map-icon.png';

const RecruitTypeIcon = () => {
  return (
    <ul className='flex flex-row justify-between w-[125px] my-[30px] mx-auto'>
      <li className=''>
        <img className='w-[50px] drop-shadow-lg' src={listIcon} alt='리스트 아이콘' />
        <p className='text-center'>List</p>
      </li>
      <li className=''>
        <img className='w-[50px] drop-shadow-lg' src={mapIcon} alt='지도 아이콘' />
        <p className='text-center'>Map</p>
      </li>
    </ul>
  );
};

export default RecruitTypeIcon;
