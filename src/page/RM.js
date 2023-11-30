import React, { useState } from "react";
import MapComponent from "../components/rasturants/res";
import addressesData from '../components/rasturants/capitalized_api_data.json'; // Import the JSON data

function RM() {
  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleItemClick = (address) => {
    setSelectedAddress(address);
  };

  return (
    <div className="Rm">
      <div className="map-container">
        <div id="map"></div>
        <MapComponent addresses={addressesData} selectedAddress={selectedAddress} />
      </div>
      <div className="listOfItems">
        <h1>Leaflet Map in React</h1>
        <ul>
          {addressesData.map((address, index) => (
            <li key={index} onClick={() => handleItemClick(address)}>
              <h3>{address.Namn}</h3>
              <p>{address.Adress}</p>
              <p>{address.Nummer}</p>
              <p>{address.Stjärnor}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default RM;
