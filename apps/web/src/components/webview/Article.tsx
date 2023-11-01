import Link from "next/link";
import { useState } from "react";
import { LinkIcon } from '@heroicons/react/20/solid'
import BanterSection from "./BanterSection";
import Image from "next/image";
import { ArticleProps } from "@/types/props";
import { BsCircleFill } from "react-icons/bs";
import { useViewPort } from "@/hooks/useViewPort";
import CardHeader from "../mobile/cards/CardHeader";
import CardTitle from "../mobile/cards/CardTitle";
import CardBody from "../mobile/cards/CardBody";
import CardLink from "../mobile/cards/CardLink";

const Article: React.FC<ArticleProps> = ({
  avatar,
  body = "",
  id,
  imgSrc,
  postedAt,
  postedByName,
  title,
  url,
  evidencePosts,
}) => {
  const articleId = id;
  const [noError, setNoError] = useState(true);
  const { width } = useViewPort();
  return <>
    {width > 992 ? (
      <div className="rounded-md p-2 px-4 flex flex-col space-y-2 shadow bg-white ">
        {/* Article Header */}
        <div className="mx-4 flex space-x-2">
          {avatar ? (
            <Image
              alt="commenter avatar"
              width={24}
              height={24}
              className="rounded-full w-6 h-6"
              src={avatar}
            />
          ) : (
            <BsCircleFill className="text-2xl" />
          )}
          <div className="text-stone-500 items-center text-sm">
            Posted by {postedByName} at {postedAt}
          </div>
        </div>

        <div className="mx-4 overflow-clip">
          {/* Article Title */}
          <div className="text-2xl font-bold mb-4">
            {url && url.split(",").length === 1 ? (
              <Link href={url} target="_blank">
                {title}
              </Link>
            ) : (
              <span>{title}</span>
            )}
          </div>

          {/* Article Media */}
          {imgSrc && url && noError && (
            <Link href={url || ""} legacyBehavior>
              <Image
                src={imgSrc}
                alt=""
                height={300}
                width={"80%"}
                className="mb-4 cursor-pointer"
                onError={() => {
                  setNoError(false);
                }}
              />
            </Link>
          )}

          {/* Article Body */}
          <p className="mb-4 whitespace-pre-wrap">{body}</p>
          {url &&
            url.split(",").map((u) => (
              (<Link
                href={u}
                key={u}
                target="_blank"
                className="text-gold hover:text-yellow-400 flex items-center">

                <LinkIcon className="h-6 w-6 shrink-0" />
                <div className="truncate text-sm italic">{u}</div>

              </Link>)
            ))}
        </div>
        <BanterSection articleId={articleId} />
      </div>
    ) : (
      <div className="bg-white  p-2">
        <CardHeader author={{ name: postedByName }} createdAt={postedAt} />
        <CardTitle title={title} />
        <CardBody desc={body} />
        <CardLink url={url} />
        <Link href={`/articles/${articleId}/evidences`}>

          <div className="flex justify-center">
            <button className="p-2 text-gold flex items-center rounded-lg border border-gold">
              <Image
                width={40}
                height={40}
                src={"/logo.svg"}
                alt="delvit logo"
              />
              <span className="mx-2">
                {evidencePosts?.length} Evidence blocks
              </span>
            </button>
          </div>

        </Link>

        <BanterSection articleId={articleId} />
      </div>
    )}
  </>;
};

export default Article;
