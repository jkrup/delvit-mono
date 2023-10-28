import Add from "@/components/icons/Add";
import Home from "@/components/icons/Home";
import Notif from "@/components/icons/Notif";
import ReviewIcon from "@/components/icons/Review";
import User from "@/components/icons/User";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactNode, useState } from "react";
import { FiSearch } from "react-icons/fi";

export interface tabMenuProps {
  name: string;
  icon: ReactNode;
  url: string;
  activeIcon?: ReactNode;
  classname?: string;
}
export const tabMenu: tabMenuProps[] = [
  {
    name: "home",
    icon: <Home color="black" />,
    url: "/",
  },
  {
    name: "search",
    icon: <FiSearch className="text-3xl" />,
    url: "/search",
  },
  {
    name: "add",
    url: "/add",
    icon: (
      <div className="absolute left-1/2 bottom-2 bg-white rounded-full border-t-2 border-gold -translate-x-1/2">
        <Add />
      </div>
    ),
  },
  {
    name: "notifications",
    url: "/notifications",
    icon: <Notif />,
  },
  {
    name: "profile",
    url: "/profile",
    icon: <User />,
  },
];

const BottomTab = () => {
  const [isActive, setIsActive] = useState("home");
  const router = useRouter();
  console.log(router);
  return (
    <div className="fixed bottom-0 shadow left-0 w-full">
      <div className="w-full px-2 border-t-0.5 flex items-center justify-between border-darkgrey bg-white h-16 relative bottom-0 left-0">
        {tabMenu.map((item, i) => (
          <Link
            href={
              item.name !== "add"
                ? `${item.url}`
                : {
                    pathname:
                      router.query.type === "posts"
                        ? "/articles/new"
                        : "/questions/new",
                    query: {
                      topic: (router.query["topic"] as string) || undefined,
                    },
                  }
            }
            key={i}
          >
            <div
              onClick={() => setIsActive(item.name)}
              className={`p-2  ${
                router.pathname === item.url || item.name === "add"
                  ? ""
                  : " opacity-20"
              }`}
              key={i}
            >
              <div className="flex justify-center"> {item.icon}</div>
              <div className={`text-xs`}>{item.name}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BottomTab;
