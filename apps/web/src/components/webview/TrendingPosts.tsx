import Link from "next/link";
import { useState } from "react";
import { trpc } from "../../utils/trpc";

const TrendingPosts = () => {
  const trendingPost = trpc.useQuery(["article.getTrendingPosts"]);
  const [limit, setLimit] = useState(3);
  const viewAll = limit >= (trendingPost.data?.length || 1);

  const trendingPosts = trendingPost.data;
  return (
    <div className="flex flex-col rounded bg-white overflow-hidden shadow">
      <div className="title p-4 bg-gold font-bold text-center text-white text-xl font-serif">
        Trending Posts
      </div>
      <div className="flex flex-col bg-gray-200 justify-center space-y-4">
        <div className="flex flex-wrap">
          {trendingPost.data?.map(
            (consensusQuestion, i) =>
              i < limit && (
                (<Link
                  key={consensusQuestion.id}
                  href={`/articles/${consensusQuestion.id}`}
                  className="px-4 hover:bg-stone-300 hover:text-gold grow">

                  <div
                    key={consensusQuestion.id}
                    className="flex p-4 items-center space-x-4"
                  >
                    <div className="text-xl font-bold">{i + 1}</div>
                    <div className="m-1 text-lg rounded grow border-gold line-clamp-2">
                      {consensusQuestion.title}
                    </div>
                  </div>

                </Link>)
              )
          )}
        </div>
        {!viewAll && (
          <div className="text-center py-4 px-6">
            <button
              onClick={() => {
                setLimit(Infinity);
              }}
              className="w-full py-2 px-4 text-lg whitespace-nowrap rounded hover:bg-stone-200 bg-gold bg-opacity-5 grow border-gold text-gold"
            >
              View all
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrendingPosts;
