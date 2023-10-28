import LinkIcon from "@/components/icons/Link";
import Link from "next/link";
import React from "react";

const CardLink = ({ url }: { url: string | undefined }) => {
  return (
    <div className="my-2">
      {url &&
        url.split(",").map((u) => (
          (<Link
            href={u}
            key={u}
            target="_blank"
            className="text-gold hover:text-yellow-400 flex items-center">

            <LinkIcon />
            <div className="truncate text-sm italic">{u}</div>

          </Link>)
        ))}
    </div>
  );
};

export default CardLink;
