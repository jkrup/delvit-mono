import Article from "@/components/webview/Article";
import { useStore } from "@/hooks/useStore";
import { ArticleProps } from "@/types/props";
import React, { useEffect } from "react";
import EvidenceCard from "../cards/EvidenceCard";
import PageHeader from "../partials/PageHeader";

const SingleEvidence = ({ articleData }: { articleData: ArticleProps }) => {
  const [updateEvidence] = useStore((state) => [state.setArticleData]);

  useEffect(() => {
    updateEvidence(articleData);
  }, [articleData]);

  return (
    <div>
      <PageHeader goBack={true} title="Question" />
      <div className="p-2">
        <Article {...articleData} />
      </div>
    </div>
  );
};

export default SingleEvidence;
