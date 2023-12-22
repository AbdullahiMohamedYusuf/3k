import React, { useContext } from "react";
import "./sign.css";
import Head from "../components/head";
import Footer from "../components/footer/footer";
import AuthContext from "../utils/authContext";

function Login() {
  const { loginUser } = useContext(AuthContext);
  return (
    <div className="form-wraper">
      <Head />
      <div className="form" onSubmit={loginUser}>
        <h1>Login</h1>
        <form action="">
          <input
            type="text"
            name="username"
            id="username"
            placeholder="USERNAME"
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
          <h5>8 Characters & at least 1 big letter</h5>
          <div className="checkBox">
            <input
              type="checkbox"
              id="demoCheckbox"
              name="checkbox"
              value="1"
              className="demoCheckbox"
              placeholder=""
            />
            <label id="remember" for="demoCheckbox">
              {" "}
              Remember me
            </label>
          </div>

          <input type="submit" value="Login" id="Sign" className="input" />
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
