import React from "react";
import { Link } from "react-router-dom";

const AdBlockWarning = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-6">
      <h1 className="text-4xl font-extrabold text-center mb-4">
        🚫 AdBlock Detected
      </h1>
      <p className="text-lg text-center mb-6">
        Please disable your AdBlocker to access the Create Logo page. Ads help
        us keep our service free and running.
      </p>
      <Link
        to="/"
        className="bg-cyan-500 text-black font-medium px-8 py-3 rounded-lg shadow-md hover:bg-cyan-600 transition"
      >
        Go Back to Home
      </Link>
    </div>
  );
};

export default AdBlockWarning;
