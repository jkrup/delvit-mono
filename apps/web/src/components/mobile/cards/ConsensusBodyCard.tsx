import { Answer } from "@/types/props";
import React from "react";

const ConsensusBodyCard = ({ answer }: { answer: Answer }) => {
  return (
    <p className="whitespace-pre-line font-light line-clamp-5">
      <span
        className={
          "font-bold italic " +
          (answer.result === "Yes" ? "text-green-600" : "text-red-800")
        }
      >
        {answer.result} ({answer.confidence} level of confidence)
      </span>
      . {answer.body?.replaceAll("\\n", "\n")}
    </p>
  );
};

export default ConsensusBodyCard;
