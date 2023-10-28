import type { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import Header from "@/components/webview/Header";
import SearchArticlesFeed from "@/components/webview/SearchArticlesFeed";
import PopularTopics from "@/components/webview/PopularTopics";
import { useViewPort } from "@/hooks/useViewPort";
import TrendingTopics from "@/components/webview/TrendingTopics";
import RecentConsensus from "@/components/webview/RecentConsensus";
import TrendingPosts from "@/components/webview/TrendingPosts";
import BottomTab from "@/components/mobile/partials/BottomTab";
import NavBar from "@/components/mobile/partials/NavBar";
import PageHeader from "@/components/mobile/partials/PageHeader";

const SearchPage: NextPage = () => {
  const router = useRouter();
  const { width } = useViewPort();
  const searchQuery = router.query.q as string;

  return (
    <>
      <Head>
        <title>Search {searchQuery} | HSTK</title>
        <meta name="description" content="HSTK App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {width > 992 ? (
        <div>
          <Header />
          <div className="pt-4 bg-zinc-700 min-h-screen">
            <div className="grid grid-cols-3 gap-4 max-w-screen-xl mx-auto">
              {/* Main SubSection */}
              <SearchArticlesFeed query={searchQuery} />

              {/* Right SubSection */}
              <div className="flex flex-col space-y-2">
                {" "}
                {/* Col 2 */}
                {/* <TopContent /> */}
                <PopularTopics />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <PageHeader goBack={true} title="Search" />
          <div className="flex flex-col space-y-4">
            <TrendingTopics />
            <RecentConsensus />
            <TrendingPosts />
          </div>
          <BottomTab />
        </>
      )}
    </>
  );
};

export default SearchPage;
