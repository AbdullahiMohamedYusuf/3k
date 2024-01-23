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
  let [userInformation, setinformation] = useState({});
  const [ToggleProfile, setProfile] = useState(false);
  const fart = false;
  const { user, profileData, CheckProfile, CheckCompany } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [usercompany, setcompany] = useState({});

  useEffect(() => {
    const profileGet = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/user-profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        const data = await response.json();
        setinformation(data.find(
          (find_id) => find_id["user_ID"] === user.user_id
        ))
        if (response.ok) {
          const foundUser = data.find(
            (find_id) => find_id["user_ID"] === user.user_id
          );
          if (foundUser) {
            setProfile(foundUser)
          } else {
            console.log("User information not found");
          }
        } else {
          console.log("Failed to fetch user profile");
        }
      } catch (error) {
        console.error("Error checking profile:", error);
      }
    };

    const companyGet = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/company", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        const data = await response.json();
        setcompany(data.find(
          (find_id) => find_id["user_ID_C"] === user.user_id
        ))
        if (response.ok) {
          const foundUser = data.find(
            (find_id) => find_id["user_ID_C"] === user.user_id
          );
          if (foundUser) {
            setcompany(foundUser)
          } else {
            console.log("User information not found");
          }
        } else {
          console.log("Failed to fetch user profile");
        }
      } catch (error) {
        console.error("Error checking profile:", error);
      }
    };
    profileGet();
    companyGet();

  }, [user]);

  return (
    <div className="role">
      {userInformation ? (
        <h1>
          {userInformation.first_name} {CheckProfile.last_name}
        </h1>
      ) : (
        <p>Loading profile data...</p>
      )}{" "}
      <div className="job">
        <h2>HALAL JOBS Inc.</h2>

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
          {userInformation ? (
            <h3>
              {userInformation.first_name} {userInformation.last_name}
            </h3>
          ) : (
            <p>Loading profile data...</p>
          )}{" "}
        </div>
        <div className="user-name">
          <div className="h3">
            <i class="fa-solid fa-building"></i>
          </div>
          {CheckProfile ? (
            <h3>{usercompany.CompanyName}</h3>
          ) : (
            <p>Loading profile data...</p>
          )}{" "}
        </div>
        <div className="user-name">
          <div className="h3">
            <i class="fa-solid fa-phone"></i>
          </div>
          {usercompany ? (
            <h3>0{usercompany.CompanyNumber}</h3>
          ) : (
            <p>Loading profile data...</p>
          )}{" "}
        </div>
        <div className="user-name">
          <div className="h3">
            <i class="fa-solid fa-envelope"></i>
          </div>
          {usercompany ? (
            <h3>{usercompany.companyEmail}</h3>
          ) : (
            <p>Loading profile data...</p>
          )}{" "}
        </div>
        <div className="user-name">
          <div className="h3">
            <i class="fa-solid fa-globe"></i>
          </div>
          {userInformation ? (
            <h3>
              {userInformation.first_name} {userInformation.last_name}
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
