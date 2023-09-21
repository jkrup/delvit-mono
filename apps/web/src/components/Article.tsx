import Link from 'next/link'
import { useState } from 'react'
import { LinkIcon } from '@heroicons/react/20/solid'
import BanterSection from './BanterSection'
import DeleteIcon from './DeleteIcon'

interface ArticleProps {
	avatar?: string
	body: string
	id: string
	imgSrc?: string
	postedAt: string
	postedByName: string
	title: string
	url?: string
	tags: { id: string; title: string }[]
}

const Article: React.FC<ArticleProps> = ({
	avatar,
	body = '',
	id,
	imgSrc,
	postedAt,
	postedByName,
	title,
	url,
	tags,
}) => {
	const articleId = id
	const [noError, setNoError] = useState(true)

	return (
        <div className='rounded-md p-4 flex flex-col shadow bg-white'>
			{/* Article Header */}
			<div className='flex space-x-2 mb-2 w-full'>
				<img alt='commenter avatar' className='rounded-full w-6 h-6' src={avatar} />
				<div className="flex flex-row flex-grow justify-between">
					<div className='text-stone-500 items-center text-sm'>
						Posted by {postedByName} at {postedAt}
					</div>
					<DeleteIcon postId={id}/>
				</div>
			</div>

			<div className='space-y-2 overflow-clip'>
				{/* Article Title */}
				<div className='text-2xl font-bold mb-4'>
					{url && url.split(',').length === 1 ? (
						<Link href={url} target='_blank'>
							{title}
						</Link>
					) : (
						<span>{title}</span>
					)}
				</div>

				{/* Article Media */}
				{imgSrc && url && noError && (
					<Link href={url || ''} legacyBehavior>
						<img
							src={imgSrc}
							className='mb-4 cursor-pointer'
							alt='Preview'
							onError={() => {
								setNoError(false)
							}}
						/>
					</Link>
				)}
				{url &&
					url.split(',').map((u) => (
						(<Link
                            href={u}
                            key={u}
                            target='_blank'
                            className='text-yellow-700 hover:text-yellow-400 flex items-center'>

                            <LinkIcon className='h-6 w-6 shrink-0' />
                            <div className='truncate text-sm italic'>{u}</div>

                        </Link>)
					))}

				{!!tags.length && (
					<div className={`flex flex-row flex-wrap gap-2 my-2`}>
						{tags.map((tag) => (
							<div
								key={tag.id}
								className='px-4 py-2 bg-yellow-600 bg-opacity-10 rounded-lg text-center justify-center align-center text-yellow-600 select-none'
							>
								{tag.title}
							</div>
						))}
					</div>
				)}

				{/* Article Body */}
				<div>
					<p className='m-4 ml-2 whitespace-pre-wrap'>{body}</p>
				</div>
			</div>
			<BanterSection articleId={articleId} />
		</div>
    );
}

export default Article
