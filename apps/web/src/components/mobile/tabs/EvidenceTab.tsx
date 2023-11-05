import FeedPost from '@/components/webview/FeedPost'
import { QuestionProps } from '@/types/props'
import { useRouter } from 'next/router'
import React from 'react'

import SubHeader from '../partials/SubHeader'

const EvidenceTab = ({ questionData }: { questionData: QuestionProps }) => {
	//TODO: Check articleId is string
	const { query } = useRouter()
	const questionId = query.id as string

	return (
		<div className='flex flex-col space-y-2 col-span-2'>
			<div className='bg-white  rounded-md p-2 px-4'>
				<SubHeader />
			</div>
			<div className='flex flex-col space-y-4'>
				{questionData.posts &&
					questionData.posts.map((post) => {
						const p = post.evidencePost
						return (
							<FeedPost
								key={p.id}
								url={p.url || undefined}
								id={p.id}
								questionId={questionId}
								title={p.title}
								body={p.body}
								author={p?.author.name || ''}
								evidenceType={post.evidenceType}
								createdAt={p.createdAt}
								// postsCount={0}
								votes={0}
								evidenceBlocksCount={p._count.evidencePosts}
							/>
						)
					})}
			</div>
			{/* <PostsList questionId={questionId} posts={questionData.posts} /> */}
		</div>
	)
}

export default EvidenceTab
