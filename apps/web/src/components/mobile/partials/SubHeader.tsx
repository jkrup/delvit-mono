import React, { useState } from "react";
import Badge from "@/components/icons/Badge";
import Chart from "@/components/icons/Chart";
import Fire from "@/components/icons/Fire";
import Trend from "@/components/icons/Trend";
import { useRouter } from "next/router";

const menu = [
  {
    name: "new",
    icon: <Badge color="#8A836E" />,
  },
  {
    name: "top",
    icon: <Chart color="#8A836E" />,
  },
  {
    name: "trending",
    icon: <Fire color="#8A836E" />,
  },
  {
    name: "controversial",
    icon: <Trend color="#8A836E" />,
  },
];
const SubHeader = () => {
  const [activeNav, setActiveNav] = useState("new");
  const router = useRouter();

  const queryMode = router.query["order"] as string;
  const ENABLED_MODES = ["NEW", "TOP"] as const;

  const mode = ENABLED_MODES.includes(queryMode as "NEW" | "TOP")
    ? (queryMode as "NEW" | "TOP")
    : "NEW";

  console.log(mode);
  return (
    <div className="px-2.5 py-1 flex text-base justify-between items-center font-typo">
      {menu.map((item, i) => (
        <div
          onClick={() => {
            item.name === "new"
              ? delete router.query["order"]
              : (router.query["order"] = "TOP");
            router.push({ query: { ...router.query } });
          }}
          className={`${
            mode.toLowerCase() === item.name ? "" : "opacity-20"
          } flex py-2 capitalize text-darkgrey items-center`}
          key={i}
        >
          <span>{item.icon}</span>
          <span className="ml-1">{item.name}</span>
        </div>
      ))}
    </div>
  );
};

export default SubHeader;
