import React from "react";
import { IoMdMore } from "react-icons/io";
import { BsCircleFill } from "react-icons/bs";
import { Author } from "@/types/props";
import { timeToReadibleAgo } from "@/utils/helpers";
import Image from "next/image";

const CardHeader = ({
  author,
  createdAt,
  evidence,
}: {
  author: Author;
  createdAt?: Date;
  evidence?: "FOR" | "AGAINST";
}) => {
  return (
    <div className="flex mt-1 items-center justify-between">
      <div className="flex text-darkgrey items-center">
        {author?.avatarUrl ? (
          <Image
            width={23}
            height={23}
            className="rounded-full"
            src={author?.avatarUrl ?? author?.image}
            alt={`${author?.name} image`}
          />
        ) : (
          <BsCircleFill className="text-2xl" />
        )}
        <span className="font-light mx-2 text-sm">
          Posted by <span className="mx-2">{author?.name}</span>
          {createdAt && (
            <>
              {typeof createdAt === "string"
                ? createdAt
                : timeToReadibleAgo(createdAt)}
            </>
          )}
        </span>
        <span
          className={`${
            evidence === "FOR" ? "text-brightgreen" : "text-red-700"
          } uppercase font-bold text-sm`}
        >
          {" "}
          {evidence}
        </span>
      </div>
      <IoMdMore className="text-3xl text-greyish" />
    </div>
  );
};

export default CardHeader;
