import React, { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon from '../../images/pinRed.png';

const MapComponent = ({ addresses, selectedAddress }) => {
  useEffect(() => {
    const map = L.map('map').setView([59.3293, 18.0686], 6);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    const geocodeAddresses = async () => {
      try {
        const promises = addresses.map(async addressData => {
          const response = await fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=dCR4thdQkLiRrBisrDwpmS8QDyqJvAdW&location=${encodeURIComponent(addressData.Adress)}`);
          const data = await response.json();
          if (data.results && data.results.length > 0) {
            const { lat, lng } = data.results[0].locations[0].latLng;

            const customIcon = L.icon({
              iconUrl: markerIcon,
              iconSize: [32, 32],
              iconAnchor: [16, 32]
            });

            const marker = L.marker([parseFloat(lat), parseFloat(lng)], { icon: customIcon }).addTo(map);
            
            if (selectedAddress && addressData === selectedAddress) {
              map.setView([parseFloat(lat), parseFloat(lng)], 13);
              marker.bindPopup(`<b>${addressData.Namn}</b><br>${addressData.Adress}`).openPopup();
            }
          }
        });

        await Promise.all(promises);
      } catch (error) {
        console.error('Geocoding error:', error);
      }
    };

    geocodeAddresses();

    return () => {
      map.remove();
    };
  }, [addresses, selectedAddress]);

  return (
    <div id="map"></div>
  );
};

export default MapComponent;
