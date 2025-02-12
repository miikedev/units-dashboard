import React from "react";
import { createContext, useState, useContext } from "react";

// type LocationContextType = {
//   selectedState
//   selectedDistrict
//   selectedTownship
//   setSelectedLocation: (state, district, township) =>
// }

const LocationContext = createContext(undefined);

export const LocationProvider = ({ children }) => {
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedTownship, setSelectedTownship] = useState("");

  const setSelectedLocation = (state, district, township) => {
    setSelectedState(state);
    setSelectedDistrict(district || "");
    setSelectedTownship(township || "");
  };

  return (
    <LocationContext.Provider
      value={{
        selectedState,
        selectedDistrict,
        selectedTownship,
        setSelectedLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
};
