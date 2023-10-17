import { ArrowDownIcon, ArrowUpIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'

import { trpc } from '../utils/trpc'

export type CommentData = {
	id: string
	depth: number
	votes: number
	body: string
	parentCommentId: string | null
	hasVoted?: number
	author: {
		name: string | null
		image: string
	}
	createdAt: Date
}

type CommentProps = {
	depth?: number
	votes: number
	authorName: string
	postedAt: string
	body: string
	id: string
	submitCommentMutation: any
	postId?: string
	questionId?: string
	refetch: () => void
	userVoted: number
	avatar?: string
}

const Comment: React.FC<CommentProps> = ({
	refetch,
	userVoted = 0,
	depth = 0,
	id,
	submitCommentMutation,
	postId,
	questionId,
	authorName,
	postedAt,
	body,
	votes,
	avatar = 'https://i.imgur.com/hepj9ZS.png',
}) => {
	const [tempUserVoted, setTempUserVoted] = useState(userVoted)
	console.log({ id, userVoted, tempUserVoted })
	const [replying, setReplying] = useState(false)
	const voteMutation = trpc.useMutation(['auth.voteComment'])
	const vote = (voteVal: -1 | 1) => {
		console.log('~~~VOTE~~~')
		if (voteVal === tempUserVoted) {
			setTempUserVoted(0)
		} else {
			setTempUserVoted(voteVal)
		}
		voteMutation.mutate({
			vote: voteVal,
			commentId: id,
		})
	}
	//
	useEffect(() => {
		if (voteMutation.isSuccess) {
			voteMutation.reset()
			refetch()
		}
	})
	//
	const submitReply = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = new FormData(e.target as HTMLFormElement)
		const body = formData.get('body')

		submitCommentMutation.mutate({
			body,
			postId,
			parentCommentId: id,
			questionId,
		})
		setReplying(false)
	}
	//
	return (
		<div className='flex'>
			{Array(depth)
				.fill(0)
				.map((_, i) => (
					<div key={i} className='border ml-0 mr-4'>
						{' '}
					</div>
				))}
			<div className='flex flex-col space-y-1 flex-1 my-2'>
				<div className='flex space-x-2 items-center text-gray-600'>
					<img alt='commenter avatar' className='rounded-full w-6 h-6' src={avatar} />
					<div>{authorName}</div>
					<div>{postedAt}</div>
				</div>
				<div>{body}</div>
				<div className='flex justify-between'>
					<button
						className='flex space-x-1 items-center justify-self-start hover:text-yellow-600'
						onClick={() => setReplying(!replying)}
					>
						<ChatBubbleLeftIcon className='w-5' />
						<span>Reply</span>
					</button>
					<div className='flex space-x-2 '>
						<button className='' onClick={() => vote(1)}>
							<ArrowUpIcon className={`w-5 ${tempUserVoted > 0 && 'text-yellow-600'}`} />
						</button>
						<div className='text-center'>{votes - userVoted + tempUserVoted}</div>
						<button className='' onClick={() => vote(-1)}>
							<ArrowDownIcon className={`w-5 ${tempUserVoted < 0 && 'text-yellow-600'}`} />
						</button>
					</div>
				</div>
				<form onSubmit={submitReply} className={`flex ${replying ? '' : 'hidden'}`}>
					<textarea
						className='resize-none rounded-sm focus:outline-none outline-none border border-gray-200 w-full mr-3 p-1'
						name='body'
						placeholder='write your thoughts...'
					/>
					<button className='bg-amber-400 rounded-md px-3 h-full'>Submit</button>
				</form>
			</div>
		</div>
	)
}

export default Comment
