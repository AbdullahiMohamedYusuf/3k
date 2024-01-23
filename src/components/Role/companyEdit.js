import {
  createContext,
  useState,
  useEffect,
  Children,
  useContext,
} from "react";import "./company.css"; // Import your CSS file for styling
import AuthContext from "../../utils/authContext";
import { jwtDecode } from "jwt-decode";
import { Navigate, useNavigate } from "react-router-dom";

const CompanyForm = () => {

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
            console.log(foundUser); // Log the found  userInformation
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
            console.log(foundUser); // Log the found  userInformation
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
    console.log('User Company:', usercompany);

    console.log("Look:", userInformation)
  }, [user]);


  const initialCompanyInfo = {
    name: "Halal Inc.",
    address: "Drottningsgatan 9",
    phoneNumber: "+46735076335",
    openHours: "10 am - 10 pm",
    description: "OOgga booga",
    pictures: [],
  };

  const [companyInfo, setCompanyInfo] = useState(initialCompanyInfo);
  const [displayMode, setDisplayMode] = useState(true);
  const [enlargedImage, setEnlargedImage] = useState(null);
  const [editorValues, setEditorValues] = useState({
    address: "",
    phoneNumber: "",
    openHours: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditorValues({
      ...editorValues,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCompanyInfo({
      ...companyInfo,
      address: editorValues.address || companyInfo.address,
      phoneNumber: editorValues.phoneNumber || companyInfo.phoneNumber,
      openHours: editorValues.openHours || companyInfo.openHours,
      description: editorValues.description || companyInfo.description,
    });
    setDisplayMode(true); // Switch back to display mode after submitting
  };

  const toggleDisplay = () => {
    setDisplayMode(!displayMode);
  };

  return (
    <div className="company-form">
      <h2>Company Profile</h2>
      {usercompany ? (
        <div className="company-info">
          <h3>Company Information</h3>
          <p>Company Name: {usercompany.CompanyName}</p>
          <p>Company Address: {usercompany.Address}</p>
          <p>Company Number: {usercompany.CompanyNumber}</p>
          <p>Company Type: {usercompany.Typ}</p>
          <p>Company email: {usercompany.companyEmail}</p>

          {/* Add other fields similarly */}
        </div>
      ) : (
        <div className="editor">
          <input
            type="text"
            name="address"
            onChange={handleChange}
            placeholder="Address"
          />
          <input
            type="text"
            name="phoneNumber"
            onChange={handleChange}
            placeholder="PhoneNumber"
          />

          <input
            type="text"
            name="description"
            onChange={handleChange}
            placeholder="Description"
          />
          <div className="time-input">
            <input type="time" name="opening" id="opening" />{" "}
            <input type="time" name="Closing" id="Closing" />
          </div>
          <input type="file" name="" id="" />
          <button type="submit" onClick={handleSubmit}>
            Update
          </button>
        </div>
      )}
      <button onClick={toggleDisplay}>
        {displayMode ? "Edit Company Info" : "Show Company Info"}
      </button>

      {enlargedImage && (
        <div
          className="enlarged-image-modal"
          onClick={() => setEnlargedImage(null)}
        >
          <img src={enlargedImage} alt="Enlarged" className="enlarged-image" />
        </div>
      )}
    </div>
  );
};

export default CompanyForm;
