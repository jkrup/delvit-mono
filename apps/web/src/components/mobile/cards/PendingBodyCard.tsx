import { trpc } from "@/utils/trpc";
import React, { useState } from "react";
import Button from "../partials/Button";

const PendingBodyCard = ({
  opinion: defaultOpinion,
  questionId,
}: {
  opinion: "AGREE" | "DISAGREE" | undefined;
  questionId: string;
}) => {
  const setOpinion = trpc.useMutation(["question.setOpinion"]);
  const [opinion, setLocalOpinion] = useState(defaultOpinion);

  return (
    <div className="pc-body">
      <div className="text-darkgrey font-light mb-2">Give Your Opinion</div>
      <div className="flex justify-between">
        <Button
          classname="w-4/15"
          title="AGREE"
          onChange={() => {
            setOpinion.mutate({
              questionId,
              opinion: "AGREE",
            });
            setLocalOpinion("AGREE");
          }}
        />
        <Button
          classname="w-4/15"
          title="DISAGREE"
          onChange={() => {
            setOpinion.mutate({
              questionId,
              opinion: "DISAGREE",
            });
            setLocalOpinion("DISAGREE");
          }}
        />
      </div>
    </div>
  );
};

export default PendingBodyCard;
