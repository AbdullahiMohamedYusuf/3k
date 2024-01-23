import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import AuthContext from "../../utils/authContext";
import "./dot1.css";
import { Navigate, useNavigate } from "react-router-dom";
import Head from "../../components/head";

function UserProfile() {
  const { user, profileData, CheckProfile, CheckCompany } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [userInformation, setinformation] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    const profileGet = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/user-profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.user_ID == user.user_id) {
            setinformation(data);
            console.log(userInformation);
            return true;
          } else {
            navigate("/profile-setup");
          }
        }
      } catch (error) {
        console.error("Error checking profile:", error);
        return false; // Error occurred during fetch
      }
    };

    profileGet();
  }, [user, navigate]);
  console.log(userInformation)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/user-profile", {
        // Form data
        user_ID: user.user_id,
        first_name: e.target.name.value,
        last_name: e.target.lastname.value,
        description: e.target.txtname.value,
        phone_number: e.target.number.value,
      });
      navigate("/company-setup");
    } catch (err) {
      console.log(`Something went wrong ${err}`);
    }
  };

  return (
    <div className="form-wraper">
      <Head />
      {userInformation === null ? (
        <div className="form">
          <h1>Profile Setup</h1>
          <div className="stages">
            <div className="one" id="stage">
              1
            </div>
            <div className="two" id="stage">
              2
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              id="username"
              placeholder="FIRST NAME"
              className="input"
              required
            />

            <input
              type="text"
              name="lastname"
              id="password"
              placeholder="LAST NAME"
              className="input"
              required
            />

            <input
              type="number"
              name="number"
              id="password"
              className="input"
              placeholder="Phone number"
              required
            />

            <textarea
              id="txtid"
              name="txtname"
              rows="4"
              cols="50"
              maxLength="200"
              placeholder="Descriptions"
            ></textarea>

            <input type="submit" value="CREATE" id="Sign" className="input" />
          </form>
        </div>
      ) : (
        navigate("/company-setup")
      )}
    </div>
  );
}

export default UserProfile;
