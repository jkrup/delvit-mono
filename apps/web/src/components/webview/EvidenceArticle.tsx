import { EvidenceArticleProps } from "@/types/props";
import Link from "next/link";
import React, { useState } from "react";
import BanterSection from "./BanterSection";

const EvidenceArticle: React.FC<EvidenceArticleProps> = ({
  id,
  title,
  views,
  commentCount,
  evidenceType,
  body,
  url,
  evidenceArticleCount,
}) => {
  const [expanded, setExpanded] = useState(false);

  if (expanded) {
    return (
      // {/* <div onClick={() => { setExpanded(false) }} className={(evidenceType === 'FOR' ? 'bg-green-200' : 'bg-red-200') + " flex flex-col justify-between border shadow rounded-lg p-2 my-3 font-bold hover:cursor-pointer"}> */}
      <div
        className={`flex flex-col justify-between border shadow rounded-lg p-2 my-3 hover:cursor-pointer border-l-${
          evidenceType === "FOR" ? "green-500 " : "red-800 "
        }`}
      >
        <div className="px-4 pt-1 font-bold">
          <Link href={`/articles/${id}`}>
            <a>{title}</a>
          </Link>
        </div>
        <div className="bg-white px-4 py-2 rounded text-sm w-full flex flex-col ">
          {/* <p className='line-clamp-3 mb-2'> */}
          {body}
          {/* </p> */}
          <div className="mt-2">
            {url && (
              <Link href={url}>
                <a className="self-end text-gold">{url}</a>
              </Link>
            )}
          </div>
        </div>
        <BanterSection articleId={id} />
        <div className="flex justify-end space-x-4 text-sm text-gray-400">
          <div>
            {evidenceArticleCount} Evidence Block
            {evidenceArticleCount === 1 ? "" : "s"}
          </div>
          <div>{commentCount} Banter</div>
          <div>
            {views} View{views === 1 ? "" : "s"}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => {
        setExpanded(true);
      }}
      className="flex border shadow rounded-lg my-3 hover:cursor-pointer overflow-hidden"
    >
      <div className={evidenceType === "FOR" ? "bg-green-600" : "bg-red-800"}>
        &nbsp;
      </div>
      <div className="flex flex-col justify-between p-2">
        <div className="font-bold mx-2">{title}</div>
        <div className="flex mx-2 gap-2 text-gray-400 text-sm justify-end">
          <div>{evidenceArticleCount} Evidence Blocks</div>
          <div>{commentCount} Banter</div>
          <div>{views} Views</div>
        </div>
      </div>
    </div>
  );
};

export default EvidenceArticle;
