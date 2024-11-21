import React from "react";
import aboutImg from "../../assets/images/aboutImage.jpg";
import { ABOUT_TEXT } from "../../constants";

const About = () => {
  return (
    <div className="border-b border-neutral-900 pb-4">
      <h1 className="my-10 sm:my-8 text-center text-5xl sm:text-5xl font-thin tracking-tight">
        About Us
      </h1>
      <div className="flex flex-wrap">
        <div className="w-full p-8 flex flex-wrap lg:flex-nowrap items-center">
          <div className="w-full lg:w-1/2 flex items-center justify-center">
            <img
              src={aboutImg}
              alt="about"
              className="w-full sm:w-auto rounded-2xl"
            />
          </div>
          <div className="w-full lg:w-1/2 lg:pl-8 flex items-center">
            <p className="my-4 max-w-2xl py-8 text-xl font-light leading-relaxed tracking-tight text-center lg:text-left">
              {ABOUT_TEXT}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
