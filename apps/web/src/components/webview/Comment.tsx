import React, { useEffect, useState } from "react";
import {
  ReplyIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/react/outline";
import Image from "next/image";
import { trpc } from "@/utils/trpc";
import ArrowDownSm from "../icons/ArrowDownSm";
import ArrowUpSm from "../icons/ArrowUpSm";

export type CommentData = {
  id: string;
  depth: number;
  votes: number;
  body: string;
  parentCommentId: string | null;
  hasVoted?: number;
  author: {
    name: string | null;
    image: string;
  };
  createdAt: Date;
};

type CommentProps = {
  depth?: number;
  votes: number;
  authorName: string;
  postedAt: string;
  body: string;
  id: string;
  submitCommentMutation: any;
  postId?: string;
  questionId?: string;
  refetch: () => void;
  userVoted: number;
  avatar?: string;
};

const Comment: React.FC<CommentProps> = ({
  refetch,
  userVoted = 0,
  depth = 0,
  id,
  submitCommentMutation,
  postId,
  questionId,
  authorName,
  postedAt,
  body,
  votes,
  avatar = "https://i.imgur.com/hepj9ZS.png",
}) => {
  const [tempUserVoted, setTempUserVoted] = useState(userVoted);
  console.log({ id, userVoted, tempUserVoted });
  const [replying, setReplying] = useState(false);
  const voteMutation = trpc.useMutation(["auth.voteComment"]);
  const vote = (voteVal: -1 | 1) => {
    console.log("~~~VOTE~~~");
    if (voteVal === tempUserVoted) {
      setTempUserVoted(0);
    } else {
      setTempUserVoted(voteVal);
    }
    voteMutation.mutate({
      vote: voteVal,
      commentId: id,
    });
  };
  //
  useEffect(() => {
    if (voteMutation.isSuccess) {
      voteMutation.reset();
      refetch();
    }
  });
  //
  const submitReply = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const body = formData.get("body");

    submitCommentMutation.mutate({
      body,
      postId,
      parentCommentId: id,
      questionId,
    });
    setReplying(false);
  };
  //
  return (
    <div className="flex">
      {Array(depth)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="ml-5 mr-4">
            {" "}
          </div>
        ))}
      <div className="flex flex-col font-light space-y-1 flex-1 my-2">
        {/* header */}
        <div className="flex text-gold font-light space-x-2 items-center">
          <div className="w-1/10 flex items-center justify-center">
            <Image
              width={34}
              height={34}
              alt="commenter avatar"
              className="rounded-full w-6 h-6"
              src={avatar}
            />
          </div>

          <div className="flex w-9/10 flex-wrap">
            <div className="">{authorName}</div>
            <div>{postedAt}</div>
          </div>
        </div>
        <div className="flex w-full">
          <div className="w-1/10 lg:w-1/20 h-150 flex justify-center">
            {/* divider */}
            <div className="w-px rounded-lg flex justify-center bg-gold" />
          </div>

          {/* body section */}
          <div className="w-11/12 pl-4">
            <div>{body}</div>
            <div className="flex space-x-4 justify-end">
              <button
                className="flex space-x-1 items-center hover:text-yellow-500 hover:font-bold"
                onClick={() => setReplying(!replying)}
              >
                <Image
                  width={15}
                  height={15}
                  alt="commenter avatar"
                  src={"/reply.svg"}
                />
                <div className="text-gray-600">Reply </div>
              </button>
              <button onClick={() => vote(1)}>
                <ArrowUpSm color={`${tempUserVoted > 0 && "text-gold"}`} />
              </button>
              <div className="w-4 text-center">
                {" "}
                {votes - userVoted + tempUserVoted}{" "}
              </div>
              <button onClick={() => vote(-1)}>
                <ArrowDownSm color={`${tempUserVoted > 0 && "text-gold"}`} />
              </button>
            </div>
          </div>
        </div>
        <form
          onSubmit={submitReply}
          className={`flex ${replying ? "" : "hidden"}`}
        >
          <textarea
            className="resize-none rounded-sm focus:outline-none outline-none border border-gray-200 w-full mr-3 p-1"
            name="body"
            placeholder="write your thoughts..."
          />
          <button className="bg-amber-400 rounded-md px-3 h-full">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Comment;
