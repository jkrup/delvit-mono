import Head from "next/head";
import Header from "./Header";

const LoadingArticlePage = () => (
  <>
    <Head>
      <title>{`HSTK | Loading...`}</title>
      <meta name="description" content="HSTK App" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Header />
    <div className="pt-4 bg-gray-100 min-h-screen pb-64">
      <div className="grid grid-cols-5 gap-4 max-w-screen-xl mx-auto">
        <div className="flex flex-col col-span-3 space-y-4 ">
          <div className="animate-pulse bg-gray-500 h-12 rounded-lg"></div>
          <div className="animate-pulse bg-gray-500 h-72 rounded-lg"></div>
        </div>

        {/* Right SubSection */}
        <div className="flex flex-col col-span-2 space-y-2">
          {" "}
          {/* Col 2 */}
          <div className="flex flex-col rounded-md">
            {" "}
            {/* Col 2 */}
            <div className="rounded-md mb-4 overflow-hidden animate-pulse bg-gray-300 h-72"></div>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default LoadingArticlePage;
