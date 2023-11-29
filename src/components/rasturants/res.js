import React, { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon from '../../images/pinRed.png'; // Replace with the path to your custom marker image

const addresses = [
  'mjölbyplan 4, Sweden',
  'storbyplan, Sweden',
  'degerbygränd, Sweden',
  'svennebygränd, Sweden'
];

const MapComponent = () => {
  useEffect(() => {
    const map = L.map('map').setView([59.3293, 18.0686], 6); // Center the map on Stockholm with zoom level 6

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    const geocodeAddresses = async () => {
      try {
        for (const address of addresses) {
          const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
          const data = await response.json();
          if (data && data.length > 0) {
            const { lat, lon } = data[0];

            const customIcon = L.icon({
              iconUrl: markerIcon,
              iconSize: [32, 32],
              iconAnchor: [16, 32]
            });

            L.marker([parseFloat(lat), parseFloat(lon)], { icon: customIcon }).addTo(map);
          }
        }
      } catch (error) {
        console.error('Geocoding error:', error);
      }
    };

    geocodeAddresses();

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div id="map" style={{ height: '500px' }}></div>
  );
};

export default MapComponent;
