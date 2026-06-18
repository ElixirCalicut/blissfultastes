import React from "react";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
} from "@react-google-maps/api";

import "./Map.css";

const LocationPickerMap = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBn0aXDCik_xFr-fmEjTMeFjG2vpzCxAp8',
    libraries: ["places"],
  });

  const center = { lat: 30.0444, lng: 31.2357 };
  const onLoadMarker = (marker) => {
    console.log("Marker", marker.position.lat);
  };

  return (
    <>
       {/* <PlacesAutoComplete />  */}
      <div className="Map">
        {!isLoaded ? (
          <h3>Loading…..</h3>
        ) : (
          <GoogleMap
            mapContainerClassName="map_container"
            center={center}
            zoom={10}
          >
            <MarkerF position={center} onLoad={onLoadMarker} />
          </GoogleMap>
        )}
      </div>
    </>
  );
};

export default LocationPickerMap;
