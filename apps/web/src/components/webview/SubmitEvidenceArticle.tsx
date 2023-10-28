import { trpc } from "@/utils/trpc";
import { XIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";

interface SubmitEvidenceArticleProps {
  articleId: string;
  refetch: () => void;
}

const SubmitEvidenceArticle: React.FC<SubmitEvidenceArticleProps> = ({
  articleId,
  refetch,
}) => {
  // const [adding, setAdding] = useState(false);
  // const [supporting, setSupporting] = useState(true)
  //
  // const submitArticle = trpc.useMutation(['article.submitArticle'])
  //
  // const onClickAdd = () => {
  //   setAdding(true)
  //   console.log(`/articles/new?article=${articleId}`)
  // }
  //
  // const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  //   const formData = new FormData(e.target as HTMLFormElement)
  //
  //   const title = formData.get('title') as string;
  //   const body = formData.get('body') as string;
  //   const url = formData.get('link') as string;
  //
  //   const evidence = {
  //     type: supporting ? 'FOR' : 'AGAINST',
  //     article: articleId
  //   }
  //
  //   submitArticle.mutate({ title, body, url, evidence })
  // }
  //
  // useEffect(() => {
  //   if (submitArticle.isSuccess) {
  //     submitArticle.reset.call(undefined)
  //     setAdding(false)
  //     refetch()
  //   }
  // }, [submitArticle.isSuccess, submitArticle.reset, refetch])
  //
  // if (!adding) {
  //   return (
  //     <button className="rounded-lg p-2 py-3 my-3 w-full text-white text-lg bg-gray-400 hover:bg-slate-300 shadow-md"
  //       onClick={onClickAdd}
  //     >
  //       Add +
  //     </button>
  //   )
  // }
  // return (
  //   <form onSubmit={onSubmit}>
  //     <fieldset disabled={!submitArticle.isIdle} className="flex flex-col space-y-4 py-8">
  //       <input name="title" required placeholder="Title" className="border rounded-md p-2 placeholder:italic" />
  //       <input name="link" placeholder="https://external-link.example" className="border rounded-md p-2 placeholder:italic" />
  //       <textarea name="body" required placeholder="Article Body" className="border rounded-md p-2 h-80" />
  //       <div className="flex space-x-2">
  //         <button
  //           className="flex-1 text-white rounded-md p-2 uppercase font-bold bg-green-500"
  //           onClick={() => { setSupporting(true) }}
  //         >
  //           SUPPORT
  //         </button>
  //         <button
  //           className="flex-1 text-white rounded-md p-2 uppercase font-bold bg-red-400"
  //           onClick={() => { setSupporting(false) }}
  //         >
  //           AGAINST
  //         </button>
  //         <button
  //           type='button'
  //           onClick={() => { setAdding(false) }}
  //           className="flex-3 bg-gray-400 text-white rounded-md p-2 uppercase font-bold"
  //         >
  //           <XIcon className="h-4 w-4" />
  //         </button>
  //       </div>
  //     </fieldset>
  //   </form>
  // )
  return null;
};

export default SubmitEvidenceArticle;
