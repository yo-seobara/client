import { useEffect, useState } from "react";
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import { apis } from "../../../api/postAPI";
import LocatioinSpot from "../../global/locationSpot";
import Spinner from "../../global/spinner";
import { MapContainerWrapper } from "./style";

const MapContainer = ({ location, pick, setPick, setPickAddress }) => {
  // 좌표를 주소로 변환하는 부분
  const changeLocationToAddress = async () => {
    if (pick.lat === null || pick.lng === null) return;
    const address = await apis.convertToAddress(pick.lat, pick.lng);
    setPickAddress(address.data.data);
  };

  useEffect(() => {
    changeLocationToAddress(pick.lat, pick.lng);
  }, [pick]);

  return (
    <MapContainerWrapper>
      {location.isLoading ? (
        <Spinner />
      ) : (
        <>
          <Map
            isPanto="true"
            center={{
              lat: pick.lat ? pick.lat : location.center.lat,
              lng: pick.lng ? pick.lng : location.center.lng,
            }}
            style={{
              width: "100%",
              height: "100%",
            }}
            level={4}
            onClick={(_t, mouseEvent) => {
              setPick({
                ...pick,
                lat: mouseEvent.latLng.getLat(),
                lng: mouseEvent.latLng.getLng(),
              });
            }}
          >
            {/* 현재위치 마커 */}
            <CustomOverlayMap position={location.center}>
              <LocatioinSpot />
            </CustomOverlayMap>
            {pick && <MapMarker position={pick} />}
          </Map>
        </>
      )}
    </MapContainerWrapper>
  );
};

export default MapContainer;
