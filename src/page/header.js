import React, { useContext } from "react";
import "../style.css";
import Cards from "../components/cards";
import Jobbs from "../components/cards";
import { TypeAnimation } from "react-type-animation";
import Prayer from "../components/prayer";
import LiveClockUpdate from "../components/Clock";
import AuthContext from "../utils/authContext";
import UniquePrayerTimesRow from "../components/FetchPrayerTime";
import Chapters from "../components/Quran/Chapters";
import Head from "../components/head";
import { useNavigate } from "react-router-dom";

function Header() {
  let { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const resturangs = [
    {
      icon: "fa-solid fa-mosque fa",
      title: "Find your Local Mosques",
      p: "Immerse yourself in the beauty of Islamic architecture and find a welcoming space",
      path: "find",
    },
    {
      icon: "fa-solid fa-shop fa",
      title: "Halal Resturants",
      p: "Explore the rich tapestry of halal cuisine in your city.",
      path: "find",
    },
  ];

  return (
    <div>
      <div className="MainHeader">
        <Head />
        <header>
          <div class="container2">
            <div class="iso">
              <h1>
                <LiveClockUpdate />{" "}
              </h1>

              <UniquePrayerTimesRow />
            </div>
          </div>
        </header>
      </div>
      <div className="content_2">
        <div className="stick">
          <a href="#">
            <i id="facebook" class=" fai fa-brands fa-square-facebook"></i>
          </a>
          <a href="#">
            <i id="twitter" class="fai fa-brands fa-square-x-twitter"></i>
          </a>
          <a href="#">
            <i id="linkedin" class="fai fa-brands fa-linkedin"></i>
          </a>
        </div>
      </div>
      <div className="prayer">
        <div className="remember">
          <h1>
            The Importance Of <span>Salah</span>
          </h1>
          <p>
            "The first matter that the slave will be brought to account for on
            the Day of Judgment is the prayer. If it is sound, then the rest of
            his deeds will be sound. And if it is bad, then the rest of his
            deeds will be bad." [Recorded by al-Tabarani. According to
            al-Albani, it is sahih. Al-Albani, (Sahih al-Jami’, vol.1, p. 503)
            <br />
            <br />
            In reality, if the prayer is performed properly – with true
            remembrance of Allah and turning to Him for forgiveness – it will
            have a lasting effect on the person. After he finishes the prayer,
            his heart will be filled with the remembrance of Allah. He will be
            fearful as well as hopeful of Allah. After that experience, he will
            not want to move from that lofty position to one wherein he disobeys
            Allah. Allah has mentioned this aspect of the prayer when He has
            said,
            <br />
            <br />
            "And I have chosen you, so listen to that which is inspired to you.
            Verily, I am Allah! There is none worthy of worship but I, so
            worship Me and offer prayer perfectly for My remembrance." [Taha
            13-14]
          </p>
        </div>
        <div className="contain1">
          <Prayer />
        </div>
      </div>
      <div className="content_card">
        <h2 className="Super-title">
          Awesome <span>Features</span>
        </h2>
        <div className="cards-container">
          {resturangs.map((item) => {
            return (
              <Cards
                icon={item.icon}
                title={item.title}
                p={item.p}
                path={item.path}
              />
            );
          })}
        </div>
      </div>
      <div className="about">
        <h3>ABOUT US</h3>
        <h2>
          LEARN MORE <span>ABOUT US</span>
        </h2>
        <span class="dot"></span>
        <span class="dot2"></span>
        <span class="dot3"></span>
        <div className="content">
          <div className="imageP">
            <img
              src="https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt=""
            />
          </div>
          <div className="discription">
            <p>
              We believe in fostering a sense of unity and spiritual connection
              within the global Islamic community. Our platform is dedicated to
              providing essential services that enhance your religious
              experience, making it easier for you to embrace and celebrate your
              faith.
              <br />
              <br />
              Never miss a prayer again with our accurate and up-to-date prayer
              times feature. Whether you're at home, work, or traveling, access
              prayer timings effortlessly to align your daily routine with the
              divine.
              <br />
              <br />
              Locate mosques in your area with our user-friendly mosque finder.
              Immerse yourself in the beauty of Islamic architecture and find a
              welcoming space for your spiritual journey. Connect with your
              local community and discover events that bring us together in
              worship and celebration.
              <br />
              <br />
              Explore the rich tapestry of halal cuisine in your city. Our
              comprehensive database of halal restaurants ensures you can savor
              delicious meals without compromising your beliefs. From casual
              dining to fine cuisine, discover the diverse flavors of halal
              gastronomy.
            </p>
            <button
              onClick={() => {
                navigate("/om-islam");
              }}
            >
              Continue <i class="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="famous">
        <div className="title"></div>
      </div>
    </div>
  );
}

export default Header;
