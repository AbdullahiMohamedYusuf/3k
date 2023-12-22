import React, { useContext } from "react";
import "./sign.css";
import Head from "../components/head";
import Footer from "../components/footer/footer";
import AuthContext from "../utils/authContext";
function Sign() {
  let { SignUser } = useContext(AuthContext);
  return (
    <div className="form-wraper">
      <Head />
      <div className="form">
        <h1>SIGN UP</h1>
        <form action="" onSubmit={SignUser}>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="USERNAME"
            className="input"
            required
          />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="EMAIL"
            className="input"
            required
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="PASSWORD"
            className="input"
            required
          />
        

          <input
            type="submit"
            value="GET STARTED"
            id="Sign"
            className="input"
          />
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Sign;
