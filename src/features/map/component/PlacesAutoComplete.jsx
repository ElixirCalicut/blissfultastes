// src/MapWithAutocomplete.js

import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  MarkerF,
  useJsApiLoader,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { useSelector } from "react-redux";
//map style
const mapContainerStyle = {
  width: "50vw",
  height: "50vh",
};
//center marker
const center = {
  lat: 40.73061,
  lng: -73.935242,
};
const PlacesAutoComplete = ({ onAddressSelect }) => {
  const [selected, setSelected] = useState(center);
  const [map, setMap] = React.useState(null);
  const kilometers200InMeters = 200 * 1000;
  const [deliveryLat, setDeliveryLat] = useState(null);
  const [deliveryLon, setDeliveryLon] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [distance, setDistance] = useState(0);
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const settingdetails = useSelector((state) => state.settings.settingdetails);

//usePlacesAutocomplete initial
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete(
    { callbackName: "initMap" },
    {
      requestOptions: {
        location: {
          lat: () => 37.09,
          lng: () => -95.7129,
        },
        radius: kilometers200InMeters,
      },
    }
  );
  //use js ;loader to load map
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBn0aXDCik_xFr-fmEjTMeFjG2vpzCxAp8",
  });
    // Shop location (constant)
    const shopLat = 23.591322594422028;
    const shopLon = 58.145319317009026;
  
    // Haversine formula to calculate the distance in kilometers
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
      const toRadians = (degree) => (degree * Math.PI) / 180;
      
      const R = 6371; // Radius of Earth in kilometers
      const dLat = toRadians(lat2 - lat1);
      const dLon = toRadians(lon2 - lon1);
  
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) *
          Math.cos(toRadians(lat2)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c; // Distance in kilometers
      return distance;
    };
  
    // Delivery charge calculation based on distance
    const calculateDeliveryCharge = (distance) => {
      const baseDistance = 3; // 3 km base distance
      const fixedCharge = settingdetails.delivery_cost; // Fixed charge if distance is more than 3 km
      const pricePerKm = 0.5 || 0; // Optional: price per km beyond 3 km
  
      if (distance <= baseDistance) {
        return 0;
      } else {
        // const extraDistance = distance - baseDistance;
        // console.log(extraDistance)
        // const distncperkm= parseFloat(extraDistance) * parseFloat(fixedCharge);
        
        // const totalCharge = parseFloat(fixedCharge)+ parseFloat(distncperkm);
        // console.log(fixedCharge)
        console.log(map)
         console.log(deliveryLat)
          console.log(deliveryLon)
           
            console.log(deliveryCharge)
             console.log(pricePerKm)
         console.log(fixedCharge)
        return fixedCharge;
        //return fixedCharge;
      }
    };
//selct loaction based on listed location
  const handleSelect = async (description) => {
    setValue(description, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address: description });
      console.log(results);
      const { lat, lng } = await getLatLng(results[0]);
      console.log(`${description} Coordinates --> lat: ${lat} lng:${lng}`);
      const selectedLocation = { lat, lng };
      setSelected({ lat, lng });
      console.log(selected);
      setDeliveryLat(lat);
      setDeliveryLon(lng);

      const dist = calculateDistance(shopLat, shopLon, lat, lng);
      setDistance(dist.toFixed(2));
      const charge = calculateDeliveryCharge(dist);
      console.log(charge)
      setDeliveryCharge(charge);
      const fixedCharge = settingdetails.delivery_cost; 
      onAddressSelect(selectedLocation,charge,dist,fixedCharge);
    } catch (error) {
      console.error("Error: ", error);
    }
  };
  //check useplacescomplete is raedy
  useEffect(() => {
    console.log("Autocomplete ready state:", ready);
  }, [ready]);


  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    <div className="w-90">
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={15}
          center={selected || center}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {selected && <MarkerF position={selected} />}
        </GoogleMap>
      ) : (
        <></>
      )}
      <div style={{ position: "relative", margin: "10px auto" }}>
        <label className="p-2">Search Location</label>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={!ready}
          placeholder="Select Your Location"
          style={{
            width: "100%",
            padding: "8px",
            boxSizing: "border-box",
            border: "1px  solid #000",
          }}
        />
        {status === "OK" && (
          <ul
            style={{
              position: "absolute",
              width: "100%",
              maxHeight: "150px",
              overflowY: "auto",
              backgroundColor: "white",
              border: "1px solid #ccc",
              margin: 0,
              padding: 0,
              listStyleType: "none",
            }}
          >
            {data.map((suggestion) => (
              <li
                key={suggestion.place_id}
                onClick={() => handleSelect(suggestion.description)}
                style={{
                  padding: "8px",
                  cursor: "pointer",
                }}
              >
                {suggestion.description}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default React.memo(PlacesAutoComplete);
