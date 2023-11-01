import { trpc } from "@/utils/trpc";
import { useState } from "react";

const PopularTopics = () => {
  const [viewAll, setViewAll] = useState(false);
  const popularTopics = trpc.useQuery(["article.getPopularTopics"]);

  const limit = viewAll ? Infinity : 5;

  const popTopics = popularTopics.data;
  return (
    <div className="flex flex-col rounded-md">
      {" "}
      {/* Col 2 */}
      <div className="bg-white  rounded-md mb-4 overflow-hidden">
        <div className="title p-4 bg-gold font-bold text-center">
          Trending Topics
        </div>
        <div className="rounded-md flex flex-col">
          <div>
            <div className="h-3"></div>
            {popTopics
              ? popTopics.map(
                  (topic, i) =>
                    i < limit && (
                      <a
                        key={topic.id}
                        href={`/topics/${topic.id}`}
                        className="inline-flex justify-center m-2 px-[7%] hover:bg-zinc-300 rounded-full bg-zinc-200"
                      >
                        <button className="text-center">{topic.title}</button>
                      </a>
                    )
                )
              : Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={i}
                      className="w-24 inline-flex m-2 hover:bg-zinc-300 rounded-full bg-zinc-200 animate-bounce"
                    >
                      &nbsp;
                    </div>
                  ))}
          </div>
          {viewAll || !popTopics ? (
            <div className="p-2"></div>
          ) : (
            <div className="text-center p-2">
              <button
                onClick={() => {
                  setViewAll(true);
                }}
                className="mt-2 rounded-full bg-yellow-400 w-full"
              >
                View all
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PopularTopics;
