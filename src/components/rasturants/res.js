// MapComponent.jsx
import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon from '../../images/pinRed.png';

const MapComponent = ({ addresses, selectedAddress }) => {
  useEffect(() => {
    const map = L.map('map').setView([59.3293, 18.0686], 6);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const customIcon = L.icon({
      iconUrl: markerIcon,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    const geocodeAddresses = async () => {
      const promises = addresses.map(async (addressData) => {
        try {
          const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
              `${addressData.Adress}, ${addressData.Stad} ${addressData.Postnummer}`
            )}&key=c3e39b74e6594f1a838afdb9acd35895`,
            {
              mode: 'cors',
            }
          );

          const data = await response.json();

          if (data.results && data.results.length > 0) {
            const { lat, lng } = data.results[0].geometry;

            const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);

            if (selectedAddress && addressData === selectedAddress) {
              map.setView([lat, lng], 13);
              marker.bindPopup(`<b>${addressData.Namn}</b><br>${addressData.Adress}`).openPopup();
            }
          }
        } catch (error) {
          console.error('Geocoding error:', error);
        }
      });

      await Promise.all(promises);
    };

    geocodeAddresses();

    return () => {
      map.remove();
    };
  }, [addresses, selectedAddress]);

  return <div id="map"></div>;
};

export default MapComponent;
