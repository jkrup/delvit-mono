import { useRouter } from "next/router";
import Link from "next/link";
import { trpc } from "../utils/trpc";
import { useSession, signIn, signOut } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Head from "next/head";
import Image from "next/image";

const ProfilePage = () => {
  const { data, status } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") {
    console.error("Unauthenticated");
  }

  const profile = trpc.useQuery(["auth.getProfile"]);

  const profileData = profile.data;

  // const bio =
  // "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  const updateProfile = trpc.useMutation(["auth.updateProfile"]);

  useEffect(() => {
    if (updateProfile.isSuccess) {
      router.push("/");
    }
  });

  const [newImgUrl, setNewImgUrl] = useState<string | undefined>(undefined);

  if (!profileData) {
    return <h1>Loading</h1>;
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("name") as string;
    const title = formData.get("title") as string;
    const bio = formData.get("bio") as string;
    // const image = formData.get("image") as string;

    updateProfile.mutate({ name, title, bio, image: newImgUrl });
  };

  if (!data) {
    return (
      <div className="w-full min-h-screen m-auto">
        <Header />
        <form
          className="bg-white my-12 shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col space-y-4"
          onSubmit={onSubmit}
        >
          <div className="flex-1">
            <button
              type="button"
              className="w-full bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => signIn()}
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    );
  }

  const {
    image,
    name,
    title,
    bio,
    _count: { posts, comments, votes }, //TODO: humanReadify posts/comments/votes
  } = profileData;

  return <>
    <Head>
      <title>DLV | Submit Question</title>
    </Head>
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <div className="flex my-8 mx-auto space-x-16 justify-around max-w-screen-xl">
        <div className="rounded flex flex-col basis-2/5 shadow-yellow-800 shadow-lg justify-center p-4 px-8 items-center h-fit">
          {image && (
            <Image
              src={image}
              width="100"
              height="100"
              alt="profile"
              className="w-32 h-32 rounded-full my-4"
            />
          )}
          <h2 className="text-2xl font-semibold text-yellow-800 font-serif">
            {name}
          </h2>
          <h3 className="text-yellow-800 text-lg">{title}</h3>
          <div className="flex text-center justify-evenly w-full my-8">
            <div>
              <div className="text-2xl">{posts}</div>
              <div>Posts</div>
            </div>
            <div>
              <div className="text-2xl">{comments}</div>
              <div>Banter</div>
            </div>
            <div>
              <div className="text-2xl">{votes}</div>
              <div>Upvotes</div>
            </div>
          </div>
          <p className="text-justify mb-8 whitespace-pre-wrap">{bio}</p>
        </div>
        <form
          className="px-8 pt-6 pb-8 mb-4 flex flex-col space-y-4 basis-1/2 h-fit"
          onSubmit={onSubmit}
        >
          <h1 className="text-yellow-800 text-xl font-serif font-semibold">
            Edit your profile
          </h1>
          <input
            id="upload-profile"
            type="file"
            className="hidden"
            onClick={(e) => {
              e.preventDefault();
              const url = prompt(
                "Currently you must upload your profile picture to IPFS and submit your ipfs.io URL here:"
              );
              if (url?.startsWith("https://ipfs.io/")) {
                setNewImgUrl(url);
              } else {
                alert("Bad URL");
              }
            }}
          />
          <label
            htmlFor="upload-profile"
            className="w-full border border-yellow-800 text-yellow-800 font-serif rounded p-2 text-center cursor-pointer hover:bg-yellow-100"
          >
            Upload Profile Pic
          </label>
          <div>
            <label
              className="block text-yellow-800 text-sm mb-2"
              htmlFor="username"
            >
              Name
            </label>
            <input
              className="rounded w-full py-2 px-3 bg-stone-100 focus:shadow-outline"
              id="username"
              type="text"
              placeholder="name"
              name="name"
              defaultValue={name || ""}
            />
          </div>
          <div>
            <label
              className="block text-yellow-800 text-sm mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              className="rounded w-full py-2 px-3 bg-stone-100 focus:shadow-outline"
              id="title"
              type="text"
              placeholder=""
              name="title"
              defaultValue={title ?? undefined}
            />
          </div>
          <div>
            <label
              className="block text-yellow-800 text-sm mb-2"
              htmlFor="bio"
            >
              About Me
            </label>
            <textarea
              className="rounded w-full py-2 px-3 bg-stone-100 focus:shadow-outline"
              id="bio"
              placeholder="Write a bit about yourself here, so others will know who you are and what you're knowledgable about."
              name="bio"
              rows={8}
              defaultValue={bio ?? undefined}
            />
          </div>
          <div className="flex justify-around space-x-8">
            <Link
              href="/"
              className="text-center border-yellow-800 hover:bg-slate-100 border text-yellow-800 font-serif font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline grow">
              
                CANCEL
              
            </Link>
            <button
              className="bg-yellow-800 hover:bg-yellow-600 text-white font-serif font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline grow"
              type="submit"
            >
              UPDATE
            </button>
          </div>
          <button
            className="italic self-start text-sm"
            type="button"
            onClick={() => signOut({
              callbackUrl: '/'
            })}
          >
            Sign out?
          </button>
        </form>
      </div>
    </div>
  </>;
};

export default ProfilePage;
