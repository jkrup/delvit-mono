import { Dispatch, SetStateAction } from "react";
import { Url } from "url";

export interface Author {
    id: string;
    name?: string | null;
    avatarUrl?: string; // url
    image?: string;
}

export interface CardProps {
    url: string | null;
    title: string;
    author: Author;
    createdAt: Date;
    forPercent: number; // 0 - 100 (% for)
    postsCount?: number;
    body?: string;
    votes: number;
    id: string;
    evidenceBlocksCount?: number
}

export interface QuestionProps extends CardProps {
    posts?: any[];
}
export interface FeedPostProps {
    id: string;
    url?: string;
    questionId?: string;
    title: string;
    author: string;
    createdAt: Date;
    votes: number;
    evidenceType?: "FOR" | "AGAINST";
    evidenceBlocksCount: number;
    body: string;
}
export interface ArticleProps {
    avatar?: string;
    body: string;
    id: string;
    imgSrc?: string;
    postedAt: string;
    postedByName: string;
    title: string;
    url?: string;
}
export interface EvidenceProps extends FeedPostProps {
    articleUrl: Url | string;
    avatar?: string
}

export interface Answer {
    result: "Yes" | "No";
    confidence: string;
    body: string;
}

export interface FeedConsensusQuestionProps {
    id: string;
    author: Author;
    answer: Answer; // Ex. "Yes (low level of confidence)"
    title: string;
}

export interface pendingOptionsProps {
    votes: number;
    showBanter: boolean;
    setShowBanter: (banter: boolean) => void;
}

export interface EvidenceArticleProps {
    id: string;
    title: string;
    views: number;
    body: string;
    evidenceType: string;
    url?: string;
    evidenceArticleCount: number;
    evidencePosts?: any[];
    commentCount: number;
}

export interface consensusProps {
    evidenceView: string;
    setEvidenceView: Dispatch<SetStateAction<string>>;
    consensusData?: EvidenceArticleProps;
}
export interface selectOptionsProps {
    label: string;
    value: string;
    key: string;
}

