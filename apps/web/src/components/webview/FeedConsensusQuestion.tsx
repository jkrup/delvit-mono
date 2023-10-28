import React from "react";
import { useViewPort } from "@/hooks/useViewPort";
import { FeedConsensusQuestionProps } from "@/types/props";
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import Link from "next/link";
import { useRouter } from "next/router";
import ArrowLeft from "../icons/ArrowLeft";
import CardHeader from "../mobile/cards/CardHeader";
import ConsensusBodyCard from "../mobile/cards/ConsensusBodyCard";

const FeedConsensusQuestion: React.FC<FeedConsensusQuestionProps> = ({
  id,
  author,
  answer,
  title,
}) => {
  const { width } = useViewPort();
  const router = useRouter();
  const url = `/consensus/${id}`;
  const query = { ...router.query };
  delete query["type"];
  return (
    <Link
      href={{
        pathname: url,
        query,
      }}
      legacyBehavior>
      {width > 992 ? (
        <div className="bg-white rounded-md p-2 px-4 flex shadow hover:shadow-lg transition justify-between cursor-pointer">
          <div className="flex flex-col space-y-2">
            <div className="flex space-x-8 text-gold items-center">
              <div className="flex space-x-2 items-center">
                <div className="bg-gold rounded-full h-4 w-4"></div>
                {/* <div className="font-bold"> */}
                {/*   HSTK/Path */}
                {/* </div> */}
                <div className="text-sm">Posted by {author?.name}</div>
              </div>
            </div>

            {/* Question Title */}
            <a className="text-2xl font-bold mb-6">{title}</a>

            {/* Answer */}
            <p className="whitespace-pre-line line-clamp-5">
              <span
                className={
                  "font-bold italic " +
                  (answer.result === "Yes" ? "text-green-600" : "text-red-800")
                }
              >
                {answer.result} ({answer.confidence} level of confidence)
              </span>
              . {answer.body?.replaceAll("\\n", "\n")}
            </p>
          </div>
          <div className="flex flex-col space-y-2 justify-center text-gold">
            <ChevronRightIcon className="h-6 w-6" />
          </div>
        </div>
      ) : (
        <div className="bg-white  my-2 p-3 rounded cursor-pointer">
          <div className="">
            <CardHeader author={author} />

            <div className="flex my-2 items-center">
              {/* Question Title */}
              <div className="text-lg my-2">{title}</div>
              <div className="mx-2">
                <ArrowLeft />
              </div>
            </div>

            {/* Answer */}
            <ConsensusBodyCard answer={answer} />
          </div>
        </div>
      )}
    </Link>
  );
};

export default FeedConsensusQuestion;
