import { useRouter } from 'next/router'

import { trpc } from '../utils/trpc'
import FeedQuestion from './FeedQuestion'
import FilterBar from './FilterBar'
import SearchDisplay from './SearchDisplay'

const QuestionsFeed = () => {
	const router = useRouter()

	//TODO: abstract this out into it's own hook?
	const queryMode = router.query['order'] as string
	const topic = router.query['topic'] as string | undefined
	const query = router.query['q'] as string | undefined

	const ENABLED_MODES = ['NEW', 'TOP'] as const

	const mode = ENABLED_MODES.includes(queryMode as 'NEW' | 'TOP') ? (queryMode as 'NEW' | 'TOP') : 'NEW'

	const questionsData = trpc.useQuery(['question.getAllActiveQuestions', { mode, topic, query }])

	if (questionsData.isLoading || !questionsData.data) {
		return (
			<div className='col-span-2 flex flex-col space-y-4'>
				<div className='bg-white rounded-md p-2 px-4 flex space-x-2 items-center animate-pulse'>&nbsp;</div>

				<div className='bg-slate-300 rounded-md p-3 px-4 animate-pulse'>&nbsp;</div>

				{Array(10)
					.fill(0)
					.map((_, i) => {
						return (
							<div key={i} className='bg-slate-300 rounded-md h-40 animate-pulse'>
								{' '}
							</div>
						)
					})}
			</div>
		)
	}

	const questions = questionsData.data.map((q) => {
		let forSum = q.posts.filter((p) => p.evidenceType === 'FOR').length
		q.forPercent = Math.round((forSum / (q.posts.length || 1)) * 100)
		return q
	})
	return (
		<div className='flex flex-col space-y-4'>
			<SearchDisplay />
			<FilterBar />
			{questions.map((question) => {
				const url = `/questions/${question.id}`
				return (
					<FeedQuestion
						key={question.id}
						url={url}
						author={question.author}
						votes={0}
						title={question.title}
						postsCount={question._count.posts}
						forPercent={question.forPercent}
					/>
				)
			})}
		</div>
	)
}

export default QuestionsFeed
