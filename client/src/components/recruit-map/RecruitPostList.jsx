import React, { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { targetCafeAtom, scopeAtom, cafesWithinScopeAtom } from '../../recoil/recruit-map';

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

// 지도 범위 내의 마커 게시물만 띄우기
// 1. 지도 이동시 scope state 변경 (recoil)
// 2. 지역 변경시 cafesWithinScope에 해당 지역 마커 정보들 담기 (recoil)
// 3. scope 변경시마다 cafesWithinScope에 담긴 마커들 중
// scope 안에 들어오는 애들만 setCafesWithinScope (cafesWithinScope를 필터링)
// 4. draw cafesWithinScope

export default function RecruitPostList() {
  const targetCafe = useRecoilValue(targetCafeAtom);
  const scope = useRecoilValue(scopeAtom);
  const [cafesWithinScope, setcafesWithinScope] = useRecoilState(cafesWithinScopeAtom);
  const [recruitingInfo, setRecruitingInfo] = useState({});
  const addRecruitingData = async (cafeId) => {
    const cafeRecruitingArr = await getRecruitingInfo(cafeId);
    setRecruitingInfo({ ...recruitingInfo, [cafeId]: cafeRecruitingArr });
  };

  const filterCafesWithinScope = () => {
    if (!scope.length) return;
    // scope 안에 들어오는 애들만 setCafesWithinScope (cafesWithinScope를 필터링)
  };

  useEffect(() => {
    filterCafesWithinScope();
  }, [scope]);

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

  const TargetCafeDescription = () => {
    return (
      <div>
        <CafeDescription />
        {recruitingInfo[targetCafe] &&
          recruitingInfo[targetCafe]['recruitingInfo'].map((recruitPost) => (
            <RecuitPostContainer key={recruitPost.matchingPostsId} postData={recruitPost} />
          ))}
      </div>
    );
  };

  return <TargetCafeDescription></TargetCafeDescription>;
}
