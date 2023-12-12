import React from "react";
import { useNavigate } from 'react-router-dom';

import "./card.css";
function Cards(props) {

  const navigate = useNavigate();
  function handleClick(path) {
    navigate('/' + path)
  }


  return (
    <div className="Card" onClick={() => handleClick(props.path)}>
      <a>
        <div className="icon">
          <i class={props.icon}></i>
        </div>
        <span class="dot"></span>
        <span class="dot2"></span>
        <span class="dot3"></span>

        <div className="discription">
          <h3>{props.title}</h3>
          <p>{props.p}</p>
        </div>
      </a>
    </div>
  );
}

export default Cards;
