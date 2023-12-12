import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import MapComponent from "../components/rasturants/res";
import addressesData from "../components/rasturants/capitalized_api_data (3).json";
import "./RM.css";
import Collapsible from "../components/Collapsible";
import Head from "../components/head";
import Dropdown from "../components/dropdown";

function RM() {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedType, setSelectedType] = useState("All");

  const navigate = useNavigate();
  function handleClick() {
    navigate('/');

  }
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleItemClick = (address) => {
    setSelectedAddress(address);
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
  };

  const filteredAddresses =
    selectedType === "All"
      ? addressesData
      : addressesData.filter((address) => address.Typ === selectedType);

  return (
    <div className="RM_Container">
      <div className="Rm">
        <div className="MegaContainer">
          <div className="buttons">
            <button id="return" onClick={handleClick}>
              <i className="fa-solid fa-arrow-left"></i>
            </button>
          </div>
          <div className="containCategory">
            <div className="colors">
              <div className="colors">
                <div className="colorType">
                  <div className="boxTypeR"></div>
                  <p>Moské</p>
                </div>
                <div className="colorType">
                  <div className="boxTypeB"></div>
                  <p>Kafé</p>
                </div>
                <div className="colorType">
                  <div className="boxTypeY"></div>
                  <p>kaffebar</p>
                </div>
                <div className="colorType">
                  <div className="boxTypeZ"></div>
                  <p>restaurang</p>
                </div>
              </div>
            </div>
            <div className="search">
              <input
                type="text"
                name="City"
                id=""
                placeholder="Search up City"
              />
              <Dropdown onChange={handleTypeChange} />
            </div>
          </div>
          <div className="list-container">
            <div className="locationList">
              {filteredAddresses.map((address, index) => (
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
          <div className="map-container">
            <MapComponent
              addresses={filteredAddresses}
              selectedAddress={selectedAddress}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RM;
