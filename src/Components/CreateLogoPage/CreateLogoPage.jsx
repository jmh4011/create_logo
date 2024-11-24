import React from "react";
import { Helmet } from "react-helmet-async";
import { Navigate } from "react-router-dom";
import SideBar from "../SideBar/SideBar";
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
      <div className="grid grid-rows-10 md:grid-cols-10 md:grid-rows-1 h-screen">
        <div className="row-span-1 md:col-span-2 bg-black">
          <SideBar />
        </div>
        <div className="row-span-9 md:col-span-8 bg-white text-black">
          <MainPage />
        </div>
      </div>
    </>
  );
};

export default CreateLogoPage; // default export
