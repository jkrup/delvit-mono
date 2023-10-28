import { useStore } from "@/hooks/useStore";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Overlay from "./Overlay";

const sideMenu = [
  {
    name: "home",
    url: "/home",
  },
  {
    name: "consensus",
    url: "/consensus",
  },
  {
    name: "pending",
    url: "/pending",
  },
];
function Sidebar() {
  const router = useRouter();
  const [isOpen, toggleSideBar] = useStore((state) => [
    state.isSideBarOpen,
    state.toggleSideBar,
  ]);

  const toggleSidebar = () => {
    toggleSideBar(!isOpen);
  };

  return (
    <div
      className={`sidebar ${isOpen ? "translate-x-0" : " -translate-x-full"}`}
    >
      <div className="p-4 flex justify-center">
        <Image alt="delvit logo" width={85} height={105} src={"/logo.svg"} />
      </div>

      <ul className="pt-4 font-typo pl-4">
        {sideMenu.map((item, i) => (
          <li
            onClick={() => {
              toggleSidebar();
              router.query["type"] =
                item.name === "home" ? "question" : item.name;
              router.push({
                query: { ...router.query },
              });
            }}
            className="p-5 uppercase w-3/5 mx-auto border-b border-gold"
            key={i}
          >
            {item.name}
          </li>
        ))}
      </ul>
      <div className="absolute bottom-0 left-0 flex items-center justify-center w-full bg-gold h-14">
        <span className="text-white">copyright © History Token 2022</span>
      </div>
      {isOpen && <Overlay />}
    </div>
  );
}

export default Sidebar;
