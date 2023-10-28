import Clock from "@/components/icons/Clock";
import { trpc } from "@/utils/trpc";
import { SchellingState } from "@prisma/client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import BottomTab from "../partials/BottomTab";
import Button from "../partials/Button";
import PageHeader from "../partials/PageHeader";

const TCAScreen = () => {
  const [accepted, setAccepted] = useState(false);
  const [step, setStep] = useState(0);
  const questionResult = trpc.useQuery(["question.getSchellingQuestions"]);
  const acceptSchelling = trpc.useMutation(["question.acceptSchelling"]);

  const questions = questionResult.data;
  const question = questions?.[0];

  useEffect(() => {
    console.log(question);
    if (question?.Schelling?.[0]?.state === SchellingState.PENDING) {
      setStep(1);
    }
  }, [question]);

  console.log({ question });
  return (
    <div>
      <PageHeader title="TCA" />
      <div className="text-center p-3 my-3">
        <div className="text-gold my-3 font-typo capitalize text-lg">
          About the Truth Consensus Algorithm
        </div>
        <div className="p-2 mb-8 text-sm">
          A randomized group with even varying viewpoints has been selected to
          analyze all the data available. If you remove your bias and select the
          same answer as the majority of players, you win
        </div>
        {step === 0 && (
          <div className="rounded p-3 bg-brownish">
            <div className="my-3 text-white">Do you wish to participate ?</div>
            <div className="my-4 px-2 text-gold italic">
              By agreeing to participate, you agree to stake 100 DLV. You have
              24 hours to respond.
            </div>
            <div className="flex items-center my-3 px-2 justify-between">
              <Button
                title="decline"
                onChange={() => null}
                classname="uppercase w-4/10"
              />
              <Button
                title="Agree"
                onChange={() => {
                  acceptSchelling.mutate({ question: question!.id });
                  setStep(1);
                }}
                classname="btn"
              />
            </div>
          </div>
        )}
        {step === 1 && question && (
          <div className="rounded p-3 bg-brownish">
            <div className="my-3 flex items-center justify-center text-white">
              <Clock />
              <span className="mx-2">Time Left</span>
              <span className="text-gold tracking-widest">04:31:02</span>
            </div>
            <div className="text-sm text-white text-center my-4">
              You are currently involved in the Truth Consensus Algorithm for
            </div>
            <div className="my-4 px-2 text-white">
              &lsquo;{question.title}&rsquo;
            </div>
            <Link
              href={`/participate/${question.id}`}
              className="italic underline text-gold">
              
                Click here to view evidence and cast your vote.
              
            </Link>
          </div>
        )}
      </div>
      <BottomTab />
    </div>
  );
};

export default TCAScreen;
