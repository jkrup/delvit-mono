import Link from "next/link";
import { DocumentSearchIcon, AnnotationIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { QuestionProps } from "@/types/props";

const Question: React.FC<QuestionProps> = ({
  url,
  author,
  forPercent,
  postsCount,
  title,
}) => {
  const router = useRouter();
  const query = {...router.query};
  delete query["type"];
  return (
    <Link href={{
      pathname: url,
      query
      }}>
      <div className="rounded-md p-2 px-4 flex flex-col space-y-2 shadow hover:shadow-lg transition cursor-pointer">
        <div className="flex space-x-8 text-gold items-center">
          <div className="flex space-x-2 items-center">
            <div className="bg-gold rounded-full h-4 w-4"></div>
            {/* <div className="font-bold"> */}
            {/*   HSTK/Path */}
            {/* </div> */}
            <div className="text-sm">Posted by {author.name}</div>
          </div>
        </div>

        {/* Article Title */}
        <a className="text-2xl font-bold mb-6">{title}</a>

        {/* Buttons */}
        <div className="flex space-x-16 text-gray-400 font-bold">
          <button className="flex items-center space-x-1">
            <AnnotationIcon className="h-5 w-5" />
            <div>{postsCount === 1 ? `1 Post` : `${postsCount} Posts`}</div>
          </button>
          <button className="flex items-center space-x-1">
            <DocumentSearchIcon className="h-5 w-5" />
            <div>
              {forPercent > 50
                ? `${forPercent}% For`
                : `${100 - forPercent}% Against`}
            </div>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default Question;
