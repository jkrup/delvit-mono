import Link from "next/link";
import { trpc } from "@delvit/web/utils/trpc";
import { useRouter } from "next/router";

import RecentConsensus from "./RecentConsensus";
import TrendingTopics from "./TrendingTopics";
import TrendingPosts from "./TrendingPosts";

import QuestionsFeed from "./QuestionsFeed";
import PostsFeed from "./PostsFeed";
import PendingFeed from "./PendingFeed";
import ConsensusFeed from "./ConsensusFeed";
import Page from "./Page"
import Head from "next/head"

const homeTypes = [
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
  const title = homeTypes.find(x => x.id === selectedType)?.title

  return (
    <Page title={title ?? 'Home'}>
      <div className="grid grid-cols-3 gap-4 max-w-screen-xl mx-auto">
        <div className="col-span-2">
          {/* Main SubSection */}

          <div className="bg-neutral-100 rounded-md p-4 flex space-x-2 items-center">
            {avatar.data && (
              <img
                width="32"
                height="32"
                alt="profile-avatar"
                className="rounded-full h-8 w-8"
                src={avatar.data}
              />
            )}
            {selectedType === "posts" ? (
              <Link href="/articles/new" legacyBehavior>
                <input
                  className="grow rounded-md px-2 h-8"
                  type="text"
                  placeholder="Create Post"
                />
              </Link>
            ) : (
              <Link href="/questions/new" legacyBehavior>
                <input
                  className="grow rounded-md px-2 h-8"
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
                className={`py-2 w-full text-center rounded-md ${
                  selectedType === ht.id
                    ? " text-white bg-yellow-600" // selected classes
                    : " bg-yellow-600 bg-opacity-5 text-yellow-600"
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
    </Page>
  );
}

export default Home;
