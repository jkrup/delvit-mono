import { useRouter } from "next/router";
import FeedPost from "./FeedPost";
import FilterBar from "./FilterBar";
import SearchDisplay from "./SearchDisplay";
import { useViewPort } from "@/hooks/useViewPort";
import Skeleton from "../mobile/cards/Skeleton";
import Card from "../mobile/cards/Card";
import { trpc } from "@/utils/trpc";
import PostCard from "../mobile/cards/PostCard";

const PostsFeed = () => {
  const router = useRouter();
  const { width } = useViewPort();
  const query = router.query["q"] as string;
  const topic = router.query["topic"] as string;
  const mode =
    ["NEW", "TOP"].indexOf((router.query["order"] as string) || "") === -1
      ? "NEW"
      : (router.query["order"] as "NEW" | "TOP");

  const postsData = trpc.useQuery([
    "article.getAllArticles",
    { mode, topic, query },
  ]);

  if (postsData.isLoading || !postsData.data) {
    return (
      <>
        {width > 992 ? (
          <div className="col-span-2 flex flex-col space-y-4">
            <div className="bg-slate-200 rounded-md p-3 px-4 animate-pulse">
              &nbsp;
            </div>

            {Array(10)
              .fill(0)
              .map((_, i) => {
                return (
                  <div
                    key={i}
                    className="bg-slate-200 rounded-md h-40 animate-pulse"
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

  return (
    <>
      {width > 992 ? (
        <div className="flex flex-col space-y-4">
          <SearchDisplay />
          <FilterBar />
          {postsData.data.map((p) => {
            return (
              <FeedPost
                key={p.id}
                author={p.author.name || ""}
                id={p.id}
                body={p.body}
                createdAt={p.createdAt}
                title={p.title}
                url={p.url || undefined}
                evidenceBlocksCount={p._count.evidencePosts}
                votes={0}
              />
            );
          })}
        </div>
      ) : (
        <>
          {postsData.data.map((p) => {
            return (
              <PostCard
                key={p.id}
                author={p.author}
                id={p.id}
                body={p.body}
                forPercent={p._count.evidencePosts}
                createdAt={p.createdAt}
                title={p.title}
                url={p.url}
                evidenceBlocksCount={p._count.evidencePosts}
                votes={0}
              />
            );
          })}
        </>
      )}
    </>
  );
};

export default PostsFeed;
