import Comment from "@/components/icons/Comment";
import BanterSection from "@/components/webview/BanterSection";
import { QuestionProps } from "@/types/props";
import Link from "next/link";
import React from "react";
import CardHeader from "../cards/CardHeader";
import CardTitle from "../cards/CardTitle";
import PollCard from "../cards/PollCard";
import Button from "../partials/Button";

const BanterTab = ({ questionData }: { questionData: QuestionProps }) => {
  const forPostsCount =
    (questionData.posts &&
      questionData?.posts?.filter((p) => p.evidenceType === "FOR").length) ||
    0;
  const againstPostsCount =
    (questionData.posts &&
      questionData?.posts?.filter((p) => p.evidenceType === "AGAINST")
        .length) ||
    0;

  const forPercent =
    questionData.posts && questionData?.posts?.length > 0
      ? Math.round((forPostsCount / questionData?.posts?.length) * 100)
      : 50;
  const forEarn = Math.floor((100 - forPercent) / 10);
  const againstEarn = Math.floor(forPercent / 10) || 0;
  console.log(questionData);
  return (
    <>
      <div className="bg-white rounded-md p-3 m-2">
        <CardHeader
          author={questionData?.author}
          createdAt={questionData.createdAt}
        />
        <CardTitle title={questionData.title} />
        <PollCard
          percent={forPercent}
          count={forPostsCount}
          earn={forEarn}
          type="FOR"
        />
        <PollCard
          percent={100 - forPercent}
          count={againstPostsCount}
          earn={againstEarn}
          type="AGAINST"
        />
        <div className="my-3">
          <Link
            href={`/articles/newWithQuestion/?questionId=${questionData.id}`}
          >
            <a>
              <Button
                classname={"w-full"}
                title={"POST YOUR VIEW"}
                onChange={() => null}
              />
            </a>
          </Link>
        </div>
      </div>
      <div className="bg-white p-1">
        <BanterSection
          articleId={questionData?.posts?.id}
          questionId={questionData.id}
        />
      </div>
    </>
  );
};

export default BanterTab;
