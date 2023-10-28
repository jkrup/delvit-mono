import BanterSection from "@/components/webview/BanterSection";
import { FeedPendingQuestionProps } from "@/components/webview/FeedPendingQuestion";
import React, { useState } from "react";
import CardBody from "./CardBody";
import CardHeader from "./CardHeader";
import CardTitle from "./CardTitle";
import PendingBodyCard from "./PendingBodyCard";
import PendingOption from "./PendingOption";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

const PendingCard = ({
  author,
  title,
  votes,
  id,
  opinion,
  comments,
  url,
}: FeedPendingQuestionProps) => {
  const [showBanter, setShowBanter] = useState(false);
  return (
    <div className="bg-white shadow-sm my-2 p-3 rounded" key={id}>
      <CardHeader author={author} />
      <CardTitle url={url} title={title} />
      {!opinion ? (
        <PendingBodyCard opinion={opinion} questionId={id} />
      ) : (
        <div
          className={`p-2 w-20 mx-auto my-3 rounded-lg flex flex-col justify-center items-center ${
            opinion === "AGREE" ? "bg-greenish" : "bg-red-700"
          } text-white`}
        >
          {opinion === "AGREE" ? (
            <FaThumbsUp className="text-white text-3xl my-1" />
          ) : (
            <FaThumbsDown className="text-white text-3xl my-1" />
          )}
          <div>{opinion}D</div>
        </div>
      )}
      <PendingOption
        showBanter={showBanter}
        setShowBanter={setShowBanter}
        votes={votes}
      />
      {showBanter && <BanterSection questionId={id} />}
    </div>
  );
};

export default PendingCard;
