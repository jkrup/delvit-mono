import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

import Page from '@delvit/web/components/Page'
import { trpc } from '@delvit/web/utils/trpc'

// const TimedQuestion = () => {
//     return (
//         <div className='bg-white text-center'>
//             <div className='bg-neutral-700 p-5 px-[27%] flex justify-between'>
//                 <div className='text-white'>
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                 </div>
//                 <div className='flex text-white text-lg font-bold mr-2'>
//                     Time Left
//                 </div>
//                 <div className='text-yellow-500 text-lg font-bold'>
//                     {/* Timer TBA */}
//                     0 4 : 3 1 : 0 2
//                 </div>
//             </div>
//             <div className='p-5'>
//                 <div className='flex justify-between mx-[39.5%]'>
//                     <div>
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-5" viewBox="0 0 20 20" fill="currentColor">
//                             <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
//                         </svg>
//                     </div>
//                     <div className='font-bold text-lg mb-3'>
//                         Question
//                     </div>
//                 </div>
//                 <div className='px-5 text-left'>Dius aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur</div>
//             </div>
//             <div className='flex justify-between mx-28 my-8 transition-colors'>
//                 <button className='bg-gradient-to-tr from-yellow-500 via-yellow-500 to-yellow-600 hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-yellow-400 hover:to-yellow-500 rounded-2xl w-32 p-1 font-bold text-white duration-200'>
//                     AGREE
//                 </button>
//                 <button className='outline outline-yellow-500 hover:bg-neutral-100 rounded-2xl w-32 p-1 font-bold duration-200'>
//                     DISAGREE
//                 </button>
//             </div>
//         </div>
//     )
// }

// const RelevantArticles = () => {
//     return (
//         <div className='bg-white rounded-t-md'>
//             <div className='bg-stone-500 italic text-center text-white rounded-t-md py-5'>
//                 Relevant Articles
//             </div>
//             <div className='m-8 italic'>
//                 <ul>
//                     <li>
//                         <button>1. Artical</button>
//                     </li>
//                     <li>
//                         <button>1. Artical</button>
//                     </li>
//                     <li>
//                         <button>1. Artical</button>
//                     </li>
//                     <li>
//                         <button>1. Artical</button>
//                     </li>
//                     <li>
//                         <button>1. Artical</button>
//                     </li>
//                     <li>
//                         <button>1. Artical</button>
//                     </li>
//                 </ul>
//             </div>
//         </div>
//     )
// }

type TopicProps = {
	data: {
		title: string
		body: string
	}
}

const Topic: React.FC<TopicProps> = ({ data }) => {
	const router = useRouter()

	const topicId = router.query.id as string

	if (!data?.body) {
		return <p>Loading</p>
	}
	const admin = true

	return (
		<div className='bg-white rounded h-auto p-2 px-4 flex flex-col col-span-3 w-full'>
			<div className='text-center text-xl mt-4 mb-10'>
				{data.title}
				{admin && (
					<Link href={`/topics/edit/${topicId}`} className='text-blue-600 text-sm'>
						Edit
					</Link>
				)}
			</div>
			<div className='mx-5'>{data.body}</div>
		</div>
	)
}

const TopicPage = () => {
	const router = useRouter()

	const topicId = router.query.id as string
	const topics = trpc.useQuery(['article.getPopularTopics'])

	const topic = trpc.useQuery(['article.getTopic', { topicId }])
	const t = topic.data

	if (!t) {
		return null
	}

	const renderTopics = () => {
		if (topics.data) {
			return topics.data.map(({ id, title }) => (
				<li
					key={id}
					className='p-2 truncate hover:bg-slate-300 hover:cursor-pointer'
					onClick={() => router.push('/topics/' + id)}
				>
					{title}
				</li>
			))
		}
		return Array(10)
			.fill(0)
			.map((_, i) => <li key={i}></li>)
	}

	return (
		<Page title={t.title}>
			<div className='max-w-screen-xl m-auto flex space-x-8 justify-between mt-4 mb-8'>
				{/* {t.relatedArticles.slice(0,4).map(relatedArticle => ( */}
				{/*     <Link key={relatedArticle.id} href={`/articles/${relatedArticle.id}`}> */}
				{/*         <div className="flex flex-col bg-gradient-to-b from-transparent to-stone-800 h-32 w-64 rounded-md text-white font-bold justify-end p-3 cursor-pointer"> */}
				{/*             <div> */}
				{/*                 {relatedArticle.title} */}
				{/*             </div> */}
				{/*         </div> */}
				{/*     </Link> */}
				{/* ))} */}
			</div>
			<div className='max-w-screen-xl mx-auto flex space-x-8'>
				<div className='bg-white rounded flex flex-col overflow-hidden w-80'>
					<div className='bg-black font-bold text-lg text-white text-center py-4'>Topics</div>
					<ol className=''>{renderTopics()}</ol>
				</div>
				{/* Topic Sheet */}
				{/* <Topic data={t} /> */}
				{/* <div className="flex flex-col space-y-4 col-span-2"> {/1* Col 4 Spans 2 cols*1/}*/}
				{/*     <div className="bg-stone-700 text-white px-4 py-4 h-full">*/}
				{/*         <h2 className="italic text-lg font-bold text-center">Consensus</h2>*/}
				{/*         <div className="mt-8">*/}
				{/*             [80%] Tech will recover within 2 years stronger than ever.*/}
				{/*         </div>*/}
				{/*         <div className="mt-8">*/}
				{/*             [90%] Tech will recover within 10 years stronger than ever.*/}
				{/*         </div>*/}
				{/*         <div className="mt-8">*/}
				{/*             [65%] Blockchain will take over the world.*/}
				{/*         </div>*/}
				{/*     </div>*/}
				{/*     {/1* Timer *1/}*/}
				{/*     {/1* <TimedQuestion /> *1/}*/}
				{/*     {/1* Relevant Articles *1/}*/}
				{/*     {/1* <RelevantArticles /> *1/}*/}
				{/* </div>*/}
			</div>
		</Page>
	)
}

export default TopicPage
