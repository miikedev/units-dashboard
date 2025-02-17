import React from "react";
import { Loader } from "lucide-react"; // Import the Loader icon
import "./Loading.css"; // Import CSS file

const Loading = () => {
  return (
    <div className="loading-container">
      <Loader className="loading-icon" />
    </div>
  );
};

export default Loading;