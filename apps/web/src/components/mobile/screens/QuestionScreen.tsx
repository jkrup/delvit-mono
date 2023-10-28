import { QuestionProps } from "@/types/props";
import React, { useState } from "react";
import BottomTab from "../partials/BottomTab";
import PageHeader from "../partials/PageHeader";
import QuestionTabMenu from "../partials/QuestionTabMenu";
import BanterTab from "../tabs/BanterTab";
import EvidenceTab from "../tabs/EvidenceTab";

const QuestionScreen = ({ questionData }: { questionData: QuestionProps }) => {
  const [activeTab, setActiveTab] = useState("Banter");
  return (
    <div>
      <PageHeader goBack={true} title="Question" />
      <QuestionTabMenu activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "Banter" ? (
        <BanterTab questionData={questionData} />
      ) : (
        <EvidenceTab questionData={questionData} />
      )}
      <BottomTab />
    </div>
  );
};

export default QuestionScreen;
