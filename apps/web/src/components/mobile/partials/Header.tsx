import { useStore } from "@/hooks/useStore";
import { homeMenuInterface } from "@/types/dataTypes";
import { useRouter } from "next/router";
import React from "react";

const menu: homeMenuInterface[] = [
  {
    title: "Question",
    id: "question",
    url: "/",
  },
  {
    title: "Posts",
    id: "posts",
    url: "/?type=posts",
  },
  {
    title: "Pending",
    id: "pending",
    url: "/?type=pending",
  },
  {
    title: "Consensus",
    id: "consensus",
    url: "/?type=consensus",
  },
];

const Header = ({ selectedType }: { selectedType: string }) => {
  const router = useRouter();
  return (
    <div className="flex mx-1 w-full bg-white text-sm justify-between items-center">
      {menu.map((item, i) => (
        <div
          onClick={() => {
            router.query["type"] = item.id;
            router.push({
              query: { ...router.query },
            });
          }}
          className={`py-3 w-1/4 text-center capitalize relative text-gold`}
          key={i}
        >
          <span className="text-center"> {item.id}</span>
          {selectedType === item.id && (
            <div className="bg-darkgrey absolute bottom-0 w-full h-1 rounded-md" />
          )}
        </div>
      ))}
    </div>
  );
};

export default Header;
