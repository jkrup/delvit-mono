import Link from "next/link";
import React from "react";

const CardTitle = ({ title, url }: { title: string; url?: string }) => {
  return (
    <div className="my-3 text-xl">
      {url ? <Link href={url} legacyBehavior>{title}</Link> : title}
    </div>
  );
};

export default CardTitle;
