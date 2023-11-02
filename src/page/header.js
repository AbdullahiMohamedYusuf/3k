import React from "react";
import "../style.css";
import Cards from "../components/cards";
import Jobbs from "../components/cards";
import { TypeAnimation } from "react-type-animation";
import Prayer from "../components/prayer";
import LiveClockUpdate from "../components/Clock";
import UniquePrayerTimesRow from "../components/FetchPrayerTime";
function Header() {
  const resturangs = [
    {
      icon: "fa-solid fa-mosque fa",
      title: "Find your Local Mosques",
      p: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente, sequi.",
    },
    {
      icon: "fa-solid fa-shop fa",
      title: "Halal Resturants",
      p: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente, sequi.",
    },
  ];

  return (
    <div>
      <div className="MainHeader">
        <nav>
          <div class="container">
            <div class="menu">
              <i class="fa-sharp fa-light fa-utensils"></i>
              <ul>
                <li>
                  <a href="#">Resturant</a>
                </li>
                <li>
                  <a href="#">Shops</a>
                </li>
                <li>
                  <a href="#">Moskés</a>
                </li>
              </ul>
            </div>
            <div class="buttons">
              <button>
                <a href="/login">Login</a>
              </button>
            </div>
          </div>
        </nav>
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
        <div className="cards-container">
          {resturangs.map((item) => {
            return <Cards icon={item.icon} title={item.title} p={item.p} />;
          })}
        </div>
      </div>
      <div className="about">
        <h3>ABOUT US</h3>
        <h2>
          LEARN MORE <span>ABOUT US</span>
        </h2>
        <div className="content">
          <div className="imageP">
            <img
              src="https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt=""
            />
          </div>
          <div className="discription">
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum
              eaque laborum eligendi ipsa totam error dicta labore nihil
              doloremque obcaecati architecto aspernatur illum necessitatibus
              sequi, optio voluptates est modi, dolore facilis? Cumque soluta
              quisquam, magni labore perferendis recusandae voluptates impedit,
              doloremque doloribus cum ex alias unde, incidunt harum
              consectetur. Repellat voluptatibus corrupti dolor, consequuntur,
              velit odio est quae similique rerum, itaque provident modi tempore
              quaerat non harum expedita. Nostrum incidunt ut vero vitae
              explicabo voluptatibus iste. Nisi perferendis officiis eos
              accusamus earum voluptatem quam consequuntur dolor, molestias,
              ipsum non rem, impedit similique maiores hic praesentium magni
              alias fugit iste veritatis.
            </p>
            <button>
              Continue <i class="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="famous">
        <div className="title">
          <h1>Hello</h1>
          <div className="line"></div>
        </div>
      </div>
    </div>
  );
}

export default Header;
