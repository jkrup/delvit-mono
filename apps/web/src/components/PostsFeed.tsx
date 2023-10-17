import { useRouter } from 'next/router'

import { trpc } from '../utils/trpc'
import FeedPost from './FeedPost'
import FilterBar from './FilterBar'
import SearchDisplay from './SearchDisplay'

const PostsFeed = () => {
	const router = useRouter()

	const query = router.query['q'] as string
	const topic = router.query['topic'] as string
	const mode =
		['NEW', 'TOP'].indexOf((router.query['order'] as string) || '') === -1
			? 'NEW'
			: (router.query['order'] as 'NEW' | 'TOP')

	const postsData = trpc.useQuery(['article.getAllArticles', { mode, topic, query }])

	if (postsData.isLoading || !postsData.data) {
		return (
			<div className='col-span-2 flex flex-col space-y-4'>
				<div className='bg-slate-200 rounded-md p-3 px-4 animate-pulse'>&nbsp;</div>

				{Array(10)
					.fill(0)
					.map((_, i) => {
						return (
							<div key={i} className='bg-slate-200 rounded-md h-40 animate-pulse'>
								{' '}
							</div>
						)
					})}
			</div>
		)
	}

	return (
		<div className='flex flex-col space-y-4'>
			<SearchDisplay />
			<FilterBar />
			{postsData.data.map((p) => {
				return (
					<FeedPost
						key={p.id}
						author={p.author.name || ''}
						id={p.id}
						body={p.body}
						createdAt={p.createdAt}
						title={p.title}
						url={p.url || undefined}
						evidenceBlocksCount={p._count.evidencePosts}
						votes={0}
						imgSrc={p.imgSrc}
						tags={p.topics.map((x) => x.topic)}
					/>
				)
			})}
		</div>
	)
}

export default PostsFeed
