import { createContext, useState, useEffect, Children } from "react";
import { jwtDecode } from "jwt-decode";
import { Navigate, useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  let [Data, setData] = useState("");

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

      try {
        const userId = jwtDecode(data.access).user_id;
        console.log("User ID:", userId);

        const profileExists = await CheckProfile(userId);
        console.log("Profile Exists:", profileExists);

        const CheckCompanyExist = await CheckCompany(userId);
        console.log("Check Company Exists:", CheckCompanyExist);

        if (profileExists) {
          navigate("/");
        } else if (!profileExists && !CheckCompanyExist) {
          navigate("/profile-setup");
        } else if (profileExists && !CheckCompanyExist) {
          navigate("/company-setup");
        } else {
          alert("Something went wrong");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong");
      }
    } else {
      alert("Something went wrong");
    }
  };

  let CheckProfile = async (userId) => {
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
  
        if (data.user_id === userId) {
          console.log("User Profile Data:", data); // Log fetched profile data
          return true; // User profile exists
        } else {
          return false; // User profile does not match logged-in user
        }
      } else {
        return false; // Non-200 response
      }
    } catch (error) {
      console.error("Error checking profile:", error);
      return false; // Error occurred during fetch
    }
  };

  let CheckCompany = async (userId) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/company", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();

        // Check if any company matches the user ID
        const companyExists = data.some(
          (company) => company.user_ID_C === userId
        );

        return companyExists;
      } else {
        return false; // Non-200 response
      }
    } catch (error) {
      console.error("Error checking company:", error);
      return false; // Error occurred during fetch
    }
  };

  let logoutUser = () => {
    setAuthToken(null);
    setuser(null);
    localStorage.removeItem("authToken");
  };

  let SignUser = async (e) => {
    e.preventDefault();
    console.log("Logged in!");
    let response = await fetch("http://127.0.0.1:8000/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: e.target.username.value,
        email: e.target.email.value,
        password: e.target.password.value,
      }),
    });
    const userData = await response.json(); // Assuming signup response contains user data

    const profileExists = await CheckProfile(userData.user_id); // Pass the user ID from signup

    if (response.status === 201) {
      if (profileExists) {
        navigate("/");
      } else {
        navigate("/continue-setup");
      }
    } else {
      alert("Something went wrong");
    }
  };

  let UserProfileCreation = async (e) => {
    try {
      console.log("Logged in!");
      let response = await fetch("http://127.0.0.1:8000/user-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({
          first_name: e.target.name.value,
          last_name: e.target.lastname.value,
          Description: e.target.txtname.value,
          PhoneNumber: e.target.number.value,
        }),
      });

      if (response.status === 201) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error creating profile:", error);
      return false;
    }
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

        const response = await fetch(`http://127.0.0.1:8000/user-profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();

          // Find the user profile based on the user ID
          const userProfile = data.find(
            (profile) => profile.user_ID === token.user_id
          );
          setProfileData(userProfile);

          // Check if userProfile is found before updating state
          if (userProfile) {
            setProfileData(userProfile);
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
    loginUser: loginUser,
    CheckProfile: CheckProfile,
    SignUser: SignUser,
    UserProfileCreation: UserProfileCreation,
    CheckCompany: CheckCompany,
    profileData:profileData
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
