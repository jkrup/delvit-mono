import type { NextPage } from "next";
import Head from "next/head";
import { useViewPort } from "@/hooks/useViewPort";
import HomeScreen from "@/components/mobile/screens/HomeScreen";
import Header from "@/components/webview/Header";
import Home from "@/components/webview/Home";

const HomePage: NextPage = () => {
  const { width, height } = useViewPort();
  return (
    <>
      <Head>
        <title>HSTK | Home</title>
        <meta name="description" content="HSTK App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {width > 992 ? (
        <div>
          <Header />
          <Home />
        </div>
      ) : (
        <HomeScreen />
      )}
    </>
  );
};

export default HomePage;
