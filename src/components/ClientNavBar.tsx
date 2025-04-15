"use client";

import NavBar from "./NavBar";
import { useDominantColour } from "@/hooks/useDominantColour";

interface ClientNavBarProps {
  src: string;
  showBackButton?: boolean;
  darkMode?: boolean;
  toggleDarkMode?: () => void;
}

export default function ClientNavBar({
  src,
  showBackButton = true,
  darkMode,
  toggleDarkMode,
}: ClientNavBarProps) {
  const [elColour, imgRef] = useDominantColour(src);

  return (
    <>
      <img
        ref={imgRef}
        src={src}
        alt="pokemon"
        crossOrigin="anonymous"
        className="hidden"
      />
      <NavBar
        elColour={elColour}
        showBackButton={showBackButton}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
    </>
  );
}
