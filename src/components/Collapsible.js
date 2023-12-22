import React from "react";
import "./Collapsible.css";

function Collapsible(props) {
  let boxClass;

  if (props.typ === "Moské") {
    boxClass = "boxTypeR";
  } else if (props.typ === "Kafé") {
    boxClass = "boxTypeB";
  } else if (props.typ === "Kaffebar") {
    boxClass = "boxTypeY";
  } else if (props.typ === "Resturang") {
    boxClass = "boxTypeZ";
  } else {
    boxClass = "defaultBox";
  }

  const handleItemClick = () => {
    props.onClick({
      Adress: props.address,
      Nummer: props.nummer,
      Stjärnor: props.stjarnor,
      Typ: props.typ
    });
  };              


  return (
    <div className="collapsible">
      <ul className="accordion">
        <li>
          <input
            type="radio"
            name="accordion"
            id={`radio-${props.index}`}
            onChange={handleItemClick}
          />
          <label htmlFor={`radio-${props.index}`} className={props.index}>
            <div className="addressLabel">
              {props.address}
              <div className={boxClass}></div>
            </div>
          </label>
          <div className="accordion-content">
            <h3>{props.address}</h3>
            <h3>{props.nummer}</h3>
            <h3>{props.stjarnor}</h3>
            <h3>{props.typ}</h3>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Collapsible;
