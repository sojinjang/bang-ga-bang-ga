import React, { useState, useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Map } from 'react-kakao-maps-sdk';

import { regionAtom, targetCafeAtom, scopeAtom, cafeInfoAtom } from '../../recoil/recruit-map';
import { regionCoordinate } from '../../constants/regionCoordinate';
import { ApiUrl } from '../../constants/ApiUrl';
import Marker from './Marker';
import ResizeButtonContainer from './ResizeButtonContainer';
import * as api from '../../utils/api';

async function getCafeInfo(region) {
  try {
    const regionCafeInfoArr = await api.get(ApiUrl.MAP_MATCHING_POSTS, region);
    return regionCafeInfoArr;
  } catch (err) {
    alert(err.message);
  }
}

const getMapScreenScope = (map) => {
  return {
    swLatLng: {
      lat: map.getBounds().getSouthWest().getLat(),
      lng: map.getBounds().getSouthWest().getLng(),
    },
    neLatLng: {
      lat: map.getBounds().getNorthEast().getLat(),
      lng: map.getBounds().getNorthEast().getLng(),
    },
  };
};

export default function KakaoMap() {
  const mapRef = useRef();
  const region = useRecoilValue(regionAtom);
  const [cafeInfo, setCafeInfo] = useRecoilState(cafeInfoAtom);
  const setTargetCafe = useSetRecoilState(targetCafeAtom);
  const setScope = useSetRecoilState(scopeAtom);
  const [level, setLevel] = useState(5);

  const addRegionCafeData = async () => {
    const regionCafeInfoArr = await getCafeInfo(region);
    setCafeInfo({ ...cafeInfo, [region]: regionCafeInfoArr });
  };

  const handleRegionChange = async () => {
    if (!cafeInfo[region]) await addRegionCafeData();
    setTargetCafe(undefined);
    setLevel(5);
  };

  useEffect(() => {
    handleRegionChange();
  }, [region]);

  return (
    <div className='relative'>
      <Map
        center={regionCoordinate[region]}
        style={{
          width: '900px',
          height: '70vh',
        }}
        onBoundsChanged={(map) => setScope(getMapScreenScope(map))}
        level={level}
        ref={mapRef}>
        <ResizeButtonContainer
          level={level}
          setLevel={setLevel}
          setScope={setScope}
          getMapScreenScope={getMapScreenScope}
          map={mapRef.current}></ResizeButtonContainer>
        {cafeInfo?.[region] &&
          cafeInfo[region].map((cafe) => (
            <Marker
              key={cafe.cafeId}
              cafeId={cafe.cafeId}
              position={{ lat: cafe.lat, lng: cafe.lng }}
              cafeName={cafe.cafeName}
              recruitingNum={cafe.recruitingNum}
            />
          ))}
      </Map>
    </div>
  );
}
