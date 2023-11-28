import React, { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const MapComponent = () => {
  useEffect(() => {
    const map = L.map('map').setView([59.3293, 18.0686], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 6,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // Add markers, circles, polygons, popups, and event handlers as needed...

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div id="map" className="map-container"></div>
  );
};

export default MapComponent;
