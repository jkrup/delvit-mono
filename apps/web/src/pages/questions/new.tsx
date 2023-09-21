import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState, useEffect, useRef } from "react";
import Header from "../../components/Header";
import { trpc } from "../../utils/trpc";

const NewArticlePage = () => {
  const router = useRouter();
  const submitQuestion = trpc.useMutation(["question.submitQuestion"]);

  useEffect(() => {
    if (submitQuestion.isSuccess) {
      router.push("/?type=pending");
    }
  }, [submitQuestion, router]);

  const onSubmit = (e: React.FormEvent) => {
    console.log("ON SUBMIT TRIGGERED");
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const title = formData.get("title") as string;

    submitQuestion.mutate({ title });

    return false;
  };

  return (
    <>
      <Head>
        <title>DLV | Submit Question</title>
      </Head>
      <div>
        <Header />
        <div className="bg-slate-300 min-h-screen">
          <form
            onSubmit={onSubmit}
            className="flex flex-col space-y-4 max-w-screen-lg m-auto py-8"
          >
            <input
              minLength={3}
              name="title"
              required
              placeholder="Question"
              className="rounded-md p-2 placeholder:italic"
            />
            <button className="bg-yellow-500 text-white rounded-full p-2 uppercase font-bold">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewArticlePage;
