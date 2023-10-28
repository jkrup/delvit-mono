import { QuestionMarkCircleIcon } from "@heroicons/react/outline";

interface InfoSectionProps {
  title: string;
  body: string;
}

const InfoSection: React.FC<InfoSectionProps> = ({ title, body }) => {
  return (
    <div className="bg-stone-200 text-stone-600 rounded p-8">
      <h2 className="text-gold text-2xl font-bold text-center uppercase">
        {title}
      </h2>
      <p>
        {body}{" "}
        <QuestionMarkCircleIcon className="h-4 w-4 inline text-gold" />
      </p>
    </div>
  );
};
export default InfoSection;
