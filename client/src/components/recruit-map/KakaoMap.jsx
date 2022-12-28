import React, { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Map, MapMarker, useMap } from 'react-kakao-maps-sdk';

import { regionAtom, targetCafeAtom, scopeAtom, cafesWithinScopeAtom } from '../../recoil/recruit-map';
import { ResizeButtonContainer } from './ResizeButtonContainer';
import { InfoWindow } from './InfoWindow';
import { regionCoordinate } from '../../constants/regionCoordinate';
import { ApiUrl } from '../../constants/ApiUrl';
import * as api from '../../utils/api';
import markerImg from '../../assets/images/icon/marker.png';
import clickedMarkerImg from '../../assets/images/icon/marker-clicked.png';

async function getCafeInfo(region) {
  try {
    const regionCafeInfoArr = await api.get(ApiUrl.CAFE_INFO, region);
    return regionCafeInfoArr;
  } catch (err) {
    alert(err.message);
  }
}

export default function KakaoMap() {
  const BASIC_SIZE = 40;
  const OVER_SIZE = 42;
  const region = useRecoilValue(regionAtom);
  const [targetCafe, setTargetCafe] = useRecoilState(targetCafeAtom);
  const [scope, setScope] = useRecoilState(scopeAtom);
  const [cafesWithinScope, setcafesWithinScope] = useRecoilState(cafesWithinScopeAtom);
  const [cafeInfo, setCafeInfo] = useState({});
  const [level, setLevel] = useState(5);

  const addRegionCafeData = async () => {
    const regionCafeInfoArr = await getCafeInfo(region);
    setCafeInfo({ ...cafeInfo, [region]: regionCafeInfoArr });
  };

  const handleRegionChange = async () => {
    if (!cafeInfo[region]) await addRegionCafeData();
    setTargetCafe(undefined);
    setcafesWithinScope(cafeInfo[region]);
  };

  useEffect(() => {
    handleRegionChange();
  }, [region]);

  const MarkerContainer = ({ cafeId, setTargetCafe, position, cafeName, recruitingNum }) => {
    const map = useMap();
    const [isOver, setIsOver] = useState(false);
    let markerIcon = cafeId === targetCafe ? clickedMarkerImg : markerImg;
    let markerSize = isOver ? OVER_SIZE : BASIC_SIZE;
    const onMarkerClick = (marker, cafeId) => {
      map.panTo(marker.getPosition());
      setTimeout(() => setTargetCafe(cafeId));
    };
    return (
      <MapMarker
        position={position}
        image={{
          src: markerIcon,
          size: {
            width: markerSize,
            height: markerSize,
          },
        }}
        clickable={true}
        onClick={(marker) => {
          onMarkerClick(marker, cafeId);
        }}
        onMouseOver={() => setIsOver(true)}
        onMouseOut={() =>
          setTimeout(function () {
            setIsOver(false);
          })
        }>
        {isOver && <InfoWindow cafeName={cafeName} recruitingNum={recruitingNum} />}
      </MapMarker>
    );
  };

  return (
    <div className='relative'>
      <Map
        center={regionCoordinate[region]}
        style={{
          width: '900px',
          height: '700px',
        }}
        onBoundsChanged={(map) =>
          setScope({
            swLatLng: {
              lat: map.getBounds().getSouthWest().getLat(),
              lng: map.getBounds().getSouthWest().getLng(),
            },
            neLatLng: {
              lat: map.getBounds().getNorthEast().getLat(),
              lng: map.getBounds().getNorthEast().getLng(),
            },
          })
        }
        level={level}>
        <ResizeButtonContainer level={level} setLevel={setLevel}></ResizeButtonContainer>
        {cafeInfo?.[region] &&
          cafeInfo[region].map((cafe) => (
            <MarkerContainer
              key={cafe.cafeId}
              cafeId={cafe.cafeId}
              setTargetCafe={setTargetCafe}
              position={{ lat: cafe.lat, lng: cafe.lng }}
              cafeName={cafe.cafeName}
              recruitingNum={cafe.recruitingNum}
            />
          ))}
      </Map>
    </div>
  );
}
