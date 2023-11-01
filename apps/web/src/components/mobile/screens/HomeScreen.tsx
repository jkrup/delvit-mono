import { useRouter } from "next/router";
import React from "react";
import MainLayout from "../layout/MainLayout";
import BottomTab from "../partials/BottomTab";
import Header from "../partials/Header";
import NavBar from "../partials/NavBar";
import Sidebar from "../partials/Sidebar";
import SubHeader from "../partials/SubHeader";
import Card from "../cards/Card";
import QuestionsFeed from "@/components/webview/QuestionsFeed";
import PostsFeed from "@/components/webview/PostsFeed";
import PendingFeed from "@/components/webview/PendingFeed";
import ConsensusFeed from "@/components/webview/ConsensusFeed";
import InfoSect from "../partials/InfoSection";

const HomeScreen = () => {
  const router = useRouter();
  const selectedType = (router.query.type as string) || "question";
  return (
    <div>
      <NavBar />
      <Sidebar />
      <MainLayout>
        {/* Question/Posts/Pending/Consensus menu tabs */}
        <Header selectedType={selectedType} />
        {selectedType === "pending" && (
          <InfoSect body="Questions below have been recently submitted and are pending review and approval before they can go live." />
        )}
        {selectedType === "consensus" && (
          <InfoSect body="Questions below have gone through the complete Truth Consensus Algorithm and a verdict has been reached." />
        )}
        <SubHeader />
        <div className="p-1 pb-20">
          {(selectedType === "question" && <QuestionsFeed />) ||
            (selectedType === "posts" && <PostsFeed />) ||
            (selectedType === "pending" && <PendingFeed />) ||
            (selectedType === "consensus" && <ConsensusFeed />) ||
            null}
        </div>

        {/* <Card title="Is Bigfoot (unidentified American primate) real?" />
        <Card title="Does Joe Biden have Dementia?" /> */}
        <BottomTab />
      </MainLayout>
    </div>
  );
};

export default HomeScreen;
