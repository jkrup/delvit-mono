import Menu from "@/components/icons/Menu";
import Wallet from "@/components/icons/Wallet";
import { useStore } from "@/hooks/useStore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

const NavBar = () => {
  const [isOpen, toggleSideBar] = useStore((state) => [
    state.isSideBarOpen,
    state.toggleSideBar,
  ]);
  const { status } = useSession();
  const router = useRouter();

  // if (status === "unauthenticated") {
  //   router.replace("/login");
  // }
  return (
    <div className="p-2 mt-1 py-3 fixed top-0 z-10 w-full bg-white flex justify-between">
      <div onClick={() => toggleSideBar(true)}>
        <Menu />
      </div>
      <Wallet />
    </div>
  );
};

export default NavBar;
