import React from "react";
import "./Collapsible.css";
function Collapsible(props) {
  let boxClass;

  // Apply different classes based on the value of props.typ
  if (props.typ === "Moské") {
    boxClass = "boxTypeR"; // Apply boxTypeR class for 'Moské'
  } else if (props.typ === "Kafé") {
    boxClass = "boxTypeB"; // Apply boxTypeB class for 'Kafé'
  } else if (props.typ === "Kaffebar") {
    boxClass = "boxTypeY"; // Apply boxTypeY class for 'Kaffebar'
  } else if (props.typ === "Resturang") {
    boxClass = "boxTypeZ"; // Apply boxTypeZ class for 'Resturang'
  } else {
    // Default class in case the typ doesn't match any of the options
    boxClass = "defaultBox";
  }
  
  return (
    <div>
      <ul className="accordion">
        <li>
          <input type="radio" name="accordion" id={props.index} />
          <label htmlFor={props.index} className={props.index}>
            <div className="addressLabel">
              {props.address}
              <div className={boxClass}></div>

            </div>
          </label>
          <div className="accordion-content">
            <h3>{props.address}</h3>
            <h3>{props.nummer}</h3>
            <h3>{props.Stjärnor}</h3>
            <h3>{props.typ}</h3>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Collapsible;
