import { useStore } from "@/hooks/useStore";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Button from "../partials/Button";
import EvidenceComp from "../partials/EvidenceComp";
import PageHeader from "../partials/PageHeader";

const EvidenceBlockScreen = () => {
  const { query } = useRouter();
  const [articleData] = useStore((state) => [state.articleData]);
  const [evidenceView, setEvidenceView] = useState("FOR");
  
  const PostBtn = (
    (<Link href={`/articles/newWithQuestion?postId=${query.id}`} className="w-1/5">

      <Button
        classname="rounded-xl w-full uppercase"
        title="Post"
        onChange={() => null}
      />

    </Link>)
  );

  return (
    <div>
      <PageHeader goBack={true} title="Evidence Blocks" button={PostBtn} />
      <h3 className="my-3 text-center">{articleData?.title}</h3>
      <EvidenceComp
        consensusData={articleData}
        evidenceView={evidenceView}
        setEvidenceView={setEvidenceView}
      />
    </div>
  );
};

export default EvidenceBlockScreen;
