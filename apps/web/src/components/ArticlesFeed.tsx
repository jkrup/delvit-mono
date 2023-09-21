// TODO: remove this
// I BELIEVE THIS IS ONLY BEING USED FROM LOGIN AS A BACKGROUND PAGE NOW
import Link from "next/link";
import { trpc } from "../utils/trpc";

import {
  ArrowTrendingUpIcon,
  ArrowUpIcon,
  FireIcon,
  PhotoIcon,
  LinkIcon,
  CheckBadgeIcon
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { useState } from "react";
import Article from "./FeedArticle";

const ArticlesFeed = () => {
  const router = useRouter();
  const avatar = trpc.useQuery(["auth.getAvatar"]);
  const topics = trpc.useQuery(["article.getPopularTopics"]);
  const [topic, setTopic] = useState<string | undefined>(undefined);

  const mode =
    ["NEW", "TOP"].indexOf((router.query["order"] as string) || "") === -1
      ? "NEW"
      : (router.query["order"] as "NEW" | "TOP");

  const articlesData = trpc.useQuery([
    "article.getAllArticles",
    { mode, topic },
  ]);

  const selectTopic: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const value = e.target.value;
    if (value === "0") {
      setTopic(undefined);
      return;
    }
    setTopic(value);
  };

  if (articlesData.isLoading || !articlesData.data) {
    return (
      <div className="col-span-2 flex flex-col space-y-4">
        <div className="bg-white rounded-md p-2 px-4 flex space-x-2 items-center animate-pulse">
          &nbsp;
        </div>

        <div className="bg-white rounded-md p-3 px-4 animate-pulse">&nbsp;</div>

        {Array(10)
          .fill(0)
          .map((_, i) => {
            return (
              <div key={i} className="bg-white rounded-md h-40 animate-pulse">
                {" "}
              </div>
            );
          })}
      </div>
    );
  }

  const articles = articlesData.data;
  return (
    <div className="col-span-2 flex flex-col space-y-4">
      <div className="bg-white rounded-md p-2 px-4 flex space-x-2 items-center">
        {avatar.data && (
          <img
            width="32"
            height="32"
            alt="profile-avatar"
            className="rounded-full h-8 w-8"
            src={avatar.data}
          />
        )}
        <Link href="/articles/new" legacyBehavior>
          <input
            className="grow rounded-md bg-zinc-200 px-2 h-8"
            type="text"
            placeholder="Create Post"
          />
        </Link>
        <PhotoIcon className="h-6 w-6" />
        <LinkIcon className="h-6 w-6" />
      </div>

      <div className="bg-white rounded-md p-2 px-4">
        <div className="flex justify-between">
          <div className="flex space-x-2">
            <button
              className={
                "flex items-center " +
                (mode === "NEW" ? "font-bold text-yellow-700" : "")
              }
              onClick={() => {
                delete router.query.order;
                router.push(router);
              }}
            >
              <CheckBadgeIcon className="h-5 w-5" />
              <span>New</span>
            </button>
            <button
              className={
                "flex items-center " +
                (mode === "TOP" ? "font-bold text-yellow-700 " : "")
              }
              onClick={() => {
                router.push({
                  query: {
                    order: "TOP",
                  },
                });
              }}
            >
              <ArrowUpIcon className="h-5 w-5" />
              <span>Top</span>
            </button>
            <button
              disabled={true}
              className="flex items-center disabled:text-gray-400"
            >
              <ArrowTrendingUpIcon className="h-5 w-5" />
              <span>Trending</span>
            </button>
            <button
              disabled={true}
              className="flex items-center disabled:text-gray-400"
            >
              <FireIcon className="h-5 w-5" />
              <span>Controversial</span>
            </button>
          </div>
          <select
            defaultValue={topic}
            className="bg-zinc-200 p-1 rounded-full"
            style={{ borderRight: "8px solid #0000001f" }}
            onChange={selectTopic}
          >
            <option value={0}>
              <span>All</span>
            </option>
            {topics.data?.map((t) => (
              <option key={t.id} value={t.id}>
                <span>{t.title}</span>
              </option>
            ))}
          </select>
        </div>
      </div>

      {articles.map((article) => {
        const url = `/articles/${article.id}`;
        const postedByName = article.author.name ?? article.author.id;
        const postedAt = article.createdAt.toDateString();
        return (
          <Article
            key={article.id}
            url={url}
            postedByName={postedByName}
            postedAt={postedAt}
            title={article.title}
            imgSrc={article.imgSrc ?? undefined}
            parentArticlesCount={article._count.evidencePosts}
            commentsCount={article._count.comments}
            views={article.views}
            body={article.body}
          />
        );
      })}
    </div>
  );
};

export default ArticlesFeed;
