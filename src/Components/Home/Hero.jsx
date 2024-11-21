import React from "react";
import { HERO_CONTENT } from "../../constants/index";
import image1 from "../../assets/images/image1.jpg";

const Hero = () => {
  return (
    <div className="border-b border-neutral-900 pb-4 lg:mb-35">
      <div className="flex flex-wrap">
        <div className="w-full lg:w-1/2">
          <div className="flex flex-col items-center lg:items-start">
            <h1 className="pb-16 text-6xl font-thin tracking-tight lg:mt-16 lg:text-8xl">
              LogoHub
            </h1>
            <span className="bg-gradient-to-r from-pink-300 via-slate-500 to-purple-500 bg-clip-text text-4xl tracking-tight text-transparent">
              Free Logo Creation Website
            </span>
            <p className="my-4 max-w-2xl py-8 text-xl font-light leading-relaxed tracking-tight text-center lg:text-left">
                {HERO_CONTENT}
            </p>
            <button className="mb-14 px-10 py-6 text-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity duration-200 shadow-lg">
                Create Your Logo
            </button>
          </div>
        </div>
        <div className="w-full lg:w-1/2 lg:p-8">
            <div className="flex justify-center">
                <img src={image1} alt="hero" />
            </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
