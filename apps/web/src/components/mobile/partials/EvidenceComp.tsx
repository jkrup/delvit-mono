import { consensusProps, EvidenceArticleProps } from "@/types/props";
import React, { useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import ReferenceCard from "../cards/ReferenceCard";

export interface checkStatusProps {
  name: "FOR" | "AGAINST";
}

export const menu: checkStatusProps[] = [
  {
    name: "FOR",
  },
  {
    name: "AGAINST",
  },
];

const EvidenceComp = ({
  consensusData,
  evidenceView,
  setEvidenceView,
}: consensusProps) => {
  const [status, setStatus] = useState("FOR");
 
  return (
    <div>
      <div className="p-2 flex w-full bg-lightgold">
        {menu.map((item) => (
          <div
            onClick={() => {
              setEvidenceView(item.name);
              setStatus(item.name);
            }}
            className={`${
              item.name === status ? "border-b-2" : ""
            } border-gold w-1/2 text-center p-2 text-gold`}
            key={item.name}
          >
            {item.name}
          </div>
        ))}
      </div>
      <div className="bg-lite h-full p-3">
        {consensusData?.evidencePosts
          ?.filter(
            (data: EvidenceArticleProps) => data.evidenceType === evidenceView
          )
          ?.map((post: any) => {
            return (
              <ReferenceCard
                key={post.evidencePostId}
                title={post.evidencePost.title}
                type={post.evidenceType}
                body={post.evidencePost.body}
                
              />
            );
          })}
        {/* <>
          <div className="rounded-lg my-3 shadow border border-lightgreen">
            <div className="rounded-t-lg border bg-greenish text-center text-white border-green p-2">
              Top
            </div>
            <div className="bg-white  rounded-b-lg p-3">
              <div className="py-3 text-lg font-semibold">{`On-scene doctor calls Biden's incident 'concerning'`}</div>
              <div className="my-3 text-sm">
                Ahey ijxnjaj jai00ja fayu janlld aojisn jieka shan jhans kta na
                tera mera hjxnk
              </div>
            </div>
          </div>

          <div className="rounded my-3 shadow flex">
            <div className=" rounded-l-lg w-3 bg-greenish">.</div>
            <div className="p-3 font-light flex rounded-r-lg bg-white  justify-between">
              <div>{`On-scene doctor calls Biden's incident 'concerning'`}</div>
              <BsChevronDown className="text-gold w-6 h-6 mt-1 text-xl font-bold" />
            </div>
          </div>
        </> */}
      </div>
    </div>
  );
};

export default EvidenceComp;
