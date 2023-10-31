import ArrowLeft from "@/components/icons/ArrowLeft";
import {
  consensusProps,
  EvidenceArticleProps,
  FeedConsensusQuestionProps,
} from "@/types/props";
import React from "react";
import CardHeader from "../cards/CardHeader";
import ConsensusBodyCard from "../cards/ConsensusBodyCard";
import BottomModal from "../partials/BottomModal";
import BottomTab from "../partials/BottomTab";
import PageHeader from "../partials/PageHeader";

const ConsensusScreen = ({
  consensusData,
  evidenceView,
  setEvidenceView,
}: {
  consensusData: FeedConsensusQuestionProps;
  evidenceView: string;
  setEvidenceView: () => void;
}) => {
  const { author, title, answer } = consensusData;
  return (
    <div>
      <PageHeader goBack={true} title="Consensus" />
      <div className="p-2 bg-gray-50">
        <div className="bg-white  my-2 p-3 rounded cursor-pointer">
          <div className="">
            <CardHeader author={author} />

            <div className="flex my-2 items-center">
              {/* Question Title */}
              <div className="text-lg my-2">{title}</div>
            </div>
            <div
              className={`${
                answer.result === "Yes"
                  ? "text-greenish bg-lightgreen"
                  : " text-red-700 bg-red-300"
              } uppercase font-bold rounded-lg w-3/15 text-center font-typo p-2 my-2`}
            >
              {answer.result}
            </div>
            {/* Answer */}
            <ConsensusBodyCard answer={answer} />
          </div>
        </div>
      </div>
      <BottomModal
        consensusData={consensusData}
        evidenceView={evidenceView}
        setEvidenceView={setEvidenceView}
      />
      <BottomTab />
    </div>
  );
};

export default ConsensusScreen;
