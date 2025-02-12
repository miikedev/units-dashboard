"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useLocation } from "./LocationContext";

// Mock data structure
const locationData = {
  "State 1": {
    "District 1": ["Township 1", "Township 2", "Township 3"],
    "District 2": ["Township 4", "Township 5", "Township 6"],
  },
  "State 2": {
    "District 3": ["Township 7", "Township 8", "Township 9"],
    "District 4": ["Township 10", "Township 11", "Township 12"],
  },
  // Add more states as needed
};

const NestedHoverDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredState, setHoveredState] = useState("");
  const [hoveredDistrict, setHoveredDistrict] = useState("");
  const dropdownRef = useRef(null);
  const {
    selectedState,
    selectedDistrict,
    selectedTownship,
    setSelectedLocation,
  } = useLocation();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleStateHover = (state) => {
    setHoveredState(state);
    setHoveredDistrict("");
  };

  const handleDistrictHover = (district) => {
    setHoveredDistrict(district);
  };

  const handleSelect = (state, district, township) => {
    setSelectedLocation(state, district, township);
    setIsOpen(false);
  };

  const getDisplayText = () => {
    if (selectedTownship) return selectedTownship;
    if (selectedDistrict) return selectedDistrict;
    if (selectedState) return selectedState;
    return "Select Location";
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        <button
          type="button"
          className="z-50 inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
          onClick={() => setIsOpen(!isOpen)}
        >
          {getDisplayText()}
          <ChevronDown className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {isOpen && (
        <div className="z-50 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {Object.keys(locationData).map((state) => (
              <div
                key={state}
                className="z-50 group relative px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                role="menuitem"
                onMouseEnter={() => handleStateHover(state)}
                onClick={() => handleSelect(state)}
              >
                {state}
                <ChevronRight
                  className="z-50 absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5"
                  aria-hidden="true"
                />

                {hoveredState === state && (
                  <div className="z-50 absolute left-full top-0 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      {Object.keys(locationData[state]).map((district) => (
                        <div
                          key={district}
                          className="z-50 group relative px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                          onMouseEnter={() => handleDistrictHover(district)}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelect(state, district);
                          }}
                        >
                          {district}
                          <ChevronRight
                            className="z-50 absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5"
                            aria-hidden="true"
                          />

                          {hoveredDistrict === district && (
                            <div className="z-50 absolute left-full top-0 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                              <div className="py-1">
                                {locationData[state][district].map(
                                  (township) => (
                                    <div
                                      key={township}
                                      className="z-50 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleSelect(state, district, township);
                                      }}
                                    >
                                      {township}
                                    </div>
                                  ),
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NestedHoverDropdown;
