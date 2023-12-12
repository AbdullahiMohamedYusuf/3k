import { createContext, useState, useEffect, Children } from "react";
import { jwtDecode } from "jwt-decode";
import { Navigate, useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  let [user, setuser] = useState(() =>
    localStorage.getItem("authToken")
      ? jwtDecode(localStorage.getItem("authToken"))
      : null
  );
  let [AuthToken, setAuthToken] = useState(() =>
    localStorage.getItem("authToken")
      ? jwtDecode(localStorage.getItem("authToken"))
      : null
  );
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
      localStorage.setItem("authToken", JSON.stringify(data));
      navigate("/");
    } else {
      alert("Something went wrong");
    }
  };

  let logoutUser = () => {
    setAuthToken(null)
    setuser(null)
    localStorage.removeItem('authToken')
  };
  let [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
  
        if (!authToken) {
          console.error("No authentication token found.");
          return;
        }
  
        const token = jwtDecode(authToken);
  
        if (!token) {
          console.error("Invalid authentication token.");
          return;
        }
  
        const response = await fetch(`http://127.0.0.1:8000/user-profile/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`, // Using the token directly
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          const userProfile = data.find(
            (companyInfo) => companyInfo.user === user.user_id
          );
  
          // Check if userProfile is found before updating state
          if (userProfile) {
            setProfileData(userProfile);
            console.log(userProfile);
          }
        } else {
          console.error("Failed to fetch user profile");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
  
    fetchUserProfile();
  }, [user]);

  let contextData = {
    user: user,
    logoutUser: logoutUser,
    loginUser:loginUser,
    profileData:profileData
  };

  

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
