import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MapComponent = () => {
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  const [searchText, setSearchText] = useState('');
  const [map, setMap] = useState(null);

  useEffect(() => {
    const loadMap = async () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBn0aXDCik_xFr-fmEjTMeFjG2vpzCxAp8&libraries=places`;
      script.onload = () => {
        initMap();
      };
      document.head.appendChild(script);
    };

    loadMap();
  }, []);

  const initMap = () => {
    const newMap = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 0, lng: 0 },
      zoom: 10,
    });

    setMap(newMap);

    const geocoder = new window.google.maps.Geocoder();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setCoordinates({ lat: latitude, lng: longitude });

          try {
            const response = await axios.get(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBn0aXDCik_xFr-fmEjTMeFjG2vpzCxAp8`
            );
            setAddress(response.data.results[0].formatted_address);
          } catch (error) {
            console.error('Error fetching address:', error);
          }

          newMap.setCenter({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }

    newMap.addListener('click', (e) => {
      setCoordinates({ lat: e.latLng.lat(), lng: e.latLng.lng() });

      geocoder.geocode({ location: e.latLng }, (results, status) => {
        if (status === 'OK') {
          if (results[0]) {
            setAddress(results[0].formatted_address);
          } else {
            console.error('No results found');
          }
        } else {
          console.error(`Geocoder failed due to: ${status}`);
        }
      });
    });
  };

  const handleSearch = async () => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: searchText }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          const location = results[0].geometry.location;
          setCoordinates({ lat: location.lat(), lng: location.lng() });
          setAddress(results[0].formatted_address);
          map.setCenter(location);
        } else {
          console.error('No results found');
        }
      } else {
        console.error(`Geocoder failed due to: ${status}`);
      }
    });
  };

  return (
    <div>
      <div>
        <input type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div id="map" style={{ height: '400px', width: '100%' }}></div>
      <p>Selected Address: {address}</p>
      <p>Latitude: {coordinates.lat}</p>
<p>Longitude: {coordinates.lng}</p>
    </div>
  );
};

export default MapComponent;
