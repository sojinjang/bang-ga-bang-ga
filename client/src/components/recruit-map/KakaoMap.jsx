import React, { useState, useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Map, MapMarker, useMap } from 'react-kakao-maps-sdk';

import { regionAtom, targetCafeAtom, scopeAtom, cafeInfoAtom } from '../../recoil/recruit-map';
import { ResizeButtonContainer } from './ResizeButtonContainer';
import { InfoWindow } from './InfoWindow';
import { regionCoordinate } from '../../constants/regionCoordinate';
import { ApiUrl } from '../../constants/ApiUrl';
import * as api from '../../utils/api';
import markerImg from '../../assets/images/icon/marker.png';
import clickedMarkerImg from '../../assets/images/icon/marker-clicked.png';

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
  const BASIC_SIZE = 40;
  const OVER_SIZE = 42;
  const region = useRecoilValue(regionAtom);
  const [targetCafe, setTargetCafe] = useRecoilState(targetCafeAtom);
  const [isClicked, setIsClicked] = useState(true);
  const [cafeInfo, setCafeInfo] = useRecoilState(cafeInfoAtom);
  const setScope = useSetRecoilState(scopeAtom);
  const [level, setLevel] = useState(5);

  const addRegionCafeData = async () => {
    const regionCafeInfoArr = await getCafeInfo(region);
    setCafeInfo({ ...cafeInfo, [region]: regionCafeInfoArr });
  };

  const handleRegionChange = async () => {
    if (!cafeInfo[region]) await addRegionCafeData();
    setTargetCafe(undefined);
  };

  useEffect(() => {
    handleRegionChange();
  }, [region]);

  const MarkerContainer = ({ cafeId, position, cafeName, recruitingNum }) => {
    const map = useMap();
    const [isOver, setIsOver] = useState(false);
    let markerIcon = cafeId === targetCafe ? clickedMarkerImg : markerImg;
    let markerSize = isOver ? OVER_SIZE : BASIC_SIZE;
    const onMarkerClick = (marker, cafeId) => {
      map.panTo(marker.getPosition());
      setIsClicked(!isClicked);
      setTimeout(() => {
        if (isClicked) return setTargetCafe(cafeId);
        return setTargetCafe(undefined);
      });
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
            <MarkerContainer
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
