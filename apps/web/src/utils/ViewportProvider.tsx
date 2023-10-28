import React, { ReactNode, useEffect, useState } from "react";
import { vpInterface } from "../types/context";

export const viewportContext = React.createContext<vpInterface>({
  width: 0,
  height: 0,
});
const ViewportProvider = ({ children }: { children: ReactNode }) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);

      const handleWindowResize = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
      };
      window.addEventListener("resize", handleWindowResize);
      return () => {
        window.removeEventListener("resize", handleWindowResize);
      };
    }
  }, []);

  return (
    <viewportContext.Provider value={{ width, height }}>
      {children}
    </viewportContext.Provider>
  );
};

export default ViewportProvider;
