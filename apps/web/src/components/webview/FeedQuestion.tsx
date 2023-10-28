import { HandThumbDownIcon, HandThumbUpIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

import type { Author } from './Author'

export interface QuestionProps {
	url: string
	title: string
	author: Author
	createdAt?: string | Date;
	forPercent: number // 0 - 100 (% for)
	postsCount: number
	votes: number
}

const Question: React.FC<QuestionProps> = ({ url, author, forPercent, postsCount, title }) => {
	return (
		<Link href={url} legacyBehavior>
			<div className='bg-white rounded-md p-2 px-4 flex flex-col space-y-2 shadow hover:shadow-lg transition cursor-pointer'>
				<div className='flex space-x-8 text-yellow-800 items-center'>
					<div className='flex space-x-2 items-center'>
						<div className='bg-yellow-800 rounded-full h-4 w-4'></div>
						{/* <div className="font-bold"> */}
						{/*   HSTK/Path */}
						{/* </div> */}
						<div className='text-sm'>Posted by {author.name}</div>
					</div>
				</div>

				{/* Article Title */}
				<a className='text-2xl font-bold mb-6'>{title}</a>

				{/* Buttons */}
				<div className='flex space-x-16 text-gray-400 font-bold'>
					<button className='flex items-center space-x-1'>
						<HandThumbDownIcon className='h-5 w-5' />
						<div>{postsCount === 1 ? `1 Post` : `${postsCount} Posts`}</div>
					</button>
					{postsCount > 0 ? (
						<button className='flex items-center space-x-1'>
							{forPercent > 50 ? (
								<>
									<HandThumbUpIcon className='h-5 w-5 text-green-600' />
									<div className='text-green-600'>{forPercent}% For</div>
								</>
							) : (
								<>
									<HandThumbDownIcon className='h-5 w-5 text-red-600' />
									<div className='text-red-600'>{100 - forPercent}% Against</div>
								</>
							)}
						</button>
					) : (
						<div className='text-gray-400'>No Votes</div>
					)}
				</div>
			</div>
		</Link>
	)
}

export default Question
