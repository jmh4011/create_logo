import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import "./SideBar.css";

const SideBar = () => {
  return (
    <div className="h-screen flex flex-col items-start p-4 bg-black text-white">
      <Link to="/">
        <img src={Logo} alt="Logo" className="h-8 md:h-12 lg:h-16 w-auto" />
      </Link>
    </div>
  );
};

export default SideBar;