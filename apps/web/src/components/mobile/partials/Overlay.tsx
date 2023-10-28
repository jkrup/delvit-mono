import { useStore } from "@/hooks/useStore";
import React from "react";

const Overlay = () => {
  const [isOpen, toggleSideBar] = useStore((state) => [
    state.isSideBarOpen,
    state.toggleSideBar,
  ]);
  return (
    <div
      onClick={() => toggleSideBar(!isOpen)}
      className="absolute w-screen h-full -z-10 inset-0 bg-black bg-opacity-20"
    />
  );
};

export default Overlay;
