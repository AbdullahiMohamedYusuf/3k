import React from 'react'
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

const ProfileContext = createContext();
export default ProfileContext;


export const ProfileProvider = ({children}) => {
    const [profileData, setProfileData] = useState(null);
  const { user } = useContext(AuthContext);
  const userId = user.user_id;
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
          setProfileData(data.find(
            (companyInfo) => companyInfo.user === userId
          ))
          if (profileData) {
            console.log(profileData);
          }
          console.log(profileData);

        } else {
          console.error("Failed to fetch user profile");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [userId]);

  let contextProfileData = {
    profileData:profileData
  };


  return (
    <ProfileContext.Provider value={contextProfileData}>{children}</ProfileContext.Provider>
  )
}