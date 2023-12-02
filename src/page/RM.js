import React, { useState, useEffect } from "react";
import MapComponent from "../components/rasturants/res";
import addressesData from "../components/rasturants/capitalized_api_data (2).json"; // Import the JSON data
import "./RM.css"; // Import the stylesheet
import Collapsible from "../components/Collapsible";
import Head from "../components/head";

function RM() {
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleItemClick = (address) => {
    setSelectedAddress(address);
  };

  return (
    <div className="RM_Container">
      <div className="Rm">
        <div className="MegaContainer">
          <div className="buttons">
            <button id="return"><i class="fa-solid fa-arrow-left"></i></button>
            <button>Add</button>
          </div>
          <div className="colors">
            <div className="typeName">
              <div className="boxTypeR"></div>
              <p>Moské</p>
            </div>
            <div className="typeName">
              <div className="boxTypeB"></div>
              <p>Kafé</p>
            </div>
            <div className="typeName">
              <div className="boxTypeY"></div>
              <p>kaffebar</p>
            </div>
            <div className="typeName">
              <div className="boxTypeZ"></div>
              <p>restaurang</p>
            </div>
          </div>
          <div className="list-container">
            <div className="locationList">
              {addressesData.map((address, index) => (
                <Collapsible
                  key={index}
                  index={index}
                  address={address.Adress}
                  nummer={address.Nummer}
                  stjarnor={address.Stjärnor}
                  typ={address.Typ}
                  onClick={() => handleItemClick(address)}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="map-container">
          <MapComponent
            addresses={addressesData}
            selectedAddress={selectedAddress}
          />
        </div>
      </div>
    </div>
  );
}

export default RM;
