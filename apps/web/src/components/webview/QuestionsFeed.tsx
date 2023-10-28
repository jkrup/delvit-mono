import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";
import FeedQuestion from "./FeedQuestion";
import FilterBar from "./FilterBar";
import SearchDisplay from "./SearchDisplay";
import { useViewPort } from "@/hooks/useViewPort";
import Skeleton from "../mobile/cards/Skeleton";
import Card from "../mobile/cards/Card";

const QuestionsFeed = () => {
  const router = useRouter();
  const { width } = useViewPort();

  //TODO: abstract this out into it's own hook?
  const queryMode = router.query["order"] as string;
  const topic = router.query["topic"] as string | undefined;
  const query = router.query["q"] as string | undefined;

  const ENABLED_MODES = ["NEW", "TOP"] as const;

  const mode = ENABLED_MODES.includes(queryMode as "NEW" | "TOP")
    ? (queryMode as "NEW" | "TOP")
    : "NEW";

  const questionsData = trpc.useQuery([
    "question.getAllActiveQuestions",
    { mode, topic, query },
  ]);

  if (questionsData.isLoading || !questionsData.data) {
    return (
      <>
        {width > 992 ? (
          <div className="col-span-2 flex flex-col space-y-4">
            <div className="bg-white rounded-md p-2 px-4 flex space-x-2 items-center animate-pulse">
              &nbsp;
            </div>

            <div className="bg-slate-300 rounded-md p-3 px-4 animate-pulse">
              &nbsp;
            </div>

            {Array(10)
              .fill(0)
              .map((_, i) => {
                return (
                  <div
                    key={i}
                    className="bg-slate-300 rounded-md h-40 animate-pulse"
                  >
                    {" "}
                  </div>
                );
              })}
          </div>
        ) : (
          <Skeleton />
        )}
      </>
    );
  }

  const questions = questionsData.data;
  return (
    <>
      {width > 992 ? (
        <div className="flex flex-col space-y-4">
          <SearchDisplay />
          <FilterBar />
          {questions.map((question) => {
            const url = `/questions/${question.id}`;
            return (
              <FeedQuestion
                key={question.id}
                id={question.id}
                createdAt={question?.createdAt}
                url={url}
                author={question.author}
                votes={0}
                title={question.title}
                postsCount={question._count.posts}
                forPercent={question.forPercent}
              />
            );
          })}
        </div>
      ) : (
        <>
          {questions.map((question) => {
            const url = `/questions/${question.id}`;
            return (
              <Card
                key={question.id}
                id={question.id}
                createdAt={question.createdAt}
                url={url}
                author={question.author}
                votes={0}
                title={question.title}
                postsCount={question._count.posts}
                forPercent={question.forPercent}
              />
            );
          })}
        </>
      )}
    </>
  );
};

export default QuestionsFeed;
