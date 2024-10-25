import React from "react";
import Logo from "../../assets/images/logo.png";
import "./SideBar.css";

const SideBar = () => {
  return (
    <div className="SideBarBody">
      <div className="logo">
        <a href="/">
          <img src={Logo} alt="Logo" />
        </a>
      </div>
    </div>
  );
};

export default SideBar;
