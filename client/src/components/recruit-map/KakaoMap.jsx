import React, { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Map, MapMarker, useMap, CustomOverlayMap } from 'react-kakao-maps-sdk';

import { regionAtom, targetCafeAtom } from '../../recoil/recruit-map';
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
  const [cafeInfo, setCafeInfo] = useState({});

  const addRegionCafeData = async () => {
    const regionCafeInfoArr = await getCafeInfo(region);
    setCafeInfo({ ...cafeInfo, [region]: regionCafeInfoArr });
  };

  useEffect(() => {
    if (!cafeInfo[region]) addRegionCafeData();
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
        {/* memo 소진: 아래 주석 코드 -> https://react-kakao-maps-sdk.jaeseokim.dev/docs/sample/overlay/customOverlay2 참고
        예제랑 다르게 커스텀 오버레이 컴포넌트 위치 이상해짐 issue #17 22.12.23 */}
        {/* {isOver && (
          <CustomOverlayMap position={position} xAnchor={0.3} yAnchor={0.91}>
            <InfoWindow cafeName={cafeName} recruitingNum={recruitingNum} />
          </CustomOverlayMap>
        )} */}
      </MapMarker>
    );
  };

  return (
    <Map
      center={regionCoordinate[region]}
      style={{
        width: '900px',
        height: '700px',
      }}
      level={5}>
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
  );
}
