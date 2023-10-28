import React from "react";
import CardBody from "./CardBody";
import CardOption from "./CardOption";
import CardHeader from "./CardHeader";
import { CardProps, QuestionProps } from "@/types/props";
import Link from "next/link";
import { useRouter } from "next/router";
import { IoMdMore } from "react-icons/io";
import { BsCircleFill } from "react-icons/bs";
import ArrowUp from "@/components/icons/ArrowUp";
import Comment from "@/components/icons/Comment";
import Poll from "@/components/icons/Poll";
import Image from "next/image";
import { timeToReadibleAgo } from "@/utils/helpers";

const Card = ({
  title,
  url,
  author,
  createdAt,
  postsCount,
  forPercent,
  votes,
  body,
}: CardProps) => {
  const router = useRouter();
  const query = { ...router.query };
  delete query["type"];
  return (
    <Link
      href={{
        pathname: url,
        query,
      }}
    >
      <div className="bg-white shadow-sm my-2 p-3 rounded">
        {/* header */}
        <div className="flex mt-1 items-center justify-between">
          <div className="flex text-darkgrey items-center">
            {author.avatarUrl ? (
              <Image
                width={23}
                height={23}
                src={author.avatarUrl}
                alt={`${author.name} image`}
              />
            ) : (
              <BsCircleFill className="text-2xl" />
            )}
            <span className="font-light ml-1 text-sm">
              Posted by {author.name} {timeToReadibleAgo(createdAt)}
            </span>
          </div>
          <IoMdMore className="text-2xl text-greyish" />
        </div>
        {/* title */}
        <div className="my-3">{title}</div>
        {body && <CardBody desc={body} />}
        {/* options */}
        <div className="flex items-center text-sm font-light justify-between">
          <div className="flex text-lightgreyish text-opacity-40">
            <div className="flex items-center mr-3">
              <Comment />
              <span className="mx-1">{postsCount}</span>
            </div>
            <div className="flex items-center">
              <Poll />
              <span className="mx-1">
                {" "}
                {forPercent > 50
                  ? `${forPercent}% For`
                  : `${100 - forPercent}% Against`}
              </span>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex items-center mr-3">
              <ArrowUp />
              <span className="mx-1">{votes} </span>
            </div>
            <div className="flex items-center">
              <Image
                width={35}
                height={35}
                src={"/delvit.svg"}
                alt="delvit icon"
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
