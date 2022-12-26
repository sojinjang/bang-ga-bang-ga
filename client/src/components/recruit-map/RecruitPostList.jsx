import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { targetCafeAtom } from '../../recoil/recruit-map';

import { ApiUrl } from '../../constants/ApiUrl';
import * as api from '../../utils/api';
import RecuitPostContainer from '../recruit/RecruitPostContainer';

async function getRecruitingInfo(cafeId) {
  try {
    const cafeRecruitingArr = await api.get(ApiUrl.RECRUITING_INFO, cafeId);
    return cafeRecruitingArr;
  } catch (err) {
    alert(err.message);
  }
}

export default function RecruitPostList() {
  const targetCafe = useRecoilValue(targetCafeAtom);
  const [recruitingInfo, setRecruitingInfo] = useState({});
  const addRecruitingData = async (cafeId) => {
    const cafeRecruitingArr = await getRecruitingInfo(cafeId);
    setRecruitingInfo({ ...recruitingInfo, [cafeId]: cafeRecruitingArr });
  };
  const CafeDescription = () => {
    return (
      recruitingInfo[targetCafe] && (
        <div className='my-3'>
          <div className='text-lg font-semibold text-blue-4'>
            {recruitingInfo[targetCafe]['recruitingInfo'].length}팀 모집중
          </div>
          <div className='text-xl font-medium'>{recruitingInfo[targetCafe]['cafeInfo'].cafeName}</div>
          <div>{recruitingInfo[targetCafe]['cafeInfo'].address}</div>
        </div>
      )
    );
  };

  if (targetCafe && !recruitingInfo[targetCafe]) addRecruitingData(targetCafe);

  return (
    <div>
      <CafeDescription />
      {recruitingInfo[targetCafe] &&
        recruitingInfo[targetCafe]['recruitingInfo'].map((recruitPost) => (
          <RecuitPostContainer key={recruitPost.matchingPostsId} postData={recruitPost} />
        ))}
    </div>
  );
}
