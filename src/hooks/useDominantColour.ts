import { useEffect, useState, useRef } from "react";
import ColorThief from "colorthief";

export function useDominantColour(
  src: string
): [string, React.RefObject<HTMLImageElement | null>] {
  const [color, setColor] = useState("rgb(252, 165, 165)");
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!src || !imgRef.current) return;

    const img = imgRef.current;
    const colorThief = new ColorThief();

    const extract = () => {
      try {
        const rgb = colorThief.getColor(img);
        setColor(`rgb(${rgb.join(",")})`);
      } catch {
        console.warn("ColorThief fallback");
      }
    };

    if (img.complete) extract();
    else img.onload = extract;
  }, [src]);

  return [color, imgRef];
}
