import Link from "next/link";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";

import RecentConsensus from "./RecentConsensus";
import TrendingTopics from "./TrendingTopics";
import TrendingPosts from "./TrendingPosts";

import QuestionsFeed from "./QuestionsFeed";
import PostsFeed from "./PostsFeed";
import PendingFeed from "./PendingFeed";
import ConsensusFeed from "./ConsensusFeed";
import { homeMenuInterface } from "@/types/dataTypes";
import Image from "next/image";

const homeTypes: homeMenuInterface[] = [
  {
    title: "Question",
    id: "question",
    url: "/",
  },
  {
    title: "Posts",
    id: "posts",
    url: "/?type=posts",
  },
  {
    title: "Pending",
    id: "pending",
    url: "/?type=pending",
  },
  {
    title: "Consensus",
    id: "consensus",
    url: "/?type=consensus",
  },
];

function Home(): JSX.Element {
  const avatar = trpc.useQuery(["auth.getAvatar"]);
  const router = useRouter();
  const selectedType = (router.query.type as string) || "question";

  return (
    <div className="pt-4 min-h-screen bg-gray-50">
      <div className="grid grid-cols-3 gap-4 max-w-screen-xl mx-auto">
        <div className="col-span-2">
          {/* Main SubSection */}

          <div className="bg-gray-300 rounded-md p-2 px-4 flex space-x-2 items-center">
            {avatar.data && (
              <Image
                width="32"
                height="32"
                alt="profile-avatar"
                className="rounded-full h-8 w-8"
                src={avatar.data}
              />
            )}
            {selectedType === "posts" ? (
              <Link
                href={{
                  pathname: "/articles/new",
                  query: {
                    topic: (router.query["topic"] as string) || undefined,
                  },
                }}
                legacyBehavior>
                <input
                  className="grow rounded-md px-2 h-8"
                  type="text"
                  placeholder="Create Post"
                />
              </Link>
            ) : (
              <Link
                href={{
                  pathname: "/questions/new",
                  query: {
                    topic: (router.query["topic"] as string) || undefined,
                  },
                }}
                legacyBehavior>
                <input
                  className="grow rounded-md  px-2 h-8"
                  type="text"
                  placeholder="Create Question"
                />
              </Link>
            )}
            {/* <PhotographIcon className="h-6 w-6" /> */}
            {/* <LinkIcon className="h-6 w-6" /> */}
          </div>

          {/* Question/Posts/Pending/Consensus */}
          <div className="flex my-4 justify-between space-x-2">
            {homeTypes.map((ht) => (
              <button
                key={ht.id}
                className={`py-2 w-full text-center rounded ${
                  selectedType === ht.id
                    ? " text-white bg-stone-500" // selected classes
                    : " bg-gold bg-opacity-5 text-gold"
                }`}
                onClick={() => {
                  router.query["type"] = ht.id;
                  router.push({
                    query: { ...router.query },
                  });
                }}
              >
                {ht.title}
              </button>
            ))}
          </div>
          {(selectedType === "question" && <QuestionsFeed />) ||
            (selectedType === "posts" && <PostsFeed />) ||
            (selectedType === "pending" && <PendingFeed />) ||
            (selectedType === "consensus" && <ConsensusFeed />) ||
            null}
        </div>

        {/* Right SubSection */}
        <div className="flex flex-col space-y-4">
          {" "}
          {/* Col 2 */}
          {/* <TopContent /> */}
          <TrendingTopics />
          <RecentConsensus />
          <TrendingPosts />
        </div>
      </div>
    </div>
  );
}

export default Home;
