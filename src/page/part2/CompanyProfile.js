import React, { useContext } from "react";
import Head from "../../components/head";
import "../sign.css";
import axios from "axios";
import AuthContext from "../../utils/authContext";
import "./dot2.css";

function CompanyProfile() {
  const { user } = useContext(AuthContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/company", {
        user_ID_C: user.user_id,
        companyName: e.target.companyName.value,
        number: e.target.numberZ.value, // Renaming numberZ to match the expected key
        companyEmail: e.target.companyEmail.value,
        Address: e.target.Address.value,
        City: e.target.City.value, // Renaming City to match the expected key
        postnummer: e.target.postnummer.value, // Renaming postnummer to match the expected key
        type: e.target.type.value, // Renaming type to match the expected key
      });
      console.log("sent");
    } catch (err) {
      console.log(`Something went wrong ${err}`);
    }
  };
  const options = [
    { value: "Moské", label: "Moské" },
    { value: "Kafé", label: "Kafé" },
    { value: "Resturant", label: "Resturant" },
    { value: "kaffebar", label: "kaffebar" },
  ];
  return (
    <div className="form-wraper">
      <div className="form">
        <h1>Company Setup</h1>
        <div className="stages2">
          <div className="one" id="stage">
            1
          </div>
          <div className="two" id="stage">
            2
          </div>
        </div>
        <form action="" onSubmit={handleSubmit}>
          <input
            type="text"
            name="companyName"
            id="username"
            placeholder="Company Name"
            className="input"
            required
          />

          <input
            type="email"
            name="companyEmail"
            id="password"
            placeholder="Company Email"
            className="input"
            required
          />
          <input
            type="number"
            name="numberZ"
            id="password"
            className="input"
            required
            value={`${+467}`}
          />
          <div className="location">
            <input
              type="text"
              name="Address"
              id="username"
              placeholder="Address"
              className="input"
              required
            />
            <input
              type="text"
              name="City"
              id="username"
              placeholder="City"
              className="input"
              required
            />
          </div>
          <input
            type="number"
            name="postnummer"
            id="password"
            className="input"
            placeholder="Postnummer"
            required
          />

          <select name="type" className="selector" defaultValue="">
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <input
            type="submit"
            value="FINISH"
            id="Sign"
            className="input"
          />
        </form>
      </div>
    </div>
  );
}

export default CompanyProfile;
