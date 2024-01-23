import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import React, { useContext, useState, useEffect } from "react";
import "./dropdown.css";
import AuthContext from "../../utils/authContext";

export function DropdownP() {
  let { user, logoutUser, profileData } = useContext(AuthContext);
  const [profilePicture, setPicture] = useState("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADACAMAAAB/Pny7AAAAMFBMVEXk5ueutLfX2tynrrLn6eqrsbXq7O3h4+SyuLva3d6/w8bLz9HU19nR1NbIzM66v8KaEzi7AAAFHUlEQVR4nO2d23LjIAxAjREXYwP//7cLTrpNUzs1IEdyhvOwM7vbB5+RAHHtMHQ6nU6n0+l0Op1Op9PpdDqdTqfT6XQ6nU4JoDUMZhoTk1n/clHSt5vFRftNdN5oTf1dFYA2wYrf2HA5H9DBSrXhIoSSYoYLpRsMQcpNkxtSBkP9jUcxs3qlsuqoYC4QHTDebufXk4717HVgcuqIS2o7yk28bcDHYyqrjvWc+zUI4rhLshGBb2zAFZjcdNzAVAcKUuy/TeRpU+PC1qbKJdswHEBdnUsacQL1p/8i1Lqk2MzUH/8TWKpVcg+9sGo25lAJs4udqAUeqW4w99hEPqEB3+aSOgFGhU2jSo4Nl9Do8Nf05YCMYxIaaHdJNjyGTh0RXISILEJjMAKT4DBV043d8n8cvQyYrdWxCpSlD42ecVwSM3mrAZzmL3LvTN2hwYSUZQk7EucZ4GVZmgoQ5xlg9WWCQZ5NlZPlTZlIOxOABa/JJGgnaZhNJjcaWpmGqf+GDO3ShkFs/+Q9AGb7X5fQCPMMJrTxf4W0PIMRtTMTgrIGQO6ZhSKVaV6WeZJZ6FzQZeQnySj/QTLyk2Ro20zL4v+mTB9nmMqQLtB8UjmDXTWTFprNu0xPMrRTAOTJGe1OLfK02dNOm1G7M+pVQPNBS024i4DURzXAI6410zaZofk4wwPkWZY3zpBc0ihDHRjMwpk8y5IN1jZgpDYZEPcBA/kuYAJwXCy1xwrMKCc0mJwKhqLDzHtQW9yBpT00kkFXdqPuEPAjynJo/SswNQeG040N35Zoktf52abiWTnqz/8BTC31puWUZEPjTg31MZNfNExsKFfL96it0Xg1/i/mqmbD0wVqOmjS7aXXjAdvAn67UG7I/AEYWxIcKchn/a+AwR23kbzGyg30cnBCoNTCprjcBYw7pOOYDfvbgB7j6+JGKRvHq7zaALA4uxuepOKWS70IAFNwdqOjzkEJ05VUMgBm9CFaKdXqlP6U0kY3j+ZqKivJx0yLD8FlQpiXabqmyZ307eaL4coi62stT1xQJ3/2YCY/pwyLD8/OuJxqZv3fa5BayhKikCtP3Zm6/6t188TysvkX+dtSMJz97bA11qQfyj3bYPhJ5WY+zlmkZA6QfjqGlHecfFJi5YioIpHvzEs5tzBJOtBDDknprOynj4jB05cFqWxpNHnwWQbKTk6/LChLfVLVNhsqHT34iKZy8xE2TBQ6WgdEjQfi26MD4Nsbyg7yvUfokopAutC8hZLubas2qVwpWlCq0RHhLXMFGEbUo4x7OtafP46CCWgnf17bKDeeG5y8UnFyhj3o2FOf2oPhTWH50onnbUMB7nW5IzZ2Pqnl6OWtYblzzmtuULeX1Io6Zff2fS3/yUZij6BgIpGLyDfRUGMDeMdKq2wwTwm1HVlAAPE6OrkLog0DlwSOzfuHym0w2g3gXl6qx2L0aajXfVpAuJDWeCwOkebXQ2Fk49J8boB4sHymbfAEqoJsB9VQdGIcWEZFNby1h3TKH5H6REN7IA+Tyh6t/ej1CdS+t6l5lDHPVA2dMFJ/9iZ1oWEamKprtujvFmBRc2kQ82osKqripWoms5gtiudp4Kk/eZfyJxC4TMm2KO0CsB8uQ6X0QQfs13FQKc4zmoXlgxROoDk3mVQ7FzUazOdxT6Dsvh2MnAMjVNFvFmM3xXyibJ0G5e71edgSGcNm5W+HIhkneVNUa66/AZMxZaMm8KbIpdPpdDqdTucq/AMef1AMtjuGRwAAAABJRU5ErkJggg==");

  useEffect(() => {
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
  }, [user]);
  return (
    <Menu>
      <MenuHandler>
        <div
          className="profile-picture"
          style={{
            backgroundImage: profilePicture
            ? `url(http://127.0.0.1:8000${profilePicture.profile_uploads})`
            : `url('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAMAAzAMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAAAQMEBQIGB//EAC8QAQACAQIFAgUDBAMAAAAAAAABAgMEERIhMUFRBXETIjJhkRQjoUJSU4FyweH/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AP3EAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAV3y1r05yqtltP/AIDRvEd3mctY7s0ygGj41fP8J+LWe/8ADMA1Res9JeondjeotMc4kGsUVzT0tC6totHKQSG4AAAAAAAAAAADze0VruBaeGN92e+Sb8t9oRa3FO+8vKAAAAAAAAAmJmJ3idpQA0YssW5TylaxrcWT+mewLwFAAAAAAAAETO3VmyXm08uizPblwwoBKAQAJ5RuCVGTU4sfKbbz4jmyavVTk+THO1O895ZQdCdfX/Hbb3TXXY5n5omseXO7Co7VLVvXipaLR9kuNjvbHbipO0unptRXNTxeOsIq4ABPbl1QA04r8Ubd4WMdbTW3FHVrid4iYUSAAAAAATO0bivNO1PcFFp3mZeU90IAADJ6hl4axirPO/X2a3L1s76i2/bkooAEAAHvDknFlrkjt1+8PBsDtxMTETHSeYp0VuLTU37cl6KgABfgnrHhQ94p4bxINQCgAAAAp1E9IXM+f649gVAIAADla2JjUX387uqxeo4/pyf6n/pRhAEAADsJpWb3ilesztAOpoa8Omr95mV7zSvBStI7RslFAAEx1QkGuvSEvNPor7PSgAAAAz5/rj2aFGeOkgpAQAAEWrW1bVtzieqQHK1GC2C3mvaVLtWrFq8NqxMT1iWXJoaWneluH7dYUc8a50OTfaLV2TXQWmfnvG326iMcbzMRETMz2h0tHpvhRN7/AFT/AAtw6fHi50rG/meq1FEAAAAlCY6g1U+ivs9Ir0hKgAAAAqzx8m/3WomN42kGRCZjaZiUIAJAeL3pjje9ohj1Os/pw8vNmOZ4p3tMzKjpTrMP90/hH63D5t+HNAdL9bh82/B+tw+bfhzQHT/W4fMx/p7pqsN52i/55OSA7iHJwZ74Z+W0zHeJ7ulgzVzV3rynvHhBYAA9Y44rxDyv09etgXAKAAAAAAKM9dvm/KlsmN+U9GW1Zrbbt5BDHrs/DHwqzzn6vs17xG8z0hxslpvkteesyDyAIAAAAAAPeHJbFki9eTwA7WO8ZMdb16T0Sx+m33panjo2opWOKYiGusbRsqw02+ae65QAAAAAAAAeMlItGz2AwamJphyb9olxn0mfFXNjmk8t423cLU6TJprTxRvXtbsCgAQAAAAAABMVm0xFYmZntANPp0/vzHmrr4se/O3Rk9P0M4p+Jlna0xtwukKAAAAAAAAAAAAItWLRMWiJie0pAc3U+mVvM2wTwT/bPSXOy6bNhn9zHMR56vowHy4+hyaXDk+vHXfz0Z7el4Lc4m9faQcYdafScX+W/wDCY9Jwx1yZJ/AOQmtbWnasTM/aN3cp6fp6z9M2/wCU7tFMdKR8lYj2gHHwem5r7fE2x18zzl09PpcWnj9uvzT1tPVoARCQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//Z')`, // Provide the URL for your default image
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          }}
        ></div>
      </MenuHandler>
      <MenuList className="MenuList-own">
        <MenuItem className="Item-menu">
          <h3>{user.username}</h3>
        </MenuItem>
        <MenuItem className="Item-menu">
          <a href="/profile">
            <i class="fa-solid fa-user"></i>
            <span>Profile</span>
          </a>
        </MenuItem>
        <MenuItem className="Item-menu">
          <i class="fa-solid fa-door-open"></i>
          <span onClick={logoutUser}>Logout</span>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

export default DropdownP;
