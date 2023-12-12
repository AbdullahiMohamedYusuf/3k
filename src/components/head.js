import React, { useContext } from "react";
import "../images/loga_bild.jpg";
import AuthContext from "../utils/authContext";
import DropdownP from "./dropdown-profile/dropdownP";
import { button } from "@material-tailwind/react";
import { Navigate, useNavigate } from "react-router-dom";

function Head() {
  let { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="Mega">
      <nav>
        <div class="container">
          <a href="/">
            <div className="logoImg"></div>
          </a>
          <div class="buttons">
            <div class="menu">
              <ul>
                <li>
                  <a href="#">Resturant</a>
                </li>
                <li>
                  <a href="#">Shops</a>
                </li>
                <li>
                  <a href="#">Moskés</a>
                </li>
              </ul>
            </div>
            <div className="landing-profile">
              {user ? (
                <DropdownP />
              ) : (
                <button
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Head;
