import Close from "@/components/icons/Close";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { IoMdAdd, IoMdCloseCircleOutline } from "react-icons/io";
import BottomTab from "../partials/BottomTab";
import PageHeader from "../partials/PageHeader";

export interface NewPostProps {
  title: string;
  setTitle: (str: string) => void;
  urls: string[];
  setUrls: (arr: string[]) => void;
  description: string;
  questionId: string;
  questionTitle: string;
  submitPost: any;
  postId: string;
}
const NewPostScreen = ({
  title,
  urls,
  setUrls,
  description,
  questionId,
  questionTitle,
  setTitle,
  postId,
  submitPost,
}: NewPostProps) => {
  const { push, back } = useRouter();
  const [currentVal, setcurrentVal] = useState("");
  const [evidenceType, setevidenceType] = useState("FOR");

  const handleUrl = (item: string) => {
    setUrls(urls.filter((url) => url !== item));
  };

  const onSubmit = (e: React.FormEvent) => {
    console.log("ON SUBMIT TRIGGERED");
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const title = formData.get("title") as string;
    const body = formData.get("body") as string;
    const url = (formData.getAll("link[]") as string[]).join(",");

    submitPost.mutate({
      title,
      body,
      url,
      questionId,
      postId,
      for: evidenceType === "FOR",
    });

    return false;
  };
  return (
    <form onSubmit={onSubmit}>
      <div className="pb-20">
        <PageHeader title="Post View" />
        <div className="p-2 bg-gray-50">
          <h3 className="my-3 text-center">{questionTitle}</h3>
          <div className="p-2 bg-white  h-full rounded">
            <h5 className="text-xs text-gold text-center my-2">
              You are posting :
            </h5>
            <div className="flex justify-center items-center">
              <div
                onClick={() => setevidenceType("FOR")}
                className={`p-2 rounded-3xl ${
                  evidenceType === "FOR"
                    ? "bg-brightgreen text-white  border-brightgreen"
                    : " border-brightgreen text-brightgreen bg-white "
                }  mx-2 px-6 border`}
              >
                FOR
              </div>
              <div
                onClick={() => setevidenceType("AGAINST")}
                className={`p-2 border ${
                  evidenceType === "AGAINST"
                    ? "bg-red-700 text-white"
                    : "text-red-700 border-red-700 "
                }  px-6 rounded-3xl mx-2`}
              >
                AGAINST
              </div>
            </div>

            {/* form */}
            <div className="flex flex-col grow shrink-0">
              <div className="text-gold">Title</div>
              <input
                minLength={3}
                name="title"
                required
                placeholder="Title of the Post"
                className="rounded bg-gold bg-opacity-5 p-4"
                defaultValue={title}
              />
              <div className="text-gold mt-4">Link</div>
              <input
                name="link[]"
                type="url"
                placeholder="https://external-link.example"
                className="rounded bg-gold bg-opacity-5 p-3 mb-2"
                value={currentVal}
                onChange={(e) => {
                  setcurrentVal(e.target.value);
                }}
                onBlur={(e) => {
                  if (e.target.value && !e.target.validity.valid) {
                    if (!e.target.value.match(/^http.?:/)) {
                      e.target.value = "https://" + e.target.value;
                    }
                  }
                }}
              />
              {urls.map((item, i) => (
                <div
                  className="my-1 flex text-sm font-light text-darkgrey"
                  key={i}
                >
                  <div onClick={() => handleUrl(item)}>
                    <Close />
                  </div>
                  <span className="ml-2">{item}</span>
                </div>
              ))}
              <button
                disabled={currentVal.length == 0}
                className={`${
                  currentVal.length > 0 ? "" : "opacity-50"
                } flex items-center text-gold space-x-2 m-2 justify-end`}
                type="button"
                onClick={() => {
                  if (!currentVal.match(/^http.?:/)) {
                    setUrls([...urls, "https://" + currentVal]);
                  } else {
                    setUrls([...urls, currentVal]);
                  }

                  setcurrentVal("");
                }}
              >
                <IoMdAdd className="h-6 w-6 text-2xl text-gold" />{" "}
                <span>Add</span>
              </button>
            </div>

            {/* explanation */}
            <div className="flex flex-col grow shrink-0">
              <div className="text-gold">Explanation</div>
              <textarea
                name="body"
                required
                placeholder="Explaination here..."
                className="rounded bg-gold bg-opacity-5 min-h-[12rem] p-4"
                defaultValue={description}
              />
            </div>

            {/* discard or post */}
            <div className="flex justify-end my-4 mt-12 space-x-2 md:space-x-8 font-serif">
              <button
                className="text-gold text-sm border-gold border rounded p-2 uppercase font-bold w-32"
                type="button"
                onClick={() => {
                  push(`/questions/${questionId}`);
                }}
              >
                Discard
              </button>
              <button className="bg-gold text-sm text-white rounded p-2 uppercase font-bold w-32">
                Post
              </button>
            </div>
          </div>
        </div>
        <BottomTab />
      </div>
    </form>
  );
};

export default NewPostScreen;
