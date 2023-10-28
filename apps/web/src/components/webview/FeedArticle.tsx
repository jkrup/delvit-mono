import Link from "next/link";
import {
  DocumentSearchIcon,
  AnnotationIcon,
  NewspaperIcon,
} from "@heroicons/react/outline";

export interface ArticleProps {
  postedByName: string;
  postedAt: string;
  url: string;
  title: string;
  imgSrc?: string;
  parentArticlesCount: number;
  commentsCount: number;
  views: number;
  body: string;
}

const Article: React.FC<ArticleProps> = ({
  postedByName,
  postedAt,
  url,
  body,
  title,
  imgSrc,
  parentArticlesCount,
  commentsCount,
  views,
}) => {
  return (
    <div className="bg-white rounded-md p-2 px-4 flex flex-col space-y-2">
      <div className="flex space-x-8 text-gold items-center">
        <div className="flex space-x-2 items-center">
          <div className="bg-gold rounded-full h-4 w-4"></div>
          <div className="font-bold">HSTK/Path</div>
          <div className="text-sm">
            Posted by {postedByName} {postedAt}
          </div>
        </div>
      </div>

      {/* Article Title */}
      <Link href={url}>
        <a className="text-2xl font-bold mb-4">{title}</a>
      </Link>

      {/* Media */}
      {imgSrc && <img src={imgSrc} />}

      {/* Preview Text */}
      <div className="flex">
        <p className="overflow-hidden text-ellipsis whitespace-nowrap">
          {body}
        </p>
        <Link href={url}>
          <a className="w-full text-gold font-bold whitespace-nowrap">
            read more
          </a>
        </Link>
      </div>

      {/* Buttons */}
      <div className="flex space-x-8 md:space-x-16 text-gray-400 font-bold">
        <Link href={url}>
          <button className="flex items-center space-x-1">
            <NewspaperIcon className="h-5 w-5" />
            <div>
              {parentArticlesCount === 1
                ? "1 Evidence Block"
                : `${parentArticlesCount} Evidence Blocks`}
            </div>
          </button>
        </Link>
        <Link href={url}>
          <button className="flex items-center space-x-1">
            <AnnotationIcon className="h-5 w-5" />
            <div>
              {commentsCount === 1 ? `1 Comment` : `${commentsCount} Comments`}
            </div>
          </button>
        </Link>
        <Link href={url}>
          <button className="flex items-center space-x-1">
            <DocumentSearchIcon className="h-5 w-5" />
            <div>{views === 1 ? `1 View` : `${views} Views`}</div>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Article;
