import React from "react";
import Logo from "../../assets/images/logo.png";
import "./SideBar.css";

const SideBar = () => {
  return (
    <div className="SideBarBody flex flex-row items-center p-4 bg-gray-800 text-white">
      <div className="logo mr-4">
        <a href="/">
          <img src={Logo} alt="Logo" className="h-8 w-auto" />
        </a>
      </div>
    </div>
  );
};

export default SideBar;
