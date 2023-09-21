import React, { useState } from "react";
import Head from "next/head";
import { trpc } from "../../utils/trpc";
import hstkLogoUrl from "../../imgs/hstk-logo.png";
import Header from "../../components/Header";
import { useRouter } from "next/router";
import Link from "next/link";
import LoadingArticlePage from "@delvit/web/components/LoadingArticlePage";
import BackTitle from "@delvit/web/components/BackTitle";
import { timeToReadibleAgo } from "@delvit/web/utils/helpers";
import { DocumentMagnifyingGlassIcon, LinkIcon } from "@heroicons/react/24/outline";
import DropDown from "@delvit/web/components/DropDown";
import EvidenceArticle from "@delvit/web/components/EvidenceArticle";
import Evidence from "@delvit/web/components/Evidence";
import Image from "next/image";
import DeleteIcon from "@delvit/web/components/DeleteIcon"

const QuestionPage = () => {
  const router = useRouter();

  //TODO: Check articleId is string
  const questionId = router.query.id as string;
  const question = trpc.useQuery([
    "question.getQuestionWithConsensus",
    { id: questionId },
  ]);

  const questionData = question.data;

  const [evidenceView, setEvidenceView] = useState("FOR");

  if (!router.isReady || question.isLoading || !questionData) {
    return <LoadingArticlePage />;
  }

  const renderTopOpposing = () => {
    const article = questionData.posts.find((e) => e.evidenceType == "AGAINST");
    if (!article) {
      return null;
    }
    return (
      <Evidence
        id={article.evidencePostId}
        stance={false}
        title={article.evidencePost.title}
        evidenceLink={article.evidencePost.url}
        lost={questionData.Consensus?.answer !== "AGAINST"}
      >
        {article.evidencePost.body}
      </Evidence>
    );
  };

  const renderTopSupporting = () => {
    const article = questionData.posts.find((e) => e.evidenceType == "FOR");
    if (!article) {
      return null;
    }
    return (
      <Evidence
        id={article.evidencePostId}
        stance={true}
        title={article.evidencePost.title}
        evidenceLink={article.evidencePost.url}
        lost={questionData.Consensus?.answer !== "FOR"}
      >
        {article.evidencePost.body}
      </Evidence>
    );
  };

  return (
    <>
      <Head>
        <title>{`DLV | ${questionData.title}`}</title>
        <meta name="description" content={questionData.title} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="pt-4 min-h-screen pb-64">
        <div className="grid grid-cols-5 gap-4 max-w-screen-xl mx-auto">
          <div className="p-2 flex flex-col col-span-3 space-y-2">
            <BackTitle title="Consensus" />
            <div className="flex flex-col shadow px-8 py-4 rounded-lg space-y-4">
              <div className="text-stone-600 flex justify-between items-center space-x-2 text-sm">
                <div className="flex items-center space-x-2">
                {questionData.author.image && (
                  <img
                    width="32"
                    height="32"
                    alt="profile-avatar"
                    className="rounded-full h-8 w-8"
                    src={questionData.author.image}
                  />
                )}
                <div>
                  Posted by {questionData.author?.name}{" "}
                  {timeToReadibleAgo(questionData.createdAt)}
                </div>
                </div>
                
                {question.data?.id && <DeleteIcon questionId={questionId}/>}
              </div>
              <div className="text-xl font-semibold">{questionData.title}</div>
              <div>
                <span
                  className={`rounded-lg px-12 py-2 font-serif font-semibold ${
                    questionData.Consensus?.answer === "FOR"
                      ? "bg-green-200 text-green-600"
                      : "bg-red-200 text-red-800"
                  }`}
                >
                  {questionData.Consensus?.answer === "FOR" ? "YES" : "NO"}
                </span>
              </div>
              <div className="whitespace-pre-line">
                <span
                  className={`italic pr-1 font-semibold ${
                    questionData.Consensus?.answer === "FOR"
                      ? "text-green-600"
                      : "text-red-800"
                  }`}
                >
                  {questionData.Consensus?.answer === "FOR" ? "YES" : "NO"} (
                  {questionData.Consensus?.confidence} level of confidence)
                </span>
                {questionData.Consensus?.body.replaceAll("\\n", "\n")}
              </div>
            </div>
          </div>

          {/* Right Section (References) */}
          <div className="flex flex-col col-span-2 space-y-2">
            {" "}
            {/* Col 2 */}
            <div className="flex flex-col rounded-md">
              {" "}
              {/* Col 2 */}
              <div className="bg-white rounded-md mb-4 overflow-hidden">
                <div className="p-4 bg-yellow-600 font-bold text-center justify-center text-white flex items-center">
                  <Image
                    alt="Delvit Logo"
                    src={hstkLogoUrl}
                    height="40"
                    width="40"
                  />
                  <div className="font-serif text-xl px-4">References</div>
                </div>
                <div className="rounded-md flex flex-col">
                  <div>
                    <div className="grid grid-cols-2 gap-2 m-4">
                      {renderTopSupporting()}
                      {renderTopOpposing()}
                    </div>
                    <div className="flex justify-end mx-4">
                      <div className="flex justify-start">
                        <div
                          className={`rounded-full px-[5%] p-1 mr-[5%] font-serif ${
                            evidenceView === "FOR"
                              ? "bg-green-200"
                              : "bg-red-200"
                          }`}
                        >
                          <DropDown
                            onSelect={(e) => setEvidenceView(e.target.value)}
                          >
                            <option value="FOR">FOR</option>
                            <option value="AGAINST">AGAINST</option>
                          </DropDown>
                        </div>
                      </div>
                    </div>
                    <div className="block m-4">
                      {/* <SubmitEvidenceArticle */}
                      {/*   articleId={articleData.id} */}
                      {/*   refetch={article.refetch} */}
                      {/* /> */}
                      {questionData.posts
                        .filter(
                          (evidencePostData) =>
                            evidencePostData.evidenceType === evidenceView
                        )
                        .map((evidencePostData) => (
                          <EvidenceArticle
                            key={evidencePostData.evidencePostId}
                            id={evidencePostData.evidencePostId}
                            title={evidencePostData.evidencePost.title}
                            views={evidencePostData.evidencePost.views}
                            commentCount={
                              evidencePostData.evidencePost._count.comments
                            }
                            body={evidencePostData.evidencePost.body}
                            evidenceType={evidencePostData.evidenceType}
                            // imgSrc={evidencePostData.evidenceArticle.imgSrc ?? undefined}
                            url={evidencePostData.evidencePost.url ?? undefined}
                            evidenceArticleCount={
                              evidencePostData.evidencePost._count.evidencePosts
                            }
                          />
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export interface FeedPostProps {
  id: string;
  url?: string;
  questionId: string;
  title: string;
  author: string;
  createdAt: Date;
  postsCount: number;
  votes: number;
  evidenceType: "FOR" | "AGAINST";
  evidenceBlocksCount: number;
  body: string;
}

const FeedPost: React.FC<FeedPostProps> = ({
  id,
  questionId,
  url,
  title,
  author,
  createdAt,
  evidenceType = "FOR",
  evidenceBlocksCount = 0,
  body,
}) => {
  const articleUrl = `/articles/${id}?questionId=${questionId}`;
  return (
    <div className="bg-white rounded-md p-2 px-4 flex flex-col space-y-2 shadow hover:shadow-lg transition">
      <div className="flex space-x-8 text-yellow-800 items-center">
        <div className="flex space-x-2 items-center">
          <div className="bg-yellow-800 rounded-full h-4 w-4"></div>
          {/* <div className="font-bold"> */}
          {/*   HSTK/Path */}
          {/* </div> */}
          <div className="text-sm flex">
            <div>
              Posted by {author} {timeToReadibleAgo(createdAt)} &#x2022;&nbsp;
            </div>
            <div
              className={`${
                evidenceType === "FOR" ? "text-green-600" : "text-red-800"
              } font-bold`}
            >
              {evidenceType}
            </div>
          </div>
        </div>
      </div>

      {/* Article Title */}
      <Link href={articleUrl} className="text-2xl font-bold mb-6">
        {title}
      </Link>

      {/* Post Body */}
      <div className="whitespace-pre-wrap line-clamp-3">{body}</div>

      {url && (
        <a
          className="pb-4 flex items-center text-yellow-700 space-x-1 truncate w-80"
          href={url}
          rel="noreferrer"
          target="_blank"
        >
          <LinkIcon className="h-4 w-4" />{" "}
          <div className="truncate w-80">{url}</div>
        </a>
      )}

      {/* Buttons */}
      <div className="flex space-x-16 text-gray-400 font-bold">
        <Link href={articleUrl} legacyBehavior>
          <button className="flex items-center space-x-1">
            <DocumentMagnifyingGlassIcon className="h-5 w-5" />
            <div>
              {evidenceBlocksCount === 1
                ? `${evidenceBlocksCount} Evidence Block`
                : `${evidenceBlocksCount} Evidence Blocks`}
            </div>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default QuestionPage;
