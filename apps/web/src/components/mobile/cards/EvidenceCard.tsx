import React from "react";
import CardHeader from "./CardHeader";
import CardTitle from "./CardTitle";
import CardBody from "./CardBody";
import Document from "@/components/icons/Document";
import { ArticleProps, EvidenceProps, FeedPostProps } from "@/types/props";
import Link from "next/link";
import { useRouter } from "next/router";
import CardLink from "./CardLink";

const EvidenceCard = (props: EvidenceProps) => {
  const {
    author,
    createdAt,
    title,
    body,
    evidenceBlocksCount,
    articleUrl,
    url,
    evidenceType,
    avatar,
  } = props;
  const router = useRouter();
  const query = { ...router.query };
  delete query["type"];
  console.log(evidenceBlocksCount)
  return (
    <div className="rounded bg-white p-3 m-2">
      <CardHeader
        author={{ name: author, avatarUrl: avatar }}
        createdAt={createdAt}
        evidence={evidenceType}
      />
      <Link href={articleUrl}>

        <CardTitle title={title} />

      </Link>

      <CardBody desc={body} />
      <CardLink url={url} />
      <div className="flex space-x-16 text-gray-400">
        <Link href={articleUrl} legacyBehavior>
          <button className="flex items-center space-x-1">
            <Document />
            <div>
              {evidenceBlocksCount === 1
                ? `${evidenceBlocksCount} Evidence Block`
                : `${evidenceBlocksCount} Evidence Blocks`}
            </div>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default EvidenceCard;
