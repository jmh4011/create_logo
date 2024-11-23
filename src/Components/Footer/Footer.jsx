import React from "react";

const Footer = () => {
  return (
    <footer className="relative bg-gray-900 text-white h-[240px]">
      <div className="absolute inset-0 flex justify-center items-center">
        <img
          src="https://via.placeholder.com/1600x240?text=Google+Ads+Demo+(1600x240)"
          alt="Google Ad Demo"
          className="w-full h-full object-cover"
        />
      </div>
    </footer>
  );
};

export default Footer;
