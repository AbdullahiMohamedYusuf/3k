import { createContext, useState, useEffect, Children } from "react";
import { jwtDecode } from "jwt-decode";
import { Navigate, useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  
  let [user, setuser] = useState(() => localStorage.getItem("authToken") ? jwtDecode(localStorage.getItem('authToken')) : null);
  let [AuthToken, setAuthToken] = useState(() => localStorage.getItem("authToken") ? jwtDecode(localStorage.getItem('authToken')) : null);
  const navigate = useNavigate();

  let loginUser = async (e) => {
    e.preventDefault();
    console.log("Form Submitted!");
    let response = await fetch("http://127.0.0.1:8000/api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
      }),
    });
    let data = await response.json();
    console.log(jwtDecode(data.access));
    if (response.status === 200) {
      setAuthToken(data);
      setuser(jwtDecode(data.access));
      localStorage.setItem('authToken', JSON.stringify(data))
      navigate("/");
    } else {
      alert("Something went wrong");
    }
  };

  let contextData = {
    user: user,
    loginUser: loginUser,
  };
  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
