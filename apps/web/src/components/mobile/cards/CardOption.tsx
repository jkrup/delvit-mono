import ArrowUp from "@/components/icons/ArrowUp";
import Comment from "@/components/icons/Comment";
import Poll from "@/components/icons/Poll";
import Image from "next/image";
import React from "react";

const CardOption = () => {
  return (
    <div className="flex items-center text-sm font-light justify-between">
      <div className="flex text-lightgreyish text-opacity-40">
        <div className="flex items-center mr-3">
          <Comment />
          <span className="mx-1">48</span>
        </div>
        <div className="flex items-center">
          <Poll />
          <span className="mx-1"> 63% Against</span>
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-3">
          <ArrowUp />
          <span className="mx-1">4322 </span>
        </div>
        <div className="flex items-center">
          <Image width={35} height={35} src={"/delvit.svg"} alt="delvit icon" />
        </div>
      </div>
    </div>
  );
};

export default CardOption;
