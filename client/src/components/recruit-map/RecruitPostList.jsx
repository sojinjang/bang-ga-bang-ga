import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { regionAtom, targetCafeAtom, scopeAtom, cafeInfoAtom } from '../../recoil/recruit-map';

import { ApiUrl } from '../../constants/ApiUrl';
import * as api from '../../utils/api';
import { useDidMountEffect } from '../../utils/hooks';
import SingleCafePostList from './SingleCafePostList';

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

  useEffect(() => {
    setCafesWithinScope([]);
  }, [region]);
  useDidMountEffect(addRegionCafePost, [cafeInfo]);
  useDidMountEffect(() => {
    if (cafeInfo[region]) filterCafesWithinScope();
  }, [scope]);

  if (targetCafe) return <SingleCafePostList cafeId={targetCafe} recruitingInfo={recruitingInfo} />;
  return (
    <div>
      {cafesWithinScope.map((cafeId) => {
        return <SingleCafePostList cafeId={cafeId} recruitingInfo={recruitingInfo} key={cafeId} />;
      })}
    </div>
  );
}
