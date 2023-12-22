import React, { useContext, useState } from "react";
import axios from "axios";
import AuthContext from "../../utils/authContext";
import "./dot1.css";
function UserProfile() {
  const { user } = useContext(AuthContext);
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
    } catch (err) {
      console.log(`Something went wrong ${err}`);
    }
  };

  return (
    <div className="form-wraper">
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

          <input
            type="submit"
            value="CREATE"
            id="Sign"
            className="input"
          />
        </form>
      </div>
    </div>
  );
}

export default UserProfile;
