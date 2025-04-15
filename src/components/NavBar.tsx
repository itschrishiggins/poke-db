import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

interface NavBarProps {
  elColour?: string;
  showBackButton?: boolean;
  darkMode?: boolean;
  toggleDarkMode?: () => void;
}

export default function NavBar({
  elColour = "#facc15",
  showBackButton = true,
  darkMode,
  toggleDarkMode,
}: NavBarProps) {
  return (
    <div
      className="sticky top-0 z-50 h-18 w-full flex justify-between items-center px-8 transition-colors duration-300"
      style={{ backgroundColor: elColour }}
    >
      <div>
        {showBackButton && (
          <Link href="/">
            <button className="cursor-pointer text-white font-semibold flex items-center gap-2">
              <FontAwesomeIcon icon={faArrowLeft} />
              <span>Back</span>
            </button>
          </Link>
        )}
      </div>

      <div className="flex items-center gap-10">
        {typeof darkMode !== "undefined" && toggleDarkMode && (
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faSun} className="text-white text-sm" />
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={darkMode}
                onChange={toggleDarkMode}
              />
              <div
                className={`w-12 h-6 rounded-full bg-gray-200 peer-checked:bg-gray-700 transition-colors shadow-inner`}
              >
                <div
                  className={`absolute top-[2px] left-[2px] w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                    darkMode ? "translate-x-6" : ""
                  }`}
                />
              </div>
            </label>
            <FontAwesomeIcon icon={faMoon} className="text-white text-sm" />
          </div>
        )}
        <h1 className="text-3xl font-bold text-white">
          PokéDB <span className="text-lg">2.0</span>
        </h1>
      </div>
    </div>
  );
}
