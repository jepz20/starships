import { useEffect, useState } from "react";

export const useWindowSize = () => {
  const [windowSize, updateWindowSize] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      updateWindowSize(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
};
