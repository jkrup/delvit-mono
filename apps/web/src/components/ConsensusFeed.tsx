import { trpc } from "@delvit/web/utils/trpc";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import { Author } from "./Author";
import FilterBar from "./FilterBar";
import InfoSection from "./InfoSection";
import SearchDisplay from "./SearchDisplay";

interface Answer {
  result: "Yes" | "No";
  confidence: string;
  body: string;
}

interface FeedConsensusQuestionProps {
  id: string;
  author: Author;
  answer: Answer; // Ex. "Yes (low level of confidence)"
  title: string;
}

const FeedConsensusQuestion: React.FC<FeedConsensusQuestionProps> = ({
  id,
  author,
  answer,
  title,
}) => {
  const url = `/consensus/${id}`;
  return (
    <Link href={url} legacyBehavior>
      <div className="bg-white rounded-md p-2 px-4 flex shadow hover:shadow-lg transition justify-between cursor-pointer">
        <div className="flex flex-col space-y-2">
          <div className="flex space-x-8 text-yellow-800 items-center">
            <div className="flex space-x-2 items-center">
              <div className="bg-yellow-800 rounded-full h-4 w-4"></div>
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
        <div className="flex flex-col space-y-2 justify-center text-yellow-800">
          <ChevronRightIcon className="h-6 w-6" />
        </div>
      </div>
    </Link>
  );
};

const PendingFeed = () => {
  const router = useRouter();
  const queryMode = router.query["order"] as string;
  const topic = router.query["topic"] as string;
  const query = router.query["q"] as string;
  const ENABLED_MODES = ["NEW", "TOP"] as const;

  const mode = ENABLED_MODES.includes(queryMode as "NEW" | "TOP")
    ? (queryMode as "NEW" | "TOP")
    : "NEW";

  const allConsensusQuestions = trpc.useQuery([
    "question.getAllConsensusQuestions",
    { mode, topic, query },
  ]);

  const consensusQuestions = allConsensusQuestions.data;

  return (
    <div className="flex flex-col space-y-4">
      <InfoSection
        title="Consensus"
        body="Questions below have gone through the complete Truth Consensus Algorithm and a verdict has been reached."
      />
      <SearchDisplay />
      <FilterBar />
      <div className="flex flex-col space-y-6">
        {consensusQuestions?.map((pendingQuestion) => {
          return (
            <FeedConsensusQuestion
              key={pendingQuestion.id}
              id={pendingQuestion.id}
              author={{
                id: pendingQuestion.author.id,
                name: pendingQuestion.author.name ?? pendingQuestion.author.id,
              }}
              answer={pendingQuestion.answer}
              title={pendingQuestion.title}
            />
          );
        }) ||
          Array(5)
            .fill(0)
            .map((_, i) => {
              return <LoadingPostQuestion key={i} />;
            })}
      </div>
    </div>
  );
};

const LoadingPostQuestion = () => (
  <div className="rounded-md p-2 px-4 flex space-y-2 shadow hover:shadow-lg transition justify-between cursor-pointer w-full">
    <div className="flex flex-col space-y-2 grow">
      <div className="flex space-x-8 text-yellow-800 items-center">
        <div className="flex space-x-2 items-center w-1/2">
          <div className="bg-yellow-800 rounded-full h-4 w-4"></div>
          <div className="text-sm bg-yellow-800 rounded-lg animate-pulse w-full">
            {"x"}
          </div>
        </div>
      </div>

      {/* Question Title */}
      <div className="text-2xl font-bold mb-6 bg-gray-600 rounded-xl animate-pulse w-full">
        &nbsp;
      </div>
      <p className="bg-gray-300 rounded-xl animate-pulse">
        <br />
        <br />
        <br />
        <br />
        <br />
      </p>
    </div>
    {/* <div className="flex flex-col space-y-2 justify-center text-yellow-800"> */}
    {/*   <ChevronRightIcon className="h-6 w-6" /> */}
    {/* </div> */}
  </div>
);

export default PendingFeed;
