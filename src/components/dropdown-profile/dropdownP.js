import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import React, { useContext } from "react";
import "./dropdown.css";
import AuthContext from "../../utils/authContext";

export function DropdownP() {
  let { user,logoutUser, profileData } = useContext(AuthContext);

  return (
    <Menu>
      <MenuHandler>
        <img
          class="profile-picture"
          alt=""
        />
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
        <MenuItem className="Item-menu" >
          <i class="fa-solid fa-door-open"></i>
          <span onClick={logoutUser}>Logout</span>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

export default DropdownP;
