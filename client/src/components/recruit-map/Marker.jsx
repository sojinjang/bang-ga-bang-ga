import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { targetCafeAtom } from '../../recoil/recruit-map';
import { MapMarker, useMap } from 'react-kakao-maps-sdk';

import { InfoWindow } from './InfoWindow';
import markerImg from '../../assets/images/icon/marker.png';
import clickedMarkerImg from '../../assets/images/icon/marker-clicked.png';

const BASIC_SIZE = 40;
const OVER_SIZE = 42;

const Marker = ({ cafeId, position, cafeName, recruitingNum }) => {
  const map = useMap();
  const [isOver, setIsOver] = useState(false);
  const [targetCafe, setTargetCafe] = useRecoilState(targetCafeAtom);
  const markerIcon = cafeId === targetCafe ? clickedMarkerImg : markerImg;
  const markerSize = isOver ? OVER_SIZE : BASIC_SIZE;

  const onMarkerClick = (marker, cafeId) => {
    map.panTo(marker.getPosition());
    if (cafeId === targetCafe) return setTargetCafe(undefined);
    setTargetCafe(cafeId);
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
      onMouseOut={() => setIsOver(false)}>
      {isOver && <InfoWindow cafeName={cafeName} recruitingNum={recruitingNum} />}
    </MapMarker>
  );
};

export default Marker;
