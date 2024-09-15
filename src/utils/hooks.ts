import { useState, useEffect } from "react";

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: 1280,
    height: 720,
  });

  useEffect(() => {
    const changeWindowSize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    changeWindowSize();
    window.addEventListener("resize", changeWindowSize);

    return () => {
      window.removeEventListener("resize", changeWindowSize);
    };
  }, []);

  return windowSize;
}
