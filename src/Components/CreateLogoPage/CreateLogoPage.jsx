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
      <div className="h-screen w-screen grid grid-cols-10">
        <div className="col-span-2 bg-black h-full">
          <SideBar />
        </div>
        <div className="col-span-8 bg-white text-black h-full w-full">
          <MainPage />
        </div>
      </div>
    </>
  );
};

export default CreateLogoPage;
