import React from "react";
import { Helmet } from "react-helmet-async";
import { Navigate } from "react-router-dom";
import SideBar from "../sideBar/sideBarTmp";
import MainPage from "../MainPage/MainPage";
import { useDetectAdBlock } from "adblock-detect-react";

const CreateLogoPage = () => {
  const adBlockDetected = useDetectAdBlock();

  if (adBlockDetected) {
    return <Navigate to="/adblock-warning" />;
  }

  return (
    <>
      <Helmet>
        <title>LogoHub - Create Logo</title>
      </Helmet>
      <div className="h-screen w-screen">
        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-10 h-full">
          <div className="col-span-2 bg-black h-full">
            <SideBar />
          </div>
          <div className="col-span-8 bg-white text-black h-full">
            <MainPage />
          </div>
        </div>

        {/* Mobile & Tablet Layout */}
        <div className="lg:hidden flex flex-col h-full">
          <SideBar />
          <div className="bg-white text-black h-full w-full pt-16">
            <MainPage />
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateLogoPage;
