import Link from 'next/link'
import React from 'react'

import { timeToReadibleAgo } from '@delvit/web/utils/helpers'

export interface FeedPostProps {
	id: string
	url?: string
	questionId?: string
	title: string
	author: string
	createdAt: Date
	votes: number
	evidenceType?: 'FOR' | 'AGAINST'
	evidenceBlocksCount: number
	body: string
	imgSrc?: string | null
	tags: { id: string; title: string }[]
}

const FeedPost: React.FC<FeedPostProps> = ({
	id,
	questionId,
	url,
	title,
	author,
	createdAt,
	votes = 0,
	evidenceType,
	evidenceBlocksCount = 0,
	body,
	imgSrc,
	tags,
}) => {
	const articleUrl = questionId ? `/articles/${id}?questionId=${questionId}` : `/articles/${id}`
	return (
		<div className='bg-white rounded-md p-2 px-4 flex flex-col space-y-2 shadow hover:shadow-lg transition'>
			<div className='flex space-x-8 text-yellow-800 items-center'>
				<div className='flex space-x-2 items-center'>
					<div className='bg-yellow-800 rounded-full h-4 w-4'></div>
					{/* <div className="font-bold"> */}
					{/*   HSTK/Path */}
					{/* </div> */}
					<div className='text-sm flex'>
						<div>
							Posted by {author} {timeToReadibleAgo(createdAt)} &#x2022;&nbsp;
						</div>
						{evidenceType && (
							<div className={`${evidenceType === 'FOR' ? 'text-green-600' : 'text-red-800'} font-bold`}>
								{evidenceType}
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Article Title */}
			<Link href={articleUrl} className='text-2xl font-bold mb-6'>
				{title}
			</Link>

			{imgSrc && (
				<Link href={articleUrl} legacyBehavior>
					<img src={imgSrc} className='mb-4 cursor-pointer' alt='Preview' />
				</Link>
			)}
			{url && (
				<a
					className='flex items-center text-yellow-700 space-x-1 truncate w-full italic'
					href={url}
					rel='noreferrer'
					target='_blank'
				>
					{url}
				</a>
			)}

			{!!tags.length && (
				<div className={`flex flex-row flex-wrap`}>
					{tags.map((tag) => (
						<div
							key={tag.id}
							className='mr-2 mb-2 px-4 py-2 bg-yellow-600 bg-opacity-10 rounded-lg text-center justify-center align-center text-yellow-600 select-none'
						>
							{tag.title}
						</div>
					))}
				</div>
			)}

			<div className='pb-4'>
				<p className='line-clamp-5'>{body}</p>
			</div>

			{/* Buttons */}
			<div className='flex space-x-16 text-gray-400 font-bold'>
				<Link href={articleUrl} legacyBehavior>
					<button className='flex items-center space-x-1'>
						{/* <DocumentSearchIcon className="h-5 w-5" /> */}
						<div>
							{evidenceBlocksCount === 1
								? `${evidenceBlocksCount} Evidence Block`
								: `${evidenceBlocksCount} Evidence Blocks`}
						</div>
					</button>
				</Link>
			</div>
		</div>
	)
}

export default FeedPost
