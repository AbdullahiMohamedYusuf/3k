import React from "react";
import "./card.css";
function Cards(props) {
  return (
    <div className="Card">
      <a>
        <div className="icon">
          <i class={props.icon}></i>
        </div>
        <div className="discription">
          <h3>{props.title}</h3>
          <p>{props.p}</p>
        </div>
      </a>
    </div>
  );
}

export default Cards;
