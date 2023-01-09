import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { regionAtom, targetCafeAtom, scopeAtom, cafeInfoAtom } from '../../recoil/recruit-map';

import { ApiUrl } from '../../constants/ApiUrl';
import * as api from '../../utils/api';
import { useDidMountEffect } from '../../utils/hooks';
import RecuitPostContainer from '../recruit/RecruitPostContainer';

async function getRecruitingInfo(cafeId) {
  try {
    const cafeRecruitingArr = await api.get(ApiUrl.MAP_MATCHING_POST_CAFE_INFO, cafeId);
    return cafeRecruitingArr;
  } catch (err) {
    alert(err.message);
  }
}

const isCafeWithinScope = (scope, lat, lng) => {
  const isLatWithinScope = scope.swLatLng.lat < lat && scope.neLatLng.lat > lat;
  const isLngWithinScope = scope.swLatLng.lng < lng && scope.neLatLng.lng > lng;
  return isLatWithinScope && isLngWithinScope;
};

export default function RecruitPostList() {
  const region = useRecoilValue(regionAtom);
  const targetCafe = useRecoilValue(targetCafeAtom);
  const scope = useRecoilValue(scopeAtom);
  const cafeInfo = useRecoilValue(cafeInfoAtom);
  const [cafesWithinScope, setCafesWithinScope] = useState([]);
  const [recruitingInfo, setRecruitingInfo] = useState({});

  const filterCafesWithinScope = () => {
    const cafesWithinScopeArr = [];
    cafeInfo[region].forEach((cafe) => {
      if (Object.keys(scope).length === 0) return;
      if (isCafeWithinScope(scope, cafe.lat, cafe.lng)) {
        cafesWithinScopeArr.push(cafe.cafeId);
      }
    });
    setCafesWithinScope(cafesWithinScopeArr);
  };

  const addRegionCafePost = async () => {
    if (Object.keys(cafeInfo).length === 0) return;
    const recruitDataObj = {};
    for await (const cafe of cafeInfo[region]) {
      recruitDataObj[cafe.cafeId] = await getRecruitingInfo(cafe.cafeId);
    }
    setRecruitingInfo({ ...recruitingInfo, ...recruitDataObj });
  };

  const handleScopeChange = () => {
    if (cafeInfo[region]) filterCafesWithinScope();
  };

  useEffect(() => {
    setCafesWithinScope([]);
  }, [region]);
  useDidMountEffect(addRegionCafePost, [cafeInfo]);
  useDidMountEffect(handleScopeChange, [scope]);

  const CafeDescription = ({ cafeId }) => {
    return (
      recruitingInfo[cafeId] && (
        <div className='my-3'>
          <div className='text-lg font-semibold text-blue-4'>
            {recruitingInfo[cafeId]['recruitingInfo'].length}팀 모집중
          </div>
          <div className='text-xl font-medium'>{recruitingInfo[cafeId]['cafeInfo'].cafeName}</div>
          <div>{recruitingInfo[cafeId]['cafeInfo'].address}</div>
        </div>
      )
    );
  };

  const SingleCafePostList = ({ cafeId }) => {
    return (
      <div>
        <CafeDescription cafeId={cafeId} />
        {recruitingInfo[cafeId] &&
          recruitingInfo[cafeId]['recruitingInfo'].map((recruitPost) => (
            <RecuitPostContainer key={recruitPost.matchingPostsId} postData={recruitPost} />
          ))}
      </div>
    );
  };

  if (targetCafe) return <SingleCafePostList cafeId={targetCafe}></SingleCafePostList>;
  return (
    <div>
      {cafesWithinScope.map((cafeId) => {
        return <SingleCafePostList cafeId={cafeId} key={cafeId}></SingleCafePostList>;
      })}
    </div>
  );
}
