import React from 'react';
import tw from 'tailwind-styled-components';

import Background from '../components/common/Background';
import Navigators from '../components/common/Navigators';
import { RegionButton } from '../components/buttons/RegionButton';
import KakaoMap from '../components/recruit-map/KakaoMap';
import RecruitPostList from '../components/recruit-map/RecruitPostList';

const RecruitMap = () => {
  return (
    <Background img={'bg1'}>
      <Navigators />
      <div className='my-auto h-[88vh]'>
        <UpperPart className='flex flex-col '>
          <RegionButtonsContainer>
            <RegionButton title={'홍대'}></RegionButton>
            <RegionButton title={'강남'}></RegionButton>
            <RegionButton title={'건대'}></RegionButton>
          </RegionButtonsContainer>
        </UpperPart>
        <LowerPart className='flex flex-col px-[10vw] mt-8'>
          <ViewSection className=' overflow-hidden flex'>
            <KakaoMap></KakaoMap>
            <RecruitListWrapper className='overflow-y-auto overflow-x-hidden scrollbar-hide'>
              <RecruitPostList />
            </RecruitListWrapper>
          </ViewSection>
        </LowerPart>
      </div>
    </Background>
  );
};

const ViewSection = tw.div`
  w-[1250px] h-[70vh] bg-white bg-opacity-60 rounded-2xl
`;

const UpperPart = tw.div`
  px-[10vw]
`;

const LowerPart = tw.div`
  px-[10vw]
`;

const RegionButtonsContainer = tw.div`
  m-auto
`;

const RecruitListWrapper = tw.div`
  mx-auto my-2
`;

export default RecruitMap;
