import {
  createContext,
  useState,
  useEffect,
  Children,
  useContext,
} from "react";
import { jwtDecode } from "jwt-decode";
import { Navigate, useNavigate } from "react-router-dom";
import AuthContext from "../../utils/authContext";

function Role() {
  const { profileData } = useContext(AuthContext);

  return (
    <div className="role">
      {profileData ? (
        <h1>
          {profileData.first_name} {profileData.last_name}
        </h1>
      ) : (
        <p>Loading profile data...</p>
      )}{" "}
      <div className="job">
        <h2>HALAL JOBS Inc.</h2>
        <h3>CEO & Founder</h3>
        <br />
        <br />
        <div className="p">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium
          deserunt, ut accusamus id laboriosam autem illum, incidunt cupiditate
          exercitationem necessitatibus consectetur ullam quis, quidem nisi
          deleniti enim sed voluptatibus? Tempora, quo? Recusandae accusantium
          ipsa ducimus repellendus cum, culpa minus optio placeat possimus omnis
          eaque iste sunt quasi suscipit, voluptatem quod!
        </div>
      </div>
      <div className="contact-info">
        <div className="user-name">
          <div className="h3">
            <i class="fa-solid fa-user"></i>
          </div>
            {profileData ? (
              <h3>
                {profileData.first_name} {profileData.last_name}
              </h3>
            ) : (
              <p>Loading profile data...</p>
            )}{" "}
          
        </div>
        <div className="user-name">
          <div className="h3">
            <i class="fa-solid fa-building"></i>
          </div>
          {profileData ? (
              <h3>
                {profileData.UserCompany}
              </h3>
            ) : (
              <p>Loading profile data...</p>
            )}{" "}
        </div>
        <div className="user-name">
          <div className="h3">
            <i class="fa-solid fa-phone"></i>
          </div>
          {profileData ? (
              <h3>
                0{profileData.PhoneNumber}
              </h3>
            ) : (
              <p>Loading profile data...</p>
            )}{" "}
        </div>
        <div className="user-name">
          <div className="h3">
            <i class="fa-solid fa-envelope"></i>
          </div>
          {profileData ? (
              <h3>
                {profileData.first_name} {profileData.last_name}
              </h3>
            ) : (
              <p>Loading profile data...</p>
            )}{" "}
        </div>
        <div className="user-name">
          <div className="h3">
            <i class="fa-solid fa-globe"></i>
          </div>
          {profileData ? (
              <h3>
                {profileData.first_name} {profileData.last_name}
              </h3>
            ) : (
              <p>Loading profile data...</p>
            )}{" "}
        </div>
      </div>
    </div>
  );
}

export default Role;
