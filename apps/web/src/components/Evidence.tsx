import Link from "next/link";

type EvidenceProps = {
  id: string;
  title: string;
  type?: string;
  children: React.ReactNode;
  evidenceLink?: string | null;
  stance: boolean;
  lost?: boolean;
  commentsLink?: string;
};

const Evidence: React.FC<EvidenceProps> = ({
  id,
  title,
  type,
  children,
  evidenceLink,
  stance,
  lost,
  commentsLink,
}) => {
  const bodyStringToMarkup: (b: string) => React.ReactNode = (b) =>
    b.split("\n").map((p, i) => (
      <p key={i} className="">
        {" "}
        {p}{" "}
      </p>
    ));

  if (stance) {
    type = "Top FOR";
  } else {
    type = "Top AGAINST";
  }

  return (
    <div className={`flex flex-col rounded-md ${lost ? "opacity-50" : ""}`}>
      {" "}
      {/* Col 2 */}
      <div
        className={`flex flex-col block bg-white h-64 rounded-md mb-4 overflow-hidden outline outline-1 ${
          stance ? "outline-green-600" : "outline-red-800"
        }`}
      >
        <div
          className={`title p-1 text-white font-bold text-center text-sm font-serif ${
            stance ? "bg-green-600" : "bg-red-800"
          }`}
        >
          {type}
        </div>
        <div className="h-42 mx-1 flex flex-col flex-grow">
          <div className="font-bold">{bodyStringToMarkup(title as string)}</div>
          <div className="text-sm line-clamp-4">
            {bodyStringToMarkup(children as string)}
          </div>
        </div>
        <div className="flex flex-col justify-between text-gray-400 mx-1 text-sm">
          {evidenceLink && (
            (<Link
              href={`${evidenceLink}`}
              className="text-blue-500 line-clamp-2"
              target="_blank">

              {evidenceLink}

            </Link>)
          )}
          <a>
            <Link href={`/articles/${id}`}> Comments </Link>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Evidence;
