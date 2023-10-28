import Comment from "@/components/icons/Comment";
import Image from "next/image";
import React from "react";

export interface pollCardProps {
  percent: number;
  count: number;
  earn: number;
  type: "FOR" | "AGAINST";
}

const PollCard = ({ percent, count, earn, type }: pollCardProps) => {
  return (
    <div className="font-light my-4 rounded-md flex flex-col">
      <div
        className={`${type === "FOR" ? "text-brightgreen" : "text-red-500"}`}
      >
        {percent}% {type}
      </div>
      <div className=" rounded-xl">
        <div
          className={`${
            type === "FOR" ? "bg-brightgreen" : "bg-red-500"
          } rounded-xl h-2`}
          style={{ width: `${percent}%` }}
        ></div>
      </div>
      <div className="flex mt-2 justify-between text-gold">
        <div className="flex items-center">
          <Comment color="#AD8C3B" />
          <span className="mx-2">{count} Posts</span>
        </div>
        <div className="flex text-sm items-center">
          <Image
            src={"/white_logo.svg"}
            width={30}
            height={30}
            alt="delvit white logo"
          />
          <span className="ml-2">Earn {earn}</span>
        </div>
      </div>
    </div>
  );
};

export default PollCard;
