import { trpc } from "@/utils/trpc";
import { useEffect, useRef } from "react";
import Comment from "./Comment";

interface BanterSectionProps {
  articleId?: string;
  questionId?: string;
}

const BanterSection: React.FC<BanterSectionProps> = ({
  articleId,
  questionId,
}) => {
  const commentsQuery = trpc.useQuery([
    "article.getOrderedComments",
    {
      postId: articleId,
      questionId,
    },
  ]);

  const commentFormRef = useRef<HTMLFormElement>(null);
  const submitCommentMutation = trpc.useMutation(["auth.submitComment"]);
  const orderedComments = commentsQuery.data;

  const handleSubmitComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const body = formData.get("comment") as string;

    submitCommentMutation.mutate({
      body,
      postId: articleId,
      questionId,
    });
  };

  useEffect(() => {
    if (submitCommentMutation.isSuccess) {
      submitCommentMutation.reset();
      commentFormRef.current?.reset();
      commentsQuery.refetch();
    }

    // return () => {
    //   submitCommentMutation.reset();
    // };
  });

  return (
    <div className="flex flex-col text-black rounded-md space-y-4 py-4 px-4 text-sm">
      <form
        ref={commentFormRef}
        className="group"
        onSubmit={handleSubmitComment}
      >
        <div className="flex space-x-3">
          <textarea
            className=" bg-thingold font-light rounded-md p-2 w-full h-10 resize-none group-focus-within:h-16 transition-all"
            name="comment"
            required
            placeholder="add banter"
          />
          <button className="group-focus-within:block hidden bg-amber-400 rounded-md px-3 items-center">
            Comment
          </button>
          {/* <div className="so text-xs italic text-gray-400 text-right">Hold Shift+Enter to add a new line. Enter to submit.</div> */}
        </div>
      </form>

      <div className="flex flex-col">
        {orderedComments?.map(
          ({ id, depth = 0, votes, body, author, createdAt, hasVoted }) => {
            const authorName = author?.name;
            return (
              <Comment
                userVoted={hasVoted ?? 0}
                refetch={commentsQuery.refetch}
                submitCommentMutation={submitCommentMutation}
                key={id}
                postId={articleId}
                questionId={questionId}
                id={id}
                depth={depth}
                votes={votes}
                body={body}
                authorName={authorName || ""}
                avatar={author?.image || undefined}
                postedAt={createdAt.toDateString()}
              />
            );
          }
        )}
      </div>
    </div>
  );
};

export default BanterSection;
