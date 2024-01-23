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
          
            <div className="landing-profile">
              {user ? (
                <DropdownP />
              ) : (
                <button
                  onClick={() => {
                    navigate(
                      window.location.pathname === "/login"
                        ? "/sign-up"
                        : "/login"
                    );
                  }}
                >
                  {window.location.pathname === "/login" ? "Sign Up" : "Login"}
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
