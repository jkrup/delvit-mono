import React from "react";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { useRouter } from "next/router";

interface BackTitleProps {
  url?: string;
  title: string;
}

const BackTitle: React.FC<BackTitleProps> = ({ url, title }) => {
  const router = useRouter();
  if (!url) {
    return (
      <div
        className="flex items-center"
        onClick={() => {
          router.back();
        }}
      >
        <ArrowLeftIcon className="absolute h-8 w-8 font-bold cursor-pointer" />
        <h2 className="text-center grow text-xl">{title}</h2>
      </div>
    );
  }
  return (
    <div className="flex items-center">
      <Link href={url}>
        <ArrowLeftIcon className="absolute h-8 w-8 font-bold cursor-pointer" />
      </Link>
      <h2 className="text-center grow text-xl">{title}</h2>
    </div>
  );
};

export default BackTitle;
