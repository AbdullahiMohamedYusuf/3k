import React, { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon from '../../images/pexels-emre-can-acer-2079666.jpg'; // Replace with the path to your custom marker image

const MapComponent = () => {
  useEffect(() => {
    const map = L.map('map').setView([59.3293, 18.0686], 13); // Center the map on Stockholm

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    const address = 'mjölbyplan 4, Stockholm, Sweden';

    const geocodeAddress = async () => {
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
        const data = await response.json();
        if (data && data.length > 0) {
          const { lat, lon, display_name } = data[0];

          const customIcon = L.icon({
            iconUrl: markerIcon,
            iconSize: [32, 32],
            iconAnchor: [16, 32]
          });

          L.marker([parseFloat(lat), parseFloat(lon)], { icon: customIcon }).addTo(map)
            .bindPopup(display_name)
            .openPopup();
          map.setView([parseFloat(lat), parseFloat(lon)], 13);
        }
      } catch (error) {
        console.error('Geocoding error:', error);
      }
    };

    geocodeAddress();

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div id="map" style={{ height: '500px' }}></div>
  );
};

export default MapComponent;
