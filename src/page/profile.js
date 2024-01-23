import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../utils/authContext";
import "./profile.css";
import Head from "../components/head";
import Role from "../components/Role/role";
import CompanyForm from "../components/Role/companyEdit";
import axios from "axios";

const Profile = () => {
  const [ToggleProfile, setProfile] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [userInformation, setinformation] = useState(null);
  const [userCompany, setCompany] = useState(null);
  const [BannerPicture, setBanner] = useState();
  const [profilePicture, setPicture] = useState();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

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

        if (response.ok) {
          const foundUser = data.find(
            (find_id) => find_id["user_ID"] === user.user_id
          );
          if (foundUser) {
            setinformation(foundUser);
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

        if (response.ok) {
          const foundUser = data.find(
            (find_id) => find_id["user_ID_C"] === user.user_id
          );
          if (foundUser) {
            console.log(foundUser); // Log the found userInformation
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

    const BannerGet = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/banner", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        const data = await response.json();

        if (response.ok) {
          const foundUser = data.find(
            (find_id) => find_id["user_ID_P"] === user.user_id
          );
          if (foundUser) {
            setBanner(foundUser);
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
    const pfpGet = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/pfp", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        const data = await response.json();

        if (response.ok) {
          const foundUser = data.find(
            (find_id) => find_id["user_ID_B"] === user.user_id
          );
          if (foundUser) {
            setPicture(foundUser);
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
    pfpGet();
    profileGet();
    BannerGet();
  }, [user, navigate]);

  const SetBanner = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.append("user_ID_P", user.user_id);
      formData.append("company_uploads", e.target.files[0]);

      const response = await axios.post(
        "http://127.0.0.1:8000/banner",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      window.location.reload(true);

    } catch (err) {
      console.log(`Something went wrong ${err}`);
    }
  };
  const Setpfp = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.append("user_ID_B", user.user_id);
      formData.append("profile_uploads", e.target.files[0]);

      const response = await axios.post("http://127.0.0.1:8000/pfp", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      window.location.reload(true);

    } catch (err) {
      console.log(`Something went wrong ${err}`);
    }
  };

  return (
    <div className="profile-page">
      {userInformation != null ? (
        <React.Fragment>
          <div
            className="banner"
            style={{
              background: BannerPicture
              ? `url(http://127.0.0.1:8000${BannerPicture.company_uploads})`
              : "#999",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            }}
          >
            <Head />
            <div className="profile-images">
              <div className="select-banner">
                {BannerPicture ? (
                  console.log("ff")
                ) : (
                  <form action="" onSubmit={SetBanner}>
                    <input
                      type="file"
                      name="banner"
                      accept="image/gif, image/jpeg, image/png"
                      onChange={(e) => SetBanner(e)}
                    />
                  </form>
                )}
              </div>
              <div className="banner-profile">
                <div
                  className="profile-picture"
                  style={{
                    backgroundImage: profilePicture
                    ? `url(http://127.0.0.1:8000${profilePicture.profile_uploads})`
                    : `url('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAMAAzAMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAAAQMEBQIGB//EAC8QAQACAQIFAgUDBAMAAAAAAAABAgMEERIhMUFRBXETIjJhkRQjoUJSU4FyweH/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AP3EAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAV3y1r05yqtltP/AIDRvEd3mctY7s0ygGj41fP8J+LWe/8ADMA1Res9JeondjeotMc4kGsUVzT0tC6totHKQSG4AAAAAAAAAAADze0VruBaeGN92e+Sb8t9oRa3FO+8vKAAAAAAAAAmJmJ3idpQA0YssW5TylaxrcWT+mewLwFAAAAAAAAETO3VmyXm08uizPblwwoBKAQAJ5RuCVGTU4sfKbbz4jmyavVTk+THO1O895ZQdCdfX/Hbb3TXXY5n5omseXO7Co7VLVvXipaLR9kuNjvbHbipO0unptRXNTxeOsIq4ABPbl1QA04r8Ubd4WMdbTW3FHVrid4iYUSAAAAAATO0bivNO1PcFFp3mZeU90IAADJ6hl4axirPO/X2a3L1s76i2/bkooAEAAHvDknFlrkjt1+8PBsDtxMTETHSeYp0VuLTU37cl6KgABfgnrHhQ94p4bxINQCgAAAAp1E9IXM+f649gVAIAADla2JjUX387uqxeo4/pyf6n/pRhAEAADsJpWb3ilesztAOpoa8Omr95mV7zSvBStI7RslFAAEx1QkGuvSEvNPor7PSgAAAAz5/rj2aFGeOkgpAQAAEWrW1bVtzieqQHK1GC2C3mvaVLtWrFq8NqxMT1iWXJoaWneluH7dYUc8a50OTfaLV2TXQWmfnvG326iMcbzMRETMz2h0tHpvhRN7/AFT/AAtw6fHi50rG/meq1FEAAAAlCY6g1U+ivs9Ir0hKgAAAAqzx8m/3WomN42kGRCZjaZiUIAJAeL3pjje9ohj1Os/pw8vNmOZ4p3tMzKjpTrMP90/hH63D5t+HNAdL9bh82/B+tw+bfhzQHT/W4fMx/p7pqsN52i/55OSA7iHJwZ74Z+W0zHeJ7ulgzVzV3rynvHhBYAA9Y44rxDyv09etgXAKAAAAAAKM9dvm/KlsmN+U9GW1Zrbbt5BDHrs/DHwqzzn6vs17xG8z0hxslpvkteesyDyAIAAAAAAPeHJbFki9eTwA7WO8ZMdb16T0Sx+m33panjo2opWOKYiGusbRsqw02+ae65QAAAAAAAAeMlItGz2AwamJphyb9olxn0mfFXNjmk8t423cLU6TJprTxRvXtbsCgAQAAAAAABMVm0xFYmZntANPp0/vzHmrr4se/O3Rk9P0M4p+Jlna0xtwukKAAAAAAAAAAAAItWLRMWiJie0pAc3U+mVvM2wTwT/bPSXOy6bNhn9zHMR56vowHy4+hyaXDk+vHXfz0Z7el4Lc4m9faQcYdafScX+W/wDCY9Jwx1yZJ/AOQmtbWnasTM/aN3cp6fp6z9M2/wCU7tFMdKR8lYj2gHHwem5r7fE2x18zzl09PpcWnj9uvzT1tPVoARCQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//Z')`, // Provide the URL for your default image
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  }}
                >
                  {BannerPicture ? (
                    <form action="" onSubmit={Setpfp}>
                      <div className="pfp">
                        <input
                          type="file"
                          name="pfp"
                          accept="image/gif, image/jpeg, image/png"
                          onChange={(e) => Setpfp(e)}
                          className="invsChange"
                        />
                      </div>
                    </form>
                  ) : (
                    <form action="" onSubmit={Setpfp}>
                      <input
                        type="file"
                        name="pfp"
                        accept="image/gif, image/jpeg, image/png"
                        onChange={(e) => Setpfp(e)}
                        className="invsChange"
                      />
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
          <br />
          {BannerPicture != null ? <input
            type="file"
            name="banner"
            accept="image/gif, image/jpeg, image/png"
            onChange={(e) => SetBanner(e)}
          />: (console.log("fart")) }
          <div className="content_2">
            <div className="stick">
              <a href="#">
                <i
                  id="facebook"
                  className=" fai fa-brands fa-square-facebook"
                ></i>
              </a>
              <a href="#">
                <i
                  id="twitter"
                  className="fai fa-brands fa-square-x-twitter"
                ></i>
              </a>
              <a href="#">
                <i id="linkedin" className="fai fa-brands fa-linkedin"></i>
              </a>
            </div>
          </div>
          <div className="switch">
            <button
              onClick={() => {
                setProfile(false); // Setting to 'false' for user view
              }}
            >
              Användare
            </button>
            <button
              onClick={() => {
                setProfile(true); // Setting to 'true' for company view
              }}
            >
              Company
            </button>
          </div>
          {ToggleProfile ? <CompanyForm /> : <Role />}
        </React.Fragment>
      ) : (
        navigate("/profile-setup")
      )}
    </div>
  );
};

export default Profile;
