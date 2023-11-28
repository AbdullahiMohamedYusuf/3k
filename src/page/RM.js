import MapComponent from "../components/rasturants/res";
import "../style.css";

import React from "react";

function RM() {
  return (
    <div className="map-container">
      <div id="map"></div>
      <h1>Leaflet Map in React</h1>
      <MapComponent />
    </div>
  );
}

export default RM;
