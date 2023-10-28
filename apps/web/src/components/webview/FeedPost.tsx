import Link from "next/link";
import React from "react";
import { timeToReadibleAgo } from "@/utils/helpers";
import { useRouter } from "next/router";
import { FeedPostProps } from "@/types/props";
import { useViewPort } from "@/hooks/useViewPort";
import EvidenceCard from "../mobile/cards/EvidenceCard";

const FeedPost: React.FC<FeedPostProps> = ({
  id,
  questionId,
  url,
  title,
  author,
  createdAt,
  votes = 0,
  evidenceType,
  evidenceBlocksCount = 0,
  body,
}) => {
  const router = useRouter();
  const articleUrl = questionId
    ? `/articles/${id}?questionId=${questionId}`
    : `/articles/${id}`;
  const query = { ...router.query };
  delete query["type"];
  const { width } = useViewPort();

  console.log(evidenceBlocksCount)
  return (
    <>
      {width > 992 ? (
        <div className="bg-white rounded-md p-2 px-4 flex flex-col space-y-2 shadow hover:shadow-lg transition">
          <div className="flex space-x-8 text-gold items-center">
            <div className="flex space-x-2 items-center">
              <div className="bg-gold rounded-full h-4 w-4"></div>
              {/* <div className="font-bold"> */}
              {/*   HSTK/Path */}
              {/* </div> */}
              <div className="text-sm flex">
                <div>
                  Posted by {author} {timeToReadibleAgo(createdAt)}{" "}
                  &#x2022;&nbsp;
                </div>
                {evidenceType && (
                  <div
                    className={`${
                      evidenceType === "FOR" ? "text-green-600" : "text-red-800"
                    } font-bold`}
                  >
                    {evidenceType}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Article Title */}
          <Link
            href={{
              pathname: articleUrl,
              query,
            }}
          >
            <a className="text-2xl font-bold mb-6">{title}</a>
          </Link>

          <div className="pb-4">
            <p className="line-clamp-5">{body}</p>
          </div>
          {url && (
            <a
              className="pb-4 flex items-center text-yellow-700 space-x-1 truncate w-80"
              href={url}
              rel="noreferrer"
              target="_blank"
            >
              {/* <LinkIcon className="h-4 w-4" />{" "} */}
              <div className="truncate w-80">{url}</div>
            </a>
          )}

          {/* Buttons */}
          <div className="flex space-x-16 text-gray-400 font-bold">
            <Link href={articleUrl}>
              <button className="flex items-center space-x-1">
                {/* <DocumentSearchIcon className="h-5 w-5" /> */}
                <div>
                  {evidenceBlocksCount === 1
                    ? `${evidenceBlocksCount} Evidence Block`
                    : `${evidenceBlocksCount} Evidence Blocks`}
                </div>
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <EvidenceCard
          evidenceType={evidenceType}
          votes={votes}
          evidenceBlocksCount={evidenceBlocksCount}
          createdAt={createdAt}
          id={id}
          body={body}
          title={title}
          author={author}
          url={url}
          articleUrl={articleUrl}
        />
      )}
    </>
  );
};

export default FeedPost;
