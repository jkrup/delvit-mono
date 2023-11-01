import Head from "next/head";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Link from "next/link";
import { trpc } from "@/utils/trpc";
import { SchellingState } from "@prisma/client";
import Header from "@/components/webview/Header";

const SchellingPage: NextPage = () => {
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

  // const question = {
  //   title: "Does Joe Biden Have Dementia?",
  //   id: "xxxxxxx",
  // };
  const StepOne = (
    <>
      <h2 className="text-white text-lg">Do you wish to participate?</h2>
      <p className="text-gold my-4 italic">
        By agreeing to participate, you agree to stake 100 HSTK.
        <br />
        You have 24 hours to respond
      </p>
      <div className="flex justify-center space-x-4 font-semibold text-white my-4">
        <button className="rounded-lg border-gold border p-2 w-32 text-gold hover:bg-amber-200">
          DECLINE
        </button>
        <button
          onClick={() => {
            acceptSchelling.mutate({ question: question!.id });
            setStep(1);
          }}
          className="bg-gold rounded-lg p-2 w-32 hover:bg-amber-200"
        >
          AGREE
        </button>
      </div>
    </>
  );

  const StepTwo = question && (
    <div className="text-white">
      <h2 className="mb-8">
        You are currently involved in the Truth Consensus Algorithm for
      </h2>
      <h1 className="text-2xl font-semibold mb-4">
        &lsquo;{question.title}&rsquo;
      </h1>
      <Link
        href={`questions/${question.id}?voting=1`}
        className="text-gold underline italic">
        
          Click here to view evidence and cast your vote.
        
      </Link>
    </div>
  );

  const renderStates = [StepOne, StepTwo];

  return (
    <>
      <Head>
        <title>HSTK | About</title>
        <meta name="description" content="HSTK App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-gray-50">
        <Header />
        <div className="min-h-screen">
          <div className="bg-white  mx-auto my-8 rounded-md p-10 max-w-screen-xl">
            <div className="text-center">
              <h1 className="text-2xl font-bold font-serif text-gold">
                About the Truth Consensus Algorithm
              </h1>
              <hr className="text-black mx-auto mt-2 mb-8" />
              <p className="text-left my-4">
                A randomized group of people from all walks of life have been
                selected to analyze a set of data and determine a reasonable
                conclusion. The goal is to put aside your personal bias and
                instead select what you think the majority of other players
                would select based on the data.
              </p>
              <p className="text-left my-4">
                If you win you will gain the staked HSTK from those who lost.
                Additionally 10% of the advertising revenue for this question is
                added to the prize pool. Typical payout is 2:1.
              </p>
            </div>
            {question ? (
              <div className="bg-stone-800 py-6 text-center rounded-xl my-8">
                {renderStates[step]}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default SchellingPage;
