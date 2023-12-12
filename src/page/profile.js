import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../utils/authContext";
import "./profile.css";
import Head from "../components/head";
import Role from "../components/Role/role";
import CompanyForm from "../components/Role/companyEdit";
const Profile = () => {
  const [ToggleProfile, setProfile] = useState(false);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    // Redirect to '/' if user is not available
    return navigate("/");
  }

  return (
    <div className="profile-page">
      <div className="banner">
        <Head />
        <div className="profile-images">
          <div className="select-banner">
            <input
              type="file"
              name="filename"
              accept="image/gif, image/jpeg, image/png"
            />
          </div>
          <div className="banner-profile">
            <img
              class="profile-picture"
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.aXtjrozsVtmwFurWrTw7gQHaJQ%26pid%3DApi&f=1&ipt=d49fd0155c019121f73d7566d681800496b68e251bb66c6f75af28a972111f63&ipo=images"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="content_2">
        <div className="stick">
          <a href="#">
            <i id="facebook" class=" fai fa-brands fa-square-facebook"></i>
          </a>
          <a href="#">
            <i id="twitter" class="fai fa-brands fa-square-x-twitter"></i>
          </a>
          <a href="#">
            <i id="linkedin" class="fai fa-brands fa-linkedin"></i>
          </a>
        </div>
      </div>
      <div className="switch">
        <button
          onClick={() => {
            console.log(ToggleProfile);
            setProfile(!true);
          }}
        >
          Användare
        </button>
        <button
          onClick={() => {
            console.log(ToggleProfile);
            setProfile(!false);
          }}
        >
          Company
        </button>
      </div>
      {ToggleProfile ? <CompanyForm /> : <Role />}
      {/* Render additional profile information here */}
    </div>
  );
};

export default Profile;
