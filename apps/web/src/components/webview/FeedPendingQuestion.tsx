import { AnnotationIcon, ArrowUpIcon } from "@heroicons/react/outline";
import type { Author } from "./Author";
import { trpc } from "@/utils/trpc";
import { useState } from "react";
import { ThumbDownIcon, ThumbUpIcon } from "@heroicons/react/solid";
import { CommentData } from "./Comment";
import BanterSection from "./BanterSection";

interface OpinionProps {
  questionId: string;
  opinion?: "AGREE" | "DISAGREE";
}
const Opinion: React.FC<OpinionProps> = ({
  questionId,
  opinion: defaultOpinion,
}) => {
  const setOpinion = trpc.useMutation(["question.setOpinion"]);
  const [opinion, setLocalOpinion] = useState(defaultOpinion);

  const renderAgreed = () => (
    <div className="w-36 bg-green-600 text-white">
      <ThumbUpIcon className="px-8 py-2" />
      <div className={"rounded-lg text-center font-bold text-lg pb-2"}>
        AGREED
      </div>
    </div>
  );
  const renderDisagreed = () => (
    <div className="w-36 bg-red-800 text-white">
      <ThumbDownIcon className="px-8 py-2" />
      <div
        className={"rounded-lg text-center font-bold text-white text-lg pb-2"}
      >
        DISAGREED
      </div>
    </div>
  );

  return (
    <div
      className={`rounded-lg overflow-hidden border flex flex-col space-y-2 shrink-0 font-serif bg-stone-100 ${
        opinion ? "" : "border-gold"
      }`}
    >
      {opinion ? (
        opinion === "AGREE" ? (
          renderAgreed()
        ) : (
          renderDisagreed()
        )
      ) : (
        <>
          <div className="text-stone-600 mb-1 font-sans p-2">
            Give your opinion
          </div>
          <button
            className={`border rounded border-gold font-bold hover:bg-green-600 hover:text-white mx-2 ${
              opinion === "AGREE"
                ? "bg-green-600 text-white"
                : "text-gold"
            }`}
            onClick={() => {
              setOpinion.mutate({
                questionId,
                opinion: "AGREE",
              });
              setLocalOpinion("AGREE");
            }}
          >
            AGREE
          </button>
          <button
            className={`border rounded border-gold font-bold hover:bg-red-800 hover:text-white mx-2 ${
              opinion === "DISAGREE"
                ? "bg-red-800 text-white"
                : "text-gold"
            }`}
            onClick={() => {
              setOpinion.mutate({
                questionId,
                opinion: "DISAGREE",
              });
              setLocalOpinion("DISAGREE");
            }}
          >
            DISAGREE
          </button>
          <div></div>
        </>
      )}
    </div>
  );
};

export interface FeedPendingQuestionProps {
  id: string;
  url: string;
  title: string;
  author: Author;
  createdAt?: string;
  votes: number;
  opinion?: "AGREE" | "DISAGREE";
  comments: CommentData[];
  refetch: () => void;
}

const Question: React.FC<FeedPendingQuestionProps> = ({
  id,
  author,
  votes = 0,
  title,
  opinion,
}) => {
  const [expanded, setExpanded] = useState(false);
  const showBanter = () => {
    setExpanded(true);
  };
  return (
    <div className="rounded-md p-2 px-4 shadow hover:shadow-lg transition justify-between flex flex-col">
      <div className="flex space-y-2 justify-between">
        <div className="flex flex-col space-y-2">
          <div className="flex space-x-8 text-gold items-center">
            <div className="flex space-x-2 items-center">
              <div className="bg-gold rounded-full h-4 w-4"></div>
              {/* <div className="font-bold"> */}
              {/*   HSTK/Path */}
              {/* </div> */}
              <div className="text-sm">
                Posted by {author?.name || author.id}
              </div>
            </div>
          </div>

          {/* Article Title */}
          <a className="text-2xl font-bold mb-6 line-clamp-2">{title}</a>

          {/* Buttons */}
          <div className="flex space-x-16 text-gray-400 font-bold flex-grow items-end">
            <button className="flex items-center space-x-1">
              <AnnotationIcon className="h-5 w-5" />
              <button
                onClick={() => {
                  showBanter();
                }}
              >
                Banter
              </button>
            </button>
            <button className="flex items-center space-x-1">
              <ThumbUpIcon className="h-5 w-5" />
              <ThumbDownIcon className="h-5 w-5" />
              <div>{votes}</div>
            </button>
          </div>
        </div>
        <Opinion questionId={id} opinion={opinion} />
      </div>
      {expanded && <BanterSection questionId={id} />}
    </div>
  );
};

export default Question;
