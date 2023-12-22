import { useState, useContext } from "react";
import "./company.css"; // Import your CSS file for styling
import AuthContext from "../../utils/authContext";

const CompanyForm = () => {
  const { profileData } = useContext(AuthContext);

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
      {displayMode ? (
        <div className="company-info">
          <h3>Company Information</h3>
          <p>Company Name: {profileData.UserCompany}</p>
          <p>Company Address: {companyInfo.address}</p>
          <p>Company Number: {companyInfo.phoneNumber}</p>
          <p>Company OpenHours: {companyInfo.openHours}</p>
          <p>Company Description: {companyInfo.description}</p>

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
