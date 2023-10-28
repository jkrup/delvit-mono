import { EvidenceArticleProps } from "@/types/props";
import React, { useState } from "react";
import { BsChevronDown } from "react-icons/bs";

export interface referenceCardProps {
  title: string;
  body: string;
  type: "FOR" | "AGAINST";
}
const ReferenceCard = ({ title, body, type }: referenceCardProps) => {
  const [isOpen, setissOpen] = useState(false);
  return (
    <div className="w-full" onClick={() => setissOpen(!isOpen)}>
      {isOpen ? (
        <div
          className={`rounded-lg w-full my-3 shadow border ${
            type === "FOR" ? "border-lightgreen" : "border-red-800"
          } `}
        >
          <div
            className={`rounded-t-lg border ${
              type === "FOR" ? "bg-greenish" : "bg-red-800"
            } text-center text-white border-green p-2`}
          >
            Top
          </div>
          <div className="bg-white rounded-b-lg p-3">
            <div className="py-3 text-lg font-semibold">{title}</div>
            <div className="my-3 text-sm">{body}</div>
          </div>
        </div>
      ) : (
        <div className="rounded w-full my-3 shadow flex">
          <div
            className={`rounded-l-lg w-3 ${
              type === "FOR" ? "bg-greenish" : "bg-red-800"
            } `}
          >
            .
          </div>
          <div className="p-3 w-full font-light flex rounded-r-lg bg-white justify-between">
            <div>{title}</div>
            <BsChevronDown className="text-gold w-6 h-6 mt-1 text-xl font-bold" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ReferenceCard;
