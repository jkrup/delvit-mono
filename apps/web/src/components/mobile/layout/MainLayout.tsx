import React, { ReactNode } from "react";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return <div className="mt-14">{children}</div>;
};

export default MainLayout;
