import React from "react";
import Comment from "@/components/icons/Comment";
import ArrowUp from "@/components/icons/ArrowUp";
import Image from "next/image";
import { pendingOptionsProps } from "@/types/props";

const PendingOption = ({
  votes,
  setShowBanter,
  showBanter,
}: pendingOptionsProps) => {
  return (
    <div className="flex items-center text-sm font-light justify-between">
      <div className="flex text-lightgreyish text-opacity-40">
        <div
          onClick={() => setShowBanter(!showBanter)}
          className="flex items-center mr-3"
        >
          <Comment />
          <span className="mx-1">Banter</span>
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-3">
          <ArrowUp />
          <span className="mx-1">{votes} </span>
        </div>
        <div className="flex items-center">
          <Image width={35} height={35} src={"/delvit.svg"} alt="delvit icon" />
        </div>
      </div>
    </div>
  );
};

export default PendingOption;
